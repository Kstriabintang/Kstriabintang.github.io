// Hero "Explain it" form: POST /api/explain → { ok, explanation, mermaid? } and show the answer in a dialog.

const MAX_TOPIC = 80;
const TIMEOUT_MS = 30000;
const MERMAID_URL = 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs';
const ERROR_TEXT = 'The explainer is taking a break — try again soon.';

interface ExplainResponse {
  ok: boolean;
  explanation?: string;
  mermaid?: string;
  error?: string;
}

/* Tiny, safe markdown → DOM (paragraphs, lists, **bold**, `code`, ``` fences). No innerHTML. */
function appendInline(parent: HTMLElement, text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  for (const part of parts) {
    if (!part) continue;
    if (part.startsWith('**') && part.endsWith('**')) {
      const b = document.createElement('strong');
      b.textContent = part.slice(2, -2);
      parent.appendChild(b);
    } else if (part.startsWith('`') && part.endsWith('`')) {
      const c = document.createElement('code');
      c.textContent = part.slice(1, -1);
      parent.appendChild(c);
    } else {
      parent.appendChild(document.createTextNode(part));
    }
  }
}

function renderMarkdown(target: HTMLElement, source: string) {
  target.replaceChildren();
  const text = source.replace(/\r\n/g, '\n').trim();
  const fence = /```[a-z]*\n?([\s\S]*?)```/g;
  let last = 0;
  const chunks: { kind: 'text' | 'code'; value: string }[] = [];
  for (let m = fence.exec(text); m; m = fence.exec(text)) {
    chunks.push({ kind: 'text', value: text.slice(last, m.index) });
    chunks.push({ kind: 'code', value: m[1] });
    last = m.index + m[0].length;
  }
  chunks.push({ kind: 'text', value: text.slice(last) });

  for (const chunk of chunks) {
    if (chunk.kind === 'code') {
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      code.textContent = chunk.value.replace(/\n$/, '');
      pre.appendChild(code);
      target.appendChild(pre);
      continue;
    }
    for (const block of chunk.value.split(/\n{2,}/)) {
      const trimmed = block.trim();
      if (!trimmed) continue;
      const lines = trimmed.split('\n');
      const bullet = /^\s*(?:[-*•]|\d+[.)])\s+/;
      if (lines.every((l) => bullet.test(l))) {
        const list = document.createElement(/^\s*\d/.test(lines[0]) ? 'ol' : 'ul');
        for (const line of lines) {
          const li = document.createElement('li');
          appendInline(li, line.replace(bullet, ''));
          list.appendChild(li);
        }
        target.appendChild(list);
      } else {
        const p = document.createElement('p');
        appendInline(p, lines.join(' ').replace(/^#+\s*/, ''));
        target.appendChild(p);
      }
    }
  }
}

type MermaidApi = {
  initialize(config: Record<string, unknown>): void;
  render(id: string, code: string): Promise<{ svg: string }>;
};

let mermaidPromise: Promise<MermaidApi> | null = null;
function loadMermaid(): Promise<MermaidApi> {
  if (!mermaidPromise) {
    mermaidPromise = import(/* @vite-ignore */ MERMAID_URL).then((mod: { default: MermaidApi }) => mod.default);
  }
  return mermaidPromise;
}

async function renderDiagram(target: HTMLElement, code: string) {
  target.hidden = false;
  target.replaceChildren();
  const loading = document.createElement('p');
  loading.className = 'hero-explain__diagram-status';
  loading.textContent = 'Drawing the diagram…';
  target.appendChild(loading);
  try {
    const mermaid = await loadMermaid();
    const dark = document.documentElement.getAttribute('data-theme') !== 'light';
    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: dark ? 'dark' : 'neutral',
      fontFamily: 'Montserrat, sans-serif',
    });
    const { svg } = await mermaid.render(`kb-explain-${Date.now()}`, code);
    // Mermaid sanitises its own SVG output under securityLevel "strict".
    target.innerHTML = svg;
  } catch {
    target.replaceChildren();
    const pre = document.createElement('pre');
    const c = document.createElement('code');
    c.textContent = code;
    pre.appendChild(c);
    target.appendChild(pre);
  }
}

export function initHeroExplainer() {
  const root = document.getElementById('hero-explainer');
  const form = document.getElementById('hero-explain-form') as HTMLFormElement | null;
  const input = document.getElementById('hero-topic') as HTMLInputElement | null;
  const button = form?.querySelector<HTMLButtonElement>('.hero-subscribe__btn');
  const chips = document.getElementById('hero-explainer-chips');
  const status = document.getElementById('hero-explainer-status');
  const error = document.getElementById('hero-explainer-error');
  const dialog = document.getElementById('hero-explain-dialog') as HTMLDialogElement | null;
  const title = document.getElementById('hero-explain-title');
  const body = document.getElementById('hero-explain-body');
  const diagram = document.getElementById('hero-explain-diagram');
  if (!root || !form || !input || !button || !chips || !status || !error || !dialog || !title || !body || !diagram) return;

  const label = button.querySelector<HTMLElement>('.hero-subscribe__btn-label');
  let busy = false;

  const setBusy = (on: boolean, topic = '') => {
    busy = on;
    button.disabled = on;
    if (label) label.textContent = on ? 'Explaining…' : 'Explain it';
    chips.hidden = on;
    status.hidden = !on;
    if (on) status.lastElementChild!.textContent = ` Explaining “${topic}”…`;
  };

  const showError = (msg: string) => {
    error.textContent = msg;
    error.hidden = false;
  };

  const explain = async (raw: string) => {
    const topic = raw.trim().slice(0, MAX_TOPIC);
    error.hidden = true;
    if (!topic) {
      input.classList.add('hero-subscribe__input--invalid');
      input.focus();
      return;
    }
    if (busy) return;
    input.classList.remove('hero-subscribe__input--invalid');
    setBusy(true, topic);

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch('/api/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
        signal: controller.signal,
      });
      const data = (await res.json().catch(() => ({ ok: false }))) as ExplainResponse;
      if (!res.ok || !data.ok || !data.explanation) {
        showError(res.status === 429 ? 'Too many questions in a row — give it a minute.' : ERROR_TEXT);
        return;
      }
      title.textContent = topic;
      renderMarkdown(body, data.explanation);
      diagram.hidden = true;
      diagram.replaceChildren();
      if (!dialog.open) dialog.showModal();
      if (data.mermaid && data.mermaid.trim()) void renderDiagram(diagram, data.mermaid.trim());
    } catch {
      showError(ERROR_TEXT);
    } finally {
      window.clearTimeout(timer);
      setBusy(false);
    }
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    void explain(input.value);
  });
  input.addEventListener('input', () => input.classList.remove('hero-subscribe__input--invalid'));
  chips.querySelectorAll<HTMLButtonElement>('[data-topic]').forEach((chip) =>
    chip.addEventListener('click', () => {
      input.value = chip.dataset.topic || '';
      void explain(input.value);
    }),
  );

  dialog.querySelectorAll('[data-explain-close]').forEach((el) => el.addEventListener('click', () => dialog.close()));
  dialog.querySelector('[data-explain-again]')?.addEventListener('click', () => {
    dialog.close();
    input.value = '';
    input.focus();
  });
  // Click on the backdrop closes the dialog.
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
}

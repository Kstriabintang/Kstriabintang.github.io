// Full-screen terminal overlay. Opens on the 'kb:open-terminal' event (navbar ">_" button,
// command palette) and on the Konami code ↑↑↓↓←→←→BA.
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { BANNER, BANNER_SMALL, complete, parseMarkup, runCommand, type TermEffect, type TermProject } from './terminalCommands';

interface Line {
  id: number;
  type: 'input' | 'output';
  text: string;
}

const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

let nextId = 1;
const line = (type: Line['type'], text: string): Line => ({ id: nextId++, type, text });

function Prompt() {
  return (
    <span className="terminal-prompt">
      <span className="term-teal">bintang</span>
      <span className="term-dim">@</span>
      <span className="term-teal">portfolio</span>
      <span className="term-dim"> ~ $ </span>
    </span>
  );
}

function Markup({ text }: { text: string }) {
  return (
    <>
      {parseMarkup(text).map((seg, i) =>
        seg.cls ? (
          <span key={i} className={seg.cls}>
            {seg.text}
          </span>
        ) : (
          <span key={i}>{seg.text}</span>
        ),
      )}
    </>
  );
}

function runConfetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const colors = ['#02aab0', '#00cdac', '#818cf8', '#f59e0b', '#ffffff'];
  const parts = Array.from({ length: 140 }, () => ({
    x: canvas.width / 2 + (Math.random() - 0.5) * 200,
    y: canvas.height / 3,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -12 - 4,
    s: Math.random() * 6 + 3,
    r: Math.random() * Math.PI,
    vr: (Math.random() - 0.5) * 0.3,
    c: colors[Math.floor(Math.random() * colors.length)],
  }));
  const start = performance.now();
  const frame = (now: number) => {
    const t = now - start;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    parts.forEach((p) => {
      p.vy += 0.35;
      p.x += p.vx;
      p.y += p.vy;
      p.r += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.r);
      ctx.globalAlpha = Math.max(0, 1 - t / 2800);
      ctx.fillStyle = p.c;
      ctx.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2);
      ctx.restore();
    });
    if (t < 2800) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  requestAnimationFrame(frame);
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>([]);
  const [value, setValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [histIndex, setHistIndex] = useState(-1);
  const [projects, setProjects] = useState<TermProject[]>([]);
  const [confetti, setConfetti] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<HTMLCanvasElement>(null);
  const greetedRef = useRef(false);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const openTerminal = useCallback(() => {
    returnFocusRef.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const close = useCallback(() => setOpen(false), []);

  // Open triggers: custom event + Konami code.
  useEffect(() => {
    const onOpen = () => openTerminal();
    let pos = 0;
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) return;
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      if (key === KONAMI[pos]) {
        pos += 1;
        if (pos === KONAMI.length) {
          pos = 0;
          openTerminal();
        }
      } else {
        pos = key === KONAMI[0] ? 1 : 0;
      }
    };
    window.addEventListener('kb:open-terminal', onOpen);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('kb:open-terminal', onOpen);
      window.removeEventListener('keydown', onKey);
    };
  }, [openTerminal]);

  // Greeting + project list on first open.
  useEffect(() => {
    if (!open) return;
    if (!greetedRef.current) {
      greetedRef.current = true;
      const banner = window.innerWidth <= 600 ? BANNER_SMALL : BANNER;
      setLines([
        line('output', `\x1B[teal]${banner}\x1B[reset]`),
        line('output', '\x1B[dim]Welcome. Type \x1B[reset]\x1B[teal]help\x1B[reset]\x1B[dim] to see available commands.\x1B[reset]\n'),
      ]);
      fetch('/search.json')
        .then((r) => (r.ok ? r.json() : []))
        .then((items: { title: string; href: string; kind: string }[]) => {
          setProjects(
            items
              .filter((i) => i.kind === 'Project' && i.href.startsWith('/projects/'))
              .map((i) => ({ title: i.title, href: i.href, slug: i.href.replace('/projects/', '').replace(/\/$/, '') })),
          );
        })
        .catch(() => undefined);
    }
    document.documentElement.style.overflow = 'hidden';
    const t = window.setTimeout(() => inputRef.current?.focus(), 100);
    return () => {
      window.clearTimeout(t);
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) returnFocusRef.current?.focus?.();
  }, [open]);

  useEffect(() => {
    if (outputRef.current) outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (confetti && confettiRef.current) {
      runConfetti(confettiRef.current);
      const t = window.setTimeout(() => setConfetti(false), 3000);
      return () => window.clearTimeout(t);
    }
  }, [confetti]);

  const applyEffects = (effects: TermEffect[] = []) => {
    effects.forEach((effect) => {
      switch (effect.type) {
        case 'clear':
          setLines([]);
          break;
        case 'close':
          window.setTimeout(close, 350);
          break;
        case 'confetti':
          setConfetti(true);
          break;
        case 'theme': {
          const current = document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
          const next = effect.value === 'toggle' ? (current === 'dark' ? 'light' : 'dark') : effect.value;
          if (next !== current) document.getElementById('theme-toggle')?.click();
          break;
        }
        case 'navigate':
          window.setTimeout(() => {
            if (effect.newTab) window.open(effect.href, '_blank', 'noopener');
            else window.location.href = effect.href;
          }, 400);
          break;
      }
    });
  };

  const submit = () => {
    const cmd = value;
    setValue('');
    setHistIndex(-1);
    if (cmd.trim()) setHistory((h) => [...h, cmd]);
    const result = runCommand(cmd, projects);
    const isClear = result.effects?.some((e) => e.type === 'clear');
    setLines((prev) => {
      if (isClear) return [];
      const next = [...prev, line('input', cmd)];
      if (result.output !== null) next.push(line('output', result.output));
      return next;
    });
    applyEffects(result.effects);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      submit();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const idx = histIndex === -1 ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(idx);
      setValue(history[idx]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIndex === -1) return;
      const idx = histIndex + 1;
      if (idx >= history.length) {
        setHistIndex(-1);
        setValue('');
      } else {
        setHistIndex(idx);
        setValue(history[idx]);
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const done = complete(value);
      if (done) setValue(done);
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="terminal-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Interactive terminal"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="terminal-scanlines" aria-hidden="true" />
      {confetti && <canvas ref={confettiRef} className="terminal-confetti" aria-hidden="true" />}
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-dots">
            <span
              className="terminal-dot terminal-dot--red"
              onClick={close}
              role="button"
              tabIndex={0}
              aria-label="Close terminal"
              onKeyDown={(e) => e.key === 'Enter' && close()}
            />
            <span className="terminal-dot terminal-dot--yellow" />
            <span className="terminal-dot terminal-dot--green" />
          </div>
          <span className="terminal-title">bintang@samudra ~ %</span>
          <button type="button" className="terminal-close" onClick={close} aria-label="Close terminal">
            ESC
          </button>
        </div>
        <div className="terminal-output" ref={outputRef} onClick={() => inputRef.current?.focus()} role="log" aria-live="polite">
          {lines.map((l) => (
            <div key={l.id} className={`terminal-line terminal-line--${l.type}`}>
              {l.type === 'input' && <Prompt />}
              <span className="terminal-text">{l.type === 'output' ? <Markup text={l.text} /> : l.text}</span>
            </div>
          ))}
        </div>
        <div className="terminal-input-row">
          <Prompt />
          <input
            ref={inputRef}
            className="terminal-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            aria-label="Terminal command input"
            autoComplete="off"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
        </div>
      </div>
    </div>,
    document.body,
  );
}

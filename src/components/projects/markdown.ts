// Minimal Markdown → HTML for case-study bodies, split into "## " sections so each
// renders as its own case card. Handles paragraphs, bullet lists, **bold**, *italic*,
// `code` and [links](url). Input is our own repo content; output is escaped first.

export interface CaseSection {
  title: string;
  html: string;
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function inline(text: string): string {
  let out = escapeHtml(text);
  const codes: string[] = [];
  out = out.replace(/`([^`]+)`/g, (_, c: string) => {
    codes.push(`<code>${c}</code>`);
    return `\u0000${codes.length - 1}\u0000`;
  });
  out = out.replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>');
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  out = out.replace(/(^|[\s(])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>');
  out = out.replace(/\u0000(\d+)\u0000/g, (_, i: string) => codes[Number(i)]);
  return out;
}

function blocks(md: string): string {
  const html: string[] = [];
  for (const block of md.trim().split(/\n\s*\n/)) {
    const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    if (lines.every((l) => /^[-*] /.test(l))) {
      html.push(`<ul class="project-detail__case-list">${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`);
    } else {
      html.push(`<p class="project-detail__case-body">${inline(lines.join(' '))}</p>`);
    }
  }
  return html.join('');
}

export function caseSections(body: string | undefined): CaseSection[] {
  if (!body) return [];
  const parts = body.split(/^## +(.+)$/m);
  const sections: CaseSection[] = [];
  for (let i = 1; i < parts.length; i += 2) {
    sections.push({ title: parts[i].trim(), html: blocks(parts[i + 1] ?? '') });
  }
  return sections;
}

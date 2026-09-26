// Sanitizer for model-generated Mermaid flowcharts. Only plain flowchart syntax survives:
// node ids, bracketed labels and arrows. Anything that could run code or restyle the page is dropped.

const MAX_NODES = 10;
const MAX_LINES = 24;
const MAX_LENGTH = 1500;

const FORBIDDEN = /(click\b|callback|href|javascript:|<\s*\/?\s*script|classDef|class\s|style\s|linkStyle|%%|init\s*:|\{\s*"|`|@\{)/i;
const EDGE = /(-->|---|==>|-\.->)/;
const LINE_RE =
  /^[A-Za-z][\w]{0,24}(\s*[[({]{1,2}[^\])}]*[\])}]{1,2})?(\s*(-->|---|==>|-\.->)\s*(\|[^|]{0,40}\|)?\s*[A-Za-z][\w]{0,24}(\s*[[({]{1,2}[^\])}]*[\])}]{1,2})?)*\s*;?$/;

function cleanLabel(label: string): string {
  return label
    .replace(/["'`<>{}[\]()|#;&\\]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 48);
}

/** Returns a safe "flowchart TD" definition, or null if nothing usable remains. */
export function sanitizeMermaid(input: unknown): string | null {
  if (typeof input !== 'string') return null;
  let text = input.replace(/\r/g, '').trim();
  // Strip a surrounding ```mermaid fence if the model added one.
  text = text.replace(/^```(?:mermaid)?\s*/i, '').replace(/```\s*$/i, '').trim();
  if (!text || text.length > MAX_LENGTH * 2) return null;

  const lines = text
    .split(/\n|;(?=\s*[A-Za-z])/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (!lines.length) return null;
  if (!/^(flowchart|graph)\s+(TD|TB|LR|RL|BT)\b/i.test(lines[0])) return null;

  const body: string[] = [];
  const ids = new Set<string>();
  for (const raw of lines.slice(1)) {
    if (FORBIDDEN.test(raw)) continue;
    // Clean every label, whatever its bracket style.
    const cleaned = raw
      .replace(/\(\(([^)]*)\)\)/g, (_, l: string) => `((${cleanLabel(l)}))`)
      .replace(/\[([^\]]*)\]/g, (_, l: string) => `[${cleanLabel(l)}]`)
      .replace(/\{([^}]*)\}/g, (_, l: string) => `{${cleanLabel(l)}}`)
      .replace(/(^|[^(])\(([^()]*)\)(?!\))/g, (_, pre: string, l: string) => `${pre}(${cleanLabel(l)})`)
      .replace(/\|([^|]*)\|/g, (_, l: string) => `|${cleanLabel(l)}|`);
    if (!LINE_RE.test(cleaned)) continue;
    const segments = cleaned.split(EDGE).filter((s) => !EDGE.test(s));
    for (const seg of segments) {
      const m = seg.replace(/^\s*\|[^|]*\|\s*/, '').match(/^\s*([A-Za-z]\w*)/);
      if (m) ids.add(m[1]);
    }
    if (ids.size > MAX_NODES) break;
    body.push(`  ${cleaned.replace(/;$/, '')}`);
    if (body.length >= MAX_LINES) break;
  }
  if (!body.length || ids.size < 2) return null;
  const out = ['flowchart TD', ...body].join('\n');
  return out.length <= MAX_LENGTH ? out : null;
}

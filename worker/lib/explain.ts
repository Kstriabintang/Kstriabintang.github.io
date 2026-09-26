// Parsing of the "Explain it" model output into { explanation, mermaid }.
import { sanitizeMermaid } from './mermaid.ts';

export interface Explanation {
  explanation: string;
  mermaid: string | null;
}

function fromObject(obj: Record<string, unknown>): Explanation | null {
  const explanation = typeof obj.explanation === 'string' ? obj.explanation.trim() : '';
  if (!explanation) return null;
  return { explanation: explanation.slice(0, 1600), mermaid: sanitizeMermaid(obj.mermaid) };
}

/** Accepts a parsed object, a JSON string, or JSON embedded in prose/code fences. */
export function parseExplanation(raw: unknown): Explanation | null {
  if (raw && typeof raw === 'object') return fromObject(raw as Record<string, unknown>);
  if (typeof raw !== 'string') return null;
  const text = raw.trim();
  const candidates = [text, text.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/i, '')];
  const start = text.indexOf('{');
  const end = text.lastIndexOf('}');
  if (start >= 0 && end > start) candidates.push(text.slice(start, end + 1));
  for (const c of candidates) {
    try {
      const parsed = JSON.parse(c) as unknown;
      if (parsed && typeof parsed === 'object') {
        const out = fromObject(parsed as Record<string, unknown>);
        if (out) return out;
      }
    } catch {
      /* try the next candidate */
    }
  }
  // Last resort: treat plain prose as the explanation, without a diagram.
  if (text && !text.startsWith('{')) return { explanation: text.slice(0, 1600), mermaid: null };
  return null;
}

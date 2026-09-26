// Pure input validation helpers (no runtime bindings) — covered by worker/selfcheck.ts.

export const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[A-Za-z]{2,}$/;
export const PHONE_RE = /^\+?[\d\s()-]{7,20}$/;

/** Collapse whitespace, strip control characters and clamp length. */
export function cleanText(value: unknown, max: number): string {
  if (typeof value !== 'string') return '';
  // eslint-disable-next-line no-control-regex
  return value.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '').trim().slice(0, max);
}

/** For header values: no CR/LF, no angle brackets or quotes. */
export function headerSafe(value: string, max = 120): string {
  return value.replace(/[\r\n<>"]/g, ' ').replace(/\s+/g, ' ').trim().slice(0, max);
}

export function isEmail(value: string): boolean {
  return value.length <= 254 && EMAIL_RE.test(value);
}

export function isPhone(value: string): boolean {
  return PHONE_RE.test(value);
}

export interface ContactInput {
  name: string;
  email: string;
  message: string;
  company: string;
}

export type Result<T> = { ok: true; value: T } | { ok: false; error: string };

export function validateContact(body: unknown): Result<ContactInput> {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = cleanText(b.name, 80);
  const email = cleanText(b.email, 254);
  const message = cleanText(b.message, 4000);
  const company = cleanText(b.company, 200); // honeypot
  if (name.length < 2) return { ok: false, error: 'Please enter your name.' };
  if (!isEmail(email)) return { ok: false, error: 'Please enter a valid email address.' };
  if (message.length < 10) return { ok: false, error: 'Please write a message of at least 10 characters.' };
  return { ok: true, value: { name, email, message, company } };
}

export interface LeadInput {
  name: string;
  contact: string;
}

export function validateLead(body: unknown): Result<LeadInput> {
  const b = (body ?? {}) as Record<string, unknown>;
  const name = cleanText(b.name, 80);
  const contact = cleanText(b.contact, 120);
  if (!name) return { ok: false, error: 'Name is required.' };
  if (!isEmail(contact) && !isPhone(contact)) return { ok: false, error: 'Enter a valid email or phone number.' };
  return { ok: true, value: { name, contact } };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

/** Keep the last `maxMessages` user/assistant turns, each clamped to `maxChars`. */
export function sanitizeHistory(value: unknown, maxMessages = 12, maxChars = 2000): ChatMessage[] {
  if (!Array.isArray(value)) return [];
  const out: ChatMessage[] = [];
  for (const raw of value) {
    const m = (raw ?? {}) as Record<string, unknown>;
    if (m.role !== 'user' && m.role !== 'assistant') continue;
    const content = cleanText(m.content, maxChars);
    if (!content) continue;
    out.push({ role: m.role, content });
  }
  const trimmed = out.slice(-maxMessages);
  // A conversation must end with the user's turn.
  while (trimmed.length && trimmed[trimmed.length - 1].role !== 'user') trimmed.pop();
  return trimmed;
}

export function normalizeTopic(value: unknown): string {
  return cleanText(value, 80)
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s+#.-]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

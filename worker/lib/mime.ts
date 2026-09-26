// Hand-built RFC 5322 message for the send_email binding (plain text, UTF-8, base64 body).
import { headerSafe } from './validate.ts';

function base64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

/** RFC 2047 encoded-word so non-ASCII subjects and names survive. */
export function encodeWord(text: string): string {
  // eslint-disable-next-line no-control-regex
  return /^[\x20-\x7E]*$/.test(text) ? text : `=?UTF-8?B?${base64Utf8(text)}?=`;
}

function wrap76(b64: string): string {
  return b64.match(/.{1,76}/g)?.join('\r\n') ?? '';
}

export interface MimeInput {
  fromAddress: string;
  fromName: string;
  toAddress: string;
  replyToAddress: string;
  replyToName: string;
  subject: string;
  text: string;
  domain: string;
  date?: Date;
  messageId?: string;
}

export function buildMime(m: MimeInput): string {
  const id = m.messageId ?? `${crypto.randomUUID()}@${m.domain}`;
  const headers = [
    `From: ${encodeWord(headerSafe(m.fromName, 80))} <${headerSafe(m.fromAddress, 254)}>`,
    `To: <${headerSafe(m.toAddress, 254)}>`,
    `Reply-To: ${encodeWord(headerSafe(m.replyToName, 80))} <${headerSafe(m.replyToAddress, 254)}>`,
    `Subject: ${encodeWord(headerSafe(m.subject, 160))}`,
    `Message-ID: <${id}>`,
    `Date: ${(m.date ?? new Date()).toUTCString()}`,
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64',
  ];
  return `${headers.join('\r\n')}\r\n\r\n${wrap76(base64Utf8(m.text))}\r\n`;
}

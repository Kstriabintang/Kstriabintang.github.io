// Dependency-free checks for the Worker's pure helpers.
// Run: node worker/selfcheck.ts   (Node ≥ 23 strips TypeScript types natively)
import { strict as assert } from 'node:assert';
import { cleanText, headerSafe, isEmail, isPhone, normalizeTopic, sanitizeHistory, validateContact, validateLead } from './lib/validate.ts';
import { windowKey } from './lib/ratelimit.ts';
import { sanitizeMermaid } from './lib/mermaid.ts';
import { SseParser, extractDelta, encodeEvent } from './lib/sse.ts';
import { buildMime, encodeWord } from './lib/mime.ts';
import { parseExplanation } from './lib/explain.ts';
import { cacheControlFor } from './lib/headers.ts';

let passed = 0;
function check(name: string, fn: () => void) {
  fn();
  passed += 1;
  console.log(`ok  ${name}`);
}

check('cleanText strips control chars and clamps', () => {
  assert.equal(cleanText('  hi\u0000 there  ', 100), 'hi there');
  assert.equal(cleanText('abcdef', 3), 'abc');
  assert.equal(cleanText(42, 10), '');
});

check('headerSafe removes CRLF injection', () => {
  assert.equal(headerSafe('Evil\r\nBcc: x@y.com'), 'Evil Bcc: x@y.com');
  assert.ok(!headerSafe('a<b>"c').match(/[<>"]/));
});

check('email / phone validation', () => {
  assert.ok(isEmail('someone@example.com'));
  assert.ok(!isEmail('not-an-email'));
  assert.ok(!isEmail('a@b'));
  assert.ok(isPhone('+62 852-6440-2640'));
  assert.ok(!isPhone('12ab'));
});

check('validateContact', () => {
  assert.equal(validateContact({ name: 'A', email: 'a@b.co', message: 'hello there!' }).ok, false);
  assert.equal(validateContact({ name: 'Ann', email: 'bad', message: 'hello there!' }).ok, false);
  assert.equal(validateContact({ name: 'Ann', email: 'a@b.co', message: 'short' }).ok, false);
  const ok = validateContact({ name: 'Ann', email: 'a@b.co', message: 'hello there, nice site', company: '' });
  assert.ok(ok.ok && ok.value.name === 'Ann');
});

check('validateLead accepts email or phone', () => {
  assert.ok(validateLead({ name: 'Bo', contact: 'bo@x.io' }).ok);
  assert.ok(validateLead({ name: 'Bo', contact: '+62 812 3456 789' }).ok);
  assert.ok(!validateLead({ name: '', contact: 'bo@x.io' }).ok);
  assert.ok(!validateLead({ name: 'Bo', contact: 'nope' }).ok);
});

check('sanitizeHistory keeps last 12 valid turns ending with user', () => {
  const msgs = Array.from({ length: 20 }, (_, i) => ({ role: i % 2 ? 'assistant' : 'user', content: `m${i}` }));
  msgs.push({ role: 'system', content: 'ignore me' });
  const out = sanitizeHistory(msgs, 12, 5);
  assert.ok(out.length <= 12);
  assert.equal(out[out.length - 1].role, 'user');
  assert.ok(out.every((m) => m.role !== ('system' as string)));
  assert.equal(sanitizeHistory([{ role: 'user', content: 'x'.repeat(50) }], 12, 10)[0].content.length, 10);
});

check('normalizeTopic', () => {
  assert.equal(normalizeTopic('  Black   Holes!! '), 'black holes');
  assert.equal(normalizeTopic('C++ <script>'), 'c++ script');
});

check('windowKey buckets by hour', () => {
  assert.equal(windowKey('chat', '1.2.3.4', 3600, 3600_000 * 5 + 10), 'rl:chat:1.2.3.4:5');
});

check('sanitizeMermaid keeps plain flowcharts', () => {
  const out = sanitizeMermaid('```mermaid\nflowchart TD\n  A[Question] --> B[Search docs]\n  B -->|found| C[Answer]\n```');
  assert.ok(out);
  assert.ok(out!.startsWith('flowchart TD'));
  assert.ok(out!.includes('A[Question] --> B[Search docs]'));
  assert.ok(out!.includes('|found|'));
});

check('sanitizeMermaid splits single-line model output', () => {
  const out = sanitizeMermaid('flowchart TD A[Website 1] --> B[Something Happens] B[Something Happens] --> C[Webhook] C --> D[Website 2]');
  assert.equal(out, 'flowchart TD\n  A[Website 1] --> B[Something Happens]\n  B[Something Happens] --> C[Webhook]\n  C --> D[Website 2]');
});

check('sanitizeMermaid drops dangerous lines', () => {
  const out = sanitizeMermaid('graph LR\nA[Hi] --> B[There]\nclick A "javascript:alert(1)"\nstyle A fill:#f00\nB --> C["<img src=x onerror=1>"]');
  assert.ok(out);
  assert.ok(!/click|style|javascript|<img|onerror="/i.test(out!.replace(/C\[[^\]]*\]/, '')));
  assert.ok(!out!.includes('<'));
});

check('sanitizeMermaid rejects non-flowcharts and huge graphs', () => {
  assert.equal(sanitizeMermaid('sequenceDiagram\nA->>B: hi'), null);
  assert.equal(sanitizeMermaid(42), null);
  const big = ['flowchart TD', ...Array.from({ length: 30 }, (_, i) => `N${i}[x] --> N${i + 1}[y]`)].join('\n');
  const out = sanitizeMermaid(big);
  assert.ok(out === null || new Set(out.match(/N\d+/g)).size <= 11);
});

check('SseParser handles split chunks', () => {
  const p = new SseParser();
  assert.deepEqual(p.push('data: {"response":"He'), []);
  assert.deepEqual(p.push('llo"}\n\ndata: [DONE]\n\n'), ['{"response":"Hello"}', '[DONE]']);
});

check('extractDelta handles native and OpenAI shapes', () => {
  assert.equal(extractDelta('{"response":"hi"}'), 'hi');
  assert.equal(extractDelta('{"choices":[{"delta":{"content":"yo"}}]}'), 'yo');
  assert.equal(extractDelta('[DONE]'), null);
  assert.equal(extractDelta('not json'), null);
  assert.equal(encodeEvent({ delta: 'a' }), 'data: {"delta":"a"}\n\n');
});

check('buildMime produces RFC 5322 headers with base64 body', () => {
  const raw = buildMime({
    fromAddress: 'hello@example.com',
    fromName: 'Website',
    toAddress: 'me@example.com',
    replyToAddress: 'visitor@example.org',
    replyToName: 'Visitor\r\nBcc: evil@x.com',
    subject: 'Halo — pesan',
    text: 'Hi 👋',
    domain: 'example.com',
    messageId: 'id@example.com',
    date: new Date(0),
  });
  const [head, body] = raw.split('\r\n\r\n');
  assert.ok(head.includes('From: Website <hello@example.com>'));
  assert.ok(head.includes('Reply-To:'));
  assert.ok(!/\r\nBcc:/i.test(head));
  assert.ok(head.includes('Subject: =?UTF-8?B?'));
  assert.equal(Buffer.from(body.trim(), 'base64').toString('utf8'), 'Hi 👋');
  assert.equal(encodeWord('plain'), 'plain');
});

check('parseExplanation accepts objects, fenced JSON and prose', () => {
  const a = parseExplanation({ explanation: 'Like a library.', mermaid: 'flowchart TD\nA[Ask] --> B[Find]' });
  assert.ok(a && a.mermaid);
  const b = parseExplanation('```json\n{"explanation":"Hi","mermaid":"nope"}\n```');
  assert.ok(b && b.explanation === 'Hi' && b.mermaid === null);
  const c = parseExplanation('Just words.');
  assert.ok(c && c.mermaid === null);
  assert.equal(parseExplanation(''), null);
});

check('cache headers', () => {
  assert.ok(cacheControlFor('/_astro/x.js')?.includes('immutable'));
  assert.equal(cacheControlFor('/api/chat'), 'no-store');
  assert.equal(cacheControlFor('/'), null);
});

console.log(`\n${passed} checks passed`);

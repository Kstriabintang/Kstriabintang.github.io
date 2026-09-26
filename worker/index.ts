// Cloudflare Worker: serves the static Astro build and the /api/* endpoints.
import { EmailMessage } from 'cloudflare:email';
import type { Env } from './env.ts';
import { json, withHeaders } from './lib/headers.ts';
import { rateLimit } from './lib/ratelimit.ts';
import { normalizeTopic, sanitizeHistory, validateContact, validateLead, cleanText } from './lib/validate.ts';
import { buildMime } from './lib/mime.ts';
import { chatSystemPrompt, explainMessages } from './lib/prompts.ts';
import { toSiteStream, encodeEvent } from './lib/sse.ts';
import { parseExplanation } from './lib/explain.ts';

type Handler = (request: Request, env: Env, ctx: ExecutionContext) => Promise<Response>;

const clientIp = (request: Request) => request.headers.get('CF-Connecting-IP') ?? 'unknown';

async function readJson(request: Request, maxBytes = 16_000): Promise<unknown> {
  const len = Number(request.headers.get('Content-Length') ?? '0');
  if (len > maxBytes) throw new Error('too large');
  const text = await request.text();
  if (text.length > maxBytes) throw new Error('too large');
  return JSON.parse(text) as unknown;
}

/** Same-origin check for browser POSTs (Origin is always sent on cross-site fetches). */
function sameOrigin(request: Request): boolean {
  const origin = request.headers.get('Origin');
  if (!origin) return true;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}

const tooMany = () => json({ ok: false, error: 'Too many requests — please try again later.' }, 429, { 'Retry-After': '3600' });

const contact: Handler = async (request, env) => {
  let body: unknown;
  try {
    body = await readJson(request);
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }
  const parsed = validateContact(body);
  if (!parsed.ok) return json({ ok: false, error: parsed.error }, 422);
  const { name, email, message, company } = parsed.value;
  // Honeypot filled → pretend success, send nothing.
  if (company) return json({ ok: true });

  const rl = await rateLimit(env.KV, 'contact', clientIp(request), 5);
  if (!rl.allowed) return tooMany();

  const country = (request as Request & { cf?: { country?: string } }).cf?.country ?? 'unknown';
  const text = `New message from the contact form on ${env.SITE_URL}\n\nName: ${name}\nEmail: ${email}\nCountry: ${country}\n\n${message}\n`;
  const domain = new URL(env.SITE_URL).hostname;
  const raw = buildMime({
    fromAddress: env.CONTACT_FROM,
    fromName: 'Website contact form',
    toAddress: env.CONTACT_TO,
    replyToAddress: email,
    replyToName: name,
    subject: `Website message from ${name}`,
    text,
    domain,
  });
  try {
    await env.EMAIL.send(new EmailMessage(env.CONTACT_FROM, env.CONTACT_TO, raw));
  } catch (err) {
    console.error('contact send failed', err instanceof Error ? err.message : err);
    return json({ ok: false, error: 'Message could not be sent. Please email hello@ksatriabintangsamudra.com directly.' }, 502);
  }
  return json({ ok: true });
};

const lead: Handler = async (request, env) => {
  let body: unknown;
  try {
    body = await readJson(request, 4_000);
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }
  const parsed = validateLead(body);
  if (!parsed.ok) return json({ ok: false, error: parsed.error }, 422);
  const rl = await rateLimit(env.KV, 'lead', clientIp(request), 10);
  if (!rl.allowed) return tooMany();
  const country = (request as Request & { cf?: { country?: string } }).cf?.country ?? 'unknown';
  const key = `lead:${Date.now()}:${crypto.randomUUID().slice(0, 8)}`;
  await env.KV.put(key, JSON.stringify({ ...parsed.value, country, at: new Date().toISOString() }), {
    expirationTtl: 60 * 60 * 24 * 90,
  });
  return json({ ok: true });
};

const explain: Handler = async (request, env) => {
  let body: unknown;
  try {
    body = await readJson(request, 2_000);
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }
  const topic = normalizeTopic((body as { topic?: unknown })?.topic);
  if (topic.length < 2) return json({ ok: false, error: 'Please type a topic.' }, 422);

  const cacheKey = `explain:v1:${topic}`;
  const cached = await env.KV.get(cacheKey);
  if (cached) return json({ ok: true, topic, cached: true, ...(JSON.parse(cached) as object) });

  const rl = await rateLimit(env.KV, 'explain', clientIp(request), 20);
  if (!rl.allowed) return tooMany();

  let result;
  try {
    const out = (await env.AI.run(env.EXPLAIN_MODEL, {
      messages: explainMessages(topic),
      max_tokens: 700,
      temperature: 0.4,
      response_format: {
        type: 'json_schema',
        json_schema: {
          type: 'object',
          properties: { explanation: { type: 'string' }, mermaid: { type: 'string' } },
          required: ['explanation', 'mermaid'],
        },
      },
    })) as { response?: unknown };
    result = parseExplanation(out?.response ?? out);
  } catch (err) {
    console.error('explain failed', err instanceof Error ? err.message : err);
    return json({ ok: false, error: 'The explainer is busy right now — please try again in a minute.' }, 503);
  }
  if (!result) return json({ ok: false, error: 'Could not explain that one — try another topic.' }, 502);

  await env.KV.put(cacheKey, JSON.stringify(result), { expirationTtl: 60 * 60 * 24 * 7 });
  return json({ ok: true, topic, cached: false, ...result });
};

const chat: Handler = async (request, env) => {
  let body: unknown;
  try {
    body = await readJson(request, 40_000);
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }
  const b = (body ?? {}) as { messages?: unknown; lead?: { name?: unknown } };
  const history = sanitizeHistory(b.messages, 12, 2000);
  if (!history.length) return json({ ok: false, error: 'Send a message first.' }, 422);

  const rl = await rateLimit(env.KV, 'chat', clientIp(request), 30);
  if (!rl.allowed) return tooMany();

  const leadName = cleanText(b.lead?.name, 60) || undefined;
  const headers = {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-store',
    'X-Accel-Buffering': 'no',
  };
  try {
    const upstream = (await env.AI.run(env.CHAT_MODEL, {
      messages: [{ role: 'system', content: chatSystemPrompt(leadName) }, ...history],
      stream: true,
      max_tokens: 400,
      temperature: 0.3,
    })) as ReadableStream<Uint8Array>;
    return new Response(toSiteStream(upstream), { headers });
  } catch (err) {
    console.error('chat failed', err instanceof Error ? err.message : err);
    const msg = encodeEvent({ error: 'unavailable' }) + encodeEvent('[DONE]');
    return new Response(msg, { status: 503, headers });
  }
};

const routes: Record<string, Handler> = {
  '/api/contact': contact,
  '/api/lead': lead,
  '/api/explain': explain,
  '/api/chat': chat,
};

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // www → apex, keeping path and query.
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }

    if (url.pathname.startsWith('/api/')) {
      const handler = routes[url.pathname.replace(/\/$/, '')];
      if (!handler) return withHeaders(json({ ok: false, error: 'Not found.' }, 404), url.pathname);
      if (request.method !== 'POST') {
        return withHeaders(json({ ok: false, error: 'Method not allowed.' }, 405, { Allow: 'POST' }), url.pathname);
      }
      if (!sameOrigin(request)) return withHeaders(json({ ok: false, error: 'Forbidden.' }, 403), url.pathname);
      try {
        return withHeaders(await handler(request, env, ctx), url.pathname);
      } catch (err) {
        console.error('api error', err instanceof Error ? err.message : err);
        return withHeaders(json({ ok: false, error: 'Something went wrong.' }, 500), url.pathname);
      }
    }

    const asset = await env.ASSETS.fetch(request);
    return withHeaders(asset, url.pathname);
  },
};

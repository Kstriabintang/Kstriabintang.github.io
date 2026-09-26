// Fixed-window rate limiting on KV. KV is eventually consistent, so limits are approximate —
// good enough to stop casual abuse of the contact form and AI endpoints.

export function windowKey(bucket: string, ip: string, windowSeconds: number, now = Date.now()): string {
  const win = Math.floor(now / 1000 / windowSeconds);
  return `rl:${bucket}:${ip}:${win}`;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

export async function rateLimit(
  kv: KVNamespace,
  bucket: string,
  ip: string,
  limit: number,
  windowSeconds = 3600,
): Promise<RateLimitResult> {
  const key = windowKey(bucket, ip, windowSeconds);
  const current = Number((await kv.get(key)) ?? '0') || 0;
  if (current >= limit) return { allowed: false, remaining: 0 };
  await kv.put(key, String(current + 1), { expirationTtl: windowSeconds + 60 });
  return { allowed: true, remaining: limit - current - 1 };
}

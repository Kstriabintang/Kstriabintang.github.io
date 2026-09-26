// Security + caching headers applied to every response the Worker returns.

export const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net https://static.cloudflareinsights.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://cloudflareinsights.com https://cdn.jsdelivr.net",
  "worker-src 'self' blob:",
  "frame-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self' mailto:",
  "object-src 'none'",
  'upgrade-insecure-requests',
].join('; ');

const SECURITY: Record<string, string> = {
  'Content-Security-Policy': CSP,
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  'X-Frame-Options': 'DENY',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
};

/** Long-lived caching for fingerprinted build output and fonts. */
export function cacheControlFor(pathname: string): string | null {
  if (pathname.startsWith('/_astro/') || pathname.startsWith('/fonts/')) return 'public, max-age=31536000, immutable';
  if (pathname.startsWith('/api/')) return 'no-store';
  return null;
}

export function withHeaders(response: Response, pathname: string): Response {
  const res = new Response(response.body, response);
  for (const [k, v] of Object.entries(SECURITY)) res.headers.set(k, v);
  const cache = cacheControlFor(pathname);
  if (cache) res.headers.set('Cache-Control', cache);
  return res;
}

export function json(data: unknown, status = 200, extra: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', ...extra },
  });
}

// Bindings and vars declared in wrangler.jsonc.
export interface Env {
  ASSETS: Fetcher;
  AI: Ai;
  EMAIL: SendEmail;
  KV: KVNamespace;
  SITE_URL: string;
  CONTACT_FROM: string;
  CONTACT_TO: string;
  CHAT_MODEL: string;
  EXPLAIN_MODEL: string;
  // Optional: set via `wrangler secret put RESEND_API_KEY` to send the visitor an auto-reply.
  RESEND_API_KEY?: string;
}

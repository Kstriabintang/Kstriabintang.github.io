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
}

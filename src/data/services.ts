// Service landing pages. Copy is concrete and grounded in real shipped work
// (see src/content/projects + about page) — no generic "transform your digital
// presence" filler, no invented clients or metrics. Related projects link out
// to real case studies for evidence.

export interface ServiceDef {
  slug: string;
  /** Nav/menu + card label. */
  label: string;
  /** <h1> and JSON-LD serviceType. */
  h1: string;
  /** <title> (before " — Ksatria…") and OG. */
  title: string;
  /** Meta description — unique, concrete. */
  description: string;
  /** One-line summary under the H1. */
  lede: string;
  /** Who this is for (short bullets). */
  forWho: string[];
  /** Problems it solves. */
  problems: string[];
  /** What I actually build (concrete deliverables). */
  build: string[];
  /** Technologies used. */
  tech: string[];
  /** Related project ids (must exist in src/content/projects). */
  related: string[];
  /** Terms this page should be discoverable for (used in JSON-LD). */
  keywords: string[];
}

export const services: ServiceDef[] = [
  {
    slug: 'web-development',
    label: 'Web Development',
    h1: 'Custom Web Application Development',
    title: 'Custom Web Application Development',
    description:
      'I build custom web applications for businesses that have outgrown templates — dashboards, customer portals, internal tools, admin panels and API integrations, built with Next.js, React and Cloudflare.',
    lede: 'For businesses that have outgrown templates and no-code and need software that fits how they actually work.',
    forWho: [
      'Operators running the business on spreadsheets, WhatsApp and manual steps.',
      'Founders who need a real admin panel, dashboard or customer portal — not another template.',
      'Teams with an existing app that needs new features, integrations or a rebuild on solid foundations.',
    ],
    problems: [
      'Data lives in scattered spreadsheets with no single source of truth.',
      'Work that should be automated is still done by hand every day.',
      'An off-the-shelf tool almost fits, but the last 20% is where the business actually lives.',
    ],
    build: [
      'Dashboards and internal tools with real roles, permissions and audit trails.',
      'Customer & staff portals with authentication and row-level security.',
      'Admin panels and CMS so non-technical staff own their own content.',
      'API integrations between the tools you already use.',
      'Edge-native sites on Cloudflare (Workers, D1, KV) that stay fast and cheap.',
    ],
    tech: ['Next.js', 'React', 'Vue 3', 'TypeScript', 'Laravel', 'Supabase / PostgreSQL', 'Cloudflare Workers', 'Astro'],
    related: ['makmur-motor', 'cendekia-siakad', 'statsbuzz', 'lavelle', 'daily-kost'],
    keywords: ['full-stack developer', 'web application developer', 'Next.js developer', 'React developer', 'custom dashboard', 'internal tools'],
  },
  {
    slug: 'saas-development',
    label: 'SaaS Development',
    h1: 'SaaS & Product Development',
    title: 'SaaS & Product Development',
    description:
      'I design and build SaaS products end to end — multi-tenant auth, billing and payments, admin dashboards and metered usage — for founders taking a product from idea to paying users.',
    lede: 'From an idea (or a stalled MVP) to a product real users can sign up for and pay for.',
    forWho: [
      'Solo founders and small teams building their first SaaS.',
      'Non-technical founders who need a technical owner for the build.',
      'Products with a working prototype that needs to become production-grade.',
    ],
    problems: [
      'You have the idea and the users but no one to own the engineering.',
      'A prototype exists but it cannot handle real accounts, billing or scale.',
      'Payments, subscriptions and usage limits are hard to get right and easy to get wrong.',
    ],
    build: [
      'Multi-tenant architecture with authentication and row-level security.',
      'Billing, subscriptions and metered usage wired to real payment providers.',
      'Admin dashboards, analytics and the operator tooling a SaaS needs day two.',
      'An OpenAI-compatible AI layer when the product is AI-native (I built my own — Vensix).',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Supabase / PostgreSQL', 'Cloudflare Workers', 'Stripe / QRIS / Midtrans', 'Zod'],
    related: ['vensix', 'statsbuzz', 'cendekia-lms', 'venmail'],
    keywords: ['SaaS developer', 'MVP developer', 'product engineer', 'multi-tenant SaaS', 'subscription billing'],
  },
  {
    slug: 'ai-automation',
    label: 'AI & Automation',
    h1: 'AI Integration & Automation',
    title: 'AI Integration & Automation',
    description:
      'I add AI features to existing products and automate the manual work in between — LLM chat, extraction and summarisation, agent workflows, chatbots and webhook pipelines, with cost metering and server-side guardrails.',
    lede: 'Add AI that behaves in production, and automate the repetitive work your team still does by hand.',
    forWho: [
      'Teams that want real AI features in their product, not a demo that breaks under load.',
      'Businesses still copying data between tools, sending reminders and fulfilling orders manually.',
      'Founders who want an LLM layer with predictable cost and behaviour.',
    ],
    problems: [
      'AI features that work in a demo but hallucinate, leak keys or blow the budget in production.',
      'Hours lost every week to manual, repeatable steps a machine should handle.',
      'No visibility or control over what the model does or what it costs.',
    ],
    build: [
      'LLM features — chat, extraction, summarisation — with prompt versioning and fallbacks.',
      'OpenAI-compatible gateways with per-request cost metering and rate limits.',
      'Multi-agent and workflow automation orchestrated with clear, testable steps.',
      'Telegram / WhatsApp bots, webhook pipelines and auto-fulfilment with an audit trail.',
    ],
    tech: ['Claude / GPT / Gemini APIs', 'OpenAI-compatible gateways', 'Python / FastAPI', 'Cloudflare Workers', 'Webhooks', 'Telegram / WhatsApp APIs'],
    related: ['vensix', 'deus', 'telegram-autoorder', 'wedding-saving'],
    keywords: ['AI engineer', 'LLM integration', 'AI automation', 'chatbot developer', 'workflow automation', 'API integration'],
  },
  {
    slug: 'ecommerce-development',
    label: 'E-commerce',
    h1: 'E-commerce & Payment Development',
    title: 'E-commerce & Payment Development',
    description:
      'I build online stores and payment flows that are verified server-side and deliver reliably — product catalogues, carts, checkout, and QRIS / Midtrans / Pakasir / Stripe integrations with idempotent fulfilment.',
    lede: 'Storefronts and payment flows that actually take money reliably — verified server-side, delivered exactly once.',
    forWho: [
      'Brands and sellers moving from DMs and manual invoices to a real storefront.',
      'Businesses that need local (QRIS) and card payments wired up correctly.',
      'Shops burned by double-charges, missed orders or manual fulfilment.',
    ],
    problems: [
      'Orders and payments are tracked by hand, so things get missed or charged twice.',
      'Payment integration is fiddly, and getting webhooks and refunds right is harder than it looks.',
      'Off-the-shelf carts do not fit the products, pricing or local payment methods.',
    ],
    build: [
      'Product catalogues, carts and checkout tailored to your products and pricing.',
      'QRIS, Midtrans, Pakasir and Stripe integrations verified server-side.',
      'Idempotent fulfilment and webhooks so every paid order is delivered exactly once.',
      'Admin panels for inventory, orders and content owned by your own team.',
    ],
    tech: ['Next.js', 'React', 'TypeScript', 'Cloudflare Workers', 'QRIS / Midtrans / Pakasir / Stripe', 'Supabase / D1'],
    related: ['luxafoir', 'makmur-motor', 'daily-kost'],
    keywords: ['e-commerce developer', 'payment integration', 'QRIS integration', 'online store developer', 'checkout developer'],
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}

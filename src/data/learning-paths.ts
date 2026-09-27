// Curated learning paths — ordered tracks through the site's own writing, references and projects.
// These aggregate real pages (good internal linking + a genuine reading order).

export interface PathStep { label: string; href: string; kind: 'Article' | 'Reference' | 'Comparison' | 'Cheatsheet' | 'Project' | 'Demo' }
export interface LearningPath { slug: string; title: string; blurb: string; steps: PathStep[] }

export const learningPaths: LearningPath[] = [
  {
    slug: 'ai-augmented-engineering',
    title: 'AI-augmented engineering',
    blurb: 'How to build with LLMs responsibly — ship faster with AI while staying the engineer who owns correctness.',
    steps: [
      { label: 'How I audit AI-written code', href: '/blog/auditing-ai-written-code/', kind: 'Article' },
      { label: 'What is an LLM?', href: '/glossary/#llm', kind: 'Reference' },
      { label: 'RAG, embeddings & context windows', href: '/glossary/#rag', kind: 'Reference' },
      { label: 'AI agents & MCP', href: '/glossary/#agent', kind: 'Reference' },
      { label: 'One key, five LLMs — building Vensix', href: '/blog/one-key-five-llms/', kind: 'Article' },
      { label: 'Vensix — the live gateway', href: '/projects/vensix/', kind: 'Project' },
    ],
  },
  {
    slug: 'payments-backend-indonesia',
    title: 'Payments & backend for Indonesia',
    blurb: 'Take money the way Indonesia actually pays — QRIS, server-side verification and the backend discipline that keeps it trustworthy.',
    steps: [
      { label: 'Payment-native from day one (QRIS)', href: '/blog/payments-native-qris/', kind: 'Article' },
      { label: 'What is QRIS?', href: '/glossary/#qris', kind: 'Reference' },
      { label: 'Idempotency & webhooks', href: '/glossary/#idempotency', kind: 'Reference' },
      { label: 'HTTP status codes', href: '/cheatsheets/http-status-codes/', kind: 'Cheatsheet' },
      { label: 'I wrote Indonesian payroll twice on purpose', href: '/blog/payroll-twice-on-purpose/', kind: 'Article' },
      { label: 'CoalTrack — the case study', href: '/projects/coaltrack/', kind: 'Project' },
    ],
  },
  {
    slug: 'ship-on-the-edge',
    title: 'Ship on the edge',
    blurb: 'Run real products with no servers to babysit — Cloudflare Workers, edge storage and when the edge is (and isn’t) the right call.',
    steps: [
      { label: 'Shipping a whole business on Cloudflare Workers', href: '/blog/shipping-on-the-edge/', kind: 'Article' },
      { label: 'Edge computing & serverless', href: '/glossary/#edge-computing', kind: 'Reference' },
      { label: 'Cloudflare Workers vs AWS Lambda', href: '/comparisons/cloudflare-workers-vs-aws-lambda/', kind: 'Comparison' },
      { label: 'Docker quick reference', href: '/cheatsheets/docker-quickref/', kind: 'Cheatsheet' },
      { label: 'Makmur Motor — Workers + D1 in production', href: '/projects/makmur-motor/', kind: 'Project' },
    ],
  },
  {
    slug: 'secure-by-design',
    title: 'Secure by design',
    blurb: 'Build access control and data integrity in from the start — enforced by the database, not hidden in the UI.',
    steps: [
      { label: 'Access control belongs in the database', href: '/blog/access-control-in-the-database/', kind: 'Article' },
      { label: 'Row-level security (RLS)', href: '/glossary/#rls', kind: 'Reference' },
      { label: 'OWASP Top 10 & SQL injection', href: '/glossary/#owasp-top-10', kind: 'Reference' },
      { label: 'Append-only audit trails', href: '/glossary/#append-only-audit', kind: 'Reference' },
      { label: 'SQL vs NoSQL', href: '/comparisons/sql-vs-nosql/', kind: 'Comparison' },
    ],
  },
];

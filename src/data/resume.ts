// Resume content. Only verifiable claims; courses are labelled as courses (README › Content rules).

export const resume = {
  first: 'Ksatria',
  last: 'Bintang Samudra',
  title: 'AI Engineer ·',
  titleGrad: 'Automation & Solutions Architecture',
  lede:
    'AI-native engineer shipping production systems end-to-end — LLM gateways, payment-native automation, and field apps for mining and small businesses. I write the spec, orchestrate the AI tooling, and own every architectural and security decision.',
  meta: [
    { text: '📍 Pontianak, Indonesia' },
    { text: '🌏 Remote-ready · UTC+7', cls: 'pr' },
    { text: '● Open to remote AI & automation roles', cls: 'open' },
  ],
  contact: [
    { label: 'hello@ksatriabintangsamudra.com', href: 'mailto:hello@ksatriabintangsamudra.com' },
    { label: '+62 852 6440 2640', href: 'https://wa.me/6285264402640' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ksatria-bintang-samudra-265952313' },
    { label: 'GitHub', href: 'https://github.com/Kstriabintang' },
    { label: 'ksatriabintangsamudra.com', href: 'https://ksatriabintangsamudra.com' },
  ],
  stats: [
    { value: '15+', label: 'live products' },
    { value: '39', label: 'public repos' },
    { value: '247', label: 'tests on one side project' },
    { value: '7', label: 'languages in one app' },
  ],
  summary: {
    before: 'AI engineer and solutions architect working across',
    strong: 'LLM integration, payment automation, mobile field apps and edge infrastructure',
    after:
      '. I pair spec-driven development with AI-orchestrated tooling (Claude Code, Cursor) to ship production software quickly — then verify every line, boundary and trade-off myself. Background in penetration testing and enterprise Google Workspace administration.',
  },
  skills: [
    { label: 'AI & Automation', chips: ['LLM APIs', 'OpenRouter', 'Workers AI', 'Prompt engineering', 'Multi-agent workflows', 'Claude Code', 'Cursor', 'Telegram bots', 'WhatsApp bots'] },
    { label: 'Backend', chips: ['Node.js', 'TypeScript', 'Python', 'FastAPI', 'Laravel', 'PHP', 'Hono', 'REST', 'Webhooks'] },
    { label: 'Frontend & Mobile', chips: ['React', 'Next.js', 'Vue', 'Astro', 'Tailwind', 'Flutter', 'Kotlin / Compose'] },
    { label: 'Data & Cloud', chips: ['Cloudflare Workers', 'D1', 'KV', 'R2', 'PostgreSQL', 'SQLite', 'Supabase', 'Docker', 'GitHub Actions'] },
    { label: 'Payments & Security', chips: ['QRIS', 'Midtrans', 'Pakasir', 'OWASP Top 10', 'Burp Suite', 'OSINT', 'Phishing forensics'] },
  ],
  jobs: [
    {
      role: 'Independent AI & Automation Engineer',
      company: 'Freelance',
      clients: '(mining · automotive · education · own products)',
      when: 'Mar 2026 – Present · Remote',
      bullets: [
        { html: 'Designed and built <strong>CoalTrack</strong>, a multi-tenant Flutter + Laravel platform for a coal-mining contractor: tamper-resistant attendance (server-time, device binding, mock-GPS rejection) feeding Indonesian payroll, bank transfer files and payslips.' },
        { html: 'Built <strong>Vensix</strong>, an OpenAI-compatible AI gateway with live cost-based metering, QRIS top-ups and automated hosting provisioning (FastAPI, SQLite, OpenRouter).' },
        { html: 'Shipped <strong>Makmur Motor</strong>, an edge-native car showroom and inventory CMS on Cloudflare Workers + D1 + KV for a dealership client.' },
        { html: 'Runs <strong>Lavelle</strong>, a digital wedding-invitation studio: staff portal, Supabase RLS, one-click publishing to per-couple subdomains.' },
        { html: 'Built browser AR teaching suites with teacher dashboards for education-thesis clients (MindAR, Three.js, Supabase).' },
      ],
      tags: ['Flutter', 'Laravel', 'FastAPI', 'Cloudflare', 'Supabase', 'QRIS'],
    },
    {
      role: 'IT Systems & Google Workspace Administrator',
      company: 'Kalimantan Tambang Mandiri',
      clients: '(mining)',
      when: 'Sep 2024 – Mar 2026 · Remote',
      bullets: [
        { html: 'Administered the company’s multi-domain <strong>Google Workspace</strong>: identity, access control, email and storage.' },
        { html: 'Scripted backup and disaster-recovery routines and standardised restore procedures across domains.' },
        { html: 'Ran documented monthly maintenance and built internal automation for provisioning, group management and audit reporting.' },
      ],
      tags: ['Google Workspace', 'Apps Script', 'Automation'],
    },
    {
      role: 'Freelance Penetration Tester',
      company: 'Upwork',
      clients: '(international clients)',
      when: 'Jul 2023 – Jan 2024 · Remote',
      bullets: [
        { html: 'Performed black- and gray-box assessments on <strong>10+ web applications</strong>, focusing on injection, broken authentication, access-control bypass and business-logic flaws.' },
        { html: 'Delivered OWASP-aligned reports with prioritised findings, proofs of concept and remediation guidance.' },
      ],
      tags: ['OWASP', 'Burp Suite', 'Reporting'],
    },
  ],
  earlier: [
    { html: '<strong>Notary Assistant</strong> — PPAT Fandri Lim, Batam. Document management and client scheduling.', when: 'Jun – Aug 2024' },
    { html: '<strong>Social Media Data Analyst</strong> — Upwork. Cross-platform analytics for 10+ client accounts.', when: 'May 2020 – Mar 2022' },
  ],
  certifications: [
    { html: '<strong>Google AI Essentials</strong> — Google via Coursera, Jul 2024 · <a href="https://coursera.org/verify/2SR5DJZ8JYPZ" target="_blank" rel="noopener">verify</a>' },
  ],
  courses: [
    { html: 'ISC2 Certified in Cybersecurity — course pre-assessment (2024)' },
    { html: 'Ethical hacking course — Mindluster (2024)' },
    { html: 'Linux course — Mindluster (2024)' },
  ],
  languages: [
    { html: '<strong>Indonesian</strong> — native' },
    { html: '<strong>English</strong> — professional working proficiency' },
  ],
  quote: 'Spec first. AI accelerates. The engineering stays mine.',
};

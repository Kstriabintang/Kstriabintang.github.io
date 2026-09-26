// Resume content — mirrors the owner's master CV (FRESH CV / Resume-...-2026-v2.md).
// Only verifiable claims; courses are labelled as courses (README › Content rules).

export const resume = {
  first: 'Ksatria',
  last: 'Bintang Samudra',
  title: 'Product Engineer ·',
  titleGrad: 'Mining & Vertical SaaS, AI-augmented',
  lede:
    'I build software for mining and telecom operators and ship it end to end — domain modelling, architecture, release engineering and operations. I specify the system, drive AI tooling through implementation, and verify what ships rather than trusting what it produces.',
  meta: [
    { text: '📍 Pontianak, Indonesia' },
    { text: '🇺🇸 Founder, Luxavero LLC', cls: 'pr' },
    { text: '● Open to remote product & AI engineering roles', cls: 'open' },
  ],
  contact: [
    { label: 'hello@ksatriabintangsamudra.com', href: 'mailto:hello@ksatriabintangsamudra.com' },
    { label: '+62 852 6440 2640', href: 'https://wa.me/6285264402640' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ksatriabintangsamudra' },
    { label: 'GitHub', href: 'https://github.com/Kstriabintang' },
    { label: 'ksatriabintangsamudra.com', href: 'https://ksatriabintangsamudra.com' },
  ],
  stats: [
    { value: '15+', label: 'live products & sites' },
    { value: '5', label: 'systems run at a live ISP' },
    { value: '400+', label: 'automated tests on CoalTrack' },
    { value: '7', label: 'UI languages in one app' },
  ],
  summary: {
    before: 'Product engineer across',
    strong: 'mining workforce software, ISP operations, payment automation and LLM integration',
    after:
      '. I work as an AI-augmented solo builder: I own the domain and the architecture, write the spec, orchestrate Claude Code and Cursor through implementation, and audit what actually ships — which is how I found that every earlier release build of my own app was missing the Android INTERNET permission. Background in penetration testing and enterprise Google Workspace administration.',
  },
  skills: [
    { label: 'Mobile', chips: ['Flutter', 'Dart', 'Riverpod', 'Android / iOS release', 'TestFlight', 'Play Console', 'Codemagic CI'] },
    { label: 'Backend & Data', chips: ['Laravel 12', 'PHP', 'PostgreSQL', 'Supabase', 'Node.js', 'FastAPI', 'SQLite', 'Row-level security'] },
    { label: 'Frontend', chips: ['Vue 3', 'React', 'Next.js', 'Astro', 'TypeScript', 'Tailwind CSS'] },
    { label: 'AI & Automation', chips: ['LLM API integration', 'Workers AI', 'OpenRouter', 'Prompt engineering', 'Multi-agent workflows', 'Telegram bots', 'WhatsApp Business'] },
    { label: 'Infra & Payments', chips: ['Cloudflare Workers', 'D1 / KV / R2', 'DNS & DKIM mail', 'Docker', 'QRIS', 'Bank transfer files', 'RADIUS / MikroTik'] },
    { label: 'Security', chips: ['OWASP Top 10', 'Penetration testing', 'Burp Suite', 'Rate limiting', '2FA', 'Audit trails'] },
  ],
  jobs: [
    {
      role: 'Founder & Sole Developer',
      company: 'CoalTrack',
      clients: '(attendance & payroll for coal mining)',
      when: 'Jul 2026 – Present · Remote',
      bullets: [
        { html: 'Built the product end to end across <strong>236 commits</strong>: a Flutter Android/iOS client, a Laravel 12 + PostgreSQL 16 API, Filament and Vue 3 admin surfaces, and a Cloudflare Worker mail relay.' },
        { html: 'Implemented Indonesian statutory payroll to cited regulation — <strong>PPh21 TER (PMK 168/2023), BPJS and Kepmenaker 102/2004 overtime</strong> — written twice on purpose (PHP service and Dart mirror) so server and handset produce identical figures, cross-checked by mirrored tests.' },
        { html: 'Enforced an <strong>append-only audit trail in the database</strong>: PostgreSQL triggers reject UPDATE and DELETE on attendance events and approvals.' },
        { html: 'Designed the attendance decision engine around server-authoritative time and mock-location detection, so infrastructure failures flag for human review instead of rejecting a worker.' },
        { html: 'Ran the release line solo: Codemagic CI gating <strong>400+ automated tests</strong> before signed builds, Apple TestFlight and Google Play closed testing, a 7-language UI — and found, by auditing the signed bundle, that every earlier build lacked the Android INTERNET permission.' },
      ],
      tags: ['Flutter', 'Laravel 12', 'PostgreSQL 16', 'Codemagic', 'Cloudflare'],
    },
    {
      role: 'Systems Developer',
      company: 'Rimba Raya',
      clients: '(internet service provider)',
      when: 'Mar 2026 – Present · Remote',
      bullets: [
        { html: 'Built and operate <strong>five internal systems</strong> for a live ISP: an operations portal, a barcode inventory system, a payslip generator, an employee data-intake form and a public showcase.' },
        { html: 'Operations portal in Vue 3 + Supabase/PostgreSQL with Leaflet mapping; applied <strong>46 dated SQL migrations</strong> to production covering row-level security, a universal audit table and role-and-region access.' },
        { html: 'Integrated RADIUS/MikroTik provisioning, QRIS payment collection and WhatsApp Business notifications for live subscriber billing.' },
        { html: 'Root-caused a Supabase slowdown to missing indexes and per-row policy evaluation and fixed it with six indexes and a policy rewrite; added an external watchdog after tracing a VPS outage to the provider.' },
      ],
      tags: ['Vue 3', 'Supabase', 'Next.js 14', 'RADIUS', 'QRIS'],
    },
    {
      role: 'Founder',
      company: 'Luxavero LLC',
      clients: '(Wyoming, USA)',
      when: 'Aug 2026 – Present · Remote',
      bullets: [
        { html: 'Formed a US single-member LLC as the home for my products and client work.' },
        { html: 'Shipped and operate <strong>Lavelle</strong> (lavelle.my.id), a digital wedding-invitation platform with a staff portal, Supabase row-level security and one-click publishing to per-couple subdomains, and <strong>Venmail</strong> (venmail.my.id), a privacy-first temporary inbox with real-time delivery and a developer API.' },
      ],
      tags: ['Next.js', 'Vue', 'Supabase', 'Cloudflare'],
    },
    {
      role: 'IT Systems & Google Workspace Administrator',
      company: 'Kalimantan Tambang Mandiri',
      clients: '(mining)',
      when: 'Sep 2024 – Mar 2026 · Remote',
      bullets: [
        { html: 'Administered the multi-domain <strong>Google Workspace</strong>: identity, access control, mail routing and storage.' },
        { html: 'Designed scripted backup and disaster-recovery routines and built internal automation for provisioning, group management and audit reporting.' },
      ],
      tags: ['Google Workspace', 'Apps Script', 'Automation'],
    },
    {
      role: 'Freelance Penetration Tester',
      company: 'Upwork',
      clients: '(international clients)',
      when: 'Jul 2023 – Jan 2024 · Remote',
      bullets: [
        { html: 'Black- and gray-box assessments of web applications — injection, broken authentication, access-control bypass and business-logic flaws — with OWASP-aligned remediation reports.' },
      ],
      tags: ['OWASP', 'Burp Suite', 'Reporting'],
    },
  ],
  earlier: [
    { html: '<strong>Social Media Data Analyst</strong> — Upwork. Cross-platform analytics (Instagram, TikTok, Twitter) for international clients.', when: 'May 2020 – Mar 2022' },
  ],
  projects: [
    { html: '<strong>Vensix</strong> — OpenAI-compatible AI gateway: one key routes to Claude, GPT, Gemini, DeepSeek and Kimi with live cost-based metering, QRIS top-ups and automated hosting provisioning.', when: 'vensix.biz.id' },
    { html: '<strong>ksatriabintangsamudra.com</strong> — Astro on Cloudflare Workers with a Workers AI chat assistant and an “Explain it” endpoint that returns sanitised Mermaid diagrams.', when: '2026' },
    { html: '<strong>Kiloan</strong> — subscription Android point-of-sale for laundry businesses (Flutter).', when: '2026' },
    { html: '<strong>Makmur Motor</strong> — showroom and inventory CMS for a Denpasar dealership on Cloudflare Workers, D1 and KV.', when: 'makmurmotor.biz.id' },
    { html: '<strong>DevSec Toolbox</strong> — 34 developer and security tools that run entirely in the browser.', when: 'Live' },
  ],
  education: [
    { html: '<strong>STIE Anindya Guna Semarang</strong> — Bachelor of Management (S.M.), in progress · expected Nov–Dec 2027' },
    { html: '<strong>SMAN 1 Rengat Barat</strong>, Riau — High School Diploma, Science Track · 2017 – 2020' },
  ],
  certifications: [
    { html: '<strong>Google AI Essentials</strong> — Google via Coursera, Jul 2024 · <a href="https://coursera.org/verify/2SR5DJZ8JYPZ" target="_blank" rel="noopener">verify</a>' },
  ],
  courses: [
    { html: 'ISC2 Certified in Cybersecurity — course pre-assessment (2024)' },
    { html: 'Ethical Hacking · Expert Linux · Python Programming — MindLuster course completions (2024)' },
  ],
  languages: [
    { html: '<strong>Indonesian</strong> — native' },
    { html: '<strong>English</strong> — professional working proficiency' },
  ],
  quote: 'Spec first. AI accelerates. The engineering stays mine.',
};

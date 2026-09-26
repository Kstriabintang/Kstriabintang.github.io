// Offline answers for the chat widget, used only when /api/chat is unreachable.
// Every statement here must stay true (README › Content rules).

interface Intent {
  keywords: string[];
  answer: string;
}

const EMAIL = 'hello@ksatriabintangsamudra.com';

const INTENTS: Intent[] = [
  {
    keywords: ['contact', 'email', 'hire', 'reach', 'call', 'book', 'whatsapp', 'available', 'availability', 'opportunit', 'remote', 'freelance', 'job'],
    answer: `Ksatria is open to remote work worldwide. The fastest way in is email — ${EMAIL} — or the contact form at the bottom of the page. WhatsApp works too: +62 852-6440-2640.`,
  },
  {
    keywords: ['coaltrack', 'mining', 'attendance', 'payroll'],
    answer:
      'CoalTrack is an anti-fraud attendance and payroll platform for mining: a Flutter app plus a Laravel API and admin, with server-time and GPS checks, an immutable attendance log, Indonesian payroll rules (PPh21, BPJS, overtime) and payslips by email and Telegram. The showcase lives at coaltrack.id.',
  },
  {
    keywords: ['vensix', 'gateway', 'llm', 'openai', 'model', 'ai'],
    answer:
      'Vensix is an OpenAI-compatible AI gateway: one key routes to Claude, GPT, Gemini, DeepSeek and Kimi, with live cost-based metering, a Rupiah balance topped up via QRIS, and automated hosting provisioning. Built with FastAPI and SQLite.',
  },
  {
    keywords: ['project', 'work', 'built', 'portfolio', 'building', 'shipped'],
    answer:
      'Highlights: CoalTrack (mining workforce + payroll), Vensix (AI gateway), Makmur Motor (edge car showroom + CMS), Lavelle (digital wedding invitations), Wedding Saving (QRIS savings with Telegram automation), phishing threat-intel case files and a browser AR science lab. The Projects page has a case study for each.',
  },
  {
    keywords: ['stack', 'tech', 'language', 'framework', 'tools', 'skills'],
    answer:
      'Day to day: TypeScript and Python, React / Vue / Astro / Next.js on the front, Laravel, FastAPI and Hono on the back, Flutter for mobile, and Cloudflare Workers, D1, KV and Pages at the edge — plus Workers AI and OpenAI-compatible APIs for the AI layer.',
  },
  {
    keywords: ['where', 'location', 'based', 'live', 'pontianak', 'indonesia', 'timezone'],
    answer: 'Ksatria is based in Pontianak, West Kalimantan, Indonesia — right on the equator (UTC+7) — and works remotely with clients anywhere.',
  },
  {
    keywords: ['job', 'work now', 'current', 'role', 'employer', 'rimba', 'luxavero', 'company', 'llc'],
    answer:
      'Right now Ksatria is a Systems Developer at Rimba Raya, an internet service provider (since Mar 2026), the founder and sole developer of CoalTrack, and the founder of Luxavero LLC — his company registered in Wyoming, USA.',
  },
  {
    keywords: ['education', 'study', 'degree', 'university', 'college', 'kuliah'],
    answer: 'Ksatria is studying for a Bachelor of Management at STIE Anindya Guna Semarang, expected to graduate in late 2027.',
  },
  {
    keywords: ['security', 'pentest', 'phishing', 'hacker'],
    answer:
      'Security is part of the background: freelance penetration testing on Upwork (Jul 2023 – Jan 2024) and a passive, defensive forensic write-up of a large WhatsApp phishing campaign, published as case files on GitHub.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'halo', 'morning', 'evening', 'yo'],
    answer: "Hey! Ask me about Ksatria's projects, stack, experience — or how to get in touch.",
  },
];

export function fallbackAnswer(question: string): string {
  const q = question.toLowerCase();
  let best: Intent | null = null;
  let bestScore = 0;
  for (const intent of INTENTS) {
    const score = intent.keywords.reduce((s, k) => (q.includes(k) ? s + k.length : s), 0);
    if (score > bestScore) {
      best = intent;
      bestScore = score;
    }
  }
  return (
    best?.answer ??
    `I'm not sure about that one. Try asking about projects, the tech stack, or how to reach Ksatria — or email ${EMAIL}.`
  );
}

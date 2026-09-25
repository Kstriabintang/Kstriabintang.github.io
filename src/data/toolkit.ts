// "My toolkit" — only tools Ksatria has actually shipped with.
// level: expert (pulsing dot) · advanced (dim dot) · glow (core extras) · accent (foundations)

export type SkillLevel = 'expert' | 'advanced' | 'glow' | 'accent';

export interface SkillGroup {
  kicker: 'Core focus' | 'Foundations';
  title: string;
  /** Core-focus groups span the full width and get the teal highlight. */
  highlighted: boolean;
  skills: { name: string; level: SkillLevel }[];
}

const group = (
  kicker: SkillGroup['kicker'],
  title: string,
  tiers: Partial<Record<SkillLevel, string[]>>,
): SkillGroup => ({
  kicker,
  title,
  highlighted: kicker === 'Core focus',
  skills: (['expert', 'advanced', 'glow', 'accent'] as SkillLevel[]).flatMap((level) =>
    (tiers[level] ?? []).map((name) => ({ name, level })),
  ),
});

export const toolkit: SkillGroup[] = [
  group('Core focus', 'AI & Automation', {
    expert: ['LLM APIs', 'Prompt Engineering', 'Claude Code', 'Multi-agent Workflows', 'QRIS / Payment Webhooks', 'Telegram Bots'],
    advanced: ['OpenRouter', 'Cloudflare Workers AI', 'Cursor', 'WhatsApp Bots'],
  }),
  group('Core focus', 'Security', {
    expert: ['Penetration Testing', 'OWASP Top 10'],
    advanced: ['Burp Suite', 'OSINT'],
    glow: ['Phishing Forensics'],
  }),
  group('Foundations', 'Backend & Infrastructure', {
    accent: ['Node.js', 'Python', 'FastAPI', 'Laravel', 'PHP', 'Hono', 'Cloudflare Workers', 'D1', 'KV', 'R2', 'Docker', 'Linux'],
  }),
  group('Foundations', 'Frontend & Mobile', {
    accent: ['TypeScript', 'React', 'Next.js', 'Vue', 'Astro', 'Tailwind CSS', 'Flutter', 'Kotlin / Compose'],
  }),
  group('Foundations', 'Data & Storage', {
    accent: ['PostgreSQL', 'SQLite', 'Supabase', 'MySQL', 'Google Sheets API'],
  }),
  group('Foundations', 'Cloud & DevOps', {
    accent: ['Cloudflare', 'GitHub Actions', 'Codemagic', 'Vercel', 'Nginx'],
  }),
];

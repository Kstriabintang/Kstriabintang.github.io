// Live demos hub: everything a client can open and try right now.
// Credentials here are REAL demo accounts (isolated from production data) —
// never invent logins. `open`/`persona` demos need no credentials.

export interface DemoAccess {
  kind: 'login' | 'key' | 'persona' | 'open';
  email?: string;
  password?: string;
  key?: string;
  note?: string;
}

export interface DemoItem {
  title: string;
  category: string;
  stack: string;
  desc: string;
  href: string;
  poster: string;
  emoji: string;
  status: 'Live demo' | 'Live' | 'In development';
  access: DemoAccess;
  caseStudy?: string;
}

export interface DemoBand {
  name: string;
  emoji: string;
  blurb: string;
  items: DemoItem[];
}

export const demos = {
  eyebrow: 'Live demos',
  title: { lead: 'See everything I build —', em: 'try it live' },
  sub: 'Real, running products. Open any one, log in with the demo account, and click around. Each demo is isolated from real client data.',
  bands: [
    {
      name: 'Products & apps',
      emoji: '🚀',
      blurb: 'Full apps with dashboards and admin panels. Use the demo login shown on each card.',
      items: [
        {
          title: 'CoalTrack',
          category: 'Workforce & payroll',
          stack: 'Flutter · Laravel 12 · PostgreSQL',
          desc: 'Anti-fraud attendance and Indonesian statutory payroll for mining — tamper-proof clock-ins, bank files and payslips in 7 languages.',
          href: 'https://demo.coaltrack.id',
          poster: '/images/shots/coaltrack/desktop.jpg',
          emoji: '⛏️',
          status: 'Live demo',
          access: {
            kind: 'persona',
            note: 'No login needed — tap a demo persona (Employee, Head, HR or Superadmin) to enter instantly.',
          },
          caseStudy: '/projects/coaltrack/',
        },
        {
          title: 'VenWave',
          category: 'Music streaming',
          stack: 'Next.js 15 · Prisma · Postgres',
          desc: 'A full music-streaming app — multi-source catalogue, gapless player, live visualiser, and a dashboard that learns your taste per visit.',
          href: 'https://venwave.ksatriabintangsamudra.com',
          poster: '/images/tools/venwave.jpg',
          emoji: '🎧',
          status: 'Live demo',
          access: {
            kind: 'login',
            email: 'demo@ksatriabintangsamudra.com',
            password: 'VenWaveDemo2026',
          },
        },
        {
          title: 'Lavelle',
          category: 'Wedding invitations',
          stack: 'Vue 3 · Supabase · Cloudflare',
          desc: 'A digital wedding-invitation studio — each invitation publishes to its own subdomain, with RSVP and a guest gallery.',
          href: 'https://lavelle.my.id/demo/',
          poster: '/images/shots/lavelle/desktop.jpg',
          emoji: '💍',
          status: 'Live',
          access: {
            kind: 'open',
            note: 'Fully interactive invitation demos — no login. Staff-portal walkthrough available on request.',
          },
          caseStudy: '/projects/lavelle/',
        },
        {
          title: 'Inspobase',
          category: 'Design · curated gallery',
          stack: 'Next.js · Tailwind · Supabase',
          desc: 'A curated gallery of the best design on the web — filter by colour and font, ⌘K search, and an immersive full-page detail view.',
          href: 'https://inspobase.ksatriabintangsamudra.com/',
          poster: '/images/shots/inspobase/desktop.jpg',
          emoji: '🎨',
          status: 'Live demo',
          access: {
            kind: 'open',
            note: 'Open and browse — filter by colour/font. Sign-in (Google or GitHub) is optional, only to save pieces.',
          },
          caseStudy: '/projects/inspobase/',
        },
        {
          title: 'StatsBuzz',
          category: 'Viral stats · rankings',
          stack: 'Next.js 16 · Supabase · Vercel',
          desc: 'Shareable stats and rankings with fast pages and dynamic OG images, built on sourced data — made to spread.',
          href: 'https://statsbuzz.vercel.app/',
          poster: '/images/shots/statsbuzz/desktop.jpg',
          emoji: '📊',
          status: 'Live',
          access: {
            kind: 'open',
            note: 'Open and browse — no login.',
          },
          caseStudy: '/projects/statsbuzz/',
        },
        {
          title: 'LUXAFOIR',
          category: 'E-commerce · streetwear',
          stack: 'Next.js 14 · Tailwind · Midtrans',
          desc: 'A premium streetwear storefront — editorial hero, product catalogue, cart and a full checkout flow.',
          href: 'https://luxafoir.ksatriabintangsamudra.com/',
          poster: '/images/shots/luxafoir/desktop.jpg',
          emoji: '🛍️',
          status: 'Live demo',
          access: {
            kind: 'open',
            note: 'Browse the full store — checkout is simulated (demo payment), no real orders.',
          },
          caseStudy: '/projects/luxafoir/',
        },
        {
          title: 'Makmur Motor',
          category: 'Showroom & CMS',
          stack: 'Next.js · Cloudflare D1 · KV',
          desc: 'An edge-native car showroom a dealership runs itself — inventory, photos and SEO managed from an admin panel.',
          href: 'https://makmurmotor.biz.id',
          poster: '/images/shots/makmur-motor/desktop.jpg',
          emoji: '🚗',
          status: 'Live',
          access: {
            kind: 'open',
            note: 'Browse the live showroom. Admin CMS demo available on request.',
          },
          caseStudy: '/projects/makmur-motor/',
        },
        {
          title: 'Vensix',
          category: 'AI gateway',
          stack: 'OpenAI-compatible · QRIS',
          desc: 'One key, one Rupiah balance — routes to Claude, GPT, Gemini, DeepSeek and Kimi with live cost-based metering.',
          href: 'https://vensix.biz.id',
          poster: '/images/shots/vensix/desktop.jpg',
          emoji: '🔀',
          status: 'Live',
          access: {
            kind: 'open',
            note: 'Live site — pre-launch, not yet open for commercial sign-ups.',
          },
          caseStudy: '/projects/vensix/',
        },
        {
          title: 'PalmTrack',
          category: 'Plantation management',
          stack: 'React · Vite · Laravel 12',
          desc: 'A palm-oil plantation & weighbridge manager for Indonesian growers — weighing, harvests, workers and finance in one place, with a satellite plot map.',
          href: 'https://palmtrack.ksatriabintangsamudra.com/',
          poster: '/images/shots/palmtrack/desktop.jpg',
          emoji: '🌴',
          status: 'In development',
          access: {
            kind: 'key',
            key: 'PLMT-PALM-TR26-FPPY',
            note: 'Paste the demo license key to enter. UI demo with sample data — Laravel backend in active development.',
          },
        },
        {
          title: 'Cendekia — SIAKAD',
          category: 'Campus · academic system',
          stack: 'Vue 3.5 · Supabase · PWA',
          desc: 'A full academic information system — online KRS, grades & transcripts, digital advising and UKT billing, split across student, lecturer and admin roles.',
          href: 'https://siakad.learningsystem.my.id',
          poster: '/images/shots/cendekia-siakad/desktop.jpg',
          emoji: '🎓',
          status: 'Live',
          access: {
            kind: 'persona',
            note: 'Demo mode — tap a persona (Student, Lecturer or Admin) and use any password. Seeded with sample data, no real student info.',
          },
          caseStudy: '/projects/cendekia-siakad/',
        },
        {
          title: 'Cendekia — LMS',
          category: 'Campus · learning',
          stack: 'Vue 3.5 · Supabase · PWA',
          desc: 'The gamified teaching side of Cendekia — auto-graded quizzes, XP, streaks and badges, and live attendance, built to feel like an app.',
          href: 'https://lms.learningsystem.my.id',
          poster: '/images/shots/cendekia-lms/desktop.jpg',
          emoji: '🧑‍🎓',
          status: 'Live',
          access: {
            kind: 'open',
            note: 'Demo mode with sample data — open and click around, no real login needed.',
          },
          caseStudy: '/projects/cendekia-lms/',
        },
        {
          title: 'Daily Kost',
          category: 'Booking · transit stays',
          stack: 'Vue 3 · Supabase · Cloudflare',
          desc: 'Rent a room by the 3, 6 or 12 hours or by the day in Pontianak — book with no sign-up, with a full owner operations panel behind it.',
          href: 'https://kostpontianak.web.id',
          poster: '/images/shots/daily-kost/desktop.jpg',
          emoji: '🏨',
          status: 'Live',
          access: {
            kind: 'open',
            note: 'Book with no login. Owner operations panel lives at /app.',
          },
          caseStudy: '/projects/daily-kost/',
        },
        {
          title: 'WiFiSiapa',
          category: 'Network dashboard',
          stack: 'Vue 3 · Python · Flask',
          desc: 'See every device on your own WiFi, watch live bandwidth, throttle or cut a device, and get Telegram alerts — without touching the router.',
          href: 'https://wifisiapa.pages.dev',
          poster: '/images/shots/wifisiapa/desktop.jpg',
          emoji: '📡',
          status: 'Live',
          access: {
            kind: 'open',
            note: 'Public demo runs on simulated data — the real backend stays private.',
          },
          caseStudy: '/projects/wifisiapa/',
        },
        {
          title: 'Venmail',
          category: 'Temporary email · edge',
          stack: 'Next.js · Cloudflare Workers',
          desc: 'A privacy-first disposable inbox — a working address in about a second, no sign-up, real-time mail with automatic OTP extraction and a developer API.',
          href: 'https://venmail.my.id',
          poster: '/images/shots/venmail/desktop.jpg',
          emoji: '📨',
          status: 'Live',
          access: {
            kind: 'open',
            note: 'No login — a working inbox appears in about a second.',
          },
          caseStudy: '/projects/venmail/',
        },
      ],
    },
    {
      name: 'Free browser tools',
      emoji: '🛠️',
      blurb: 'No sign-up, no login — these run entirely in your browser.',
      items: [
        {
          title: 'DevSec Toolbox',
          category: 'Security · Dev',
          stack: '34 tools · 100% client-side',
          desc: 'JWT, AES, hashing, regex, JSON and more — every tool runs on-device, nothing leaves your browser.',
          href: 'https://devsec.ksatriabintangsamudra.com/',
          poster: '/images/tools/devsec.jpg',
          emoji: '🧰',
          status: 'Live',
          access: { kind: 'open', note: 'Runs in your browser — no sign-up.' },
        },
        {
          title: 'HAND//TRACE',
          category: 'AR · Computer vision',
          stack: 'MediaPipe · WebGL',
          desc: 'Real-time hand-tracking AR — paint with light and bend particles with gestures, fully on-device.',
          href: 'https://handtrace.ksatriabintangsamudra.com/',
          poster: '/images/tools/handtrace.jpg',
          emoji: '✋',
          status: 'Live',
          access: { kind: 'open', note: 'Allow the camera, then wave — nothing is recorded or uploaded.' },
        },
        {
          title: 'ResumeKita',
          category: 'Career · PDF',
          stack: 'Client-side PDF',
          desc: 'ATS-friendly CV builder — fill a form, download a real-text PDF. Your data never leaves the device.',
          href: 'https://resume.ksatriabintangsamudra.com',
          poster: '/images/tools/resumekita.jpg',
          emoji: '📄',
          status: 'Live',
          access: { kind: 'open', note: 'No login — your data stays on your device.' },
        },
      ],
    },
  ] satisfies DemoBand[],
};

// Playground: tools Ksatria built that run in the browser today. Posters are real screenshots.

export interface PlaygroundTool {
  title: string;
  meta: string;
  desc: string;
  href: string;
  poster: string;
  emoji: string;
  badge?: 'Live' | 'New';
}

export interface PlaygroundBand {
  name: string;
  emoji: string;
  allLabel: string;
  allHref: string;
  items: PlaygroundTool[];
}

export const playground = {
  eyebrow: 'Playground',
  title: { lead: 'Tools you can', em: 'use right now' },
  sub: 'Free browser tools I built and keep running — no sign-up, no ads. Open one, then come back.',
  bands: [
    {
      name: 'Tools',
      emoji: '🛠️',
      allLabel: 'All projects',
      allHref: '/projects',
      items: [
        {
          title: 'DevSec Toolbox',
          meta: 'Security · Dev',
          desc: '34 privacy-first developer & security tools — JWT, AES, hashing, regex, JSON — running 100% in your browser.',
          href: 'https://ksatriabintangsamudra.my.id/devsec/',
          poster: '/images/tools/devsec.jpg',
          emoji: '🧰',
          badge: 'Live',
        },
        {
          title: 'HAND//TRACE',
          meta: 'AR · Computer vision',
          desc: 'Real-time hand-tracking AR with MediaPipe — paint with light and bend particles with gestures, fully on-device.',
          href: 'https://ksatriabintangsamudra.my.id/handtrace/',
          poster: '/images/tools/handtrace.jpg',
          emoji: '✋',
          badge: 'New',
        },
        {
          title: 'ResumeKita',
          meta: 'Career · PDF',
          desc: 'ATS-friendly CV builder — fill a form, download a real-text PDF. No login, your data never leaves the device.',
          href: 'https://resumekita.my.id',
          poster: '/images/tools/resumekita.jpg',
          emoji: '📄',
          badge: 'Live',
        },
      ],
    },
    {
      name: 'Apps',
      emoji: '🎧',
      allLabel: 'All projects',
      allHref: '/projects',
      items: [
        {
          title: 'VenWave',
          meta: 'Music · Next.js',
          desc: 'A full music-streaming app — multi-source catalogue, gapless player, live visualiser. Try it: demo@ksatriabintangsamudra.com / VenWaveDemo2026',
          href: 'https://venwave.ksatriabintangsamudra.com',
          poster: '/images/tools/venwave.jpg',
          emoji: '🎧',
          badge: 'Live',
        },
      ],
    },
  ] satisfies PlaygroundBand[],
};

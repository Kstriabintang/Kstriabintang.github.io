// Playground: tools Ksatria built that run in the browser today. Posters are real screenshots.

export interface PlaygroundTool {
  title: string;
  meta: string;
  desc: string;
  href: string;
  poster: string;
  emoji: string;
  badge?: 'Live' | 'New';
  ctaLabel?: string;
  login?: { email: string; password: string };
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
      allHref: '/projects/',
      items: [
        {
          title: 'DevSec Toolbox',
          meta: 'Security · Dev',
          desc: '34 privacy-first developer & security tools — JWT, AES, hashing, regex, JSON — running 100% in your browser.',
          href: 'https://devsec.ksatriabintangsamudra.com/',
          poster: '/images/tools/devsec.jpg',
          emoji: '🧰',
          badge: 'Live',
        },
        {
          title: 'HAND//TRACE',
          meta: 'AR · Computer vision',
          desc: 'Real-time hand-tracking AR with MediaPipe — paint with light and bend particles with gestures, fully on-device.',
          href: 'https://handtrace.ksatriabintangsamudra.com/',
          poster: '/images/tools/handtrace.jpg',
          emoji: '✋',
          badge: 'New',
        },
        {
          title: 'ResumeKita',
          meta: 'Career · PDF',
          desc: 'ATS-friendly CV builder — fill a form, download a real-text PDF. No login, your data never leaves the device.',
          href: 'https://resume.ksatriabintangsamudra.com',
          poster: '/images/tools/resumekita.jpg',
          emoji: '📄',
          badge: 'Live',
        },
      ],
    },
    {
      name: 'Games',
      emoji: '🎮',
      allLabel: 'All games',
      allHref: '/games/',
      items: [
        {
          title: 'Termle',
          meta: 'Daily · Word puzzle',
          desc: 'A tech twist on the daily word game — guess the 5-letter developer/security word in six tries. A new word every day, and a share button to compare with friends.',
          href: '/games/termle/',
          poster: '/images/games/termle.jpg',
          emoji: '🟩',
          badge: 'New',
          ctaLabel: 'Play',
        },
        {
          title: 'IT Quiz',
          meta: 'Levels · Tech exam',
          desc: 'A fast IT exam with Junior, Mid and Senior levels — eight shuffled questions that never repeat, and a timer that tightens as you level up.',
          href: '/games/it-quiz/',
          poster: '/images/games/it-quiz.jpg',
          emoji: '🧠',
          badge: 'New',
          ctaLabel: 'Play',
        },
        {
          title: 'Chess vs Claude',
          meta: '3D board · AI opponent',
          desc: 'Play 3D chess against Claude — a minimax engine with Easy, Medium and Expert levels. Tap to move; it thinks and replies as Black.',
          href: '/games/chess/',
          poster: '/images/games/chess.jpg',
          emoji: '♟️',
          badge: 'New',
          ctaLabel: 'Play',
        },
        {
          title: 'Tech Crossword',
          meta: 'TTS · Word puzzle',
          desc: "A developer's crossword — fifteen interlocking tech words to solve, from React to Redis. Tap a square, type, and check as you go.",
          href: '/games/crossword/',
          poster: '/images/games/crossword.jpg',
          emoji: '🔠',
          badge: 'New',
          ctaLabel: 'Play',
        },
        {
          title: 'Dev Persona',
          meta: 'Personality test · Tech',
          desc: 'A tech personality test — 10 questions reveal your engineer archetype (Architect, Shipper, Guardian, Scientist, Craftsman or Firefighter), with animated, shareable results.',
          href: '/games/dev-persona/',
          poster: '/images/games/dev-persona.jpg',
          emoji: '🧭',
          badge: 'New',
          ctaLabel: 'Play',
        },
        {
          title: 'Cyber Case',
          meta: 'Investigation · Security',
          desc: 'Play security analyst — inspect the logs, spot the indicators of compromise and crack the breach. A cyber-security detective game with real incident-response thinking.',
          href: '/games/cyber-case/',
          poster: '/images/games/cyber-case.jpg',
          emoji: '🕵️',
          badge: 'New',
          ctaLabel: 'Play',
        },
      ],
    },
    {
      name: 'Ventures',
      emoji: '🚀',
      allLabel: 'All projects',
      allHref: '/projects/',
      items: [
        {
          title: 'Luxavero',
          meta: 'My company · Wyoming, USA',
          desc: 'My U.S.-registered software studio — the home for my own products and client work. Live at luxavero.net.',
          href: 'https://luxavero.net',
          poster: '/images/tools/luxavero.jpg',
          emoji: '🏢',
          badge: 'Live',
        },
        {
          title: 'VenWave',
          meta: 'Music · Next.js',
          desc: 'A full music-streaming app — multi-source catalogue, gapless player, live visualiser, and a dashboard that learns your taste on each visit.',
          href: 'https://venwave.ksatriabintangsamudra.com',
          poster: '/images/tools/venwave.jpg',
          emoji: '🎧',
          badge: 'Live',
          ctaLabel: 'Check the demo',
          login: { email: 'demo@ksatriabintangsamudra.com', password: 'VenWaveDemo2026' },
        },
      ],
    },
  ] satisfies PlaygroundBand[],
};

// Browser games built by Ksatria. Each runs fully client-side, no sign-up.

export interface Game {
  title: string;
  meta: string;
  desc: string;
  href: string;
  emoji: string;
  poster?: string;
  badge?: 'New' | 'Live';
  ctaLabel?: string;
}

export const games: Game[] = [
  {
    title: 'Termle',
    meta: 'Daily · Word puzzle',
    desc: 'A tech twist on the daily word game — guess the 5-letter developer/security word in six tries. New word every day, share your result.',
    href: '/games/termle/',
    emoji: '🟩',
    poster: '/images/games/termle.jpg',
    badge: 'New',
    ctaLabel: 'Play',
  },
  {
    title: 'IT Quiz',
    meta: 'Levels · Tech exam',
    desc: 'A fast IT exam — Junior, Mid and Senior levels, eight shuffled questions that never repeat, and a timer that tightens as you climb.',
    href: '/games/it-quiz/',
    emoji: '🧠',
    poster: '/images/games/it-quiz.jpg',
    badge: 'New',
    ctaLabel: 'Play',
  },
  {
    title: 'Chess vs Claude',
    meta: '3D board · AI opponent',
    desc: 'Play 3D chess against Claude — a minimax engine with Easy, Medium and Expert levels. Tap to move; it thinks and replies as Black.',
    href: '/games/chess/',
    emoji: '♟️',
    poster: '/images/games/chess.jpg',
    badge: 'New',
    ctaLabel: 'Play',
  },
  {
    title: 'Tech Crossword',
    meta: 'TTS · Word puzzle',
    desc: "A developer's crossword — fifteen interlocking tech words to solve, from React to Redis. Tap a square, type, and check as you go.",
    href: '/games/crossword/',
    emoji: '🔠',
    poster: '/images/games/crossword.jpg',
    badge: 'New',
    ctaLabel: 'Play',
  },
  {
    title: 'Dev Persona',
    meta: 'Personality test · Tech',
    desc: 'A tech personality test — answer 10 quick questions and discover your engineer archetype: Architect, Shipper, Guardian, Scientist, Craftsman or Firefighter. Animated results you can share.',
    href: '/games/dev-persona/',
    emoji: '🧭',
    poster: '/images/games/dev-persona.jpg',
    badge: 'New',
    ctaLabel: 'Play',
  },
  {
    title: 'Cyber Case',
    meta: 'Investigation · Security',
    desc: "Play security analyst — inspect the logs, spot the indicators of compromise and crack the breach. A cyber-security detective game with real incident-response thinking.",
    href: '/games/cyber-case/',
    emoji: '🕵️',
    poster: '/images/games/cyber-case.jpg',
    badge: 'New',
    ctaLabel: 'Play',
  },
];

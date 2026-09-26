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
    href: '/games/termle',
    emoji: '🟩',
    poster: '/images/games/termle.jpg',
    badge: 'New',
    ctaLabel: 'Play',
  },
  {
    title: 'IT Quiz',
    meta: 'Levels · Tech exam',
    desc: 'A fast IT exam — Junior, Mid and Senior levels, eight shuffled questions that never repeat, and a timer that tightens as you climb.',
    href: '/games/it-quiz',
    emoji: '🧠',
    poster: '/images/games/it-quiz.jpg',
    badge: 'New',
    ctaLabel: 'Play',
  },
];

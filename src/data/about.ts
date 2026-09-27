// "Who I am" bento, quick facts, "Currently" marquee and link cards.
// Every fact must be verifiable (README › Content rules). Swap photos by editing `photos`.

export interface AboutPhoto {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  /** CSS object-position for the crop inside the cell. */
  position?: string;
}

export const about = {
  headline: { lead: 'AI Engineer. Automation Builder.', em: 'Solutions Architect.' },
  intro:
    "I'm Bintang — an AI-native product engineer from Pontianak, Indonesia who ships production systems end to end. Right now that means CoalTrack, an anti-fraud attendance and payroll platform for mining crews; the internal systems of a live internet service provider; Vensix, an OpenAI-compatible LLM gateway; and Luxavero LLC, the US company behind my products.",
  personality:
    'Before I built products I broke them — penetration testing for clients on Upwork — and then kept a multi-domain Google Workspace running for a mining company. That habit stuck: I treat every webhook as hostile, every number as something a customer will check, and every deploy as something I will have to support at 3 AM.',
  closer:
    "I work spec-first, orchestrate AI tools to move fast, and read every line before it ships. If you need someone who can take an idea from a blank repo to a live, paid product — or just want to talk shop about agents and automation — let's talk.",
  photos: {
    portrait: {
      src: '/images/profile.jpg',
      alt: 'Ksatria Bintang Samudra',
      caption: 'Pontianak · 0° latitude',
      width: 640,
      height: 640,
      position: 'center 20%',
    },
    collage: {
      src: '/images/about/coaltrack-dashboard.png',
      alt: 'CoalTrack operations dashboard with representative demo data',
      caption: 'CoalTrack · shipped 2026',
      width: 412,
      height: 892,
      position: 'center 22%',
    },
  } satisfies Record<'portrait' | 'collage', AboutPhoto>,
  facts: [
    { value: '15+', label: 'Live products' },
    { value: '39', label: 'Public repos' },
    { value: '0°', label: 'Home latitude' },
    { value: 'QRIS', label: 'Native payments' },
    { value: '7', label: 'Languages in one app' },
    { value: 'AI Agents', label: 'Current obsession' },
  ],
  more: [
    { emoji: '⚙️', label: 'Uses', desc: 'Hardware, software, and the AI tooling I actually ship with.', href: '/uses/' },
    { emoji: '📄', label: 'Resume', desc: 'Experience, projects and verifiable credentials.', href: '/resume/' },
    { emoji: '🐙', label: 'GitHub', desc: '39 public repositories — tools, demos and experiments.', href: 'https://github.com/Kstriabintang' },
  ],
};

export const currently = [
  { emoji: '🤖', label: 'Building', value: 'Vensix AI gateway' },
  { emoji: '🚜', label: 'Shipping', value: 'CoalTrack 1.7' },
  { emoji: '🧠', label: 'Exploring', value: 'Multi-agent workflows' },
  { emoji: '📍', label: 'Based in', value: 'Pontianak, Indonesia' },
  { emoji: '🌏', label: 'Open to', value: 'Remote work worldwide' },
];

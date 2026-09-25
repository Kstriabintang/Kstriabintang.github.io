// Site-wide identity and copy. Every number here must be verifiable (README › Content rules).

export const site = {
  url: 'https://ksatriabintangsamudra.com',
  name: 'Ksatria Bintang Samudra',
  shortName: 'Ksatria',
  initials: 'KB',
  title: 'Ksatria Bintang Samudra — AI Engineer, Automation Builder & Solutions Architect',
  description:
    'AI Engineer from Pontianak, Indonesia shipping production systems — LLM gateways, payment-native automation, and field apps for mining and small businesses. Open to remote work worldwide.',
  location: 'Pontianak, Indonesia',
  locationLong: 'Pontianak, West Kalimantan, Indonesia',
  email: 'hello@ksatriabintangsamudra.com',
  roles: ['AI Engineer', 'Automation Builder', 'Solutions Architect'],
  kicker: 'Ksatria Bintang Samudra · AI Engineer · Pontianak',
  headline: { lead: 'AI systems,', em: 'shipped', tail: '.' },
  availability: 'Open to remote work',
  proof: ['15+ live products', '39 public repos', 'QRIS-native payments'],
  footerTagline: 'Shipping real systems from the equator.',
  footerNote: 'Designed, built and shipped in Pontianak, Indonesia.',
  socials: {
    github: 'https://github.com/Kstriabintang',
    linkedin: 'https://www.linkedin.com/in/ksatria-bintang-samudra-265952313',
    instagram: 'https://instagram.com/ven_0day',
    whatsapp: 'https://wa.me/6285264402640',
  },
  bookCall: 'https://wa.me/6285264402640?text=Hi%20Ksatria%2C%20I%27d%20like%20to%20book%20a%20call.',
} as const;

export type Site = typeof site;

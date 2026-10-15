// Site-wide identity and copy. Every number here must be verifiable (README › Content rules).

export const site = {
  url: 'https://ksatriabintangsamudra.com',
  name: 'Ksatria Bintang Samudra',
  shortName: 'Bintang',
  initials: 'KB',
  title: 'Ksatria Bintang Samudra — Product Engineer · Mining & Vertical SaaS',
  description:
    'AI-augmented product engineer from Pontianak, Indonesia shipping production systems — CoalTrack (anti-fraud attendance & statutory payroll for coal mining), live ISP internal systems, and payment-native automation. Open to remote work worldwide.',
  location: 'Pontianak, Indonesia',
  locationLong: 'Pontianak, West Kalimantan, Indonesia',
  email: 'hello@ksatriabintangsamudra.com',
  roles: ['Product Engineer', 'Mining & Vertical SaaS', 'AI-augmented'],
  kicker: 'Ksatria Bintang Samudra · Product Engineer · Pontianak',
  headline: { lead: 'Production systems,', em: 'shipped', tail: '.' },
  availability: 'Open to remote work',
  proof: ['15+ live products', '39 public repos', 'QRIS-native payments'],
  footerTagline: 'Shipping real systems from the equator.',
  footerNote: 'Designed, built and shipped in Pontianak, Indonesia.',
  socials: {
    github: 'https://github.com/Kstriabintang',
    linkedin: 'https://www.linkedin.com/in/ksatriabintangsamudra',
    instagram: 'https://instagram.com/ven_0day',
    whatsapp: 'https://wa.me/6285264402640',
    gravatar: 'https://gravatar.com/ksatriabintangsamudra',
    pinterest: 'https://www.pinterest.com/ksatriabintang_',
    devto: 'https://dev.to/kstriabintang',
  },
  bookCall: 'https://wa.me/6285264402640?text=Hi%20Bintang%2C%20I%27d%20like%20to%20book%20a%20call.',
} as const;

export type Site = typeof site;

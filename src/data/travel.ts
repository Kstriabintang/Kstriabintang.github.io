// Globe section data. Honest by default: where Ksatria's products and clients live.
// To switch to personal travel later, replace `heading`, `subtitle`, `places` and `stats`.

export interface Place {
  id: string;
  country: string;
  flag: string;
  /** Marker position; omit to list the entry without a globe marker. */
  lat?: number;
  lng?: number;
  cities: string[];
  memory: string;
  /** Pill suffix, e.g. "3 cities". Defaults to the city count. */
  note?: string;
}

export const travel = {
  heading: { num: '03', lead: 'Where my work', em: 'runs' },
  subtitle: { lead: 'Shipping from the', em: 'equator', tail: '— where my products and clients live' },
  places: [
    {
      id: 'pontianak',
      country: 'Pontianak',
      flag: '🇮🇩',
      lat: -0.0263,
      lng: 109.3425,
      cities: ['Home base', 'Daily Kost', 'PalmTrack'],
      memory: 'Home base on the equator — where every product starts as a spec and ends as a deploy.',
      note: 'Home base',
    },
    {
      id: 'samarinda',
      country: 'Samarinda',
      flag: '🇮🇩',
      lat: -0.5022,
      lng: 117.1536,
      cities: ['CoalTrack', 'Mining clients'],
      memory: 'Mining operations in East Kalimantan — anti-fraud attendance and payroll for crews in the field.',
      note: 'Mining',
    },
    {
      id: 'denpasar',
      country: 'Denpasar',
      flag: '🇮🇩',
      lat: -8.6705,
      lng: 115.2126,
      cities: ['Makmur Motor'],
      memory: 'A car dealership in Bali running its showroom and inventory CMS on the Cloudflare edge.',
      note: 'Dealership',
    },
    {
      id: 'remote',
      country: 'Remote — worldwide',
      flag: '🌏',
      cities: ['Pentesting', 'Data analysis', 'Upwork'],
      memory: 'International clients via Upwork between 2020 and 2024 — security assessments and social-media data analysis.',
      note: 'Remote',
    },
  ] satisfies Place[],
  stats: [
    { value: '3', label: 'Cities' },
    { value: '1', label: 'Home base' },
    { value: 'Worldwide', label: 'Remote' },
  ],
};

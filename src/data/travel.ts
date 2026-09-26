// Globe section data — places Ksatria has actually been (provided by the owner, 2026-09-26).
// One pill per country; `spots` put a marker on the globe for every city.

export interface Spot {
  name: string;
  lat: number;
  lng: number;
  /** Larger marker, e.g. home base. */
  home?: boolean;
}

export interface Place {
  id: string;
  country: string;
  flag: string;
  cities: string[];
  spots: Spot[];
  memory: string;
  /** Pill suffix, e.g. "Home". Defaults to the city count. */
  note?: string;
}

const places: Place[] = [
  {
    id: 'indonesia',
    country: 'Indonesia',
    flag: '🇮🇩',
    cities: ['Pontianak', 'Pekanbaru', 'Tembilahan', 'Batam', 'Jakarta', 'Tangerang', 'Bogor', 'Bandung', 'Malang', 'Bali'],
    spots: [
      { name: 'Pontianak', lat: -0.0263, lng: 109.3425, home: true },
      { name: 'Pekanbaru', lat: 0.5071, lng: 101.4478 },
      { name: 'Tembilahan', lat: -0.3256, lng: 103.157 },
      { name: 'Batam', lat: 1.0456, lng: 104.0305 },
      { name: 'Jakarta', lat: -6.2088, lng: 106.8456 },
      { name: 'Tangerang', lat: -6.1783, lng: 106.6319 },
      { name: 'Bogor', lat: -6.5971, lng: 106.806 },
      { name: 'Bandung', lat: -6.9175, lng: 107.6191 },
      { name: 'Malang', lat: -7.9666, lng: 112.6326 },
      { name: 'Bali', lat: -8.4095, lng: 115.1889 },
    ],
    memory:
      'Home. Pontianak, right on the equator, is my base — the rest of the list runs from Sumatra and Batam across Java to Bali.',
  },
  {
    id: 'india',
    country: 'India',
    flag: '🇮🇳',
    cities: ['Kasol', 'Delhi'],
    spots: [
      { name: 'Kasol', lat: 32.0106, lng: 77.315 },
      { name: 'Delhi', lat: 28.6139, lng: 77.209 },
    ],
    memory: 'From the pine forests of Kasol in the Himalayan Parvati Valley to the capital, Delhi.',
  },
  {
    id: 'malaysia',
    country: 'Malaysia',
    flag: '🇲🇾',
    cities: ['Sepang'],
    spots: [{ name: 'Sepang', lat: 2.6923, lng: 101.75 }],
    memory: 'Sepang, in Selangor — just south of Kuala Lumpur.',
  },
];

const cityCount = places.reduce((n, p) => n + p.cities.length, 0);

export const travel = {
  heading: { num: '03', lead: "Where I've", em: 'wandered' },
  subtitle: { lead: 'From the', em: 'equator', tail: 'to the Himalayas — my journey so far' },
  ariaLabel: "Interactive globe showing the places I've travelled",
  places,
  stats: [
    { value: String(places.length), label: 'Countries' },
    { value: '1', label: 'Continent' },
    { value: String(cityCount), label: 'Cities' },
  ],
};

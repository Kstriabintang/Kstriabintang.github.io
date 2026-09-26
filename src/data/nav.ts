// Navbar groups and footer columns. Only link pages that exist.

export type NavIcon =
  | 'folder'
  | 'briefcase'
  | 'file'
  | 'wrench'
  | 'sparkles'
  | 'user'
  | 'cpu'
  | 'github'
  | 'mail';

export interface NavCard {
  label: string;
  desc: string;
  href: string;
  icon: NavIcon;
  badge?: string;
  external?: boolean;
}

export interface NavGroup {
  id: string;
  label: string;
  blurb?: string;
  layout: 'grid' | 'sections';
  items?: NavCard[];
  columns?: { heading: string; items: NavCard[] }[];
}

export const navGroups: NavGroup[] = [
  {
    id: 'work',
    label: 'Work',
    blurb: 'Shipped products, case studies and how to hire me.',
    layout: 'grid',
    items: [
      { label: 'Projects', desc: 'Case studies & shipped', href: '/projects', icon: 'folder' },
      { label: 'Live Demos', desc: 'Open & try my apps now', href: '/demos', icon: 'sparkles', badge: 'New' },
      { label: 'Services', desc: 'Work with me', href: '/services', icon: 'briefcase' },
      { label: 'Resume', desc: 'Experience & credentials', href: '/resume', icon: 'file' },
      { label: 'GitHub', desc: '39 public repositories', href: 'https://github.com/Kstriabintang', icon: 'github', external: true },
    ],
  },
  {
    id: 'playground',
    label: 'Playground',
    blurb: 'Things I built that run in your browser right now.',
    layout: 'grid',
    items: [
      { label: 'DevSec Toolbox', desc: '34 in-browser dev tools', href: 'https://ksatriabintangsamudra.my.id/devsec/', icon: 'wrench', badge: 'Live', external: true },
      { label: 'HAND//TRACE', desc: 'Gesture AR in the browser', href: 'https://ksatriabintangsamudra.my.id/handtrace/', icon: 'sparkles', external: true },
      { label: 'ResumeKita', desc: 'ATS-friendly CV builder', href: 'https://resumekita.my.id', icon: 'file', external: true },
      { label: 'All tools', desc: 'The full playground', href: '/#playground', icon: 'cpu' },
    ],
  },
  {
    id: 'about',
    label: 'About',
    layout: 'sections',
    columns: [
      {
        heading: 'Me',
        items: [
          { label: 'About', desc: 'Who I am', href: '/about', icon: 'user' },
          { label: 'Uses', desc: 'My gear & setup', href: '/uses', icon: 'cpu' },
        ],
      },
      {
        heading: 'Connect',
        items: [
          { label: 'Resume', desc: 'CV (web + PDF)', href: '/resume', icon: 'file' },
          { label: 'Contact', desc: 'Start a conversation', href: '/#contact', icon: 'mail' },
        ],
      },
    ],
  },
];

export const footerColumns = [
  {
    title: 'Work',
    links: [
      { label: 'Projects', href: '/projects' },
      { label: 'Live Demos', href: '/demos' },
      { label: 'Services', href: '/services' },
      { label: 'Resume', href: '/resume' },
    ],
  },
  {
    title: 'Playground',
    links: [
      { label: 'DevSec Toolbox', href: 'https://ksatriabintangsamudra.my.id/devsec/' },
      { label: 'HAND//TRACE', href: 'https://ksatriabintangsamudra.my.id/handtrace/' },
      { label: 'ResumeKita', href: 'https://resumekita.my.id' },
    ],
  },
  {
    title: 'About Me',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Uses', href: '/uses' },
      { label: 'GitHub', href: 'https://github.com/Kstriabintang' },
    ],
  },
  {
    title: 'Meta',
    links: [
      { label: 'Contact', href: '/#contact' },
      { label: 'Privacy', href: '/privacy' },
      { label: 'Sitemap', href: '/sitemap-index.xml' },
    ],
  },
];

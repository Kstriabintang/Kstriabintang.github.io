// Build-time search index for the ⌘K command palette.
import type { APIRoute } from 'astro';
import { navGroups } from '../data/nav';
import { site } from '../data/site';
import { comparisons } from '../data/comparisons';
import { cheatsheets } from '../data/cheatsheets';
import { glossary } from '../data/glossary';

export interface SearchItem {
  title: string;
  href: string;
  kind: 'Page' | 'Section' | 'Project' | 'Tool' | 'Social' | 'Action';
  keywords?: string;
  action?: 'theme' | 'terminal' | 'email' | 'chat';
}

const pages: SearchItem[] = [
  { title: 'Home', href: '/', kind: 'Page', keywords: 'start landing hero' },
  { title: 'Projects', href: '/projects', kind: 'Page', keywords: 'work case studies portfolio shipped' },
  { title: 'Live Demos', href: '/demos', kind: 'Page', keywords: 'try apps demo login coaltrack venwave lavelle makmur vensix palmtrack playground' },
  { title: 'Services', href: '/services', kind: 'Page', keywords: 'hire work with me consulting freelance' },
  { title: 'About', href: '/about', kind: 'Page', keywords: 'bio who story' },
  { title: 'Uses', href: '/uses', kind: 'Page', keywords: 'gear setup stack tools hardware' },
  { title: 'Resume', href: '/resume', kind: 'Page', keywords: 'cv experience credentials pdf' },
  { title: 'Certifications', href: '/certifications', kind: 'Page', keywords: 'certificates credentials courses google ai essentials isc2 ethical hacking linux python excel toefl' },
  { title: 'Games', href: '/games', kind: 'Page', keywords: 'play browser fun termle wordle puzzle' },
  { title: 'Termle — daily tech word game', href: '/games/termle', kind: 'Page', keywords: 'wordle game puzzle daily word tech play' },
  { title: 'IT Quiz — levelled tech exam', href: '/games/it-quiz', kind: 'Page', keywords: 'quiz game exam test it tech levels junior mid senior questions play' },
  { title: 'Chess vs Claude — 3D chess game', href: '/games/chess', kind: 'Page', keywords: 'chess game 3d ai claude minimax board play catur' },
  { title: 'Tech Crossword — a developer TTS puzzle', href: '/games/crossword', kind: 'Page', keywords: 'crossword tts puzzle word game tech developer play teka teki silang' },
  { title: 'Notebook', href: '/blog', kind: 'Page', keywords: 'blog writing articles posts notes notebook' },
  { title: 'Glossary', href: '/glossary', kind: 'Page', keywords: 'glossary terms definitions ai llm rag embedding qris rls edge define what is' },
  { title: 'Cheatsheets', href: '/cheatsheets', kind: 'Page', keywords: 'cheatsheet quick reference git http docker commands' },
  { title: 'Comparisons', href: '/comparisons', kind: 'Page', keywords: 'comparison vs versus rest graphql sql nosql workers lambda' },
  { title: 'Learning Paths', href: '/learning-paths', kind: 'Page', keywords: 'learning path curriculum guide track tutorial' },
  { title: 'Privacy', href: '/privacy', kind: 'Page', keywords: 'data policy contact form chat' },
];

const sections: SearchItem[] = [
  { title: 'Playground — tools you can use', href: '/#playground', kind: 'Section', keywords: 'tools demos' },
  { title: 'Selected work', href: '/#projects', kind: 'Section', keywords: 'projects' },
  { title: 'Who I am', href: '/#about', kind: 'Section', keywords: 'about bio quick facts' },
  { title: 'My toolkit', href: '/#skills', kind: 'Section', keywords: 'skills stack' },
  { title: "Where I've wandered", href: '/#travel-globe', kind: 'Section', keywords: 'globe travel map' },
  { title: "Let's connect", href: '/#contact', kind: 'Section', keywords: 'contact email message form' },
];

const socials: SearchItem[] = [
  { title: 'GitHub — Kstriabintang', href: site.socials.github, kind: 'Social', keywords: 'code repos' },
  { title: 'LinkedIn', href: site.socials.linkedin, kind: 'Social', keywords: 'profile' },
  { title: 'Instagram', href: site.socials.instagram, kind: 'Social' },
  { title: 'WhatsApp', href: site.socials.whatsapp, kind: 'Social', keywords: 'chat phone call' },
];

const actions: SearchItem[] = [
  { title: 'Toggle theme', href: '#theme', kind: 'Action', action: 'theme', keywords: 'dark light mode' },
  { title: 'Open terminal', href: '#terminal', kind: 'Action', action: 'terminal', keywords: 'cli shell konami' },
  { title: 'Ask my AI assistant', href: '#chat', kind: 'Action', action: 'chat', keywords: 'chat bot ask question' },
  { title: 'Email Ksatria', href: `mailto:${site.email}`, kind: 'Action', action: 'email', keywords: 'contact hire mail' },
];

function toolsFromNav(): SearchItem[] {
  const group = navGroups.find((g) => g.id === 'playground');
  return (group?.items ?? [])
    .filter((item) => item.href.startsWith('http'))
    .map((item) => ({ title: item.label, href: item.href, kind: 'Tool' as const, keywords: item.desc }));
}

async function projectsFromCollection(): Promise<SearchItem[]> {
  try {
    const content = (await import('astro:content')) as unknown as {
      getCollection: (name: string) => Promise<{ id: string; data: Record<string, unknown> }[]>;
    };
    const entries = await content.getCollection('projects');
    return entries.map((entry) => {
      const data = entry.data as { title?: string; summary?: string; tags?: string[]; slug?: string };
      const slug = data.slug ?? entry.id.replace(/\.(md|mdx)$/, '');
      return {
        title: data.title ?? slug,
        href: `/projects/${slug}`,
        kind: 'Project' as const,
        keywords: [data.summary, ...(data.tags ?? [])].filter(Boolean).join(' '),
      };
    });
  } catch {
    return [];
  }
}

async function postsFromCollection(): Promise<SearchItem[]> {
  try {
    const content = (await import('astro:content')) as unknown as {
      getCollection: (name: string) => Promise<{ id: string; data: Record<string, unknown> }[]>;
    };
    const entries = await content.getCollection('blog');
    return entries
      .filter((e) => !(e.data as { draft?: boolean }).draft)
      .map((entry) => {
        const data = entry.data as { title?: string; description?: string; tags?: string[]; category?: string };
        const slug = entry.id.replace(/\.(md|mdx)$/, '');
        return {
          title: data.title ?? slug,
          href: `/blog/${slug}`,
          kind: 'Page' as const,
          keywords: ['blog post', data.category, data.description, ...(data.tags ?? [])].filter(Boolean).join(' '),
        };
      });
  } catch {
    return [];
  }
}

const writingRefs: SearchItem[] = [
  ...comparisons.map((c) => ({ title: `${c.a} vs ${c.b}`, href: `/comparisons/${c.slug}`, kind: 'Page' as const, keywords: `comparison vs ${c.description}` })),
  ...cheatsheets.map((c) => ({ title: `${c.title} cheatsheet`, href: `/cheatsheets/${c.slug}`, kind: 'Page' as const, keywords: `cheatsheet reference ${c.description}` })),
  ...glossary.map((t) => ({ title: t.term, href: `/glossary/#${t.slug}`, kind: 'Page' as const, keywords: `glossary define ${t.short}` })),
];

export const GET: APIRoute = async () => {
  const items: SearchItem[] = [...pages, ...sections, ...(await projectsFromCollection()), ...(await postsFromCollection()), ...writingRefs, ...toolsFromNav(), ...socials, ...actions];
  return new Response(JSON.stringify(items), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

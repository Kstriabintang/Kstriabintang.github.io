// Shared helpers for project cards, the /projects index and case-study pages.
import { getCollection, type CollectionEntry } from 'astro:content';
import type { ProjectCategory } from '../../content.config';

export type Project = CollectionEntry<'projects'>;

export const categoryLabels: Record<ProjectCategory, string> = {
  'ai-automation': 'AI & Automation',
  web: 'Web',
  mobile: 'Mobile',
  security: 'Security',
};

/** Short badge text used on card heroes (reference uses "AI", "Web", …). */
export const categoryShort: Record<ProjectCategory, string> = {
  'ai-automation': 'AI',
  web: 'Web',
  mobile: 'Mobile',
  security: 'Security',
};

/** Modifier used for category accent colours (border-left, hover glow). */
export const categoryModifier: Record<ProjectCategory, string> = {
  'ai-automation': 'ai',
  web: 'web',
  mobile: 'mobile',
  security: 'security',
};

export const filterOrder: ProjectCategory[] = ['ai-automation', 'web', 'mobile', 'security'];

export async function getProjects(): Promise<Project[]> {
  const all = await getCollection('projects');
  return all.sort((a, b) => a.data.order - b.data.order);
}

export function heroGradient(p: Project): string {
  const [from, to] = p.data.cover.gradient;
  return `linear-gradient(135deg, ${from} 0%, ${to} 100%)`;
}

/** Projects that have a real desktop screenshot under /images/shots/<id>/desktop.jpg. */
const SHOT_IDS = new Set(['inspobase', 'statsbuzz', 'coaltrack', 'vensix', 'makmur-motor', 'lavelle', 'wedding-saving', 'ar-science-lab', 'cendekia-siakad', 'cendekia-lms', 'daily-kost', 'wifisiapa', 'venmail', 'phishing-forensics', 'deus', 'telegram-autoorder', 'adb-kit', 'luxafoir', 'systemguard']);

/** Card-cover screenshot for a project, or undefined to fall back to the gradient + icon. */
export function projectPoster(p: Project): string | undefined {
  return SHOT_IDS.has(p.id) ? `/images/shots/${p.id}/desktop.jpg` : undefined;
}

export function primaryLink(p: Project): { href: string; label: string } | undefined {
  if (p.data.links.live) return { href: p.data.links.live, label: 'Live' };
  if (p.data.links.demo) return { href: p.data.links.demo, label: 'Demo' };
  return undefined;
}

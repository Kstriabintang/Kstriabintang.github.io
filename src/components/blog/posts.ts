// Shared helpers for the blog collection (the /blog index, post pages and the home notebook band).
import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

export async function getPosts(): Promise<Post[]> {
  const all = await getCollection('blog');
  return all
    .filter((p) => (import.meta.env.PROD ? !p.data.draft : true))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function postSlug(p: Post): string {
  return p.id.replace(/\.(md|mdx)$/, '');
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

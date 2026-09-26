// RSS feed for the Notebook — helps readers subscribe and search engines discover posts.
import type { APIRoute } from 'astro';
import { site } from '../data/site';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  let items = '';
  try {
    const content = (await import('astro:content')) as unknown as {
      getCollection: (name: string) => Promise<{ id: string; data: Record<string, any> }[]>;
    };
    const entries = await content.getCollection('blog');
    const posts = entries
      .filter((e) => !e.data.draft)
      .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime());
    items = posts
      .map((p) => {
        const slug = p.id.replace(/\.(md|mdx)$/, '');
        const url = `${site.url}/blog/${slug}/`;
        return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(p.data.date).toUTCString()}</pubDate>
      <category>${esc(p.data.category)}</category>
      <description>${esc(p.data.description)}</description>
    </item>`;
      })
      .join('\n');
  } catch {
    items = '';
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — Notebook</title>
    <link>${site.url}/blog/</link>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Writing on AI-augmented engineering, LLM infrastructure and shipping real software.</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};

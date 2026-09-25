// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://ksatriabintangsamudra.com',
  output: 'static',
  integrations: [react(), sitemap({ filter: (page) => !page.includes('/404') }), mdx()],
  build: { format: 'directory' },
});

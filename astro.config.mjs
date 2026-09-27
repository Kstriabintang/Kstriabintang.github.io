// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// Stamp every sitemap entry with the build time, so the gsc-indexer tool can tell
// when a deploy changed the site and auto re-submit the pages to Google.
const BUILD_TIME = new Date().toISOString();

export default defineConfig({
  site: 'https://ksatriabintangsamudra.com',
  output: 'static',
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/404'),
      serialize: (item) => ({ ...item, lastmod: BUILD_TIME }),
    }),
    mdx(),
  ],
  build: { format: 'directory' },
});

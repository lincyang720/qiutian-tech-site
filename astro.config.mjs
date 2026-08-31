import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 博客主站配置：SEO 优先 + i18n 就绪（默认中文，/en 出海）
export default defineConfig({
  site: 'https://blog.example.com',
  integrations: [sitemap()],
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true,
    },
  },
});

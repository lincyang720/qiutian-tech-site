import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// 个人技术站配置：SEO 优先 + i18n 就绪（默认中文，/en 出海）
export default defineConfig({
  // ⚠️ 买了域名后必须改成真实域名，sitemap 与 canonical URL 都依赖它
  site: 'https://blog.example.com',
  integrations: [sitemap()],

  // URL 规范化：不带尾斜杠 + 输出 .html 文件
  // 与 vercel.json 的 cleanUrls/trailingSlash 对齐，避免 301 重定向链（伤 SEO）
  trailingSlash: 'never',
  build: { format: 'file' },

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

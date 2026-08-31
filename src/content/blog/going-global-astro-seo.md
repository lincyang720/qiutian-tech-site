---
title: "用 Astro 做出海技术站：SEO 与速度的一次性到位"
description: "出海做站，Google 不认花哨，只认速度和内容。Astro 默认零 JS、Lighthouse 满分，是技术博客 / 文档站的最优解。"
pubDate: 2026-08-10
category: going-global
tags: ["出海", "Astro", "SEO"]
lang: zh-CN
---

## 出海站的两个硬指标

Google 排名里，**页面速度**和**内容质量**权重极高。动态框架（Next 之类）默认塞一堆 JS，TTFB 和 LCP 吃亏。Astro 反其道而行：**默认零 JS，按组件孤岛激活**。

## 为什么选 Astro

| 维度 | Astro | 传统 SPA |
|------|-------|----------|
| 默认产物 | 静态 HTML | 大量 JS |
| Lighthouse | 接近满分 | 需要调优 |
| SEO | 原生友好 | 需额外处理 |
| i18n | 内置 | 自己搭 |

## 三步上线

1. **建站**：`npm create astro@latest` 选 `blog` 模板。
2. **内容**：用 Markdown + frontmatter 写文章，Astro 自动生成路由。
3. **部署**：推到 Vercel / Cloudflare Pages，免费、全球 CDN、自带 HTTPS。

## 出海额外注意

- **i18n 早规划**：`astro.config` 里开启 `i18n`，中文/英文各一套路由，吃 Google 全球长尾。
- **结构化数据**：文章页加 `article` JSON-LD，富媒体展示提升点击率。
- **域名与备案**：用 `.com` 全球通用；若主要面向国内再考虑备案。

## 小结

出海做站别过度工程。Astro + Markdown + Vercel，一天就能上线一个速度满分、SEO 友好的技术站，剩下的精力全花在内容上。

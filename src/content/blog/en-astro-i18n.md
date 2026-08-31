---
title: "Building a Bilingual Tech Blog with Astro i18n"
description: "A short, practical note on setting up Chinese/English i18n in Astro to capture global search traffic — written for an English-reading audience."
pubDate: 2026-08-09
category: going-global
tags: ["Astro", "i18n", "SEO"]
lang: en
---

## Why bilingual

Most of my content is in Chinese, but a meaningful slice of developer traffic comes from Google in English. A bilingual blog lets the same idea reach two audiences and compounds my SEO surface area.

## The setup

Enable i18n in `astro.config.mjs`:

```js
export default defineConfig({
  i18n: {
    defaultLocale: 'zh-CN',
    locales: ['zh-CN', 'en'],
    routing: { prefixDefaultLocale: false },
  },
});
```

Each post carries a `lang` field in its frontmatter. The Chinese home page filters `lang: 'zh-CN'`; an `/en` page filters `lang: 'en'`. Translating a hit post is just writing a second file with `lang: en`.

## What I learned

1. Don't auto-translate with machine output and publish blindly — quality still matters for dwell time.
2. Keep URLs stable; let locale live in the path, not the query string.
3. Submit both `/sitemap-index.xml` (Astro generates it) to Google Search Console.

## Takeaway

i18n is cheap to set up early and expensive to retrofit. Do it on day one, even if you only translate your best posts.

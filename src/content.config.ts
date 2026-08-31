import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// 博客内容集合：每篇文章是一个 markdown 文件，frontmatter 经 schema 校验
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    category: z.enum([
      'backend',
      'ai-basics',
      'ai-engineering',
      'ai-app',
      'going-global',
      'side-hustle',
    ]),
    tags: z.array(z.string()).default([]),
    // 双语：每篇可指定 zh-CN / en；出海内容翻成英文后 lang 设为 en
    lang: z.enum(['zh-CN', 'en']).default('zh-CN'),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };

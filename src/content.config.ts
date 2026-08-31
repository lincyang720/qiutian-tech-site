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

    // —— 学习系列 / 分阶段学习 ——
    // 用 AI 学某领域时，可把内容按阶段拆成系列，分阶段发布
    // 同一系列的文章靠 series + seriesOrder 聚合，自动生成系列页与前后篇导航
    series: z.string().optional(),        // 系列名，如「跟着 AI 学 RAG」
    seriesOrder: z.number().optional(),   // 阶段序号：1、2、3… 决定系列内排序
    seriesDesc: z.string().optional(),    // 系列简介（写在第 1 篇上即可）
    seriesTotal: z.number().optional(),  // 计划总阶段数（用于显示学习进度，如 3/5）
  }),
});

export const collections = { blog };

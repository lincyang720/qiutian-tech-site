import { getCollection, type CollectionEntry } from 'astro:content';

export interface SeriesInfo {
  name: string;
  desc: string;
  posts: CollectionEntry<'blog'>[]; // 已按 seriesOrder 升序
  published: number;
  planned: number;
  latest: Date;
  categories: string[];
}

/** 从所有已发布文章中聚合出「学习系列」列表（按最新更新时间倒序） */
export async function getSeries(): Promise<SeriesInfo[]> {
  const all = await getCollection('blog', ({ data }) => !data.draft);
  const groups = new Map<string, CollectionEntry<'blog'>[]>();
  for (const p of all) {
    const s = p.data.series;
    if (!s) continue;
    if (!groups.has(s)) groups.set(s, []);
    groups.get(s)!.push(p);
  }

  const list: SeriesInfo[] = [];
  for (const [name, posts] of groups) {
    posts.sort((a, b) => (a.data.seriesOrder ?? 999) - (b.data.seriesOrder ?? 999));
    const first = posts[0];
    const desc = first.data.seriesDesc || first.data.description;
    const planned = first.data.seriesTotal ?? posts.length;
    const latest = posts.reduce(
      (m, p) => (p.data.pubDate > m ? p.data.pubDate : m),
      posts[0].data.pubDate,
    );
    list.push({
      name,
      desc,
      posts,
      published: posts.length,
      planned,
      latest,
      categories: [...new Set(posts.map((p) => p.data.category))],
    });
  }
  list.sort((a, b) => b.latest.getTime() - a.latest.getTime());
  return list;
}

/** 取某篇文章在同一系列中的上一篇 / 下一篇 */
export function getSeriesNeighbors(
  post: CollectionEntry<'blog'>,
  all: CollectionEntry<'blog'>[],
): { prev?: CollectionEntry<'blog'>; next?: CollectionEntry<'blog'> } {
  const s = post.data.series;
  if (!s) return {};
  const inSeries = all
    .filter((p) => p.data.series === s && !p.data.draft)
    .sort((a, b) => (a.data.seriesOrder ?? 999) - (b.data.seriesOrder ?? 999));
  const idx = inSeries.findIndex((p) => p.id === post.id);
  if (idx === -1) return {};
  return {
    prev: idx > 0 ? inSeries[idx - 1] : undefined,
    next: idx < inSeries.length - 1 ? inSeries[idx + 1] : undefined,
  };
}

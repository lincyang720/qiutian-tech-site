// 站点全局常量：标题、导航、六栏分类 taxonomy
export const SITE = {
  title: '秋天 · 个人技术站',
  tagline: '技术人 → 一人公司',
  description:
    '秋天，Java 讲师 / 一人公司实践者。写后端工程、AI 应用，也写技术人如何做一人公司。',
  author: '秋天',
  // 个人定位，用于首页 hero
  role: 'Java 讲师 · 一人公司实践者',
  bio: '我写后端工程（Java / Go / Python）与 AI 应用（大模型 / RAG / Agent），也持续记录技术人如何从写代码走向一人公司。',
  // 上线前改成你的真实域名
  url: 'https://blog.example.com',
  // 知识星球 CTA（替换成你的星球链接）
  zhihuPlanet: 'https://t.zsxq.com/your-planet',
  email: 'hi@example.com',
  // 个人频道入口（url 替换为真实地址；暂无填 '#'）
  channels: [
    { label: '公众号「程序员秋天」', url: '#' },
    { label: '公众号「架构师秋天侃职场」', url: '#' },
    { label: '小红书「秋天一人公司」', url: '#' },
    { label: '知识星球「AI搞钱实验室」', url: 'https://t.zsxq.com/your-planet' },
  ],
};

// 六栏分类：技术线（后端 / AI 基础 / AI 工程 / AI 应用）+ 商业线（出海做站 / 副业探索）
export type CategoryKey =
  | 'backend'
  | 'ai-basics'
  | 'ai-engineering'
  | 'ai-app'
  | 'going-global'
  | 'side-hustle';

export interface Category {
  key: CategoryKey;
  label: string;
  sub: string;
  desc: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  {
    key: 'backend',
    label: '后端',
    sub: 'Java · Go · Python',
    desc: '服务端语言、框架与高并发工程实践。',
    color: '#378ADD',
  },
  {
    key: 'ai-basics',
    label: 'AI 基础',
    sub: '大模型 · 微调 · RAG',
    desc: '大模型原理、微调训练与检索增强生成。',
    color: '#7F77DD',
  },
  {
    key: 'ai-engineering',
    label: 'AI 工程',
    sub: 'LangChain · LangGraph · Spring AI · Dify · AgentScope',
    desc: '主流 Agent / LLM 框架实战、踩坑与选型对比。',
    color: '#D85A30',
  },
  {
    key: 'ai-app',
    label: 'AI 应用',
    sub: 'Agent 实战',
    desc: '端到端做出能跑、能上线的 AI 应用。',
    color: '#1D9E75',
  },
  {
    key: 'going-global',
    label: '出海做站',
    sub: '建站 · SEO · 流量 · 变现',
    desc: '面向全球市场的技术独立站与增长。',
    color: '#BA7517',
  },
  {
    key: 'side-hustle',
    label: '副业探索',
    sub: '一人公司 · 知识付费',
    desc: '技术人的副业、一人公司与知识变现。',
    color: '#993556',
  },
];

export function getCategory(key: string): Category | undefined {
  return CATEGORIES.find((c) => c.key === key);
}

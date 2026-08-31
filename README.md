# 秋天 · 个人技术站（Personal Tech Site）

基于 **Astro** 的极速、SEO 友好、支持中英双语的个人技术网站。首页为个人 landing（你是谁、做什么、各频道入口），文章区作为子模块，覆盖「技术线 + 商业线」六大专栏。

- 技术栈：Astro 5 + 原生 Scoped CSS（零运行时 JS，Lighthouse 满分）
- SEO：`@astrojs/sitemap` 自动生成站点地图；每页带 OpenGraph meta
- i18n：内置 `zh-CN` / `en`，默认中文，`/en` 为英文版
- 部署：Vercel（Git 集成，push 即上线，免费 + 全球 CDN）
- 仓库：https://github.com/lincyang720/qiutian-tech-site

> **完整部署步骤（域名购买 / Vercel 绑定 / DNS 配置 / 网络问题）见 [DEPLOY.md](./DEPLOY.md)**

## 本地运行

```bash
npm install
npm run dev      # 开发预览 http://localhost:4321
npm run build    # 产出 dist/ 静态文件
npm run preview  # 预览构建产物
```

## 目录结构

```
ai-tech-blog/
├── astro.config.mjs        # 站点/i18n/sitemap 配置
├── src/
│   ├── consts.ts           # SITE 信息 + 六栏分类 taxonomy（改这里调品牌）
│   ├── content.config.ts   # 博客内容集合 schema（frontmatter 校验）
│   ├── content/blog/       # 文章（每篇一个 .md）
│   ├── layouts/            # BaseLayout（含 header/footer/SEO）
│   ├── components/         # Header / Footer / CategoryCard / PostItem
│   ├── pages/
│   │   ├── index.astro          # 首页（个人 landing：hero + 频道 + 专栏 + 最新文章）
│   │   ├── about.astro          # 关于我
│   │   ├── en/index.astro       # 英文版首页（个人 landing）
│   │   ├── blog/index.astro      # 全部文章列表
│   │   ├── blog/[...slug].astro  # 文章详情（自动路由 + 系列前后篇导航）
│   │   ├── categories/[category].astro  # 分类列表
│   │   └── series/               # 学习路线图：总览 + 单系列详情
│   ├── utils/series.ts          # 从文章聚合「学习系列」的纯函数
│   └── styles/global.css   # 全局样式与主题变量
└── public/                 # favicon 等静态资源
```

## 如何新增一篇文章

在 `src/content/blog/` 下新建 `.md` 文件，填写 frontmatter：

```markdown
---
title: "文章标题"
description: "一句话摘要，会用于 SEO 与列表"
pubDate: 2026-08-31
category: ai-basics          # backend | ai-basics | ai-engineering | ai-app | going-global | side-hustle
tags: ["RAG", "大模型"]
lang: zh-CN                  # zh-CN 或 en
draft: false
# —— 学习系列（可选）：把相关内容拆成阶段、分阶段发布 ——
series: "跟着 AI 学 AI 工程"   # 同一系列名会自动聚合到 /series 与 /series/<名称>
seriesOrder: 1                 # 阶段序号，决定系列内排序
seriesTotal: 5                 # 计划总阶段数，用于显示进度（如 3/5）；省略则按已发布数计
seriesDesc: "一句话介绍这个系列（写在第 1 篇即可）"
---

正文用 Markdown 写，支持代码块、表格、引用。
```

保存即自动生成 `/blog/<文件名>` 路由，并出现在首页与对应分类页。

## 学习系列（分阶段发布）—— 核心特性

个人站定位之一是「用 AI 边学边写、把学习过程分阶段沉淀」。给文章加上 `series` 字段即可自动获得：

- `/series` —— 学习路线图总览：所有系列卡片 + 进度条（已发布/计划阶段）。
- `/series/<系列名>` —— 单系列页：按 `seriesOrder` 列出各阶段、显示进度，未写完的阶段标「后续阶段规划中」。
- 文章详情页自动出现**系列横幅**与**上一篇 / 下一篇**导航。
- 首页「学习路线图」模块展示最近更新的系列。

> 用法本质：每篇文章自带 `series` + `seriesOrder` 即可，无需任何额外配置；系列页全部由 `src/utils/series.ts` 从文章聚合生成。

## 六大专栏

| key | 标签 | 子主题 |
|-----|------|--------|
| backend | 后端 | Java · Go · Python |
| ai-basics | AI 基础 | 大模型 · 微调 · RAG |
| ai-engineering | AI 工程 | LangChain · LangGraph · Spring AI · Dify · AgentScope |
| ai-app | AI 应用 | Agent 实战 |
| going-global | 出海做站 | 建站 · SEO · 流量 · 变现 |
| side-hustle | 副业探索 | 一人公司 · 知识付费 |

## 部署

**详细手册见 [DEPLOY.md](./DEPLOY.md)**，这里只给最短路径：

```bash
git add -A && git commit -m "post: 文章标题" && git push
# push 到 main 即触发 Vercel 自动构建上线（约 40s）
```

### 首次配置
1. vercel.com 用 GitHub 登录 → Import `qiutian-tech-site`
2. 构建参数自动识别（`vercel.json` 已声明 framework/输出目录/缓存/安全头）
3. Settings → Domains 绑定自定义域名，按提示加 DNS 记录（A `@` → `76.76.21.21`）
4. 域名定好后改 `astro.config.mjs` 的 `site`，否则 sitemap URL 全错

### ⚠️ 本机网络注意
`github.com:443` 在当前网络被阻断，**remote 必须走 SSH**：

```bash
git remote set-url origin git@github.com:lincyang720/qiutian-tech-site.git
git config http.schannelCheckRevoke false   # 解决 Windows CRYPT_E_REVOCATION_OFFLINE
```

### 为什么不用 WordPress
WordPress 需要 PHP 运行时 + MySQL + 可写目录，Vercel 三者均不提供，架构上无法部署。若只是想要"后台可视化写文章"，接 **Decap CMS / Keystatic** 即可（免费、纯 Git、保留静态站全部优势），详见 DEPLOY.md 第 6 节。

## 待接入位（已留好位置）

1. **评论**：`src/components/` 加 Giscus（GitHub 背书、免费），在文章详情页 `.cta` 前插入。
2. **分析**：Umami（`src/layouts/BaseLayout.astro` 的 `<head>` 加一段脚本），隐私友好、出海不踩 GDPR。
3. **订阅**：Buttondown / Mailchimp 接 newsletter，可在首页 hero 下加邮件输入框。
4. **知识星球 CTA**：改 `src/consts.ts` 里的 `zhihuPlanet` 为你的星球链接。
5. **域名**：改 `astro.config.mjs` 的 `site` 为真实域名（sitemap 依赖它）。

## 后续迭代建议

- 加 `article` JSON-LD 结构化数据，提升 Google 富媒体展示。
- 英文文章逐步补齐，把爆款公众号文翻成 EN 吃全球长尾。
- 文章内 `/categories/...` 交叉链接，提升内链权重。

# 部署手册：GitHub → Vercel → 自定义域名

> 本站为 **Astro 静态站点**，部署链路：本地写文章 → `git push` → Vercel 自动构建 → CDN 全球分发。
> 全程 **零服务器、零运维、免费**（只花域名钱）。

---

## 0. 当前状态

| 项目 | 状态 |
|------|------|
| GitHub 仓库 | ✅ https://github.com/lincyang720/qiutian-tech-site （public, main 分支） |
| 本地 Git | ✅ 已初始化，remote 走 SSH |
| Vercel 配置 | ✅ `vercel.json` 已就绪（framework/缓存/安全头） |
| Vercel 项目 | ⏳ 待你在网页端 Import |
| 域名 | ⏳ 待购买 |

---

## 1. 网络前提：为什么必须用 SSH remote（重要）

本机实测结果：

| 端点 | 结果 |
|------|------|
| `github.com:443`（HTTPS） | ❌ 连不上（国内对 github.com 主域的干扰） |
| `github.com:22`（SSH） | ✅ 通 |
| `api.github.com:443` | ✅ 通 |

所以 remote **必须用 SSH**，不能用 HTTPS：

```bash
git remote set-url origin git@github.com:lincyang720/qiutian-tech-site.git
```

已额外关闭 Windows schannel 的证书吊销检查（`CRYPT_E_REVOCATION_OFFLINE` 报错的解法）：

```bash
git config http.schannelCheckRevoke false
```

### 如果哪天连 22 端口也被封

改用 GitHub 的 SSH-over-443 通道，在 `~/.ssh/config` 加：

```
Host github.com
  HostName ssh.github.com
  Port 443
  User git
```

（本机已验证 `ssh.github.com:443` 可达，属于备用方案。）

---

## 2. 买域名

### 后缀建议

| 后缀 | 首年价 | 续费 | 适用 |
|------|--------|------|------|
| `.com` | ¥70-90 | ¥90 | **首选**，认知度最高、SEO 无歧视 |
| `.dev` | ¥100 | ¥110 | 技术人身份感强，强制 HTTPS |
| `.me` | ¥80 | ¥170 | 个人站气质，但续费偏贵 |
| `.cn` | ¥30 | ¥35 | 便宜，但**需实名+备案**才能国内解析 |

### 命名建议（围绕你的个人品牌）

- `qiutian.dev` / `qiutiancoding.com`
- `onepersonco.dev`（一人公司主轴）
- 避免拼音+数字混杂、避免连字符，越短越好

### 去哪买

| 注册商 | 优点 | 注意 |
|--------|------|------|
| **Cloudflare Registrar** | 成本价续费、免费 WHOIS 隐私、DNS 一体 | 需国际卡 |
| **Namecheap** | 便宜、支持支付宝 | 续费略涨 |
| **腾讯云/阿里云** | 支付宝、中文客服 | `.cn` 需备案 |

> ⚠️ **部署在 Vercel 就不要备案**：Vercel 是境外 CDN，`.cn` 域名的备案要求解析到国内服务器，路线冲突。买 `.com`/`.dev` 直接跳过备案。

---

## 3. 部署到 Vercel

### 3.1 首次 Import（网页端，2 分钟）

1. 打开 https://vercel.com → 用 **GitHub 账号登录**（授权 `lincyang720`）
2. `Add New...` → `Project`
3. 找到 `qiutian-tech-site` → `Import`
4. 构建配置**会自动识别**（`vercel.json` 已声明），确认为：
   - Framework Preset: `Astro`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`
5. `Deploy` → 约 40 秒后拿到 `https://qiutian-tech-site.vercel.app`

> 网页端 Import 走浏览器，不受 git HTTPS 被墙影响。**不需要装 Vercel CLI。**

### 3.2 绑定自定义域名

1. Vercel 项目 → `Settings` → `Domains` → 输入你的域名 → `Add`
2. Vercel 会给出 DNS 记录，去注册商后台添加：

| 类型 | 名称 | 值 |
|------|------|-----|
| `A` | `@` | `76.76.21.21` |
| `CNAME` | `www` | `cname.vercel-dns.com` |

3. 等 DNS 生效（几分钟到 2 小时），Vercel 自动签发 Let's Encrypt 证书，HTTPS 自动开
4. 在 Domains 里把 **www 设为 301 跳转到根域**（或反之），只保留一个规范域名 —— 这对 SEO 很关键

### 3.3 域名定好后必须改的一处

`astro.config.mjs` 里的 `site` 决定 sitemap 和 canonical URL：

```js
export default defineConfig({
  site: 'https://你的域名.com',   // ← 改这里
  // ...
});
```

改完 commit + push，Vercel 自动重新部署。**不改的话 sitemap 里全是错的 URL，Google 收录会出问题。**

---

## 4. 日常工作流（域名上线后）

```bash
cd E:\WorkBuddy\ai-tech-blog

# 1. 新增文章：在 src/content/blog/ 下建 .md 文件
# 2. 本地预览
npm run dev            # http://localhost:4321

# 3. 确认无误后发布
git add -A
git commit -m "post: 文章标题"
git push               # ← push 完就自动上线，约 40s
```

**Vercel 自动化行为**
- push 到 `main` → 自动构建 → 更新生产站
- push 到其他分支 / 开 PR → 自动生成 **Preview 部署**（独立 URL），可以先预览再合并
- 构建失败会邮件通知，生产站保持上一个成功版本不受影响

---

## 5. 上线前检查清单

- [ ] `astro.config.mjs` 的 `site` 改成真实域名
- [ ] `src/consts.ts` 里 `channels[].url` 填公众号/小红书/知识星球真实链接
- [ ] `src/consts.ts` 里 `zhihuPlanet` 换成真实星球邀请链接（文章底部 CTA 用它）
- [ ] `src/consts.ts` 里 `email` 换成对外邮箱
- [ ] 到 Google Search Console 提交 `https://你的域名/sitemap-index.xml`
- [ ] 到 Bing Webmaster Tools 提交同一个 sitemap
- [ ] 用 PageSpeed Insights 跑一次，确认性能分（Astro 静态站正常应 95+）

---

## 6. 后续可选增强

| 能力 | 方案 | 成本 |
|------|------|------|
| 评论 | **Giscus**（基于本仓库 GitHub Discussions） | 免费 |
| 访问分析 | **Umami Cloud** 或 Vercel Analytics | 免费额度够用 |
| 邮件订阅 | Buttondown / Mailchimp | 免费额度够用 |
| 可视化写文章后台 | **Decap CMS** 或 **Keystatic** | 免费，仍是纯 Git |
| 结构化数据 | 文章页加 `Article` JSON-LD | 免费，利好 SEO |

> **关于 WordPress**：WordPress 需要 PHP 运行时 + MySQL + 可写目录，Vercel 三者都不提供，**架构上无法部署**。
> 如果目的只是"想要一个后台可视化写文章"，用上表的 **Decap CMS / Keystatic** 即可 —— 有网页后台、所见即所得，但内容仍以 Markdown 存进 Git，继续白吃 Vercel 的免费静态托管和 Astro 的 SEO 优势。
> 真要跑 WordPress 就得另买服务器（腾讯云轻量约 ¥300+/年），并自己承担安全更新、备份、加速，性价比远不如现在这条路。

---

## 7. 常见问题

**Q: push 报 `Failed to connect to github.com:443`**
A: remote 还是 HTTPS。执行第 1 节的 `git remote set-url` 换成 SSH。

**Q: push 报 `CRYPT_E_REVOCATION_OFFLINE`**
A: 执行 `git config http.schannelCheckRevoke false`（已配过，换机器需重配）。

**Q: Vercel 构建失败 `Cannot find module`**
A: 本地 `npm install` 后新增的依赖没提交。检查 `package.json` 和 `package-lock.json` 是否都已 commit。

**Q: 域名绑了但显示证书错误**
A: DNS 还没完全生效，等最多 2 小时；确认 A 记录指向 `76.76.21.21` 且没有残留的旧 A/AAAA 记录。

**Q: 文章改了但线上没变**
A: 看 Vercel Deployments 里最新一次构建状态；确认本地 `git push` 真的成功（`git log origin/main -1`）。

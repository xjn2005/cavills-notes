# Noesis Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复 frontmatter 解析、完善本地维护文档，并以最小 CSS 改善 Noesis 的可读性与首页入口。

**Architecture:** 保持 docmd 的 Sky 主题和默认模板，在根目录 `assets/` 中提供一份覆盖样式。同步脚本会在解析或重写 frontmatter 前移除 UTF-8 BOM；首页、README 和本地维护说明只描述当前真实工作流。

**Tech Stack:** Node.js 22、docmd 0.9.7、原生 CSS、node:test。

---

### Task 1: 让同步脚本兼容 UTF-8 BOM

**Files:**
- Modify: `scripts/sync-obsidian-public.mjs`
- Modify: `scripts/sync-obsidian-public.test.mjs`

- [ ] **Step 1: 添加会失败的 BOM 回归测试**

在测试文件末尾添加：

```js
test("sync accepts published notes with a UTF-8 BOM", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "quartz-sync-bom-"))
  const source = path.join(root, "public")
  const dest = path.join(root, "content")
  const argv = process.argv
  try {
    await fs.mkdir(source, { recursive: true })
    await fs.mkdir(dest)
    await fs.writeFile(path.join(dest, "index.md"), "HOME\n")
    await fs.writeFile(path.join(source, "bom.md"), `\uFEFF${published}# BOM\n`)
    process.argv = ["node", script.pathname, "--source", source, "--dest", dest]
    await import(`${script.href}?bom=${Date.now()}`)
    assert.match(await fs.readFile(path.join(dest, "bom.md"), "utf8"), /^---\n/)
  } finally {
    process.argv = argv
    await fs.rm(root, { recursive: true, force: true })
  }
})
```

- [ ] **Step 2: 运行测试，确认当前实现失败**

Run: `npm test`

Expected: BOM 测试失败，因为文件被当作没有 `publish: true` 的笔记跳过。

- [ ] **Step 3: 在解析与写入前统一移除 BOM**

在 `frontmatter` 前添加：

```js
function withoutBom(markdown) {
  return markdown.replace(/^\uFEFF/, "")
}
```

并替换两个函数：

```js
function frontmatter(markdown) {
  const match = withoutBom(markdown).match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return match ? (YAML.parse(match[1]) ?? {}) : {}
}

function withGeneratedMetadata(markdown, metadata) {
  const normalized = withoutBom(markdown)
  const match = normalized.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return match ? `---\n${YAML.stringify(metadata)}---${normalized.slice(match[0].length)}` : normalized
}
```

- [ ] **Step 4: 验证回归测试**

Run: `npm test`

Expected: 4 个测试全部通过。

### Task 2: 加载样式并重写首页

**Files:**
- Create: `assets/css/noesis.css`
- Modify: `docmd.config.json`
- Modify: `content/index.md`

- [ ] **Step 1: 配置 Sky 主题和样式文件**

在 `out` 后加入：

```json
"theme": {
  "name": "sky",
  "customCss": ["assets/css/noesis.css"]
},
```

- [ ] **Step 2: 创建最小 CSS 覆盖文件**

创建 `assets/css/noesis.css`：

```css
:root {
  --font-family-sans: "Noto Sans SC", "Microsoft YaHei", system-ui, sans-serif;
  --sidebar-width: 272px;
  --radius-lg: 16px;
  --radius-xl: 20px;
}

.main-content { max-width: 48rem; }
.sidebar-header h1 a,
.main-content h1,
.main-content h2,
.main-content h3 { letter-spacing: -0.02em; }
.main-content pre { border: 1px solid var(--border-color); box-shadow: var(--shadow-sm); }
.callout { border-radius: var(--radius-lg); }

body[data-source-file="content/index.md"] .main-content > p:first-of-type {
  color: var(--text-muted);
  font-size: 1.125rem;
}

body[data-source-file="content/index.md"] .main-content > h2 + ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 0.875rem;
  list-style: none;
  padding: 0;
}

body[data-source-file="content/index.md"] .main-content > h2 + ul li { margin: 0; }

body[data-source-file="content/index.md"] .main-content > h2 + ul a {
  display: block;
  min-height: 100%;
  padding: 1rem 1.125rem;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  background: color-mix(in srgb, var(--sidebar-bg) 70%, var(--bg-color));
  color: var(--text-heading);
  font-weight: 650;
  transition: border-color 0.15s ease, transform 0.15s ease, box-shadow 0.15s ease;
}

body[data-source-file="content/index.md"] .main-content > h2 + ul a:hover {
  border-color: var(--link-color);
  color: var(--link-color);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .main-content { max-width: none; }
}
```

- [ ] **Step 3: 重写首页并去除 BOM**

将 `content/index.md` 替换为：

````md
---
title: Noesis
description: Cavill 的中文学习笔记，涵盖 C++、数据库系统与 Nano2Tetris。
publish: true
draft: false
---

# Noesis

Cavill 的公开学习笔记，记录课程、编程与系统知识。

## 学习主题

- [C++](./cpp/)
- [CMU 15445](./CMU 15445/)
- [Nano2Tetris](./Nano2Tetris/)
````

- [ ] **Step 4: 构建并检查首页产物**

Run: `npm run build; Select-String -Path site\\index.html -Pattern 'assets/css/noesis.css','正在建设','Obsidian 站点','title: Noesis'`

Expected: 输出包含样式链接，且不包含后三个过期文本。

### Task 3: 更新公开与本地维护文档

**Files:**
- Modify: `README.md`
- Modify: `LOCAL_MAINTENANCE.md` (ignored; do not stage)

- [ ] **Step 1: 更新 README**

将介绍部分替换为：

````md
# Noesis

[![Built with docmd](https://img.shields.io/badge/Built%20with-docmd-0ea5e9)](https://docmd.io/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222222?logo=github)](https://pages.github.com/)

Noesis 是 Cavill 的公开学习知识库，使用 docmd 构建，并可从 Obsidian 同步笔记。

网站地址：https://notes.cavill.site/

## 本地开发

```bash
npm install
npm run dev
```

构建前可运行：

```bash
npm run build
npm run check
```
````

保留 License 小节不变。

- [ ] **Step 2: 更新本地维护说明**

将 `LOCAL_MAINTENANCE.md` 整个替换为：

````md
# 本地维护说明

这个文件只保存在本地，已加入 `.gitignore`，不会上传到 GitHub。

## 发布笔记

1. 在 Obsidian vault 的 `public/` 文件夹放入要公开的笔记。
2. 每篇笔记开头添加：

   ```yaml
   ---
   publish: true
   draft: false
   ---
   ```

3. 在 `D:\\quartz` 运行：

   ```bash
   npm run sync:obsidian -- --vault "D:\\OneDrive\\OneDrive\\文档\\Obsidian Vault"
   ```

同步结果会直接写入 `content/`；`C++` 文件夹会自动映射为网站中的 `cpp/`。

## 本地预览与检查

```bash
npm run dev
npm run build
npm run check
```

预览地址为 `http://localhost:3000`。结束预览服务时按 `Ctrl+C`。

## 发布到 GitHub Pages

```bash
git add -A
git commit -m "Update Noesis content"
git push origin main
```

GitHub Pages 会从 `main` 分支自动部署。
````

- [ ] **Step 3: 确认本地文件未被跟踪**

Run: `git ls-files --error-unmatch LOCAL_MAINTENANCE.md`

Expected: 命令以非零状态退出。

### Task 4: 完整验证与提交

**Files:**
- Modify: 上述所有受跟踪文件

- [ ] **Step 1: 运行完整验证**

Run: `npm test; npm run build; npm run check`

Expected: 三个命令均以状态码 0 结束。

- [ ] **Step 2: 检查改动范围**

Run: `git status --short; git diff --check`

Expected: `LOCAL_MAINTENANCE.md` 不出现在状态输出中。

- [ ] **Step 3: 提交受跟踪改动**

Run:

```bash
git add README.md docmd.config.json content/index.md scripts/sync-obsidian-public.mjs scripts/sync-obsidian-public.test.mjs assets/css/noesis.css docs/superpowers/plans/2026-09-28-noesis-polish.md
git commit -m "Polish Noesis site and maintenance workflow"
```

Expected: 一个不包含 `LOCAL_MAINTENANCE.md` 的提交。

# Noesis Formatting and Plugins Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在不改变笔记内容的前提下，统一 Noesis 的阅读排版并启用 Mermaid 与 Git 插件。

**Architecture:** 样式规则集中保留在 `assets/css/noesis.css`，避免为单篇笔记增加页面特例。内容文件只调整 Markdown 的空白、缩进、列表符号和行内公式相邻空格；文字、公式含义、代码、链接、图片与 frontmatter 值保持不变。docmd 内置插件只通过 `docmd.config.json` 启用，不添加 npm 包。

**Tech Stack:** docmd 0.9.7、Markdown、原生 CSS。

---

### Task 1: 启用笔记阅读插件

**Files:**
- Modify: `docmd.config.json`

- [x] **Step 1: 配置 Mermaid 与 Git 插件**

在现有 `plugins` 对象中替换 Git 配置并加入 Mermaid：

```json
"git": {},
"math": {},
"mermaid": {},
"search": {}
```

- [x] **Step 2: 构建验证插件加载**

Run: `npm run build`

Expected: 构建成功，且不出现缺失插件或新增依赖安装错误。

### Task 2: 统一内容排版

**Files:**
- Modify: `assets/css/noesis.css`

- [x] **Step 1: 扩展阅读排版规则**

在现有 `.main-content` 规则后追加以下样式：

```css
.main-content > * + * { margin-top: 1.5rem; }
.main-content :is(ul, ol) { padding-left: 1.5rem; }
.main-content li + li { margin-top: 0.45rem; }
.main-content :is(.katex-display, .math-display) { margin: 2rem 0; overflow-x: auto; overflow-y: hidden; }
.main-content :is(table, img) { max-width: 100%; }
.main-content table { display: block; overflow-x: auto; border-collapse: separate; border-spacing: 0; }
.main-content blockquote { margin-inline: 0; padding: 0.75rem 1rem; border-radius: var(--radius-md); }
.main-content :not(pre) > code { padding: 0.14em 0.38em; border-radius: 6px; }
```

- [x] **Step 2: 构建并查看代表页面**

Run: `npm run build`

Inspect: `site/Nano2Tetris/chapter-2/index.html`, `site/CMU-15445/Lecture-2-Note/index.html`

Expected: 公式可横向滚动而不撑破窄屏；表格、图片、代码和列表有稳定间距。

### Task 3: 修复可见 Markdown 结构问题

**Files:**
- Modify: `content/Nano2Tetris/chapter 2.md`
- Modify: `content/CMU 15445/Lecture 2 Note.md`
- Modify: `content/CMU 15445/Lecture 3 Note.md`

- [x] **Step 1: 修正二进制数示例的格式字符**

仅执行以下结构变化：移除段末的两个硬换行空格；为 `当$b=2$时` 的行内数学表达式补齐相邻空格；将示例前的 `*Example*` 行保持同一段；把寄存器值保留为行内代码，不修改其字符。

- [x] **Step 2: 将圆点项目符号替换为 Markdown 列表标记**

把两份 CMU 笔记中每行开头的 `• ` 替换为 `- `；保留每行其余字符、顺序与标点。

- [x] **Step 3: 检查内容差异只包含格式字符**

Run: `git diff --word-diff=porcelain -- "content/Nano2Tetris/chapter 2.md" "content/CMU 15445/Lecture 2 Note.md" "content/CMU 15445/Lecture 3 Note.md"`

Expected: 只出现空白、`•` 到 `-` 与 Markdown 相邻空格变化，不出现正文、公式、代码、链接或图片地址改写。

### Task 4: 完整验证与提交

**Files:**
- Modify: 上述文件与本计划

- [x] **Step 1: 运行完整验证**

Run: `npm run build; npm run check; git diff --check`

Expected: 构建和链接校验通过，且没有空白错误。

- [ ] **Step 2: 提交排版改动**

```bash
git add assets/css/noesis.css docmd.config.json content/Nano2Tetris/chapter\ 2.md content/CMU\ 15445/Lecture\ 2\ Note.md content/CMU\ 15445/Lecture\ 3\ Note.md docs/superpowers/plans/2026-09-28-noesis-formatting-and-plugins.md
git commit -m "Improve note readability"
```

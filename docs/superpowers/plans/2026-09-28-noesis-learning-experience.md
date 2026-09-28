# Noesis Learning Experience Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 Noesis 完善为中文、可导航、适合持续学习与复习的 docmd 知识库。

**Architecture:** 保留现有 Markdown 笔记与 docmd 构建链路，只扩展配置、首页和课程目录页。使用 docmd 原生 i18n、导航、Lucide 图标、callout 与 collapsible 容器；通过现有 CSS 保持 Apple 风格，不添加运行时依赖。

**Tech Stack:** docmd 0.9.7、JSON、Markdown、原生 CSS、node:test。

---

### Task 1: 中文化界面并建立明确导航

**Files:**
- Modify: `docmd.config.json`
- Modify: `assets/css/noesis.css`

- [x] **Step 1: 配置中文 UI，并保留自动生成的完整课程树**

在根配置加入：

```json
"i18n": {
  "default": "zh",
  "stringMode": true,
  "locales": [{ "id": "zh", "label": "中文" }]
}
```

不设置 `navigation`，以保留 docmd 自动生成的课程折叠树。另在 `theme` 中加入 `copyWidgets: { "enabled": false }`。

- [x] **Step 2: 统一图标笔画**

在 CSS 追加：

```css
.lucide-icon { stroke-width: 1.7px; }
.sidebar-nav .lucide-icon { width: 1rem; height: 1rem; }
```

- [x] **Step 3: 构建检查**

Run: `npm run build`

Expected: 产物包含中文系统标签、导航 SVG，且不包含 `Copy Context`。

### Task 2: 简化首页

**Files:**
- Modify: `content/index.md`
- Modify: `content/cpp/index.md`
- Modify: `content/CMU 15445/index.md`
- Modify: `content/Nano2Tetris/index.md`

- [x] **Step 1: 在首页加入使用说明**

```md
::: callout tip "如何使用" icon:compass
从课程入口开始阅读；侧栏用于切换课程，页面目录用于定位章节，搜索可查找术语和笔记。
:::
```

### Task 3: 为现有 callout 建立一致图标规范

**Files:**
- Modify: all `content/**/*.md` containing `::: callout`

- [x] **Step 1: 列出并转换 callout 标头**

Run: `rg -n '^::: callout' content`

只为原本已存在且无标题的 callout 添加如下标题与图标，正文不变；不新增 callout 容器：

```text
info    → ::: callout info "说明" icon:circle-info
tip     → ::: callout tip "提示" icon:lightbulb
warning → ::: callout warning "注意" icon:triangle-alert
danger  → ::: callout danger "警告" icon:octagon-alert
success → ::: callout success "完成" icon:circle-check
```

### Task 4: 完整验证与提交

**Files:**
- Modify: 以上受跟踪文件与本计划

- [x] **Step 1: 运行完整验证**

Run: `npm test; npm run build; npm run check`

Expected: 4 个同步测试、构建和链接检查全部通过。

- [ ] **Step 2: 提交受跟踪改动**

```bash
git add README.md docmd.config.json assets/css/noesis.css content scripts/sync-obsidian-public.mjs scripts/sync-obsidian-public.test.mjs docs/superpowers/plans/2026-09-28-noesis-polish.md docs/superpowers/plans/2026-09-28-noesis-learning-experience.md
git commit -m "Improve Noesis learning experience"
```

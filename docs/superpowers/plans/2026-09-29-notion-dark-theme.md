# 深色主题 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 让知识库深色阅读页使用与 cavill.site 一致的中性配色和带下划线的灰白链接。

**Architecture:** 只在现有的自定义样式表中添加深色变量覆盖。docmd 的全局组件继续从这些变量读取颜色；正文链接使用窄选择器覆盖默认的无下划线规则，避免影响导航与按钮。

**Tech Stack:** CSS，自带 docmd 构建命令。

---

### Task 1: 覆盖深色阅读主题

**Files:**
- Modify: `assets/css/blockquote.css`
- Test: `npm run build`

- [x] **Step 1: 添加深色变量与正文链接规则**

```css
:root[data-theme="dark"] {
  --bg-color: #191919;
  --text-color: #e6e6e6;
  --text-muted: #a6a6a6;
  --text-heading: #f0f0f0;
  --link-color: #d4d4d4;
  --link-color-hover: #ffffff;
  --border-color: #373737;
  --border-color-codeblock: #373737;
  --header-bg: rgb(25 25 25 / 80%);
  --header-border: #373737;
  --sidebar-bg: #191919;
  --sidebar-text: #d4d4d4;
  --sidebar-link-active-bg: #252525;
  --sidebar-link-active-text: #ffffff;
  --code-bg: #252525;
  --code-text: #e6e6e6;
  --scrollbar-thumb: #373737;
  --scrollbar-thumb-hover: #5a5a5a;
}

.main-content a:any-link {
  text-decoration: underline;
  text-decoration-color: color-mix(in srgb, currentColor 46%, transparent);
  text-underline-offset: 0.14em;
}
```

- [x] **Step 2: 构建站点**

Run: `npm run build`

Expected: command exits with code 0 and writes `site/assets/css/blockquote.css`.

- [x] **Step 3: 检查生成的样式**

Run: `rg -n "#191919|#d4d4d4|text-decoration: underline" site/assets/css/blockquote.css`

Expected: all three selectors are present in the generated stylesheet.

- [x] **Step 4: 提交主题修改**

```bash
git add assets/css/blockquote.css
git commit -m "Align dark theme with main site"
```

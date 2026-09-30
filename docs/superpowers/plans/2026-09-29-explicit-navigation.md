# 显式导航 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 通过一个确定的导航文件固定所有侧栏项的顺序，并让分组标题不可点击。

**Architecture:** 在内容根目录创建 `navigation.json`。docmd 会优先加载它而非自动发现文件，因此数组顺序成为唯一的导航顺序；分组不包含 `path`，只包含可折叠子项。

**Tech Stack:** JSON，docmd。

---

### Task 1: 固定侧栏导航

**Files:**
- Create: `content/navigation.json`
- Test: `npm run check`, `npm run build`

- [x] **Step 1: 写入完整导航**

```json
[
  { "title": "欢迎！", "path": "/" },
  {
    "title": "CMU 15445",
    "collapsible": true,
    "children": [
      { "title": "Lecture 1 Note", "path": "/CMU-15445/Lecture-1-Note/" },
      { "title": "Lecture 2 Note", "path": "/CMU-15445/Lecture-2-Note/" },
      { "title": "Lecture 3 Note", "path": "/CMU-15445/Lecture-3-Note/" }
    ]
  },
  {
    "title": "Cpp",
    "collapsible": true,
    "children": [
      { "title": "01 OOP", "path": "/cpp/01-OOP/" },
      { "title": "02 Auto", "path": "/cpp/02-auto/" },
      { "title": "03 智能指针", "path": "/cpp/03-smart-pointers/" },
      { "title": "04 格式化输出", "path": "/cpp/04-format-output/" },
      { "title": "05 Nullptr", "path": "/cpp/05-nullptr/" },
      { "title": "06 Doxygen 注释", "path": "/cpp/06-doxygen-comments/" },
      { "title": "07 Namespace", "path": "/cpp/07-Namespace/" },
      { "title": "08 Comparator", "path": "/cpp/08-Comparator/" },
      { "title": "09 Optional", "path": "/cpp/09-optional/" },
      { "title": "10 Atomic", "path": "/cpp/10-atomic/" }
    ]
  },
  {
    "title": "Nano2Tetris",
    "collapsible": true,
    "children": [
      { "title": "Chapter 1", "path": "/Nano2Tetris/chapter-1/" },
      { "title": "Chapter 2", "path": "/Nano2Tetris/chapter-2/" }
    ]
  },
  {
    "title": "概率论",
    "collapsible": true,
    "children": [
      { "title": "样本空间、事件和概率", "path": "/概率论/sample-space-events-and-probability/" },
      { "title": "随机变量及其分布", "path": "/概率论/random-variables-and-distributions/" }
    ]
  }
]
```

- [x] **Step 2: 验证导航与构建**

Run: `npm run check; npm run build; rg -n "CMU 15445|概率论|样本空间、事件和概率|随机变量及其分布" site/index.html`

Expected: both commands exit with code 0; the generated sidebar lists groups and probability children in the JSON order.

- [x] **Step 3: 提交导航文件**

```bash
git add content/navigation.json
git commit -m "Add explicit site navigation"
```

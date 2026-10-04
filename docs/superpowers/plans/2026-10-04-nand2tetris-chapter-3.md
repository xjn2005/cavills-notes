# Nano2Tetris Chapter 3 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a Chinese learning note for the sequential-logic chapter and make it reachable from the site navigation.

**Architecture:** Create one Markdown page beside the existing Nano2Tetris chapter notes. Keep the existing pattern of conceptual explanations, chip API tables, and small HDL examples; add exactly one navigation entry for the generated route.

**Tech Stack:** Markdown, KaTeX, DocMD navigation JSON.

---

### Task 1: Write the Chapter 3 note

**Files:**
- Create: `content/Nano2Tetris/chapter 3.md`

- [ ] **Step 1: Add the article front matter and chapter sections**

Use the same publishing metadata as the previous two notes. Cover clocks, DFFs, `Bit`, `Register`, `RAMn`, and `PC`; preserve the source-book semantics that writes become visible in the next clock period and that `PC` prioritizes `reset`, then `load`, then `inc`.

- [ ] **Step 2: Check content formatting**

Run: `npm run check`

Expected: validation exits with status `0`.

### Task 2: Publish the route in navigation

**Files:**
- Modify: `content/navigation.json`

- [ ] **Step 1: Add the Chapter 3 navigation item after Chapter 2**

Add `{ "title": "Chapter 3", "path": "/Nano2Tetris/chapter-3/" }` inside the `Nano2Tetris` children array.

- [ ] **Step 2: Build the site**

Run: `npm run build`

Expected: build exits with status `0` and emits the Chapter 3 route.

# Noesis docmd Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Quartz with a docmd site built from the existing public Markdown notes, then replace remote `main` history with one commit authored by the repository owner.

**Architecture:** docmd reads `content/` and writes static files to `site/`. The Node sync script remains the only Obsidian-to-public-content transformation and generates standard Markdown index links. GitHub Pages builds locked dependencies and uploads `site/`; no Git metadata plugin is enabled.

**Tech Stack:** Node.js 22+, npm, docmd, `@docmd/plugin-math`, Node test runner, GitHub Actions, GitHub Pages.

---

## File structure

- Create: `docmd.config.json` — docmd source, output, canonical URL, and plugins.
- Modify: `package.json`, `package-lock.json`, `scripts/sync-obsidian-public.mjs`, `scripts/sync-obsidian-public.test.mjs`, three folder `index.md` files, `.github/workflows/pages.yaml`, and `.gitignore`.
- Delete: `.quartz/`, `quartz/`, Quartz root configuration, `public/`, and Quartz reference material under `docs/` except `docs/superpowers/`.

### Task 1: Generate portable directory links

**Files:**

- Modify: `scripts/sync-obsidian-public.test.mjs:10-20`
- Modify: `scripts/sync-obsidian-public.mjs:153-157`
- Modify: `content/CMU 15445/index.md:11-13`, `content/Nano2Tetris/index.md:11-12`, `content/cpp/index.md:11-20`
- Modify: `content/index.md`, `content/CMU 15445/Lecture 2 Note.md`, `content/CMU 15445/Lecture 3 Note.md`, `content/Nano2Tetris/chapter 2.md`, `content/cpp/03-智能指针.md`

- [ ] **Step 1: Write the failing link-format expectation**

Replace the `index()` helper with:

```js
function index(title, notes) {
  return `---
title: ${title}
publish: true
draft: false
cssclasses:
  - hide-folder-list
---

# 目录

${notes.map((note) => `- [${note}](./${note}.md)`).join("\n")}
`
}
```

- [ ] **Step 2: Run the test and prove it fails**

Run: `node --test scripts/sync-obsidian-public.test.mjs`

Expected: index assertions fail because the script still writes `[[note]]`.

- [ ] **Step 3: Implement URL-safe standard links**

In `scripts/sync-obsidian-public.mjs`, replace the directory-link mapping with:

```js
    .map((note) => `- [${note}](./${note}.md)`)
```

- [ ] **Step 4: Convert the current folder indexes**

Replace their link lists with raw relative source filenames:

```markdown
<!-- content/CMU 15445/index.md -->
- [Lecture 1 Note](./Lecture 1 Note.md)
- [Lecture 2 Note](./Lecture 2 Note.md)
- [Lecture 3 Note](./Lecture 3 Note.md)

<!-- content/Nano2Tetris/index.md -->
- [chapter 1](./chapter 1.md)
- [chapter 2](./chapter 2.md)

<!-- content/cpp/index.md -->
- [01-OOP](./01-OOP.md)
- [02-auto](./02-auto.md)
- [03-智能指针](./03-智能指针.md)
- [04-格式化输出](./04-格式化输出.md)
- [05-nullptr](./05-nullptr.md)
- [06-Doxygen 注释](./06-Doxygen 注释.md)
- [07-Namespace](./07-Namespace.md)
- [08-Comparator](./08-Comparator.md)
- [09-optional](./09-optional.md)
- [10-atomic](./10-atomic.md)
```

- [ ] **Step 5: Verify links**

Run: `node --test scripts/sync-obsidian-public.test.mjs; rg -n --glob '*.md' '\[\[' content`

Expected: all three tests pass; `rg` exits `1` with no matches.

- [ ] **Step 6: Convert the 22 Obsidian callouts to docmd containers**

Replace each `> [!type]` block with the equivalent `::: callout` block: use `info` for `info`, `note`, `question`, `todo`, and `example`, and `warning` for `warning`. Preserve the existing title, list items, paragraphs, code fences, and inline Markdown. Convert every match reported by `rg -n --glob '*.md' '^\s*>\s*\[!' content`.

Each converted block must be delimited exactly as:

```markdown
::: callout info "Title"
Body
:::
```

- [ ] **Step 7: Verify no Obsidian callout syntax remains**

Run: `rg -n --glob '*.md' '^\s*>\s*\[!' content`

Expected: `rg` exits `1` with no matches.

- [ ] **Step 8: Commit**

Run: `git add scripts/sync-obsidian-public.mjs scripts/sync-obsidian-public.test.mjs content && git commit -m "Use Markdown links in published indexes"`

### Task 2: Add the minimal docmd build

**Files:**

- Create: `docmd.config.json`
- Modify: `package.json`, `package-lock.json`

- [ ] **Step 1: Install the compiler and math extension**

Run: `npm install --save-dev @docmd/core @docmd/plugin-math`

Expected: the lockfile records both packages and `node_modules/.bin/docmd` exists.

- [ ] **Step 2: Replace package metadata and scripts**

Replace `package.json` with:

```json
{
  "name": "noesis",
  "description": "Cavill 的公开学习笔记",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "docmd dev",
    "build": "docmd build",
    "check": "docmd validate",
    "sync:obsidian": "node scripts/sync-obsidian-public.mjs",
    "test": "node --test scripts/*.test.mjs"
  },
  "engines": {
    "node": ">=22",
    "npm": ">=10.9.2"
  },
  "dependencies": {
    "yaml": "^2.8.2"
  },
  "devDependencies": {
    "@docmd/core": "^0.9.7",
    "@docmd/plugin-math": "^0.9.7"
  }
}
```

- [ ] **Step 3: Create the docmd configuration without Git metadata**

Create `docmd.config.json` with:

```json
{
  "title": "Noesis",
  "url": "https://notes.cavill.site",
  "src": "content",
  "out": "site",
  "plugins": {
    "ai": false,
    "git": false,
    "math": {},
    "search": {},
    "seo": {},
    "sitemap": {},
    "llms": {}
  }
}
```

Disable `git` and `ai`; do not configure analytics, PWA, comments, or a custom theme.

- [ ] **Step 4: Build and inspect required pages**

Run: `npm run build; npm run check; Test-Path site/index.html; Get-ChildItem site -Recurse -Filter '*.html' | Select-String -Pattern 'katex' | Select-Object -First 1`

Expected: both npm commands exit `0`; `Test-Path` prints `True`; at least one generated page contains `katex`.

- [ ] **Step 5: Commit**

Run: `git add package.json package-lock.json docmd.config.json && git commit -m "Build Noesis with docmd"`

### Task 3: Replace deployment and remove Quartz

**Files:**

- Modify: `.github/workflows/pages.yaml`, `.gitignore`
- Delete: `.quartz/`, `quartz/`, `quartz.ts`, `quartz.config.default.yaml`, `quartz.lock.json`, `globals.d.ts`, `index.d.ts`, `tsconfig.json`, `tsconfig.tsbuildinfo`, `public/`
- Delete: `docs/Base.base`, `docs/Canvas.canvas`, `docs/cli/`, `docs/getting-started/`, `docs/images/`, `docs/tags/`, `docs/community.md`, `docs/configuration.md`, `docs/hosting.md`, `docs/index.md`, `docs/layout-components.md`, `docs/layout.md`, `docs/philosophy.md`, `docs/showcase.md`, `docs/troubleshooting.md`

- [ ] **Step 1: Change Pages to build and upload `site/`**

In `.github/workflows/pages.yaml`, replace the Quartz build and artifact path with:

```yaml
      - run: npm ci
      - run: npm run build

      - uses: actions/configure-pages@v6
      - uses: actions/upload-pages-artifact@v5
        with:
          path: site
```

Keep the trigger, permissions, concurrency, Node `24` setup, and deploy job unchanged.

- [ ] **Step 2: Replace obsolete ignores**

Replace `.gitignore` with:

```gitignore
.DS_Store
node_modules
site
.obsidian
private/
content/private/
content/drafts/
LOCAL_MAINTENANCE.md
```

- [ ] **Step 3: Verify deletion scope before changing files**

Run: `Get-ChildItem -Force .quartz, quartz, public; Get-ChildItem docs -Force | Where-Object Name -ne superpowers | Select-Object Name`

Expected: only Quartz configuration, source, generated files, and reference material are listed.

- [ ] **Step 4: Remove Quartz-owned files and documentation**

Run these commands:

```powershell
git rm -r -- .quartz quartz public
git rm -- quartz.ts quartz.config.default.yaml quartz.lock.json globals.d.ts index.d.ts tsconfig.json tsconfig.tsbuildinfo
git rm -r -- docs/cli docs/getting-started docs/images docs/tags
git rm -- docs/Base.base docs/Canvas.canvas docs/community.md docs/configuration.md docs/hosting.md docs/index.md docs/layout-components.md docs/layout.md docs/philosophy.md docs/showcase.md docs/troubleshooting.md
```

Keep `docs/superpowers/` untouched.

- [ ] **Step 5: Run complete migration verification**

Run: `npm ci; npm test; npm run build; npm run check; rg -n -i 'quartz|contributor|last updated' site`

Expected: all npm commands exit `0`; `rg --glob '*.html'` exits `1`; `git status --short` does not list `site/`.

- [ ] **Step 6: Commit**

Run: `git add .github/workflows/pages.yaml .gitignore && git add -u && git commit -m "Replace Quartz deployment with docmd"`

### Task 4: Replace remote history after deployment verification

**Files:**

- No content changes; Git references only.

- [ ] **Step 1: Confirm the clean migration state and GitHub identity**

Run: `git status --short; git log -1 --oneline; git config user.name; git config user.email; git ls-remote --heads origin main`

Expected: working tree is clean; the configured name and email belong to GitHub account `xjn2005`; `origin/main` exists.

- [ ] **Step 2: Create a new one-commit local `main` history**

Run these commands:

```powershell
git checkout --orphan docmd-main
git add --all
git commit -m "Migrate Noesis to docmd"
git branch -M main
git log main --oneline
```

Expected: current `main` has exactly one commit. Its author and committer must be the configured GitHub identity; stop if they are not.

- [ ] **Step 3: Force-update only `origin/main`**

Run: `git push --force-with-lease origin main`

Expected: Git reports a forced `main` update; no other branches or tags change.

- [ ] **Step 4: Verify the public result**

Open `https://github.com/xjn2005/noesis/graphs/contributors` and `https://notes.cavill.site`.

Expected: GitHub shows only the repository owner after its statistics cache refreshes, and the site serves the docmd build. If the contributor list is cached, wait for GitHub to recalculate it rather than pushing extra commits.

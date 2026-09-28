# Noesis Site Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make Noesis a Chinese, navigable note site with reliable publishing, useful metadata, accessible deferred images, and Cavill's CC BY-NC-SA 4.0 attribution.

**Architecture:** Keep Quartz and its installed plugins. The sync script owns every generated item beneath `content/` except the root homepage and reconciles that managed tree after each sync. A small HAST helper applies native image attributes in the existing parser pipeline.

**Tech Stack:** Node.js, YAML, Quartz 5, Unified/HAST, Node test runner.

---

### Task 1: Cover publishing cleanup and generated metadata

**Files:**

- Modify: `scripts/sync-obsidian-public.test.mjs`
- Modify: `scripts/sync-obsidian-public.mjs`

- [ ] **Step 1: Write the failing sync tests**

Add source and destination fixtures that verify the root homepage is retained, a previously generated draft is removed, and default metadata is written only when source metadata is absent:

```js
await fs.writeFile(path.join(dest, "index.md"), "HOME\n")
await fs.writeFile(path.join(dest, "cpp", "stale.md"), published)
await fs.writeFile(
  path.join(source, "C++", "01-note.md"),
  "---\npublish: true\ndraft: false\n---\n# Note\n",
)
await fs.writeFile(
  path.join(source, "Notes", "02-kept.md"),
  "---\npublish: true\ndraft: false\ndescription: Handwritten\ntags: [keep]\n---\n# Kept\n",
)
```

Assert that `content/index.md` remains `HOME\n`, `cpp/stale.md` rejects `fs.access`, `cpp/01-note.md` contains `description: C++ 学习笔记：01-note。` and `tags: [cpp]`, and `Notes/02-kept.md` retains `Handwritten` and `[keep]`.

- [ ] **Step 2: Run the focused test and confirm the cleanup assertion fails**

Run: `npm test -- scripts/sync-obsidian-public.test.mjs`

Expected: FAIL because stale generated output is still present and copied notes have no generated metadata.

- [ ] **Step 3: Add the minimal synchronization helpers**

In `scripts/sync-obsidian-public.mjs`, track every copied destination-relative path and every generated folder index in `managedPaths`. Add these helpers:

```js
function generatedMetadata(data, relParts, file) {
  const title = data.title ?? path.basename(file, path.extname(file))
  const folder = relParts.at(-2)
  return {
    ...data,
    ...(data.description || data.socialDescription || !folder
      ? {}
      : { description: `${folder === "cpp" ? "C++" : folder} 学习笔记：${title}。` }),
    ...(data.tags ? {} : { tags: folder ? [folder === "cpp" ? "C++" : folder] : [] }),
  }
}

async function removeStaleGeneratedContent(dest, managedPaths) {
  for (const entry of await fs.readdir(dest, { withFileTypes: true })) {
    if (entry.name === "index.md") continue
    const target = path.join(dest, entry.name)
    await removeUnmanaged(target, dest, managedPaths)
  }
}
```

`removeUnmanaged` walks directories, removes files whose normalized relative path is absent from `managedPaths`, and removes a directory only after it becomes empty. Before copying Markdown, parse front matter, merge `generatedMetadata`, then serialize it with the original Markdown body. Non-Markdown assets are copied unchanged and included in `managedPaths`.

- [ ] **Step 4: Run the focused test**

Run: `npm test -- scripts/sync-obsidian-public.test.mjs`

Expected: PASS with both existing index-generation tests and the new cleanup/metadata test passing.

### Task 2: Add native image loading defaults

**Files:**

- Create: `quartz/processors/imageAttributes.ts`
- Create: `quartz/processors/imageAttributes.test.ts`
- Modify: `quartz/processors/parse.ts`

- [ ] **Step 1: Write the failing HAST test**

Create a tree with one image with an empty alt and one image with author-supplied `loading`, `decoding`, and `alt`. Assert the helper assigns `loading: "lazy"`, `decoding: "async"`, and `alt: "图片"` to the first; the second remains unchanged.

```ts
applyImageAttributes(tree)
assert.deepEqual(tree.children[0].properties, {
  src: "a.png",
  alt: "图片",
  loading: "lazy",
  decoding: "async",
})
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `npm test -- quartz/processors/imageAttributes.test.ts`

Expected: FAIL because the helper does not yet exist.

- [ ] **Step 3: Implement the HAST visitor and register it**

Create `applyImageAttributes(root)` using the already-installed `unist-util-visit`:

```ts
visit(root, "element", (node) => {
  if (node.tagName !== "img") return
  node.properties.loading ??= "lazy"
  node.properties.decoding ??= "async"
  if (node.properties.alt === "") node.properties.alt = "图片"
})
```

In `createHtmlProcessor` in `quartz/processors/parse.ts`, append `.use(() => applyImageAttributes)` after configured HTML transforms.

- [ ] **Step 4: Run the focused test**

Run: `npm test -- quartz/processors/imageAttributes.test.ts`

Expected: PASS.

### Task 3: Apply the existing Quartz configuration and content changes

**Files:**

- Modify: `quartz.config.default.yaml`
- Modify: `content/index.md`

- [ ] **Step 1: Set the existing configuration switches**

Change `locale` to `zh-CN`. Disable the `graph` plugin entry. Enable `recent-notes` in the right sidebar. Replace the footer links mapping with:

```yaml
links:
  本站笔记 © Cavill，采用 CC BY-NC-SA 4.0 许可: https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh-hans
```

- [ ] **Step 2: Replace the homepage copy**

Keep the front matter title and publish flags. Replace the duplicate `# About` and construction callouts with a concise Chinese introduction, three internal links to `[[cpp]]`, `[[CMU 15445]]`, and `[[Nano2Tetris]]`, and a sentence naming the CC BY-NC-SA 4.0 license and Cavill.

- [ ] **Step 3: Synchronize the actual public vault**

Run: `npm run sync:obsidian -- --vault "D:\OneDrive\OneDrive\文档\Obsidian Vault"`

Expected: published files are copied, stale generated files are removed, and `content/index.md` remains the edited homepage. If the vault is absent, do not delete destination content; stop and report the unavailable source path.

### Task 4: Verify the site output

**Files:**

- Verify: generated `public/index.html`
- Verify: generated `public/nano2tetris/chapter-1.html`

- [ ] **Step 1: Run all focused tests**

Run: `npm test -- scripts/sync-obsidian-public.test.mjs quartz/processors/imageAttributes.test.ts`

Expected: PASS.

- [ ] **Step 2: Run static checks and production build**

Run: `npm run check && npm run quartz -- build`

Expected: type checking, formatting check, and Quartz build all pass.

- [ ] **Step 3: Inspect output invariants**

Run:

```powershell
Select-String -Path public\index.html -Pattern 'lang="zh"','最近的笔记','CC BY-NC-SA 4.0'
Select-String -Path public\nano2tetris\chapter-1.html -Pattern 'loading="lazy"','decoding="async"'
```

Expected: all patterns match; the generated homepage contains no `正在建设` text and its footer has no GitHub or Discord link.

# Purple Example Callout Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Render semantic `example` callouts in purple while preserving the existing `list` icon.

**Architecture:** Docmd exposes the first word after `::: callout` as a `callout-<type>` CSS class. Change the existing Example block from `info` to `example`, then scope purple tokens to `.callout-example` in the already-configured site stylesheet so light and dark modes both remain legible.

**Tech Stack:** Docmd containers, Markdown, CSS custom properties, Node.js test runner.

---

### Task 1: Define the semantic Example container

**Files:**
- Modify: `content/cpp/03-smart-pointers.md:115`
- Test: `scripts/callout-icons.test.mjs:33-39`

- [ ] **Step 1: Write the failing test**

```js
test('Example callouts use the example semantic type and list icon', async () => {
  const headers = await Promise.all((await markdownFiles(contentDir)).map((file) => readFile(file, 'utf8')))

  for (const content of headers) {
    for (const match of content.matchAll(/^::: callout (\\w+) "Example"\\s+icon:([^\\s]+)/gm)) {
      assert.equal(match[1], 'example')
      assert.equal(match[2], 'list')
    }
  }
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test scripts/callout-icons.test.mjs`

Expected: FAIL because the existing Example container uses `info`.

- [ ] **Step 3: Change the container type without changing its icon**

```md
::: callout example "Example" icon:list
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `node --test scripts/callout-icons.test.mjs`

Expected: PASS with both callout checks green.

### Task 2: Add purple Example styling

**Files:**
- Modify: `assets/css/blockquote.css`
- Test: `scripts/callout-icons.test.mjs`

- [ ] **Step 1: Extend the test with stylesheet assertions**

```js
test('Example callouts have a purple theme in the configured stylesheet', async () => {
  const stylesheet = await readFile('assets/css/blockquote.css', 'utf8')
  assert.match(stylesheet, /\\.callout-example/)
  assert.match(stylesheet, /#7c3aed/i)
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `node --test scripts/callout-icons.test.mjs`

Expected: FAIL because no `.callout-example` selector exists.

- [ ] **Step 3: Add scoped purple CSS tokens for Example callouts**

```css
.main-content .docmd-container.callout-example {
  --example-callout-color: #7c3aed;
  --example-callout-surface: rgb(124 58 237 / 10%);
  border-color: var(--example-callout-color);
  background: var(--example-callout-surface);
}
```

- [ ] **Step 4: Run focused tests and build the site**

Run: `node --test scripts/callout-icons.test.mjs; npm run build`

Expected: all tests pass and docmd writes the site without errors.

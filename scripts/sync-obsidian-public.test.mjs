import assert from "node:assert/strict"
import fs from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import test from "node:test"

const script = new URL("./sync-obsidian-public.mjs", import.meta.url)
const published = "---\npublish: true\ndraft: false\n---\n"

function index(title, notes) {
  const slug = (note) => note
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9\-_.~]/g, "-")
    .replace(/-{2,}/g, "-")
    .replace(/^-+|-+$/g, "")
    || note
  const links = notes.map((note, index) => `- [${note}][note-${index + 1}]`).join("\n")
  const references = notes.map((note, index) => `[note-${index + 1}]: ./${slug(note)}/`).join("\n")

  return `---
title: ${title}
publish: true
draft: false
cssclasses:
  - hide-folder-list
---

# 目录

${links}

${references}
`
}

test("sync generates indexes for synchronized subfolders", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "quartz-sync-"))
  const source = path.join(root, "public")
  const dest = path.join(root, "content")
  const argv = process.argv

  try {
    await fs.mkdir(path.join(source, "C++"), { recursive: true })
    await fs.mkdir(path.join(source, "Notes #1", "Week 1"), { recursive: true })
    await fs.mkdir(dest)
    await fs.writeFile(path.join(dest, "index.md"), "HOME\n")
    await fs.writeFile(path.join(source, "Root note.md"), published)
    await fs.writeFile(path.join(source, "C++", "10-atomic.md"), published)
    await fs.writeFile(path.join(source, "C++", "02-auto.md"), published)
    await fs.writeFile(path.join(source, "C++", "04 spaced note.md"), published)
    await fs.writeFile(
      path.join(source, "C++", "03-draft.md"),
      "---\npublish: true\ndraft: true\n---\n",
    )
    await fs.writeFile(path.join(source, "Notes #1", "01-intro.md"), published)
    await fs.writeFile(path.join(source, "Notes #1", "Week 1", "01-detail.md"), published)
    await fs.writeFile(path.join(source, "Notes #1", "Week 1", "index.md"), published)

    process.argv = ["node", script.pathname, "--source", source, "--dest", dest]
    await import(`${script.href}?test=${Date.now()}`)

    assert.equal(await fs.readFile(path.join(dest, "index.md"), "utf8"), "HOME\n")
    assert.equal(
      await fs.readFile(path.join(dest, "cpp", "index.md"), "utf8"),
      index("C++", ["02-auto", "04 spaced note", "10-atomic"]),
    )
    assert.equal(
      await fs.readFile(path.join(dest, "Notes #1", "index.md"), "utf8"),
      index('"Notes #1"', ["01-intro"]),
    )
    assert.equal(
      await fs.readFile(path.join(dest, "Notes #1", "Week 1", "index.md"), "utf8"),
      index("Week 1", ["01-detail"]),
    )
    await assert.rejects(fs.access(path.join(dest, "cpp", "03-draft.md")))
  } finally {
    process.argv = argv
    await fs.rm(root, { recursive: true, force: true })
  }
})

test("lowercase cpp folder keeps the C++ index title", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "quartz-sync-cpp-"))
  const source = path.join(root, "public")
  const dest = path.join(root, "content")
  const argv = process.argv

  try {
    await fs.mkdir(path.join(source, "cpp"), { recursive: true })
    await fs.writeFile(path.join(source, "cpp", "01-OOP.md"), published)

    process.argv = ["node", script.pathname, "--source", source, "--dest", dest]
    await import(`${script.href}?lowercase-cpp=${Date.now()}`)

    assert.equal(
      await fs.readFile(path.join(dest, "cpp", "index.md"), "utf8"),
      index("C++", ["01-OOP"]),
    )
  } finally {
    process.argv = argv
    await fs.rm(root, { recursive: true, force: true })
  }
})

test("sync removes stale output and adds only missing metadata", async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), "quartz-sync-clean-"))
  const source = path.join(root, "public")
  const dest = path.join(root, "content")
  const argv = process.argv

  try {
    await fs.mkdir(path.join(source, "C++"), { recursive: true })
    await fs.mkdir(path.join(source, "Notes"), { recursive: true })
    await fs.mkdir(path.join(dest, "cpp"), { recursive: true })
    await fs.writeFile(path.join(dest, "index.md"), "HOME\n")
    await fs.writeFile(path.join(dest, ".gitkeep"), "")
    await fs.writeFile(path.join(dest, "cpp", "stale.md"), published)
    await fs.writeFile(path.join(source, "C++", "01-note.md"), `${published}# Note\n`)
    await fs.writeFile(
      path.join(source, "Notes", "02-kept.md"),
      "---\npublish: true\ndraft: false\ndescription: Handwritten\ntags: [keep]\n---\n# Kept\n",
    )

    process.argv = ["node", script.pathname, "--source", source, "--dest", dest]
    await import(`${script.href}?clean=${Date.now()}`)

    assert.equal(await fs.readFile(path.join(dest, "index.md"), "utf8"), "HOME\n")
    assert.equal(await fs.readFile(path.join(dest, ".gitkeep"), "utf8"), "")
    await assert.rejects(fs.access(path.join(dest, "cpp", "stale.md")))
    const generated = await fs.readFile(path.join(dest, "cpp", "01-note.md"), "utf8")
    assert.match(generated, /description: C\+\+ 学习笔记：01-note。/)
    assert.match(generated, /tags:\n  - C\+\+/)
    const handwritten = await fs.readFile(path.join(dest, "Notes", "02-kept.md"), "utf8")
    assert.match(handwritten, /description: Handwritten/)
    assert.match(handwritten, /- keep/)
  } finally {
    process.argv = argv
    await fs.rm(root, { recursive: true, force: true })
  }
})

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

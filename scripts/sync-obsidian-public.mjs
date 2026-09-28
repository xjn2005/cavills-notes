#!/usr/bin/env node
import fs from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"
import YAML from "yaml"

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")
const args = process.argv.slice(2)

function arg(name) {
  const i = args.indexOf(name)
  return i === -1 ? undefined : args[i + 1]
}

function truthy(value) {
  return value === true || value === "true"
}

function frontmatter(markdown) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return match ? (YAML.parse(match[1]) ?? {}) : {}
}

function generatedMetadata(data, relParts, file) {
  const folder = relParts.at(-2)
  const collection = folder === "cpp" ? "C++" : folder
  const title = data.title ?? path.basename(file, path.extname(file))

  return {
    ...data,
    ...(data.description || data.socialDescription || !collection
      ? {}
      : { description: `${collection} 学习笔记：${title}。` }),
    ...(data.tags === undefined && collection ? { tags: [collection] } : {}),
  }
}

function withGeneratedMetadata(markdown, metadata) {
  const match = markdown.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  return match ? `---\n${YAML.stringify(metadata)}---${markdown.slice(match[0].length)}` : markdown
}

function relativePath(base, target) {
  return path.relative(base, target).split(path.sep).join("/")
}

async function removeUnmanaged(target, base, managedPaths) {
  const stat = await fs.lstat(target)
  if (!stat.isDirectory()) {
    if (!managedPaths.has(relativePath(base, target))) await fs.rm(target)
    return
  }

  for (const entry of await fs.readdir(target)) {
    await removeUnmanaged(path.join(target, entry), base, managedPaths)
  }

  if ((await fs.readdir(target)).length === 0) await fs.rmdir(target)
}

async function removeStaleGeneratedContent(dest, managedPaths) {
  for (const entry of await fs.readdir(dest, { withFileTypes: true })) {
    if (entry.name === "index.md" || entry.name.startsWith(".")) continue
    await removeUnmanaged(path.join(dest, entry.name), dest, managedPaths)
  }
}

async function exists(file) {
  try {
    await fs.access(file)
    return true
  } catch {
    return false
  }
}

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    if ([".obsidian", ".trash", "private", "drafts", "node_modules"].includes(entry.name)) {
      continue
    }

    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walk(file)))
    } else {
      files.push(file)
    }
  }

  return files
}

const vault = arg("--vault") ?? process.env.OBSIDIAN_VAULT
const sourceInput = arg("--source") ?? (vault ? path.join(vault, "public") : undefined)
const dest = path.resolve(arg("--dest") ?? path.join(repo, "content"))

if (!sourceInput) {
  console.error('Usage: npm run sync:obsidian -- --vault "D:\\path\\to\\vault"')
  process.exit(1)
}

const source = path.resolve(sourceInput)

if (!(await exists(source))) {
  console.error(`Source folder not found: ${source}`)
  process.exit(1)
}

if (source === dest) {
  console.error("Source and destination are the same folder.")
  process.exit(1)
}

await fs.mkdir(dest, { recursive: true })

let copied = 0
let skipped = 0
const indexes = new Map()
const managedPaths = new Set()

for (const file of await walk(source)) {
  const sourceRelParts = path.relative(source, file).split(path.sep)
  const relParts = [...sourceRelParts]
  if (relParts[0] === "C++") {
    relParts[0] = "cpp"
  }

  if (relParts.length === 1 && relParts[0].toLowerCase() === "index.md") {
    continue
  }

  if (path.extname(file).toLowerCase() === ".md") {
    const text = await fs.readFile(file, "utf8")
    const data = frontmatter(text)
    if (!truthy(data.publish) || truthy(data.draft)) {
      skipped++
      continue
    }

    const target = path.join(dest, ...relParts)
    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.writeFile(target, withGeneratedMetadata(text, generatedMetadata(data, relParts, file)))
    managedPaths.add(relativePath(dest, target))
    copied++
  } else {
    const target = path.join(dest, ...relParts)
    await fs.mkdir(path.dirname(target), { recursive: true })
    await fs.copyFile(file, target)
    managedPaths.add(relativePath(dest, target))
    copied++
  }

  const dirParts = relParts.slice(0, -1)
  for (let depth = 1; depth <= dirParts.length; depth++) {
    const parts = dirParts.slice(0, depth)
    const key = parts.join(path.sep)
    if (!indexes.has(key)) {
      const title = depth === 1 && parts[0] === "cpp" ? "C++" : sourceRelParts[depth - 1]
      indexes.set(key, { parts, title, notes: [] })
    }
  }

  if (
    dirParts.length > 0 &&
    path.extname(file).toLowerCase() === ".md" &&
    relParts.at(-1).toLowerCase() !== "index.md"
  ) {
    indexes
      .get(dirParts.join(path.sep))
      .notes.push(path.basename(relParts.at(-1), path.extname(relParts.at(-1))))
  }
}

for (const { parts, title, notes } of indexes.values()) {
  const directory = path.join(dest, ...parts)
  const links = notes
    .sort((a, b) => a.localeCompare(b, "zh-CN", { numeric: true }))
    .map((note) => `- [${note}](./${note}.md)`)
    .join("\n")

  await fs.mkdir(directory, { recursive: true })
  const target = path.join(directory, "index.md")
  await fs.writeFile(
    target,
    `---
${YAML.stringify({ title, publish: true, draft: false, cssclasses: ["hide-folder-list"] })}---

# 目录

${links}${links ? "\n" : ""}`,
  )
  managedPaths.add(relativePath(dest, target))
}

await removeStaleGeneratedContent(dest, managedPaths)

console.log(`Synced ${copied} file(s) to ${path.relative(repo, dest)}; skipped ${skipped}.`)

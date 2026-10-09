import assert from 'node:assert/strict'
import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import test from 'node:test'
import * as lucide from 'lucide-static'

const contentDir = path.resolve('content')

async function markdownFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  return (await Promise.all(
    entries.map((entry) =>
      entry.isDirectory()
        ? markdownFiles(path.join(dir, entry.name))
        : entry.name.endsWith('.md')
          ? [path.join(dir, entry.name)]
          : [],
    ),
  )).flat()
}

function iconKey(icon) {
  return icon.split('-').map((part) => part[0].toUpperCase() + part.slice(1)).join('')
}

test('every callout icon resolves in lucide-static', async () => {
  const headers = await Promise.all((await markdownFiles(contentDir)).map((file) => readFile(file, 'utf8')))
  const icons = headers.flatMap((content) => [...content.matchAll(/^::: callout .*\bicon:([^\s]+)/gm)].map((match) => match[1]))

  for (const icon of icons) assert.ok(lucide[iconKey(icon)], `${icon} is not a Lucide icon`)
})

test('Example callouts use the example type and list icon', async () => {
  const headers = await Promise.all((await markdownFiles(contentDir)).map((file) => readFile(file, 'utf8')))
  const exampleCallouts = headers.flatMap((content) => [...content.matchAll(/^::: callout (\w+) "Example"\s+icon:([^\s]+)/gm)])

  assert.ok(exampleCallouts.length > 0, 'Expected at least one Example callout')

  for (const match of exampleCallouts) {
    assert.equal(match[1], 'example')
    assert.equal(match[2], 'list')
  }
})

test('Example callouts have a purple Docmd style override', async () => {
  const stylesheet = await readFile(path.resolve('assets/css/blockquote.css'), 'utf8')
  const rule = stylesheet.match(/\.main-content\s+\.docmd-container\.callout-example\s*\{(?<declarations>[^}]*)\}/)

  assert.ok(rule, 'Expected an Example callout CSS rule')
  assert.match(rule.groups.declarations, /--callout-color\s*:\s*#7c3aed\s*;/i)
  assert.match(rule.groups.declarations, /background\s*:\s*rgb\(124\s+58\s+237\s*\/\s*8%\)\s*;/i)
})

test('Note callouts have a blue Docmd style override', async () => {
  const stylesheet = await readFile(path.resolve('assets/css/blockquote.css'), 'utf8')
  const rule = stylesheet.match(/\.main-content\s+\.docmd-container\.callout-note\s*\{(?<declarations>[^}]*)\}/)

  assert.ok(rule, 'Expected a Note callout CSS rule')
  assert.match(rule.groups.declarations, /--callout-color\s*:\s*#3498db\s*;/i)
  assert.match(rule.groups.declarations, /background\s*:\s*rgb\(52\s+152\s+219\s*\/\s*8%\)\s*;/i)
})

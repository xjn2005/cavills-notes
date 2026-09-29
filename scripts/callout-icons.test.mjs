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

test('Example callouts use the list icon', async () => {
  const headers = await Promise.all((await markdownFiles(contentDir)).map((file) => readFile(file, 'utf8')))

  for (const content of headers) {
    for (const match of content.matchAll(/^::: callout .*"Example"\s+icon:([^\s]+)/gm)) {
      assert.equal(match[1], 'list')
    }
  }
})

# Noesis site refresh

## Scope

Refresh the public Quartz site without adding dependencies or changing the Obsidian vault. The site remains a static, Chinese-language learning-notes site.

## Site experience

- Set Quartz locale to `zh-CN` so generated UI, dates, and document language match the notes.
- Replace the homepage construction notice with a concise Chinese introduction and links to the three current learning collections: C++, CMU 15445, and Nano2Tetris.
- Enable the existing Recent Notes component and remove the default Graph component from the page layout.
- Retain Quartz's generated footer line. Replace its GitHub and Discord links with one link reading: `本站笔记 © Cavill，采用 CC BY-NC-SA 4.0 许可`, pointing to the CC BY-NC-SA 4.0 license.

## Publishing and metadata

- Treat every item in `content/` except the root `content/index.md` as generated from the Obsidian public source.
- After the source is scanned, remove generated destination files and empty directories that are no longer represented by a published source file or a generated folder index. Never remove the root homepage.
- During copying, preserve source front matter. When absent, derive a short description from the note title and its first directory, and add the directory as a tag. Existing `description`, `socialDescription`, and `tags` fields always win.
- Generated folder indexes retain their explicit title and directory tag.

## Images and accessibility

- Add a small local Quartz transformer that assigns `loading="lazy"` and `decoding="async"` to content images unless an author already supplied those attributes.
- Keep existing remote image URLs. Preserve meaningful Markdown alt text; use a neutral fallback only for empty alt attributes.

## Validation

- Extend the sync script tests to prove stale output is removed while the homepage is preserved, and to prove handwritten metadata is not overwritten.
- Add a focused transformer test for image attributes.
- Run the relevant tests, type/format checks, and a production build. Inspect generated homepage metadata and footer output.

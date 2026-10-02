# Cavill's Notes

[![Built with docmd](https://img.shields.io/badge/Built%20with-docmd-0ea5e9)](https://docmd.io/)
[![GitHub Pages](https://img.shields.io/badge/Deployed%20on-GitHub%20Pages-222222?logo=github)](https://pages.github.com/)

Cavill's Notes 是 Cavill 的公开学习知识库，使用 docmd 构建。公开笔记直接维护在 [`content/`](content/) 中。

网站地址：https://notes.cavill.site/

## 本地开发

```bash
npm install
npm run dev
```

提交前运行：

```bash
npm run build
npm run check
```

每篇公开笔记是一个 Markdown 文件，可用 frontmatter 控制发布状态：

```yaml
---
publish: true
draft: false
---
```

## License

[![CC BY-NC-SA 4.0](https://www.heartnn.com/imgs/cc/big/by_nc_sa.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en)

本站内容采用 [CC-BY-NC-SA：署名-非商业性使用-相同方式共享](https://creativecommons.org/licenses/by-nc-sa/4.0/deed.en) 许可协议。

# 显式导航设计

## 目标

用单一导航文件固定侧栏的组与文章顺序，消除本机和部署环境的区域排序差异。

## 实现

新增 `content/navigation.json`，按数组顺序列出欢迎页、CMU 15445、Cpp、Nano2Tetris 和概率论。每个分组只声明 `title`、`collapsible` 和 `children`，不声明 `path`，因此分组标题只负责展开和收起，不可点击。

文章继续使用现有 Markdown 文件与 URL；概率论子项固定为“样本空间、事件和概率”在前、“随机变量及其分布”在后。

## 验证

运行 `npm run check` 与 `npm run build`，确认生成页面中的侧栏标题顺序和概率论子项顺序均与导航文件一致。

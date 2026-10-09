# Set Family Section Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the first section of the real-analysis chapter with the textbook-aligned foundations of indexed set families and their operations.

**Architecture:** Replace only the current first section of the chapter with four short subsections: notation, generalized union and intersection, basic properties, and De Morgan's laws. End with a transition to the already-existing sequence section. Keep the remaining chapter unchanged.

**Tech Stack:** Markdown, KaTeX, DocMD validation and build commands.

---

### Task 1: Rewrite the set-family section

**Files:**
- Modify: `content/实变函数/第一章.md:11-27`

- [ ] **Step 1: Confirm the existing section boundary**

Run:

```powershell
rg -n -C 2 '^## 1\.|^## 2\.' 'content\实变函数\第一章.md'
```

Expected: the replacement starts at `## 1.` and ends immediately before `## 2.`.

- [ ] **Step 2: Replace the section with the approved structure**

Replace the current content from `## 1.` through the line before `## 2.` with:

````markdown
## 1. 集族及其基本运算

### 1.1 集族与指标集

设 $\Lambda$ 是一个指标集。若对每个 $\lambda\in\Lambda$ 都指定一个集合 $A_\lambda$，则称

$$
\{A_\lambda\}_{\lambda\in\Lambda}
$$

为一个以 $\Lambda$ 为指标集的**集族**。不同的指标可以对应同一个集合；集族关注的是这些集合连同它们的编号。

当 $\Lambda=\mathbb N$ 时，集族通常写作

$$
A_1,A_2,A_3,\ldots,
$$

并称为**集列**。

### 1.2 广义并与广义交

集族 $\{A_\lambda\}_{\lambda\in\Lambda}$ 的广义并与广义交分别定义为

$$
\bigcup_{\lambda\in\Lambda}A_\lambda
=
\{x:\exists\lambda\in\Lambda,\ x\in A_\lambda\},
$$

$$
\bigcap_{\lambda\in\Lambda}A_\lambda
=
\{x:\forall\lambda\in\Lambda,\ x\in A_\lambda\}.
$$

也就是说，元素属于广义并，当且仅当它属于集族中的**至少一个**集合；元素属于广义交，当且仅当它属于集族中的**每一个**集合。

### 1.3 基本性质

以下补集都相对于固定的全集 $X$ 而言。对空指标集，约定

$$
\bigcup_{\lambda\in\varnothing}A_\lambda=\varnothing,
\qquad
\bigcap_{\lambda\in\varnothing}A_\lambda=X.
$$

若对每个 $\lambda\in\Lambda$ 都有 $A_\lambda\subseteq B_\lambda$，则

$$
\bigcup_{\lambda\in\Lambda}A_\lambda
\subseteq
\bigcup_{\lambda\in\Lambda}B_\lambda,
\qquad
\bigcap_{\lambda\in\Lambda}A_\lambda
\subseteq
\bigcap_{\lambda\in\Lambda}B_\lambda.
$$

### 1.4 德摩根律

对于任意集族，有

$$
\left(\bigcup_{\lambda\in\Lambda}A_\lambda\right)^c
=
\bigcap_{\lambda\in\Lambda}A_\lambda^c,
$$

$$
\left(\bigcap_{\lambda\in\Lambda}A_\lambda\right)^c
=
\bigcup_{\lambda\in\Lambda}A_\lambda^c.
$$

直观地说，「不属于任何一个集合」等于「对每个集合都不属于」；「不同时属于所有集合」等于「至少有一个集合不属于」。

下一节研究指标集为 $\mathbb N$ 的特殊集族，即集列的单调性与极限。
````

- [ ] **Step 3: Inspect the resulting heading hierarchy**

Run:

```powershell
rg -n '^## 1\.|^### 1\.[1-4]|^## 2\.' 'content\实变函数\第一章.md'
```

Expected: headings appear in the order `1`, `1.1`, `1.2`, `1.3`, `1.4`, `2`.

### Task 2: Validate the rendered documentation

**Files:**
- Verify: `content/实变函数/第一章.md`

- [ ] **Step 1: Validate internal references**

Run:

```powershell
npm run check
```

Expected: `All internal links and references are valid!`.

- [ ] **Step 2: Build the site**

Run:

```powershell
npm run build
```

Expected: `Build complete` with no Markdown or KaTeX parse errors.

- [ ] **Step 3: Verify the generated page contains the new section heading**

Run:

```powershell
rg -n '集族及其基本运算' 'site\实变函数\第一章\index.html'
```

Expected: one generated chapter heading for the completed set-family section.

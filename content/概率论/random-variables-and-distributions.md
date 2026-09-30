---
title: 随机变量及其分布
publish: true
draft: false
description: 概率论学习笔记：随机变量及其分布。
tags:
  - 概率论
---


## 随机变量及其分布函数

### 随机变量

**定义**：设 $(\Omega,\mathcal F,P)$ 为概率空间。若函数 $X:\Omega\to\mathbb R$ 满足：对任意实数 $x$，集合

  $$
  \{\omega\in\Omega:X(\omega)\le x\}\in\mathcal F,
  $$

则称 $X$ 为该概率空间上的随机变量。

> 可以看这篇 [回答](https://www.zhihu.com/question/43721834/answer/2062925027457098619) ，来进一步了解随机变量的本质。

### 随机变量的分布函数

**定义**：设 $X$ 为一随机变量，对于任意实数 $x$，则 $X$ 的 **分布函数** 为：

$$
F(x) = P (X\le x),\quad x \in \mathbb{R}
$$

为了方便，有时记作 $F_X(x)$

**性质**：

- $F(x)$ 单调不减

  $$
  \forall x_1<x_2, F(x_1)\le F(x_2)
  $$

- $0\le F(x) \le 1$，且

  $$
  \lim_{x\to+\infty}F(x) = 1,\lim_{x\to-\infty}F(x) = 0
  $$

- **用分布函数表示概率**

	$$
	\begin{aligned} P(X\le x_0) &= F(x_0)\\ P(X<x_0) &=\lim_{\Delta x\to0_+}P(X\le x_0-\Delta x)\\ &=\lim_{\Delta x\to0_+}F(x_0-\Delta x)\\ &=F(x_0-0)\\ P(X=x_0) &= F(x_0) - F(x_0-0)\\ P(a<X\le b) &= F(b) - F(a) \end{aligned}
	$$

## 离散型随机变量及其分布列
### 离散型随机变量概率分布

**定义**：随机变量 $X$ 的可能取值是有限个或可列无穷多个

**分布列**：设离散型随机变量 $X$ 的所有可能取值为 $X=x_k (k=1,2,\cdots)$，不妨设 $x_1<x_2<\cdots$，则 $X$ 的分布列为

$$
P(X=x_k) = p_k, k = 1,2,\cdots
$$

**性质**：

1. $$
   p_k\ge0,  k = 1,2,\cdots
   $$

2. $$
   \sum_{k=1}^{\infty}p_k = 1
   $$

### 分布函数

**定义**：$F(x) = P(X\le x)=\sum_{x_k\le x}P(X=x_k)$

**性质**：
- $P(X = x_k) = p_k = P(x_{k-1}<X\le x_k) = F(x_k) - F(x_{k-1})$

- $F(x)$ 为分段阶梯函数

- 在 $X$ 的可能取值处存在第一类跳跃间断点

## 常见离散型随机变量

### 0-1 分布 (两点分布)

随机变量只有两个可能取值，分布列由下表所示

$$
\begin{array}{c|cc} \hline \quad X\quad &\quad 1\quad &\quad 0\quad\\ \hline P&p&1-p\\ \hline \end{array}
$$

其中 $0<p<1$，称 $X$ 服从参数为 $p$ 的 **0-1 分布**，记作 $X\sim B(1,p)$，

也可写成

$$
P(X=k)=p^k (1-p)^{1-k}, k = 0,1
$$

### 二项分布

#### n重伯努利试验

$n$ 重伯努利试验具有以下特点：

1. 可独立地进行 $n$ 次试验，即各次试验的可能性互不影响；
2. 每次试验仅有两个结果：事件 $A$ 发生或 $\overline A$ 发生。

设在每次试验中，事件 $A$ 发生的概率为

$$
P(A)=p,
\qquad
0<p<1
$$

令随机变量 $X$ 表示事件 $A$ 在 $n$ 次试验中发生的次数，则

$$
P(X=k)
=
\mathrm C_n^k p^k(1-p)^{n-k},
\qquad
k=0,1,\ldots,n
$$

称 $X$ 服从参数为 $(n,p)$ 的**二项分布**，记为

$$
X\sim B(n,p)
$$

对于任意整数 $N$，

$$
P(X>N)
=
\sum_{k=N+1}^{n}P(X=k)
$$

#### 最可能出现的次数

记

$$
P_k=P(X=k)
$$

若 $k$ 为二项分布中最可能出现的次数，则有

$$
\begin{cases}
\dfrac{P_{k-1}}{P_k}
=
\dfrac{(1-p)k}{p(n-k+1)}
\le 1,\\[12pt]
\dfrac{P_k}{P_{k+1}}
=
\dfrac{(1-p)(k+1)}{p(n-k)}
\ge 1
\end{cases}
$$

因此，

$$
(n+1)p-1
\le k\le
(n+1)p
$$

<figure style="max-width: 620px; margin: 1.5rem auto; text-align: center;">
  <img
    src="https://cdn.jsdelivr.net/gh/xjn2005/my-blog-images/img/20260930224318555.png"
    alt="不同参数下的二项分布"
    style="display: block; width: 88%; height: auto; margin: 0 auto;"
  >
  <figcaption style="margin-top: 0.5rem; font-size: 0.9em; opacity: 0.75;">
    不同参数下的二项分布
  </figcaption>
</figure>

### 泊松分布

**泊松定理**：设 $\lim\limits_{n\to+\infty}np_n = \lambda > 0$，则

$$
\lim_{n\to+\infty}\mathrm C_n^k p_n^k (1-p_n)^{n-k} = \mathrm e^{-\lambda} \dfrac{\lambda^k}{k!}, k = 0, 1, 2, \cdots
$$

**推论**：假设 $np_n = \lambda>0 (n=1,2,\cdots)$，则上述公式仍成立。

::: callout info "说明" icon:info
二项分布的极限分布是泊松分布：当二项分布 $n$ 较大而 $p$ 较小时 ($n\ge20, p\le0.05$)，有如下近似

$$
P(X>N) = \sum_{k = N+1}^nP(X = k)\approx\sum_{k=N+1}^\infty\mathrm e^{-np}\dfrac{(np)^k}{k!} = 1 - \sum_{0}^{N}\mathrm e^{-np}\dfrac{(np)^k}{k!}
$$
:::

**泊松分布**：设随机变量 $X$ 的所有可能取值为 $0,1,2,\cdots$，且分布列为

$$
P(X=k) = \mathrm e^{-\lambda} \dfrac{\lambda^k}{k!}, k = 0,1,2,\cdots
$$

其中 $\lambda>0$，称 $X$ 服从参数为 $\lambda$ 的 **泊松分布**，记为 $X\sim P(\lambda)$ 或 $\pi(\lambda)$

<figure style="max-width: 620px; margin: 1.5rem auto; text-align: center;">
  <img
    src="https://cdn.jsdelivr.net/gh/xjn2005/my-blog-images/img/20260930224602233.png"
    alt="不同参数下的泊松分布"
    style="display: block; width: 88%; height: auto; margin: 0 auto;"
  >
  <figcaption style="margin-top: 0.5rem; font-size: 0.9em; opacity: 0.75;">
    不同参数下的泊松分布
  </figcaption>
</figure>

## 连续型随机变量及其概率密度

### 连续性随机变量的概率密度

**定义**：设 $X$ 是⼀随机变量，$F(X)$ 是它的分布函数，若存在一个非负可积函数 $f(x)$ 使得

$$
F(x) = \int_{-\infty}^xf(t) \mathrm dt,-\infty<x<+\infty
$$

则称 $X$ 为 **连续型随机变量**，$f(x)$ 为它的 **概率密度函数** (**概率密度/密度函数**)，$f(x)$ 可记为 $f_X(x)$

**性质**：

1. $X$ 的分布函数 $F(x)$ 连续。

2. 对于同一个随机变量 $X$，其概率密度函数 $f(x)$ 不唯一。允许其在有限个或可列无穷多个点处取不同的函数值。

3. **非负性**

   $$
   f(x)\ge 0.
   $$

4. **规范性**

   $$
   \int_{-\infty}^{+\infty}f(x)\,\mathrm dx
   =
   F(+\infty)
   =
   1.
   $$

5. 在 $f(x)$ 的连续点 $x$ 处，

   $$
   f(x)=F'(x).
   $$

6. $f(x)$ 描述了 $X$ 在 $x_0$ 附近单位长度区间内取值的概率。具体地，当 $\Delta x$ 很小时，

   $$
   P(x_0<X\le x_0+\Delta x)
   \approx
   f(x_0)\Delta x.
   $$

7. 若 $a$ 是随机变量 $X$ 的一个可能取值，则

   $$
   P(X=a)=0.
   $$

8. 对任意实数 $a<b$，

   $$
   \begin{aligned}
   P(a<X\le b)
   &=
   P(a\le X\le b)\\
   &=
   P(a<X<b)\\
   &=
   P(a\le X<b)\\
   &=
   \int_a^b f(x)\,\mathrm dx.
   \end{aligned}
   $$

   此外，

   $$
   P(X\le b)
   =
   P(X<b)
   =
   \int_{-\infty}^{b}f(x)\,\mathrm dx,
   $$

   $$
   P(X>a)
   =
   P(X\ge a)
   =
   \int_a^{+\infty}f(x)\,\mathrm dx.
   $$

### 常见连续型随机变量的分布
#### 均匀分布
$X$ 服从区间 $(a,b)$ 上的 **均匀分布**，记为 $X\sim U(a,b)$

- **密度函数**

$$
f(x) = \begin{cases}\dfrac{1}{b-a},&a<x<b,\\0,&\rm otherwise.\end{cases}
$$

- **分布函数**

$$
F(X) = \begin{cases}0, &x<a,\\\dfrac{x-a}{b-a},&a\le x<b,\\1,&x\ge b.\end{cases}
$$

<figure style="max-width: 620px; margin: 1.5rem auto; text-align: center;">
  <img
    src="https://cdn.jsdelivr.net/gh/xjn2005/my-blog-images/img/20260930224848546.png"
    alt="均匀分布"
    style="display: block; width: 88%; height: auto; margin: 0 auto;"
  >
  <figcaption style="margin-top: 0.5rem; font-size: 0.9em; opacity: 0.75;">
    均匀分布
  </figcaption>
</figure>

#### 指数分布
$X$ 服从参数为 $\lambda$ 的 **指数分布**，记为 $X\sim E(\lambda)$

- **密度函数**

$$
f(x) = \begin{cases}\lambda \mathrm e^{-\lambda x},&x>0,\\0,&x\le 0.\\\end{cases}
$$

- **分布函数**

$$
F(x) = \begin{cases}0,&x<0,\\1-\mathrm e^{-\lambda x},&x\ge 0.\end{cases}
$$

<figure style="max-width: 620px; margin: 1.5rem auto; text-align: center;">
  <img
    src="https://cdn.jsdelivr.net/gh/xjn2005/my-blog-images/img/20260930225106926.png"
    alt="不同参数下的指数分布"
    style="display: block; width: 88%; height: auto; margin: 0 auto;"
  >
  <figcaption style="margin-top: 0.5rem; font-size: 0.9em; opacity: 0.75;">
    不同参数下的指数分布
  </figcaption>
</figure>

对任意 $0<a<b$，

$$
P(a<X<b) = \mathrm e^{-\lambda a} - \mathrm e^{-\lambda b}
$$

指数分布的 **无记忆性**：若 $X\sim E(\lambda)$，则已经用了 $s$ 小时，还能用 $t$ 小时的概率为

$$
P(X>s+t \mid X>s) = P(X>t)
$$

::: callout info "说明" icon:info
泊松分布与指数分布关系：一段时间内顾客来的概率服从泊松分布，则时间间隔服从指数分布。
:::

#### 正态分布
$X$ 服从参数为 $\mu,\sigma$ 的 **正态分布**，记为 $X\sim N(\mu, \sigma^2)$

**密度函数**:

$$
f(x) = \dfrac{1}{\sqrt{2\pi} \sigma}\exp (-\dfrac{(x-\mu)^2}{2\sigma^2}),\quad-\infty<x<+\infty
$$

 **性质**:

1. 直线关于 $x=\mu$ 对称：$f(\mu + x) = f(\mu - x)$

2. $\sigma$ **形状参数**
   - 与曲线陡峭程度成反比

   - 与数据分散程度成正比

3. $\mu$ **位置参数**：对称轴的位置

<figure style="max-width: 620px; margin: 1.5rem auto; text-align: center;">
  <img
    src="https://cdn.jsdelivr.net/gh/xjn2005/my-blog-images/img/20260930225528011.png"
    alt="不同参数下的正态分布"
    style="display: block; width: 88%; height: auto; margin: 0 auto;"
  >
  <figcaption style="margin-top: 0.5rem; font-size: 0.9em; opacity: 0.75;">
    不同参数下的正态分布
  </figcaption>
</figure>


#### 标准正态分布

$X\sim N(0,1)$ 为 **标准正态分布**

- **密度函数**:

$$
\varphi(x) = \dfrac{1}{\sqrt{2\pi}} \mathrm e^{-\frac{x^2}{2}},\quad-\infty<x<+\infty
$$

- **分布函数**

$$
\mathit\Phi(x) = \dfrac{1}{\sqrt{2\pi}}\int_{-\infty}^x\mathrm e^{-\frac{t^2}{2}} \mathrm dt,\quad-\infty<x<+\infty
$$

**性质**：

- $\mathit\Phi(-x) = 1-\mathit\Phi(x)$

- $P(| X |\le a) = 2 \mathit\Phi(a)-1$

- 一般正态分布可以由线性变换 $Y=\dfrac{X-\mu}{\sigma}$ 转化为标准正态分布：若 $X\sim N(\mu, \sigma^2)$，则 $X = \dfrac{X-\mu}{\sigma}$

- 一般正态分布概率的计算可以转化为标准正态分布的概率来计算：若 $X\sim N(\mu, \sigma^2)$，则 $F(x) = \mathit\Phi\left(\dfrac{x-\mu}{\sigma}\right)$

## 随机变量函数的分布的求解方法
### 离散型随机变量函数的分布

设 $Y=g(X)$，其中 $X$ 为离散型随机变量。求 $Y$ 的分布列可按以下步骤进行：

1. 列出 $X$ 的全部可能取值及其分布列

2. 由 $Y=g(X)$ 求出 $Y$ 的全部可能取值

3. 对每个 $y$，将所有满足 $g(x_i)=y$ 的概率相加

   $$
   P(Y=y)
   =
   \sum_{x_i:\,g(x_i)=y}P(X=x_i).
   $$

由此得到 $Y$ 的分布列。

::: callout warning "注意" icon:triangle-alert
不同的 $x_i$ 可能对应同一个 $y$，此时不能只取其中一项概率，而应将它们相加。
:::

### 连续型随机变量的分布

1. 由分布函数定义 $F_Y(y) = P(Y \le y) = P(g(X) \le y)$

2. 对上式变换，若函数 $g(x)$ 在 $(-\infty, +\infty)$ 内严格单调递增，则 $F_Y(y) =P(X \le g^{-1}(y)) = F_X(g^{-1}(y))$

    - 如果严格单调递减，则 $F_Y(y) = P(X \ge g^{-1}(y)) = 1 - F_X(g^{-1}(y))$

	- 如果不严格单调，则用区间表示，比如平方会对应 $P(X^2 \le y) = P(-\sqrt y \le X \le \sqrt y)$

3. 将 $g^{-1}(y)$ 作为自变量代入 $F(x)$，得到上式左边的 $F_Y(y)$

4. 对 $F_Y(x)$ 求导得到 $y$ 的密度函数 $f_Y(x)$

### 一般性定理
设随机变量 $X$ 具有概率密度 $f_X(x),-\infty < x < +\infty$，$g(x)$ 为 $(-\infty, +\infty)$ 内的严格单调的可导函数，则随机变量 $Y = g(X)$ 的概率密度为

$$
f_Y(y) = \begin{cases}| h'(y) |\cdot f_X[ h(y) ],&\alpha<y < \beta,\\0,&\text{otherwise.}\end{cases}
$$

其中：

- $h(y)$ 是 $g(x)$ 的反函数

- $\alpha = \min\{g(-\infty), g(+\infty)\}, \beta = \max\{g(-\infty), g(+\infty)\}$

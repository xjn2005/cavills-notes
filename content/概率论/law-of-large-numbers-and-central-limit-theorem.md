---
title: 大数定律和中心极限定理
publish: true
draft: false
description: 概率论学习笔记：大数定律和中心极限定理。
tags:
  - 概率论
---

## 前置知识
### 马尔可夫不等式
设非负随机变量 $X$ 满足 $E(X)<+\infty$，则对于任意 $\varepsilon>0$，有

$$
P(X \geq \varepsilon) \leq \frac{E(X)}{\varepsilon}
$$

### 广义马尔可夫不等式
广义马尔可夫不等式给出随机变量绝对值超过阈值的概率上界。设随机变量 $X$ 满足 $E(|X|^k)<+\infty$，其中 $k>0$，则对于任意 $\varepsilon>0$，有

$$
P(|X| \geq \varepsilon) \leq \frac{E\left(|X|^{k}\right)}{\varepsilon^{k}}
$$

### 切比雪夫不等式
切比雪夫不等式给出随机变量偏离其期望的概率上界。设随机变量 $X$ 的期望为 $E(X)=\mu$，方差为 $D(X)=\sigma^2<+\infty$，则对于任意 $\varepsilon>0$，恒有

$$
P(|X-\mu| \geqslant \varepsilon) \leqslant \frac{\sigma^{2}}{\varepsilon^{2}}
$$

或

$$
P(|X-\mu|<\varepsilon)>1-\frac{\sigma^{2}}{\varepsilon^{2}}
$$

### 依概率收敛
设 $Y_{1},Y_{2},\cdots,Y_{n},\cdots$ 是一个随机变量序列，$X$ 是一个随机变量，若 $\forall \varepsilon > 0$，有

$$
\lim _{n \rightarrow+\infty} P\left(\left|Y_{n}-X\right| \geqslant \varepsilon\right)=0
$$

或

$$
\lim _{n \rightarrow+\infty} P\left(\left|Y_{n}-X\right|<\varepsilon\right)=1
$$

则称随机变量序列 $Y_{1},Y_{2},\cdots,Y_{n},\cdots$ 依概率收敛于 $X$，记作 $Y_{n} \underset{n \rightarrow+\infty}{\stackrel{P}{\longrightarrow}} X$

## 大数定律
### 弱大数定律
若随机变量序列 $X_{1},X_{2},\cdots,X_{n},\cdots$ 的期望均存在，且对任意 $\varepsilon>0$，有

$$
\lim _{n \rightarrow+\infty} P\left(\left|\frac{1}{n} \sum_{k=1}^{n} X_{k}-\frac{1}{n} \sum_{k=1}^{n} E\left(X_{k}\right)\right|<\varepsilon\right)=1
$$

则称该序列满足 **弱大数定律**。

- 当 $n\to\infty$ 时，样本均值与其均值之差落在任意给定邻域内的概率趋于 $1$。

### 伯努利大数定律
设进行 $n$ 次相互独立的伯努利试验，事件 $A$ 在每次试验中发生的概率均为 $p$，$n_A$ 表示事件 $A$ 发生的次数，则对任意 $\varepsilon>0$，有

$$
\lim _{n \rightarrow+\infty} P\left(\left|\frac{n_{A}}{n}-p\right| \geqslant \varepsilon\right)=0
$$

或

$$
\lim _{n \rightarrow+\infty} P\left(\left|\frac{n_{A}}{n}-p\right|<\varepsilon\right)=1
$$

即随机事件 $A$ 在 $n$ 次试验中发生的 **频率** $\dfrac{n_A}{n}$ **依概率收敛** 于 $A$ 在一次试验中发生的 **概率** $p$

### 切比雪夫大数定律
若随机变量序列 $X_{1},X_{2},\cdots,X_{n},\cdots$ 的均值和方差均存在，且满足以下条件：

- 随机变量序列 $X_{1},X_{2},\cdots,X_{n},\cdots$ **两两不相关**：$\operatorname{Cov}(X_i,X_j)=0\ (i\ne j)$

- **方差有共同上界**：$D\left(X_{k}\right)=\sigma_{k}^{2}\leqslant\sigma^{2},\ k=1,2,\cdots$

则该序列满足弱大数定律。记 $E(X_k)=\mu_k$，则对任意 $\varepsilon>0$，有

$$
\lim _{n \rightarrow+\infty} P\left(\left|\frac{1}{n} \sum_{k=1}^{n} X_{k}-\frac{1}{n} \sum_{k=1}^{n} \mu_{k}\right|<\varepsilon\right)=1
$$

### 辛钦大数定律
随机变量序列 $X_{1},X_{2},\cdots,X_{n},\cdots$ 满足以下条件：

- **独立同分布**（i.i.d.）

- $E(|X_1|)<+\infty$，记 $E(X_k)=\mu,\ k=1,2,\cdots$

则该序列满足弱大数定律。对任意 $\varepsilon>0$，有

$$
\lim _{n \rightarrow+\infty} P\left(\left|\frac{1}{n} \sum_{k=1}^{n} X_{k}-\mu\right|<\varepsilon\right)=1
$$

### 马尔科夫大数定律
设随机变量序列 $X_{1},X_{2},\cdots,X_{n},\cdots$ 的均值和方差均存在，且满足

$$
D\left(\dfrac1n\sum_{k=1}^{n} X_{k}\right) = \frac{1}{n^{2}} D\left(\sum_{k=1}^{n} X_{k}\right) \stackrel{n \rightarrow \infty}{\longrightarrow } 0
$$

则该随机变量序列满足弱大数定律。即对任意 $\varepsilon>0$，有

$$
\lim_{n \rightarrow \infty} P\left(\left|\frac{1}{n} \sum_{i=1}^{n} X_{i}-\frac{1}{n} \sum_{i=1}^{n} E\left(X_{i}\right)\right|<\varepsilon\right)=1
$$

## 中心极限定理
### 独立同分布的中心极限定理
设 $X_{1},X_{2},\cdots,X_{n},\cdots$ 为独立同分布的随机变量序列，$E(X_k)=\mu$，$D(X_k)=\sigma^2$，其中 $0<\sigma^2<+\infty$。记 $\displaystyle\sum_{k=1}^n X_k$ 的标准化随机变量为

$$
Y_n = \dfrac{\displaystyle\sum_{k=1}^nX_k-n\mu}{\sqrt{n} \sigma}
$$

则

$$
\lim_{n\to\infty}P(Y_n\le y)=\Phi(y)=\dfrac{1}{\sqrt{2\pi}}\int_{-\infty}^y\mathrm e^{-\frac{t^2}{2}}\,\mathrm dt
$$

即

$$
Y_n\xrightarrow{\mathcal D}N(0,1).
$$

因此，当 $n$ 充分大时，$\displaystyle\sum_{k=1}^n X_k$ 可近似服从 $N(n\mu,n\sigma^2)$。

$$
P\left(\sum_{k=1}^n X_k \le x\right)\approx \mathit\Phi\left(\dfrac{x - n\mu}{\sqrt n \sigma}\right)
$$

### 棣莫弗-拉普拉斯中心极限定理
设随机变量 $Y_n\sim B(n,p)$，其中 $0<p<1$，$n=1,2,\cdots$，则

$$
\dfrac{Y_n-np}{\sqrt{np(1-p)}}\xrightarrow{\mathcal D}N(0,1)
$$

### 用频率估计概率
设进行 $n$ 次相互独立的伯努利试验，$\eta_n$ 表示成功次数，成功概率为 $p$，并记 $q=1-p$。切比雪夫不等式可给出概率界，当 $n$ 足够大时，中心极限定理可给出频率的渐近正态近似，但在较小的 $n$ 或 $p$ 接近 $0$、$1$ 时不一定更精确。

$$
\begin{aligned} &P\left\{\left|\dfrac{\eta_{n}}{n}-p\right|<\varepsilon\right\}\\ =&P\left\{\left|\dfrac{\eta_{n}-n p}{n}\right|<\varepsilon\right\} \\ =&P\left\{-\varepsilon \sqrt{\dfrac{n}{p q}}<\dfrac{\eta_{n}-n p}{\sqrt{n p q}}<\varepsilon \sqrt{\dfrac{n}{p q}}\right\} \\ \approx &\Phi\left(\varepsilon \sqrt{\dfrac{n}{p q}}\right)-\Phi\left(-\varepsilon \sqrt{\dfrac{n}{p q}}\right)\\ =& 2 \Phi\left(\varepsilon \sqrt{\dfrac{n}{p q}}\right)-1 \end{aligned}
$$

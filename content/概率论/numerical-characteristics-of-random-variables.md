---
title: 随机变量的数字特征
publish: true
draft: false
description: 概率论学习笔记：随机变量的数字特征。
tags:
  - 概率论
---

## 数学期望
### 数学期望的概念

**离散型随机变量的期望**：设 **离散型** 随机变量 $X$ 的分布列为 $P\left(X=x_{k}\right)=p_{k},\quad k=1,2,\cdots$，若级数 $\displaystyle\sum_{k=1}^{+\infty} x_{k} p_{k}$ 绝对收敛，即 $\displaystyle\sum_{k=1}^{+\infty}\left|x_{k}\right| p_{k}<+\infty$，则随机变量 $X$ 的 **数学期望** (**均值**) 为

$$
E(X) = \sum_{k=1}^{+\infty} x_{k} p_{k}
$$

若级数不绝对收敛，则数学期望不存在。

**连续型随机变量的期望**：设 $X$ 为 **连续型** 随机变量，其概率密度为 $f(x)$ 若 $\displaystyle\int_{-\infty}^{+\infty} x f(x) \mathrm{d} x$ 绝对收敛，即 $\displaystyle\int_{-\infty}^{+\infty}|x| f(x) \mathrm{d} x<+\infty$，则随机变量 $X$ 的 **数学期望** (**均值**) 为

$$
E(X) =\int_{-\infty}^{+\infty} x f(x) \mathrm{d} x
$$

### 数学期望的性质

- **存在性充要条件**：设 $X$ 是任意随机变量，则 $X$ 的数学期望存在的充要条件是

    $$
    E(\left|X\right|)<+\infty
    $$

- **有序性**：设 $X,Y$ 是任意两个数学期望存在的随机变量，且 $X\le Y$，则

    $$
    E(X) \le E(Y)
    $$

    - 若存在数 $a$ 使得 $P(X\ge a) = 1$，则

        $$
        E(X)\ge a
        $$

    - 若存在数 $b$ 使得 $P(X\le b) = 1$，则

        $$
        E(X)\le b
        $$

- **线性性**：

    - 设 $X$ 是任意满足 $E(\left|X\right|)<+\infty$ 的随机变量，$C$ 是任意常数，则

        $$
        E(C X)=C E(X)
        $$

    - 设 $X,Y$ 是 **任意** 两个数学期望存在的随机变量，则 $X+Y$ 的数学期望也存在，且

        $$
        E(X+Y)=E(X)+E(Y)
        $$

- **正向可乘性**：设 $X,Y$ 是 **相互独立** 的两个数学期望存在的随机变量，则 $XY$ 的数学期望也存在，且

    $$
    E(X Y)=E(X)\ E(Y)
    $$

- **柯西-施瓦茨不等式**：若 $E\left(X^{2}\right)<+\infty$ 且 $E\left(Y^{2}\right)<+\infty$，则

    $$
    [E(XY)]^{2} \leq E\left(X^{2}\right) E\left(Y^{2}\right)
    $$

    当 $E\left(X^{2}\right)>0$ 且 $E\left(Y^{2}\right)>0$ 时，等式成立当且仅当存在常数 $t_{0}$，使得 $P\left(Y=t_{0}X\right)=1$。

### 随机变量函数的数学期望

#### 一维随机变量
设 $X$ 为随机变量，$Y=g(X)$，其中 $g(x)$ 是一个确定函数

- **离散型**：设 $X$ 为离散型随机变量，其分布列为 $P\left(X=x_{k}\right)=p_{k},k=1,2,\cdots$，若级数 $\displaystyle\sum_{k=1}^{+\infty} g\left(x_{k}\right) p_{k}$ 绝对收敛，则

    $$
    E(Y)=E\big(g(X)\big)=\sum_{k=1}^{+\infty} g\left(x_{k}\right)\ p_{k}
    $$

- **连续型**：设 $X$ 为连续型随机变量，其概率密度为 $f(x)$，若积分 $\displaystyle\int_{-\infty}^{+\infty} g(x) f(x) \mathrm{d} x$ 绝对收敛，则

    $$
    E(Y)=E\big(g(X)\big)=\int_{-\infty}^{+\infty} g(x)\ f(x)\ \mathrm{d} x
    $$

#### 二维随机变量
设 $X,Y$ 为随机变量，$Z=g(X,Y)$，其中 $g(x,y)$ 是一个确定函数

- **离散型**：设 $(X,Y)$ 为离散型随机变量，其分布列为 $P\left(X=x_{i},Y = y_j\right)=p_{ij},i,j=1,2,\cdots$，若级数 $\displaystyle\sum_{i=1}^{+\infty} \sum_{j=1}^{+\infty} g\left(x_{i},y_{j}\right) p_{i j}$ 绝对收敛，则

    $$
    E(Z)=E\big(g(X,Y)\big)=\sum_{i=1}^{+\infty} \sum_{j=1}^{+\infty} g\left(x_{i},y_{j}\right)\ p_{i j}
    $$

- **连续型**：设 $(X,Y)$ 为连续型随机变量，其联合概率密度为 $f(x,y)$，若积分 $\displaystyle\int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty} g(x,y) f(x,y) \ \mathrm{d} x \  \mathrm{d} y$ 绝对收敛，则

    $$
    E(Z)=E\big(g(X,Y)\big)=\int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty} g(x,y) \ f(x,y) \ \mathrm{d} x \ \mathrm{d} y
    $$

## 方差
### 方差的概念
设 $X$ 是一个随机变量，且 $E\left(X^{2}\right)<+\infty$，则称

$$
E\left\{[X-E(X)]^{2}\right\}
$$

为 $X$ 的 **方差**，记为 $D(X)$ 或 $\operatorname{Var}(X)$，即

$$
\begin{aligned} D(X)&=E\left\{[X-E(X)]^{2}\right\}\\ &=E\left(X^{2}\right)-[E(X)]^{2} \end{aligned}
$$

- **离散型**：设 $X$ 为 **离散型** 随机变量，其分布列为 $P\left(X=x_{i}\right)=p_{i},i=1,2,\cdots$，则

    $$
    D(X)=\sum_{i=1}^{+\infty}\left[x_{i}-E(X)\right]^{2} p_{i}
    $$

- **连续型**：设 $X$ 为 **连续型** 随机变量，其概率密度为 $f(x)$，则

    $$
    D(X)=\int_{-\infty}^{+\infty}[x-E(X)]^{2} f(x) \mathrm{d} x
    $$

### 方差的性质

- **缩放性质**：对任意实数 $a,b$，

    $$
    D(aX+b)=a^2 D(X)
    $$

- **常值函数的方差为零**

    $$
    D(C) = 0
    $$

- **两方差相加**

    $$
    \begin{aligned} D(X \pm Y) &=D(X)+D(Y) \pm 2 E((X-E(X))(Y-E(Y)))\\ &=D(X)+D(Y) \pm 2 (E(XY)-E(X)E(Y))\\ &=D(X)+D(Y) \pm 2 \operatorname{Cov}(X, Y) \end{aligned}
    $$

- **相互独立的随机变量相加**

    $$
    D(X\pm Y)=D(X)+D(Y)
    $$

    - **逆命题不成立**

    - 事实上，对于任意随机变量，$D(X\pm Y) = D(X) \pm 2\mathrm{Cov}(X,Y) + D(Y)$

    - 当 $X, Y$ 独立，则其不相关，协方差为零

- **方差定义式与意义的扩展**：设 $X$ 为一个方差存在的随机变量，则对任意实数 $C$，有

    $$
    D(X) \leqslant E\left[(X-C)^{2}\right]
    $$

- **方差为零的充要条件**：设 $X$ 为一个随机变量，$C = E(X)$ 为常数

    $$
    D(X) = 0\iff P(X=C) = 1
    $$

### 标准化随机变量的方差
对于满足 $0<D(X)<+\infty$ 的随机变量 $X$，定义其 **标准化随机变量** 为

$$
X^{\ast}=\frac{X-E(X)}{\sqrt{D(X)}}
$$

- 期望为 0：$E(X^\ast) = 0$

- 方差为 1：$D(X^\ast) = 1$

- 对于 $X$ 的线性组合 $Y=aX+b$，当 $a\ne0$ 时，$Y^\ast=\operatorname{sgn}(a)X^\ast$。特别地，$a>0$ 时 $Y^\ast=X^\ast$，$a<0$ 时 $Y^\ast=-X^\ast$。

## 常见分布的期望与方差
| 分布 | 分布列 | 期望 | 方差 |
| :--: | :----: | :--: | :--: |
| $0-1$ 分布<br>$B(1, p)$ | $P(X = k) = p^k\ (1-p)^{1-k}$<br>$k=0, 1,\quad 0<p<1$ | $p$ | $p\ (1-p)$ |
| 二项分布<br>$B(n,p)$ | $P(X = k) = \mathrm C_n^k\ p^k\ (1-p)^{n-k}$<br>$k=0,1,\cdots,n,\quad 0<p<1$ | $np$ | $np\ (1-p)$ |
| 泊松分布<br>$\operatorname{Pois}(\lambda)$ | $P(X=k) = \mathrm e^{-\lambda}\ \dfrac{\lambda^k}{k!}$<br>$k = 0,1,2,\cdots,\quad \lambda >0$<br> | $\lambda$ | $\lambda$ |
| 几何分布<br>$G(p)$ | $P(X=k)=(1-p)^{k-1} p$<br>$k=1,2, \cdots,\quad 0<p<1$ | $\dfrac1p$ | $\dfrac1{p^2} - \dfrac1p$ |
| 超几何分布<br>$H(n, M, N)$ | $P(X = k) = \dfrac{\mathrm C_M^k\ \mathrm C_{N-M}^{n-k}}{\mathrm C_N^n}$<br>$k=0,1,\cdots,\min(M,n)$<br>$0\le M\le N$ | $\dfrac{nM}{N}$ | $\dfrac{nM(N-M)}{N^2(N-1)}$ |
| 均匀分布<br>$U(a,b)$ | $\displaystyle f(x) = \begin{cases}\dfrac{1}{b-a}, &a<x<b,\\0, &\text{otherwise}.\end{cases}$ | $\dfrac{a+b}{2}$ | $\dfrac{(b-a)^2}{12}$ |
| 指数分布<br>$\operatorname{Exp}(\lambda)$ | $f(x) = \begin{cases}\lambda\ \mathrm e^{-\lambda x}, &x>0, \\0,&\text{otherwise}.\end{cases}$ | $\dfrac1\lambda$ | $\dfrac{1}{\lambda^2}$ |
| 正态分布<br>$N(\mu, \sigma^2)$ | $f(x) = \dfrac{1}{\sqrt{2\pi}\sigma}\exp\left(-\dfrac{(x-\mu)^2}{2\sigma^2}\right)$<br>$-\infty<x<+\infty, -\infty<\mu<\infty,\sigma >0$ | $\mu$ | $\sigma^2$ |

## 协方差与相关系数
### 协方差与相关系数的概念

**协方差**：若 $E\left(X^{2}\right)<+\infty$ 且 $E\left(Y^{2}\right)<+\infty$，则随机变量 $X,Y$ 的协方差为

$$
\operatorname{Cov}(X,Y)=E[(X-E(X))(Y-E(Y))]
$$

$D(X)=\operatorname{Cov}(X,X)$

**相关系数**：当 $0<D(X)<+\infty$ 且 $0<D(Y)<+\infty$ 时，$X$ 与 $Y$ 的相关系数为

$$
\rho_{X Y}=\frac{\operatorname{Cov}(X,Y)}{\sqrt{D(X)} \sqrt{D(Y)}}
$$

相关系数为标准化随机变量的协方差 $\rho_{XY}=\operatorname{Cov}(X^\ast,Y^\ast)$

$\rho_{XY} = 0$ 时，$X$ 与 $Y$ **不相关**

**协方差矩阵**

$$
\left(\begin{array}{cc} D(X) & \operatorname{Cov}(X,Y) \\ \operatorname{Cov}(X,Y) & D(Y) \end{array}\right)
$$

### 协方差的计算


$$
\begin{aligned} \operatorname{Cov}(X,Y)&=E(XY)-E(X)E(Y)\\ D(X \pm Y)&=D(X)+D(Y) \pm 2\operatorname{Cov}(X,Y) \end{aligned}
$$

- **离散型**：

    $$
    \operatorname{Cov}(X,Y)=\sum_{i=1}^{+\infty} \sum_{j=1}^{+\infty}\left[x_{i}-E(X)\right]\left[y_{j}-E(Y)\right]p_{ij}
    $$

- **连续型**：设 $X, Y$ 的联合概率密度为 $f(x,y)$，则
  $$
  \begin{aligned} \operatorname{Cov}(X,Y)&=E(XY)-E(X)E(Y)\\ &=\int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty}xyf(x,y)\,\mathrm{d}x\,\mathrm{d}y-E(X)E(Y)\\ &=\int_{-\infty}^{+\infty} \int_{-\infty}^{+\infty}[x-E(X)][y-E(Y)]f(x,y)\,\mathrm{d}x\,\mathrm{d}y \end{aligned}
  $$

### 协方差的性质

- **可换性**：

    $$
    \operatorname{Cov}(X,Y)=\operatorname{Cov}(Y,X)
    $$

- **变量与常数的协方差**：

    $$
    \operatorname{Cov}(X,C) = 0
    $$

- **变量与自己的协方差为方差**：

    $$
    \operatorname{Cov}(X,X)=D(X)
    $$

- **线性性**：

    $$
    \begin{aligned} \operatorname{Cov}(aX,bY)&=ab\operatorname{Cov}(X,Y)\\ \operatorname{Cov}(X,Y)&=\operatorname{Cov}(X-a,Y-b) \end{aligned}
    $$

- **线性可加性**：

    $$
    \operatorname{Cov}(X+Y,Z)=\operatorname{Cov}(X,Z)+\operatorname{Cov}(Y,Z)
    $$

- **柯西-施瓦茨不等式**：

    $$
    |\operatorname{Cov}(X,Y)| \leqslant \sqrt{D(X)} \sqrt{D(Y)}
    $$

### 相关系数的性质

- **规范性**：

    $$
    \left|\rho_{X Y}\right| \leqslant 1
    $$

- **随机变量完全相关**：

    $$
    \left|\rho_{XY}\right|=1\iff P(Y^\ast=X^\ast)=1\text{ 或 }P(Y^\ast=-X^\ast)=1
    $$

    - $\rho_{XY}=1\iff P(Y^\ast=X^\ast)=1$，此时 $X,Y$ **完全正相关**

    - $\rho_{XY}=-1\iff P(Y^\ast=-X^\ast)=1$，此时 $X,Y$ **完全负相关**

    - 即 $|\rho_{XY}|$ 反映了由 $X$ 的线性函数 $aX+b$ 估计 $Y$ 所产生的均方误差的大小

- **均方误差**：当 $0<D(X)<+\infty$ 且 $E(Y^{2})<+\infty$ 时，

    $$
    \min\limits_{a,b} E\left\{\left[Y - (a + bX) \right]^2\right\}= E\left\{\left[Y - (a_0 + b_0X) \right]^2\right\}=\left(1 - \rho_{XY}^2\right) D(Y)
    $$

    - $b_0 = \dfrac{\mathrm{Cov}(X,Y)}{D(X)}$

    - $a_0 = E(Y) - b_0 E(X)$

    - 在 $Y$ 固定时，均方误差为关于 $\left|\rho_{XY}\right|$ 的严格递减函数

## 随机变量的高阶矩
### 原点矩与中心矩

- **原点矩**：设 $X$ 是随机变量，若 $E\left(|X|^{k}\right)<+\infty$，其中 $k=1,2,\cdots$，则 $X$ 的 **$\boldsymbol k$ 阶原点矩** 为

    $$
    E(X^k)
    $$

- **中心矩**：设 $X$ 是一个随机变量，若 $E\left(|X|^{k}\right)<+\infty$，其中 $k=1,2,\cdots$，则 $X$ 的 **$\boldsymbol k$ 阶中心矩** 为

    $$
    E\{[\ X-E(X)\ ]^k\}
    $$

- **混合原点矩与混合中心矩**：设 $X,Y$ 都是随机变量，且 $E\left(|X|^{k}|Y|^{l}\right)<+\infty$，其中 $k,l=1,2,\cdots$，则

    - $X,Y$ 的 **$\boldsymbol{k+l}$ 阶混合原点矩** 为

        $$
        E\left(X^{k} Y^{l}\right)
        $$

    - $X,Y$ 的 **$\boldsymbol{k+l}$ 阶混合中心矩** 为

        $$
        E\left\{[X-E(X)]^{k}[Y-E(Y)]^{l}\right\}
        $$

### 协方差矩阵

**定义**：设 $\left(X_{1},X_{2},\cdots,X_{n}\right)$ 是 $n$ 维随机变量，且各分量都存在二阶矩，记 $c_{ij}=\operatorname{Cov}\left(X_{i},X_{j}\right)$，其中 $i,j=1,2,\cdots,n$，则 $n$ 维随机变量的 **协方差矩阵** 为

$$
\boldsymbol{C}=\begin{pmatrix} c_{11} & c_{12} & \cdots & c_{1 n} \\ c_{21} & c_{22} & \cdots & c_{2 n} \\ \vdots & \vdots & & \vdots \\ c_{n 1} & c_{n 2} & \cdots & c_{n n} \end{pmatrix}
$$

**性质**：

  1. $\boldsymbol C$ 为对称矩阵，因为 $c_{i j}=c_{j i}$

  2. $\boldsymbol C$ 为半正定矩阵

  3. 对任意实数 $t_{1},t_{2},\cdots,t_{n}$，

      $$
      D\left(t_{1} X_{1}+t_{2} X_{2}+\cdots+t_{n} X_{n}\right)=\begin{pmatrix} t_{1} & t_{2} & \cdots & t_{n} \end{pmatrix} \boldsymbol C \begin{pmatrix} t_{1} \\ t_{2} \\ \vdots \\ t_{n} \end{pmatrix}\ge 0
      $$

---
title: 统计量与分布
publish: true
draft: false
description: 数理统计学习笔记：总体、样本、统计量与正态总体的抽样分布。
tags:
  - 数理统计
  - 预备知识
---

## 总体和个体

一般地，所研究对象的某个或某些数量指标的全体称为**总体**。如果所研究的问题只有一个数量指标，就是一个**随机变量**。如果有多个数量指标，就是**多维随机变量**。总体的每个数量指标称为**个体**。

关于随机变量、分布函数与多维随机变量的基础定义，可分别参阅 [随机变量及其分布函数](/概率论/random-variables-and-distributions#随机变量) 和 [二维随机变量及其联合分布函数](/概率论/multivariate-random-variables-and-distributions#二维随机变量及其联合分布函数)。

## 样本和样本空间

一般地，为研究总体的特征，从总体中抽取部分个体，称为**样本**。若从某个总体 $X$ 中抽取 $n$ 个个体，记为 $\left(X_1,X_2,\cdots,X_n\right)$，则称其为总体 $X$ 的一个容量为 $n$ 的样本。

依次对它们进行观察得到的 $n$ 个数据 $\left(x_1,x_2,\cdots,x_n\right)$ 称为总体 $X$ 的一个容量为 $n$ 的**样本观测值**，简称**样本值**。它是一个 $n$ 维实向量。将样本视为 $n$ 维随机向量 $\left(X_1,X_2,\cdots,X_n\right)$ 时，其所有可能取值的集合称为**样本空间**，记为 $\chi$。

## 简单随机样本

若来自总体 $X$ 的一个样本 $\left(X_1,X_2,\cdots,X_n\right)$ 为 $X$ 的一个**简单随机样本**，则满足：

- **同分布性**：$X_1,X_2,\cdots,X_n$ 都与 $X$ 服从相同的分布。
- **独立性**：$X_1,X_2,\cdots,X_n$ 相互独立。

独立随机变量的联合分布函数与联合概率密度可分解为各边缘分布的乘积，详见 [二维随机变量的独立性](/概率论/multivariate-random-variables-and-distributions#二维随机变量的独立性)。

## 统计量

总体 $X$ 的简单随机样本为 $\left(X_1,X_2,\cdots,X_n\right)$。若实值函数 $g(r_1,r_2,\cdots,r_n)$ 不含除自变量之外的未知参数，则随机变量

$$
g\left(X_1,X_2,\cdots,X_n\right)
$$

称为**统计量**。其一个样本值为

$$
g\left(x_1,x_2,\cdots,x_n\right).
$$

### 常用统计量

设 $\left(X_1,X_2,\cdots,X_n\right)$ 为总体 $X$ 的一个容量为 $n$ 的样本。

#### 样本均值

$$
\bar{X}=\frac{1}{n}\sum_{i=1}^{n}X_i.
$$

$\bar{X}$ 的样本值记为 $\bar{x}$。样本均值是随机变量，具有分布，数学期望则是常数。在适当条件下，样本均值依概率收敛到数学期望。

数学期望、方差及其性质可参阅 [数学期望](/概率论/numerical-characteristics-of-random-variables#数学期望) 与 [方差](/概率论/numerical-characteristics-of-random-variables#方差)。

#### 样本方差

$$
S^2=\frac{1}{n-1}\sum_{i=1}^{n}\left(X_i-\bar{X}\right)^2.
$$

$S^2$ 的样本值记为 $s^2$。

#### 样本标准差

$$
S=\sqrt{\frac{1}{n-1}\sum_{i=1}^{n}\left(X_i-\bar{X}\right)^2}.
$$

$S$ 的样本值记为 $s$。当 $D(X)<+\infty$ 时，样本均值、样本方差与期望、方差的关系为

$$
\begin{aligned}
E(\bar{X})&=E(X),\\
D(\bar{X})&=\frac{D(X)}{n},\\
E(S^2)&=D(X).
\end{aligned}
$$

#### 样本 k 阶原点矩

$$
M_k=\frac{1}{n}\sum_{i=1}^{n}X_i^k,\qquad k=1,2,\cdots.
$$

$M_k$ 的样本值记为 $m_k$，且 $M_1=\bar{X}$。

#### 样本 k 阶中心矩

$$
(CM)_k=\frac{1}{n}\sum_{i=1}^{n}\left(X_i-\bar{X}\right)^k,\qquad k=1,2,\cdots.
$$

$(CM)_k$ 的样本值记为 $(\mathrm{cm})_k$。由于 $(CM)_2=M_2-\bar{X}^2$，可由均值和平方的均值求二阶中心矩。又有

$$
(CM)_2=\dfrac{n-1}{n}S^2\triangleq S_n^2.
$$

样本方差 $S^2$ 与样本二阶中心矩 $S_n^2$ 的关系为

$$
\begin{aligned}
S^2&=\frac{n}{n-1}S_n^2,\\
E(S_n^2)&=\frac{n-1}{n}\sigma^2,\\
E(S^2)&=\sigma^2.
\end{aligned}
$$

### 顺序统计量

将一组样本的样本值 $(x_1,x_2,\cdots,x_n)$ 从小到大排序后，记为

$$
x_{(1)}\leqslant x_{(2)}\leqslant\cdots\leqslant x_{(n)}.
$$

记 $X_{(k)}$ 为样本中从小到大排第 $k$ 位的随机变量，$k=1,2,\cdots,n$。则 $X_{(1)},X_{(2)},\cdots,X_{(n)}$ 称为**顺序统计量**，其观测值分别为 $x_{(1)},x_{(2)},\cdots,x_{(n)}$。

#### 极差

$$
D_n=X_{(n)}-X_{(1)}.
$$

#### 样本中位数

$$
\tilde{X}=
\begin{cases}
X_{\left(\frac{n+1}{2}\right)},&n\text{ 为奇数},\\
\dfrac{1}{2}\left(X_{\left(\frac{n}{2}\right)}+X_{\left(\frac{n}{2}+1\right)}\right),&n\text{ 为偶数}.
\end{cases}
$$

#### 样本经验分布函数

$$
F_n(x)=
\begin{cases}
0,&x<x_{(1)},\\
\dfrac{k}{n},&x_{(k)}\leq x<x_{(k+1)},\\
1,&x\geq x_{(n)},
\end{cases}
\qquad k=1,2,\cdots,n-1.
$$

对于来自总体 $X$ 的简单随机样本，当 $n\to\infty$ 时，

$$
\sup_{x\in\mathbb R}\left|F_n(x)-F(x)\right|
\xrightarrow{\mathrm{a.s.}}0.
$$

即 $F_n$ 几乎处处一致收敛于分布函数 $F$。

#### α 分位数

- **上侧 $\alpha$ 分位数 $x_\alpha$**：

  $$
  P(X>x_\alpha)=\alpha,
  $$

  其中 $\alpha$ 为 $(0,1)$ 内的给定常数。

- **双侧 $\alpha$ 分位数 $x_{\alpha/2}$**（对于偶函数）：

  $$
  P\left(\lvert X\rvert>x_{\alpha/2}\right)=\alpha,
  $$

  其中 $\alpha$ 为 $\left(0,\dfrac{1}{2}\right)$ 内的给定常数。

# 抽样检验：常用统计量的分布

## 正态分布

正态分布的定义、密度函数与标准化可参阅 [正态分布](/概率论/random-variables-and-distributions#正态分布)。

若随机变量 $X_1,X_2,\cdots,X_n$ 相互独立，且

$$
X_i\sim N\left(\mu_i,\sigma_i^2\right),\qquad i=1,2,\cdots,n,
$$

则对任意常数 $a_1,a_2,\cdots,a_n$，

$$
\sum_{i=1}^{n}a_iX_i\sim N\left(\sum_{i=1}^{n}a_i\mu_i,\sum_{i=1}^{n}a_i^2\sigma_i^2\right).
$$

特别地，当

$$
X_i\sim N\left(\mu,\sigma^2\right),\qquad i=1,2,\cdots,n,
$$

有

$$
\frac{1}{n}\sum_{i=1}^{n}X_i\sim N\left(\mu,\frac{\sigma^2}{n}\right).
$$

因此，

$$
E\left(\frac{1}{n}\sum_{i=1}^{n}X_i\right)=\mu,\qquad
D\left(\frac{1}{n}\sum_{i=1}^{n}X_i\right)=\frac{\sigma^2}{n}.
$$

## 卡方分布

设随机变量 $X_1,X_2,\cdots,X_n$ 相互独立，且均服从标准正态分布 $N(0,1)$。则统计量

$$
\chi^2=\sum_{i=1}^{n}X_i^2
$$

服从自由度为 $n$ 的 $\chi^2$ 分布，记为

$$
\sum_{i=1}^{n}X_i^2\sim\chi^2(n).
$$

其概率密度为

$$
f_{\chi^2}(x)=
\begin{cases}
\displaystyle\frac{1}{2^{\frac{n}{2}}\Gamma\left(\dfrac{n}{2}\right)}
\mathrm{e}^{-\frac{x}{2}}x^{\frac{n}{2}-1},&x>0,\\
0,&x\leqslant 0.
\end{cases}
$$

其中

$$
\Gamma(x)=\int_{0}^{+\infty}t^{x-1}\mathrm{e}^{-t}\,\mathrm{d}t.
$$

当 $n=2$ 时，$\Gamma\left(\dfrac{n}{2}\right)=\Gamma(1)=1$，因此

$$
f_{\chi^2}(x)=
\begin{cases}
\displaystyle\frac{1}{2}\mathrm{e}^{-\frac{x}{2}},&x>0,\\
0,&x\leqslant 0.
\end{cases}
$$

<figure style="max-width: 620px; margin: 1.5rem auto; text-align: center;">
  <img
    src="https://cdn.jsdelivr.net/gh/xjn2005/my-blog-images/img/20261004164159293.png"
    alt="不同参数的卡方分布"
    style="display: block; width: 88%; height: auto; margin: 0 auto;"
  >
  <figcaption style="margin-top: 0.5rem; font-size: 0.9em; opacity: 0.75;">
    不同参数的卡方分布
  </figcaption>
</figure>



### 性质

1. 对于 $\chi^2=\displaystyle\sum_{i=1}^{n}X_i^2$，其中 $X_i\sim N(0,1)$，$i=1,2,\cdots,n$，

   $$
   E(\chi^2)=n,\qquad D(\chi^2)=2n.
   $$

2. 若 $X_1\sim\chi^2(n_1)$、$X_2\sim\chi^2(n_2)$，且两者相互独立，则

   $$
   X_1+X_2\sim\chi^2(n_1+n_2).
   $$

3. 当 $n$ 很大时，

   $$
   \chi^2=\sum_{i=1}^{n}X_i^2
   $$

   近似服从正态分布 $N(n,2n)$。

4. $\chi^2(n)$ 的上侧 $\alpha$ 分位数 $\chi^2_\alpha(n)$ 满足

   $$
   P\left(\chi^2>\chi^2_\alpha(n)\right)=\alpha.
   $$

## $t$ 分布

设 $X\sim N(0,1)$、$Y\sim\chi^2(n)$，且 $X,Y$ 相互独立。若

$$
T=\frac{X}{\sqrt{\dfrac{Y}{n}}},
$$

则称 $T$ 服从自由度为 $n$ 的 $t$ 分布（又称 Student 分布），记为 $T\sim t(n)$。其概率密度为

$$
f(t)=\frac{\Gamma\left(\dfrac{n+1}{2}\right)}
{\sqrt{n\pi}\,\Gamma\left(\dfrac{n}{2}\right)}
\left(1+\frac{t^2}{n}\right)^{-\frac{n+1}{2}},
\qquad -\infty<t<+\infty.
$$

<figure style="max-width: 620px; margin: 1.5rem auto; text-align: center;">
  <img
    src="https://cdn.jsdelivr.net/gh/xjn2005/my-blog-images/img/20261004164425766.png"
    alt="不同参数的t分布"
    style="display: block; width: 88%; height: auto; margin: 0 auto;"
  >
  <figcaption style="margin-top: 0.5rem; font-size: 0.9em; opacity: 0.75;">
    不同参数的 t 分布
  </figcaption>
</figure>


### 性质

1. $t$ 分布的概率密度 $f(t)$ 为偶函数，且当 $n\to+\infty$ 时，

   $$
   f(t)\to\varphi(t)=\frac{1}{\sqrt{2\pi}}\mathrm{e}^{-\frac{t^2}{2}}.
   $$

   即当自由度 $n$ 充分大时，$t$ 分布近似服从标准正态分布。当 $n>45$ 时，可用标准正态分布近似。

2. $t$ 分布的上侧 $\alpha$ 分位数 $t_\alpha(n)$ 满足

   $$
   P\left(T>t_\alpha(n)\right)=\alpha,
   $$

   且

   $$
   t_{1-\alpha}(n)=-t_\alpha(n).
   $$

## $F$ 分布

设 $U\sim\chi^2(m)$、$V\sim\chi^2(n)$，且 $U,V$ 相互独立。若

$$
F=\frac{U/m}{V/n},
$$

则称 $F$ 服从第一自由度为 $m$、第二自由度为 $n$ 的 $F$ 分布，记为 $F\sim F(m,n)$。其概率密度为

$$
f_F(x)=
\begin{cases}
\displaystyle
\frac{\Gamma\left(\dfrac{m+n}{2}\right)}
{\Gamma\left(\dfrac{m}{2}\right)\Gamma\left(\dfrac{n}{2}\right)}
\left(\dfrac{m}{n}\right)^{\frac{m}{2}}
x^{\frac{m}{2}-1}
\left(1+\dfrac{m}{n}x\right)^{-\frac{m+n}{2}},&x>0,\\
0,&x\leqslant 0.
\end{cases}
$$

<figure style="max-width: 620px; margin: 1.5rem auto; text-align: center;">
  <img
    src="https://cdn.jsdelivr.net/gh/xjn2005/my-blog-images/img/20261004164624746.png"
    alt="不同参数的F分布"
    style="display: block; width: 88%; height: auto; margin: 0 auto;"
  >
  <figcaption style="margin-top: 0.5rem; font-size: 0.9em; opacity: 0.75;">
    不同参数的 F 分布
  </figcaption>
</figure>


### 性质

1. 若 $F\sim F(m,n)$，则

   $$
   \frac{1}{F}\sim F(n,m).
   $$

2. $F(m,n)$ 的上侧 $\alpha$ 分位数 $F_\alpha(m,n)$ 满足

   $$
   P\left(F>F_\alpha(m,n)\right)=\alpha,
   $$

   且

   $$
   F_{1-\alpha}(m,n)=\frac{1}{F_\alpha(n,m)}.
   $$

3. $t$ 分布和 $F$ 分布之间有关系

   $$
   t_{\frac{\alpha}{2}}^2(n)=F_\alpha(1,n).
   $$

# 正态总体的抽样分布

## 单个正态总体的抽样分布

设 $X\sim N\left(\mu,\sigma^2\right)$，$\left(X_1,X_2,\cdots,X_n\right)$ 是来自总体 $X$ 的一个简单随机样本，$\bar{X},S^2$ 分别是样本均值与样本方差，则：

1. **样本均值的分布**

   $$
   \bar{X}\sim N\left(\mu,\frac{\sigma^2}{n}\right),
   $$

   或

   $$
   \frac{\bar{X}-\mu}{\sigma/\sqrt{n}}\sim N(0,1).
   $$

2. **样本方差的分布**

   $$
   \frac{(n-1)S^2}{\sigma^2}
   =\sum_{i=1}^{n}\left(\frac{X_i-\bar{X}}{\sigma}\right)^2
   \sim\chi^2(n-1).
   $$

   注意区分

   $$
   \sum_{i=1}^{n}\left(\frac{X_i-\mu}{\sigma}\right)^2
   \sim\chi^2(n).
   $$

3. **样本均值与样本方差的独立性**

   $\bar{X}$ 与 $\dfrac{(n-1)S^2}{\sigma^2}$ 相互独立。

4. **推论**

   $$
   \frac{\bar{X}-\mu}{\dfrac{S}{\sqrt{n}}}\sim t(n-1).
   $$

## 两个正态总体的抽样分布

设 $X\sim N\left(\mu_1,\sigma_1^2\right)$，$\left(X_1,X_2,\cdots,X_n\right)$ 是来自总体 $X$ 的一个简单随机样本。又设 $Y\sim N\left(\mu_2,\sigma_2^2\right)$，$\left(Y_1,Y_2,\cdots,Y_m\right)$ 是来自总体 $Y$ 的一个简单随机样本，且 $X,Y$ 相互独立。令

$$
\begin{aligned}
\bar{X}&=\frac{1}{n}\sum_{i=1}^{n}X_i,
&
S_1^2&=\frac{1}{n-1}\sum_{i=1}^{n}\left(X_i-\bar{X}\right)^2,\\
\bar{Y}&=\frac{1}{m}\sum_{j=1}^{m}Y_j,
&
S_2^2&=\frac{1}{m-1}\sum_{j=1}^{m}\left(Y_j-\bar{Y}\right)^2.
\end{aligned}
$$

则有：

1. **样本方差之商的分布**

   $$
   \frac{S_1^2/S_2^2}{\sigma_1^2/\sigma_2^2}\sim F(n-1,m-1).
   $$

   当 $\sigma_1=\sigma_2$ 时，

   $$
   \frac{S_1^2}{S_2^2}\sim F(n-1,m-1).
   $$

2. 当 $\sigma_1=\sigma_2=\sigma$ 时，

   $$
   \frac{(\bar{X}-\bar{Y})-\left(\mu_1-\mu_2\right)}
   {\sqrt{\dfrac{1}{n}+\dfrac{1}{m}}
   \sqrt{\dfrac{(n-1)S_1^2+(m-1)S_2^2}{n+m-2}}}
   \sim t(n+m-2).
   $$

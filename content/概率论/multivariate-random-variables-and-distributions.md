---
title: 多维随机变量及其分布
publish: true
draft: false
description: 概率论学习笔记：多维随机变量及其分布。
tags:
  - 概率论
---

## 二维随机变量

### 二维随机变量及其联合分布函数

**定义**：设 $(\Omega,\mathcal F,P)$ 为概率空间。若 $X$ 和 $Y$ 都是定义在该概率空间上的随机变量，则称有序对 $(X,Y)$ 为该概率空间上的 **二维随机变量**。对于任意 $\omega\in\Omega$，$(X,Y)$ 的取值为 $(X(\omega),Y(\omega))\in\mathbb R^2$。

**联合分布函数**：

$$
F(x,y) = P(\{X\le x\}\cap \{Y\le y\}) = P(X\le x,Y\le y)
$$

**性质**

1. $0\le F(x,y)\le 1$。对于任意固定的 $x,y$，有

    $$
    F(-\infty,y) = 0,F(x,-\infty) = 0,F(-\infty,-\infty) = 0,F(+\infty,+\infty) = 1
    $$

2. 对 $F(x,y)$ 固定其中一个变量，它关于另一个变量是单调不减的函数。

3. 对 $F(x,y)$ 固定其中一个变量，它关于另一个变量是右连续函数。

    $$
    F(x+0,y) = F(x,y),\quad F(x,y+0) = F(x,y)
    $$

4. 对任意实数 $a<b,c<d$（图形为一个矩形），

    $$
    F(b,d) - F(a,d) - F(b,c) + F(a,c) = P(a<X\le b,c<Y \le d)\ge0
    $$

5. 对于平面右上角的一块无穷区域 $\bf I$，计算概率时应当将整个平面减去三个区域 $\bf II,III,IV$。

    $$
    \begin{aligned} P(X> a,Y>c) &= P(a<X<+\infty,c<Y<+\infty)\\ &=1-F(+\infty,c) - F(a,+\infty)+F(a,c)\\ &\neq 1- F(a,c) \end{aligned}
    $$

**边缘分布函数**：设二维随机变量 $(X,Y)$ 的分布函数为 $F(x,y)$，分量 $X$ 和 $Y$ 也都是随机变量，各自的分布函数分别记为 $F_X(x),F_Y(y)$，并依次称为随机变量 $(X,Y)$ 关于 $X,Y$ 的 **边缘分布函数**。

$$
\begin{aligned} F_X(x) &= P(X\le x) = F(x,+\infty)\\ F_Y(y) &= P(Y\le y) = F(+\infty,y) \end{aligned}
$$

### 二维离散型随机变量

**定义**：随机变量 $(X,Y)$ 在二维平面上所有可能的取值为有限对或可列无穷对，则称 $(X,Y)$ 为 **二维离散型随机变量**。

设二维随机变量 $(X,Y)$ 的全部可能取值为

$$
(x_i,y_j),\quad i,j=1,2,\cdots
$$

记

$$
p_{ij}=P(X=x_i,Y=y_j),\quad i,j=1,2,\cdots
$$

则称 $\{p_{ij}\}$ 为 $(X,Y)$ 的**联合分布列**。

$$
\begin{array}{c|ccccc}
X\backslash Y & y_1 & y_2 & \cdots & y_j & \cdots \\
\hline
x_1 & p_{11} & p_{12} & \cdots & p_{1j} & \cdots \\
x_2 & p_{21} & p_{22} & \cdots & p_{2j} & \cdots \\
\vdots & \vdots & \vdots & & \vdots & \\
x_i & p_{i1} & p_{i2} & \cdots & p_{ij} & \cdots \\
\vdots & \vdots & \vdots & & \vdots &
\end{array}
$$

其中，

$$
p_{ij}\geq 0,\qquad
\sum_i\sum_j p_{ij}=1.
$$

**性质**：若某数列满足下列性质，则可以作为某个二维离散型随机变量的分布列。

- 非负性

 $$
 p_{ij}\ge 0\ (i,j = 1,2,\cdots)
 $$

- 正则性

 $$
 \sum_i\sum_jp_{ij} = 1
 $$

#### 由分布列求分布函数

二维离散型随机变量的分布函数与分布列互为确定。

$$
F(x,y) = P(X\le x,Y\le y) = \sum_{x_i\le x,y_j\le y}P(X=x_i,Y=y_j) = \sum_{x_i\le x,y_j\le y}p_{ij}
$$

#### 二维离散型随机变量的边缘分布列

以下分别为 $(X,Y)$ 关于 $X$ 和 $Y$ 的 **边缘分布列**。

$$
\begin{aligned} P(X= x_i) &= \sum_j p_{ij} \overset{\text{记为}}{=} p_{i\bullet},\ i=1,2,\cdots\\ P(Y= y_j) &= \sum_i p_{ij} \overset{\text{记为}}{=} p_{\bullet j},\ j=1,2,\cdots \end{aligned}
$$

### 二维连续型随机变量

**分布函数**：**二维连续型随机变量** $(X,Y)$ 的分布函数 $F(X,Y)$ 为 $(X,Y)$ 的联合概率密度函数 $f(x,y)$（二元非负可积函数）的二重积分。

$$
F(x,y) = \int_{-\infty}^x\int_{-\infty}^yf(u,v)\ \mathrm du\ \mathrm dv
$$

**性质**：

1. 非负性

  $$
  f(x,y)\ge 0,\quad(x,y)\in\mathbb R^2
  $$

  2. 正则性

  $$
  \int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}f(x,y)\ \mathrm dx\ \mathrm dy = 1
  $$

3. 样本点落在任一区域 $D$ 的概率

  $$
  P((X,Y)\in D) = \iint\limits_D f(x,y)\ \mathrm dx\ \mathrm dy
  $$

4. 根据分布函数求概率密度函数 $f(x,y)$ 连续点处

  $$
  \dfrac{\partial^2F}{\partial x\ \partial y} = f(x,y)
  $$

**边缘概率密度**：已知联合分布可以求得边缘分布，反之不能确定。

$$
\begin{aligned} f_X(x) &= \int_{-\infty}^{+\infty}f(x,y)\ \mathrm dy\\ f_Y(y) &= \int_{-\infty}^{+\infty}f(x,y)\ \mathrm dx\\ \end{aligned}
$$

#### 常用连续型二维随机变量分布

##### 均匀分布

连续型随机变量 $(X,Y)$ 服从二维有界区域 $G$ 上的 **均匀分布**，记为 $(X,Y)\sim U(G)$，则其概率密度函数为

$$
f(x,y) = \begin{cases}\dfrac{1}{A_G},&(x,y)\in G,\\0,&\text{otherwise}.\end{cases}
$$

> $A_G$ 为 $G$ 的面积。

##### 二维正态分布

连续型随机变量 $(X,Y)$ 服从二维有界区域 $G$ 上的 **二维正态分布**，记为 $(X,Y)\sim N(\mu_1,\sigma_1^2; \mu_2,\sigma_2^2; \rho)$，则其概率密度函数为

$$
f(x,y)=\frac{1}{2 \pi \sigma_{1} \sigma_{2} \sqrt{1-\rho^{2}}} \exp \left\{-\frac{1}{2\left(1-\rho^{2}\right)}\left[\frac{\left(x-\mu_{1}\right)^{2}}{\sigma_{1}^{2}}-2 \rho \frac{\left(x-\mu_{1}\right)\left(y-\mu_{2}\right)}{\sigma_{1} \sigma_{2}}+\frac{\left(y-\mu_{2}\right)^{2}}{\sigma_{2}^{2}}\right]\right\}
$$

> 二维正态分布的边缘分布为两个独立的一维正态分布。

## 二维随机变量的条件分布

### 二维离散型随机变量的条件分布

**定义**：设有二维离散型随机变量 $(X,Y)$。

- 对于固定的 $j$，若 $P(Y = y_j)>0$，则 **在 $\{Y = y_j\}$ 的条件下 $X$ 的条件分布列** 为

   $$
   P(X = x_i\mid Y = y_j) = \dfrac{P(X = x_i,Y = y_j)}{P(Y = y_j)} = \dfrac{p_{ij}}{p_{\bullet j}},\ i = 1,2,\cdots
   $$

   - $P(Y = y_j)$ 即边缘分布列：分布列表格中将 $Y = y_j$ 一列的概率全部相加。

- 对于固定的 $i$，若 $P(X = x_i)>0$，则 **在 $\{X = x_i\}$ 的条件下 $Y$ 的条件分布列** 为

   $$
   P(Y = y_j\mid X = x_i) = \dfrac{P(X = x_i,Y = y_j)}{P(X = x_i)} = \dfrac{p_{ij}}{p_{i\bullet}},\ j = 1,2,\cdots
   $$

$P(X = x_i)$ 即边缘分布列：分布列表格中将 $X = x_i$ 一行的概率全部相加。

**性质**

1. $$
    P(X = x_i\mid Y = y_j)\ge 0
    $$

2. $$
    \displaystyle\sum_iP(X = x_i\mid Y = y_j) = \sum_i\dfrac{p_{ij}}{p_{\bullet j}} =\dfrac{1}{p_{\bullet j}}\sum_ip_{ij} = 1
    $$

3. 乘法公式

    $$
    P(X = x_i,Y = y_j) = P(Y = y_j)\ P(X = x_i\mid Y = y_j) ,\ i,j = 1,2,\cdots
    $$

4. 全概率公式

    $$
    P(X = x_i) = \sum_j P(Y = y_j)\ P(X = x_i\mid Y= y_j),i = 1,2,\cdots
    $$

### 二维连续型随机变量的条件分布

设二维连续型随机变量 $(X,Y)$ 的联合概率密度为 $f(x,y)$，边缘概率密度分别为 $f_X(x)$ 和 $f_Y(y)$。

::: callout warning "注意" icon:triangle-alert
对连续型随机变量，通常有 $P(Y=y)=0$，因此不能直接用条件概率公式定义「在 $Y=y$ 条件下」的分布，而是通过联合概率密度来定义。
:::

#### 条件概率密度

当 $f_Y(y)>0$ 时，称

$$
f_{X\mid Y}(x\mid y)
=
\frac{f(x,y)}{f_Y(y)},
\qquad -\infty<x<+\infty
$$

为在 $Y=y$ 条件下 $X$ 的条件概率密度。

直观上，$f_{X\mid Y}(x\mid y)$ 是联合密度函数在 $Y=y$ 处的「横截面」，再除以 $f_Y(y)$ 后得到的归一化密度函数。

同理，当 $f_X(x)>0$ 时，

$$
f_{Y\mid X}(y\mid x)
=
\frac{f(x,y)}{f_X(x)},
\qquad -\infty<y<+\infty
$$

称为在 $X=x$ 条件下 $Y$ 的条件概率密度。

#### 条件分布函数

当 $f_Y(y)>0$ 时，

$$
F_{X\mid Y}(x\mid y)
=
P(X\le x\mid Y=y)
=
\int_{-\infty}^x f_{X\mid Y}(u\mid y)\,\mathrm du.
$$

同理，当 $f_X(x)>0$ 时，

$$
F_{Y\mid X}(y\mid x)
=
\int_{-\infty}^y f_{Y\mid X}(v\mid x)\,\mathrm dv.
$$

#### 基本性质

1. 对满足 $f_Y(y)>0$ 的任意 $y$，

   $$
   f_{X\mid Y}(x\mid y)\ge0,
   \qquad
   \int_{-\infty}^{+\infty}f_{X\mid Y}(x\mid y)\,\mathrm dx=1.
   $$

2. 联合密度可由边缘密度与条件密度表示：

   $$
   f(x,y)
   =
   f_Y(y)f_{X\mid Y}(x\mid y)
   =
   f_X(x)f_{Y\mid X}(y\mid x).
   $$

3. 边缘密度可由条件密度求得：

   $$
   f_X(x)
   =
   \int_{-\infty}^{+\infty}
   f_{X\mid Y}(x\mid y)f_Y(y)\,\mathrm dy,
   $$

   $$
   f_Y(y)
   =
   \int_{-\infty}^{+\infty}
   f_{Y\mid X}(y\mid x)f_X(x)\,\mathrm dx.
   $$

4. 当 $f_X(x)>0$ 且 $f_Y(y)>0$ 时，连续型随机变量的 Bayes 公式为：

   $$
   f_{X\mid Y}(x\mid y)
   =
   \frac{f_{Y\mid X}(y\mid x)f_X(x)}{f_Y(y)}.
   $$

## 二维随机变量的独立性

**定义**：相互独立的二维随机变量 $(X,Y)$ 对任意 $x,y$ 都有

  $$
  P(X \le x,Y \le y)=P(X \le x) P(Y \le y)
  $$

**判定独立性**：

- **离散型**：

   $$
   P(X = x_i,Y = y_j) = P(X = x_i)\cdot P(Y = y_j)
   $$

- **连续型**：

   $$
   f(x,y) = f_X(x)\cdot f_Y(y)
   $$

**独立性定理**：若联合概率密度分布函数 $f(x,y)$ 可以写成 **两个函数的乘积**，即 $f(x,y) = r(x)\cdot g(y)$，则 $X,Y$ 相互独立。

**性质**：

1. 如果二维随机变量 $X,Y$ 相互独立，则有

    $$
    \begin{aligned} f_X(x) &= f_{X\mid Y}(x\mid y),\quad f_Y(y)>0\\ f_Y(y) &= f_{Y\mid X}(y\mid x),\quad f_X(x)>0 \end{aligned}
    $$

2. **独立的二维随机变量的连续函数仍独立**：设 $X,Y$ 为相互独立的二维随机变量，$u(x),v(y)$ 为连续函数，则 $U = u(X),V = v(Y)$ 也相互独立。

## 多维随机变量函数的分布

### 多维离散型随机变量函数的分布

设 $(X,Y)$ 的联合分布列为 $P(X = x_i,Y=y_j) = p_{ij},(i,j = 1,2,\cdots)$，$z = g(x,y)$ 为一个二元函数，$Z = g(X,Y)$ 为随机变量 $(X,Y)$ 的函数。

假设 $Z$ 的全部不同取值记为 $z_k$，并且所有使得 $g(x,y) = z_k$ 的点记为 $(x_{i_k},y_{j_k})$，即 $z_k = g(x_{i_k},y_{j_k})$，则 $Z$ 的分布列：

$$
P(Z = z_k) = P(g(X,Y) = z_k) = \sum_{g(x_{i_k},y_{j_k}) = z_k}P(X = x_{i_k},Y =y_{j_k}),\ k = 1,2,\cdots
$$

特别地，当 $Z = X+Y$ 时，

$$
P(Z=r)=P(X+Y=r)=\sum_{i=0}^{r} P(X=i,Y=r-i)
$$

进一步，当 $X$ 与 $Y$ 相互独立时，若 $P(X=k)=a_{k},P(Y=k)=b_{k},k=0,1,2,\cdots$，则 $Z = X+Y$ 的分布列满足 **离散卷积公式**：

  $$
  P(Z=r)=\sum_{i=0}^{r} P(X=i) P(Y=r-i)=\sum_{i=0}^{r} a_{i} b_{r-i}
  $$

**性质**：

1. **泊松分布的可加性**：若随机变量 $X,Y$ **相互独立**，且都服从 泊松分布，即 $X\sim P(\lambda_1),Y\sim P(\lambda_2)$，则 **其和也服从 泊松分布**，即

   $$
   X+Y\sim P(\lambda_1+\lambda_2)
   $$

2. **二项分布的可加性**：若随机变量 $X,Y$ **相互独立**，且都服从二项分布，即 $X\sim B(n,p),Y\sim B(m,p)$，则 **其和也服从二项分布**，即

   $$
   X+Y\sim B(n+m,p)
   $$

### 多维连续型随机变量函数的分布

设 $(X,Y)$ 的联合概率密度为 $f(x,y)$，$g(x,y)$ 是一个二元函数，令 $Z = g(X,Y)$，则 $Z$ 的分布函数：

$$
F_{Z}(z)=P(Z \le z)=P(g(X,Y) \le z)=\iint\limits_{g(x,y) \le z} f(x,y) \ \mathrm{d} x \ \mathrm{d} y
$$

若有非负可积函数 $f_Z(z)$，使得

$$
F_{Z}(z)=\int_{-\infty}^{z} f_{Z}(u) \ \mathrm{d} u
$$

则随机变量函数 $Z = g(X,Y)$ 的概率密度为

$$
f_Z(z) = F'_Z(z)
$$

#### 和的分布

和的分布：$Z = X + Y$

$$
f_Z(z) = \int_{-\infty}^{+\infty}f(x,z-x)\ \mathrm dx = \int_{-\infty}^{+\infty}f(z-y,y)\ \mathrm dy
$$

若 $X,Y$ 相互独立，则

$$
\begin{aligned} f_Z(z) &= \int_{-\infty}^{+\infty}f_X(x)\cdot f_Y(z-x)\ \mathrm dx\\ &= \int_{-\infty}^{+\infty}f_X(z-y)\cdot f_Y(y)\ \mathrm dy \overset{\triangle}{=}f_X * f_Y(z) \end{aligned}
$$

函数 $f_Z(z)$ 称为函数 $f_X(x)$ 与 $f_Y(y)$ 的 **卷积**。

#### 线性函数的分布 $Z=a X+b Y+c$

更一般地，设 $Z=a X+b Y+c$，$a,b,c$ 为常数，$a,b\neq0$，

$$
f_{Z}(z)=\frac{1}{|b|} \int_{-\infty}^{+\infty} f\left(t,\frac{z-a t-c}{b}\right) \mathrm{d} t=\frac{1}{|a|} \int_{-\infty}^{+\infty} f\left(\frac{z-b t-c}{a},t\right) \mathrm{d} t
$$

#### 商的分布

商的分布：设 $P(Y=0)=0$，令 $Z = \dfrac XY$。

$$
\begin{aligned}F_Z(z) &= P\left(\dfrac XY\le z\right)\\ &= \iint\limits_{\frac xy\le z}f(x,y)\ \mathrm dx\ \mathrm dy \\&= \iint\limits_{x\le yz, y> 0}f(x,y)\ \mathrm dx\ \mathrm dy + \iint\limits_{x\ge yz, y< 0}f(x,y)\ \mathrm dx\ \mathrm dy \\&= \int_{0}^{+\infty}\int_{-\infty}^{yz}f(x,y)\ \mathrm dx\ \mathrm dy + \int_{-\infty}^{0}\int_{yz}^{+\infty}f(x,y)\ \mathrm dx\ \mathrm dy \end{aligned}
$$

概率密度为

$$
f_Z(z) = \int_{-\infty}^{+\infty}f(yz,y)\mid y\mid\mathrm dy
$$

若 $X,Y$ 相互独立，则

$$
f_Z(z) = \int_{-\infty}^{+\infty}f_X(yz)\cdot f_Y(y)\mid y\mid\mathrm dy
$$

#### 平方和的分布

平方和的分布：$Z = X^2+Y^2$

$$
f_{Z}(z)=\begin{cases} 0,& z<0 \\ \dfrac{1}{2} \displaystyle\int_{0}^{2 \pi} f(\sqrt{z} \cos \theta,\sqrt{z} \sin \theta) \mathrm{d} \theta,& z \geqslant 0 \end{cases}
$$


#### 变量代换法

设已知二维随机变量 $(X,Y)$ 的概率密度函数 $f_{XY}(x,y)$，构造一个新的二维随机变量 $(U,V)$，满足

$$
\begin{cases} U=\varphi(X,Y) \\ V=\psi(X,Y) \end{cases}
$$

在 $(X,Y)$ 的取值区域上，设变换 $\begin{cases} u=\varphi(x,y) \\ v=\psi(x,y) \end{cases}$ 一一对应，存在唯一的连续可微反函数 $\begin{cases} x=h(u,v) \\ y=k(u,v) \end{cases}$，且其雅可比行列式 $J\ne0$。记

$$
J=\frac{\partial(x,y)}{\partial(u,v)}=\begin{vmatrix}h_u&h_v\\k_u&k_v\end{vmatrix}
$$

则

$$
f_{UV}(u,v) = f_{XY}\bigl(h(u,v),k(u,v)\bigr)\left| J \right|
$$

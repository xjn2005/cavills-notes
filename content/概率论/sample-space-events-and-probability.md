---
title: 样本空间、事件和概率
publish: true
draft: false
description: 概率论学习笔记：样本空间、事件和概率。
tags:
  - 概率论
---

## 样本空间

- **样本空间**：一个随机试验 $E$ 的所有可能结果所组成的集合称为随机试验 $E$ 的样本空间，记为 $\Omega$。

- **样本点**：样本空间中的元素，即 $E$ 的每个结果，称为样本点，记为 $\omega$。

## 事件

### 事件域与 $\sigma$-代数

并非 $\Omega$ 的每个子集都必须被赋予概率。我们选取一个由事件组成的集合族 $\mathcal F$，要求：

1. $\Omega\in\mathcal F$，
2. 若 $A\in\mathcal F$，则 $\overline A\in\mathcal F$，
3. 若 $A_1,A_2,\ldots\in\mathcal F$，则
   $\displaystyle\bigcup_{i=1}^{\infty}A_i\in\mathcal F$。

满足这些条件的 $\mathcal F$ 称为 $\Omega$ 上的 **$\sigma$-代数**，其中的元素称为**事件**。

> 关于$\sigma$-代数更详细的阐述可以看这篇内容：[可测空间](https://zhuanlan.zhihu.com/p/2068744409760403827)

但我们直观来说，**事件是对随机试验结果的一种描述**。它对应于样本空间$\omega$的一个子集。只要试验结果落在这个子集中，就说明该事件发生了。

### 事件之间的关系

- **子事件**：

    $$
    A\subset B
    $$

- **事件的和**：

    $$
    A\cup B=\{\omega:\omega\in A\text{或}\omega\in B\}
    $$

    $$
    \bigcup_{i=1}^{n}A_i=\{\omega:\text{至少存在某个 }A_i\text{ 使得 }\omega\in A_i\}
    $$

- **事件的积**：

    $$
    A\cap B=AB=\{\omega:\omega\in A\text{ 且 }\omega\in B\}
    $$

- **事件的差**：

    $$
    A-B=\{\omega:\omega\in A\text{ 且 }\omega\notin B\}=A\overline{B}=A\cap \overline{B}
    $$

- **互斥事件**：

    $$
    AB=\varnothing \iff A\cap B = \varnothing
    $$

    两两互斥事件的和可以表示为其和：

    $$
    \bigcup_{i=1}^{n}A_i=\sum_{i=1}^{n}A_i
    $$

- **对立事件**：

    $$
    A\overline{A}=\varnothing,\qquad A\cup\overline{A}=\Omega
    $$

### 事件的运算

1. **交换律**

    $$
    A\cup B=B\cup A,\qquad A\cap B=B\cap A
    $$

2. **结合律**

    $$
    A\cup(B\cup C)=(A\cup B)\cup C
    $$

    $$
    A\cap(B\cap C)=(A\cap B)\cap C
    $$

3. **分配律**

    $$
    A\cup(B\cap C)=(A\cup B)\cap(A\cup C)
    $$

    $$
    A\cap(B\cup C)=(A\cap B)\cup(A\cap C)
    $$

4. **德摩根对偶法则**

    $$
    \overline{A\cup B}=\overline{A}\cap\overline{B}
    $$

    $$
    \overline{A\cap B}=\overline{A}\cup\overline{B}
    $$

### 单调序列的极限

**单调递增序列** $A_1\subset A_2\subset A_3\subset\cdots$，其极限定义为

  $$
  \lim_{n\to\infty}A_n=\bigcup_{i=1}^{\infty}A_i
  $$

**单调递减序列** $A_1\supset A_2\supset A_3\supset\cdots$，其极限定义为

  $$
  \lim_{n\to\infty}A_n=\bigcap_{i=1}^{\infty}A_i
  $$

## 概率

### 概率的定义

在概率空间 $\Omega$ 上的函数 $P:\mathcal{F}(\Omega)\to[0,1]$ 称为一个概率，如果其满足下述三条公理：

- **非负性**：

    $$
    P(A)\ge0
    $$

- **规范性**：

    $$
    P(\Omega)=1
    $$

- **可列可加性**：对于两两互不相交事件 $A_1,A_2,\ldots$，有

    $$
    P\left(\bigcup_{i=1}^{\infty}A_i\right)=\sum_{i=1}^{\infty}P(A_i)
    $$

### 概率的性质

1. **空事件的概率为零**：

    $$
    P(\varnothing)=0
    $$

2. **有限可加性**：若 $A_i$，$i=1,\ldots,n$ 互不相容，则

    $$
    P\left(\bigcup_{i=1}^{n}A_i\right)=\sum_{i=1}^{n}P(A_i)
    $$

3. **单调性与可减性**：若 $A\subset B$，则

    $$
    P(A)\le P(B),\quad P(B-A)=P(B)-P(A)
    $$

4. **对立事件的概率**：对于任意事件 $A$，有

    $$
    P(\overline{A})=1-P(A)
    $$

5. **加法公式**：
   
   - 对于任意两个事件 $A$ 和 $B$，

       $$
       P(A\cup B)=P(A)+P(B)-P(A\cap B)
       $$

   - 三个事件的和

     $$
     \begin{aligned}
     P(A_1\cup A_2\cup A_3)
     ={}&P(A_1)+P(A_2)+P(A_3)\\
     &-P(A_1A_2)-P(A_2A_3)-P(A_1A_3)\\
     &+P(A_1A_2A_3)
     \end{aligned}
     $$

   - $n$ 个事件的和

     $$
     \begin{aligned}
     P\left(\bigcup_{i=1}^{n}A_i\right)
     ={}&\sum_{i=1}^{n}P(A_i)-\sum_{1\le i<j\le n}P(A_iA_j)+\sum_{1\le i<j<k\le n}P(A_iA_jA_k)\\
     &+\cdots+(-1)^{n-1}P(A_1A_2\cdots A_n)
     \end{aligned}
     $$

### 有限样本空间上的概率

**古典概型**：设样本空间$\omega$由有限个样本点组成，且每个样本点出现的概率相同。则任一事件$A$的概率等于它所包含的样本点数占样本点总数的比例，即：


$$
P(A)=\frac{|A|}{|\Omega|}=\frac{A\text{ 所包含的基本事件个数}}{\Omega\text{ 中基本事件总数}}
$$

## 条件概率

### 条件概率的定义

**条件概率**：对于样本空间 $\Omega$ 中的两个事件 $A$、$B$，$P(B)>0$，称

$$
P(A\mid B)=\frac{P(AB)}{P(B)}
$$

为事件 $B$ 发生的条件下，事件 $A$ 发生的条件概率。

### 乘法公式

- 对于样本空间 $\Omega$ 中的两个事件 $A$、$B$，$P(B)>0$，则有

$$
P(AB)=P(B\mid A)P(A)
$$

- 设 $A$、$B$、$C$ 为样本空间 $\Omega$ 中的三个事件，$P(AB)>0$，则有

    $$
    P(ABC)=P(C\mid AB)P(B\mid A)P(A)
    $$

- 设 $A_1,A_2,\ldots,A_n$ 为样本空间 $\Omega$ 中的 $n$ 个事件，$P(A_1A_2\cdots A_{n-1})>0$，则有

    $$
    \begin{aligned}
    P(A_1A_2\cdots A_n)
    ={}&P(A_n\mid A_1A_2\cdots A_{n-1})\times P(A_{n-1}\mid A_1A_2\cdots A_{n-2})\\
    &\times\cdots\times P(A_2\mid A_1)\times P(A_1)
    \end{aligned}
    $$

### 样本空间的划分

**划分**：设 $A_1,A_2,\cdots$ 为样本空间 $\Omega$ 中的一组概率大于 $0$ 的事件，如果

1. 事件互不相交：

    $$
    A_i\cap A_j=\varnothing,\qquad i\ne j,\quad i,j=1,2,\ldots
    $$

2. 事件的和为样本空间：

    $$
    \bigcup_{i=1}^{\infty}A_i=\Omega
    $$

则称 $A_1,A_2,\cdots$ 为样本空间 $\Omega$ 的一个划分。

## 全概率公式

设 $B_1,\cdots,B_n$ 为样本空间 $\Omega$ 的一个划分，且 $P(B_i)>0$，$i=1,\ldots,n$，对任一事件 $A\subset\Omega$ 有

$$
P(A)=\sum_{i=1}^{n}P(A\mid B_i)P(B_i)
$$

### 贝叶斯公式

**贝叶斯公式**：设 $B_1,\cdots,B_n$ 为样本空间 $\Omega$ 的一个划分，$A$ 为 $\Omega$ 中任一事件，$P(A)>0$，则

$$
P(B_i\mid A)=\frac{P(A\mid B_i)P(B_i)}{\sum_{j=1}^{n}P(A\mid B_j)P(B_j)},\qquad i=1,\ldots,n
$$

::: callout info "说明" icon:info
1. 贝叶斯公式反映了因果关系互换之间的概率关系。

2. $P(B_i)$ 称为先验概率，$P(B_i\mid A)$ 称为后验概率。

3. 在实际中 $B$、$\overline{B}$ 是一个自然的划分，此时贝叶斯公式为

$$
P(B\mid A)=\frac{P(A\mid B)P(B)}{P(A\mid B)P(B)+P(A\mid\overline{B})P(\overline{B})}
$$
:::

## 独立事件

**两个事件相互独立**：对于样本空间 $\Omega$ 中的两个事件 $A$ 和 $B$，如果

$$
P(AB)=P(A)\times P(B)
$$
则称事件 $A$ 与 $B$ 相互独立。记为 $A\perp\!\!\!\perp B$。

**推论**：对于样本空间 $\Omega$ 中的两个事件 $A$ 和 $B$，如果 $P(B)>0$，则 $A$、$B$ 相互独立的充分必要条件是

$$
P(A\mid B)=P(A)
$$

> 即B事件对于A事件是否发生并无影响。

**一列事件相互独立**：设 $\{A_i:i\in I\}$ 为样本空间 $\Omega$ 中的一列事件。如果对所有 $J\subset I$ 有

$$
P\left(\bigcap_{i\in J}A_i\right)=\prod_{i\in J}P(A_i)
$$

称 $\{A_i:i\in I\}$ 相互独立。

**推论**：对于样本空间 $\Omega$ 中的两个事件 $A$ 和 $B$，下面四种陈述相互等价：

1. $A$ 与 $B$ 相互独立。

2. $A$ 与 $\overline{B}$ 相互独立。

3. $\overline{A}$ 与 $B$ 相互独立。

4. $\overline{A}$ 与 $\overline{B}$ 相互独立。


**独立与互斥**：若 $P(A)>0$ 且 $P(B)>0$，则 **独立的事件一定不互斥，互斥的事件一定不独立**。

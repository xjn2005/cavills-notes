---
publish: true
draft: false
description: Nano2Tetris 学习笔记：chapter 3。
tags:
  - Nano2Tetris
---

## 1.1 时序逻辑

前两章构建的门电路和 ALU 都属于组合逻辑（combinational logic）：输出只由当前输入决定。比如 `Add16` 的输出始终是当前两个输入之和，输入一变，输出也随之改变。

但计算机还需要保存「之前发生过什么」：寄存器要保存数据，内存要按地址保存多个字，程序计数器（Program Counter，PC）要记住下一条指令的位置。这些设备的输出不仅取决于当前输入，还取决于此前保存的状态，因此称为时序逻辑（sequential logic）。

::: callout info "组合逻辑与时序逻辑" icon:info
组合逻辑满足 `out = f(in)`，时序逻辑还依赖过去的状态，可写成 `out(t) = f(in(t - 1), out(t - 1))`。
:::

### 1.1.1 时钟

时钟（clock）向整个计算机持续发送 `0 → 1 → 0` 的周期性信号。一个完整的变化过程称为一个时钟周期（cycle）。本书把状态更新看作发生在相邻周期的边界：在周期 `t - 1` 给出输入，存储设备在周期 `t` 开始时产生新的输出。

这种统一的节拍把连续变化的电路离散化：组合逻辑可以在一个周期内计算，时序芯片只在下一个周期边界保存稳定结果。只要时钟周期足够长，信号就有时间穿过组合逻辑并稳定下来。

### 1.1.2 D 触发器

D 触发器（Data Flip-Flop，DFF）是本章最底层的记忆元件。它把上一周期的输入作为当前周期的输出：

$$out(t) = in(t - 1)$$

在 Hack 平台中，DFF 被视为原始芯片（built-in chip），不需要用 NAND 门自行实现。它提供的一个周期延迟正是建立反馈回路、保存状态的基础。

| 芯片名 | DFF |
| --- | --- |
| 输入 | `in` |
| 输出 | `out` |
| 功能 | `out(t) = in(t - 1)` |

::: callout info "同步更新" icon:info
所有 DFF 接到同一个主时钟。在周期边界，它们同时锁存输入，在其余时间，输入变化不会立刻改变输出。
:::

## 1.2 从触发器到存储系统

### 1.2.1 1 位存储器（Bit）

一个 Bit 芯片由 DFF、复用器（Mux）和反馈线路构成。`load = 1` 时，Mux 选择外部输入 `in`，于是下一周期写入新值。`load = 0` 时，Mux 选择当前输出 `out` 并反馈给 DFF，因此下一周期仍保持原值。

| 芯片名 | Bit |
| --- | --- |
| 输入 | `in`，`load` |
| 输出 | `out` |
| 功能 | 若 `load(t - 1) = 1`，则 `out(t) = in(t - 1)`，否则 `out(t) = out(t - 1)` |

关键 HDL 实现如下：

```hdl
CHIP Bit {
    IN in, load;
    OUT out;

    PARTS:
    Mux(a=out, b=in, sel=load, out=next);
    DFF(in=next, out=out);
}
```

### 1.2.2 寄存器（Register）

寄存器把多个 Bit 并排组合，用来存储一个固定宽度的字（word）。Hack 的 `Register` 宽度是 `16` 位：所有 Bit 共用同一个 `load` 信号，因此要么一起写入 `in[16]`，要么一起保持原值。

| 芯片名 | Register |
| --- | --- |
| 输入 | `in[16]`，`load` |
| 输出 | `out[16]` |
| 功能 | 若 `load(t - 1) = 1`，则 `out(t) = in(t - 1)`，否则保持原值 |

读取寄存器不需要额外控制信号：`out` 始终暴露当前保存的 `16` 位数据。写入时，把新数据放到 `in`，并在一个周期内令 `load = 1`，新值会在下一个周期出现在 `out` 上。

### 1.2.3 随机访问存储器（RAM）

随机访问存储器（Random Access Memory，RAM）是由多个寄存器和直接访问逻辑组成的阵列。每个寄存器拥有唯一地址，地址决定哪一个寄存器参与读写，因此访问任意位置的时间不依赖其物理位置。

| 芯片名 | RAMn |
| --- | --- |
| 输入 | `in[16]`，`address[k]`，`load` |
| 输出 | `out[16]` |
| 功能 | $out(t) = RAM_{address(t)}(t)$，其中 $n = 2^k$ |

读操作只需把目标编号放到 `address`：直接访问逻辑会把选中寄存器的输出送到 `out`。写操作则把数据放到 `in`、地址放到 `address` 并令 `load = 1`，只有被选中的寄存器在下一个周期更新。

Hack 平台中各 RAM 芯片的字宽均为 `16` 位，地址宽度随容量增长：

| 芯片名 | 寄存器数量 | 地址位数 |
| --- | ---: | ---: |
| RAM8 | 8 | 3 |
| RAM64 | 64 | 6 |
| RAM512 | 512 | 9 |
| RAM4K | 4,096 | 12 |
| RAM16K | 16,384 | 14 |

RAM 的构建体现了层次化设计：`RAM8` 用 8 个 Register 构成，`RAM64` 可以由 8 个 `RAM8` 构成。高位地址用于选择较大的子模块，低位地址继续在子模块内部选择，这种做法称为层次化寻址（hierarchical addressing）。

### 1.2.4 计数器与程序计数器（PC）

计数器（counter）会跨时钟周期维护一个数值。CPU 中最重要的计数器是程序计数器：它通常每周期加 `1`，从而指向下一条指令，也能被加载为跳转目标，或在复位时清零。

| 芯片名 | PC |
| --- | --- |
| 输入 | `in[16]`，`inc`，`load`，`reset` |
| 输出 | `out[16]` |
| 功能 | `reset` 时置 `0`，否则 `load` 时置 `in`，否则 `inc` 时加 `1`，否则保持原值 |

控制位有明确优先级：`reset > load > inc > 保持`。也就是说，即使 `inc` 和 `load` 同时为 `1`，PC 也会加载 `in`。若 `reset` 为 `1`，则无条件清零。

## 2.1 实现

### 2.1.1 实现 Register

`Register` 只是 16 个 Bit 的并行组合。每个 Bit 连接相同的 `load`，但分别处理总线上的一位数据：

```hdl
CHIP Register {
    IN in[16], load;
    OUT out[16];

    PARTS:
    Bit(in=in[0], load=load, out=out[0]);
    Bit(in=in[1], load=load, out=out[1]);
    // 其余 out[2] 到 out[15] 以相同方式连接
    Bit(in=in[15], load=load, out=out[15]);
}
```

### 2.1.2 实现 PC

PC 的重点在于把优先级转换成级联 Mux：先在「保持」与「加一」之间选择，再用 `load` 覆盖结果，最后用 `reset` 覆盖结果。寄存器始终加载最终选择值。

```hdl
CHIP PC {
    IN in[16], reset, load, inc;
    OUT out[16];

    PARTS:
    Inc16(in=out, out=incremented);
    Mux16(a=out, b=incremented, sel=inc, out=afterInc);
    Mux16(a=afterInc, b=in, sel=load, out=afterLoad);
    Mux16(a=afterLoad, b=false, sel=reset, out=next);
    Register(in=next, load=true, out=out);
}
```


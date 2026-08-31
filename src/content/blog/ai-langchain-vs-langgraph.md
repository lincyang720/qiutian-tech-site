---
title: "LangChain vs LangGraph：到底该选哪个？"
description: "两个名字很像的框架，定位完全不同。本文从「面向链」和「面向图」两种心智模型出发，给出清晰的选型建议。"
pubDate: 2026-08-15
category: ai-engineering
tags: ["LangChain", "LangGraph", "Agent"]
lang: zh-CN
series: "跟着 AI 学 AI 工程"
seriesOrder: 2
seriesTotal: 5
---

## 先说结论

- **LangChain**：适合「线性 / 分支的链」，快速把模型、工具、提示词串起来。
- **LangGraph**：适合「有状态、可循环、可人工介入」的 Agent，本质是状态机。

如果你做的只是「输入→处理→输出」，LangChain 足够；如果你要做能**反思、回退、多轮决策**的 Agent，上 LangGraph。

## 心智模型差异

LangChain 是**管道（pipeline）**：

```python
chain = prompt | model | parser
chain.invoke({"question": q})
```

LangGraph 是**图（graph）**，节点是 step，边是流转，还能回到上一节点：

```python
from langgraph.graph import StateGraph
g = StateGraph(State)
g.add_node("think", think)
g.add_node("act", act)
g.add_edge("think", "act")
g.add_conditional_edges("act", should_retry, {"retry": "think", "done": END})
```

## 选型清单

| 场景 | 选 |
|------|----|
| 一次性问答 / 摘要 / 翻译 | LangChain |
| 固定流程的 RAG | LangChain |
| ReAct / 多步工具调用 | LangGraph |
| 需要人工审核 checkpoint | LangGraph |
| 长程任务、记忆、回退 | LangGraph |

## 小结

别被「Graph 更先进」误导。先用 LangChain 把业务跑起来，等真的遇到循环与状态管理痛点，再迁移到 LangGraph，成本不高。

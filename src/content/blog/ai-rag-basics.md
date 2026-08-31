---
title: "RAG 入门：让大模型用上你自己的知识"
description: "检索增强生成（RAG）是大模型落地的第一站。本文讲清楚 RAG 的原理、关键组件，以及新手最容易踩的 3 个坑。"
pubDate: 2026-08-18
category: ai-basics
tags: ["RAG", "大模型", "向量数据库"]
lang: zh-CN
series: "跟着 AI 学 AI 工程"
seriesOrder: 1
seriesTotal: 5
seriesDesc: "用 AI 边学边写，从 RAG 原理到 LangChain/LangGraph，再到 Spring AI 做出能跑的 Agent——一套完整的大模型应用入门路径。"
---

## RAG 解决什么问题

大模型的知识停在训练截止时间，且不知道你的私有数据。RAG（Retrieval-Augmented Generation）的思路很简单：**先检索、再生成**——把问题相关的资料找出来，塞进 prompt 让模型基于资料回答。

## 一条标准 RAG 链路

```
文档切块 → 向量化 → 存入向量库
        ↓
用户提问 → 向量化 → 相似检索 → 拼进 Prompt → 大模型生成
```

## 新手三大坑

1. **切块太大或太小**：块太大噪声多，太小丢上下文。经验值 300–500 字一块，留 10% 重叠。
2. **只用向量检索**：语义召回好但容易漏精确匹配（如编号、人名）。混合检索（向量 + 关键词 BM25）效果更稳。
3. **不做重排序（rerank）**：召回 top-20 后，用 cross-encoder 重排取 top-3，答案质量肉眼可见地提升。

## 最小可跑示例（伪代码）

```python
query_vec = embed(query)
hits = vector_db.search(query_vec, top_k=20)
hits = rerank(query, hits)[:3]
prompt = f"根据资料回答：{hits}\n问题：{query}"
answer = llm(prompt)
```

## 小结

RAG 不是银弹，但它是把大模型接进企业知识、个人笔记最务实的第一步。先把链路跑通，再逐步加重排、混合检索、引用溯源。

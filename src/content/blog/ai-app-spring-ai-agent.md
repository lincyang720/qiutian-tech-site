---
title: "用 Spring AI 30 分钟做一个能调工具的 Agent"
description: "Spring AI 把 Agent 能力带进了 Java 生态。本文用最简代码演示一个能查天气、能算数的工具调用 Agent。"
pubDate: 2026-08-12
category: ai-app
tags: ["Spring AI", "Agent", "Java"]
lang: zh-CN
series: "跟着 AI 学 AI 工程"
seriesOrder: 3
seriesTotal: 5
---

## 目标

做一个 Agent：用户问「北京今天多少度，再帮我算下 23 度的 1.8 倍」，它能**先调天气工具，再调计算工具**，最后汇总回答。

## 定义工具

```java
@Bean
@Description("查询某城市当前温度")
public Function<WeatherReq, WeatherResp> weatherTool() {
    return req -> new WeatherResp(req.city(), 23.0);
}

@Bean
@Description("做基础数学计算")
public Function<CalcReq, CalcResp> calcTool() {
    return req -> new CalcResp(req.a() * req.b());
}
```

## 组装 Agent

```java
ChatClient client = ChatClient.builder(model)
    .defaultTools(weatherTool(), calcTool())
    .build();

String ans = client.prompt("北京今天多少度？再算下它的 1.8 倍")
                    .call()
                    .content();
```

Spring AI 会自动把工具描述发给模型，模型决定调用顺序，框架负责执行并把结果回传——这就是**工具调用（function calling）**闭环。

## 关键点

1. 工具方法的 `@Description` 极其重要，模型靠它决定要不要调。
2. 返回类型用简单 POJO，框架负责序列化。
3. 生产环境务必加**超时与限流**，防止模型无限循环调工具。

## 小结

Spring AI 让 Java 工程师用熟悉的 Bean/注解方式落地 Agent，无需切到 Python。适合已有 Spring 技术栈的团队快速集成。

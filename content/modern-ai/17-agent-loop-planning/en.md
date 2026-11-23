# Building an agent loop: planning, memory and limits

Lesson 6 introduced agents and tool use. Here is the **control framework** that takes an agent from demo to product: the loop, memory, errors and limits.

## The core loop (ReAct)

```
loop:
    the model sees (goal + history of observations)
    → decides: call tool X(args) OR give the final answer
    if a tool call: run it, append the RESULT to history, repeat
    if a final answer: stop
```

**ReAct** (Yao et al., 2023) interleaves *reasoning* and *acting*: the model writes a brief "thought" before each tool call, then observes the result.

![The agent loop: think, act, observe, with step and budget limits](/lessons/modern-ai/17-agent-loop-planning-fig-en.svg)
*The agent loop: think, act, observe, with step and budget limits*

## Required components

| Component | Role |
|---|---|
| **Tool set** | functions with clear schemas, parameter validation, minimal privileges |
| **Working memory** | history of actions/observations; summarise when too long |
| **Long-term memory** | durable facts (vector/key-value store) |
| **Planning** | split a big goal into small steps; revise the plan after failures |
| **Limits** | max steps, token/money budget, time |

## Handling tool errors

Tools will fail (bad arguments, expiry, network). **Don't crash the agent**: catch the exception and return the error **as an observation** so the model can fix itself (change arguments, try another tool). Cap retries to avoid infinite loops.

## Stop conditions

- The model returns a final answer.
- **Step/budget exceeded** (mandatory: an agent can loop forever and burn money).
- **Loop detection** (the same action repeated).
- **Human approval** needed for risky actions.

## When *not* to use an agent

If the process is **fixed and known** (A then B then C), use a **fixed workflow**: cheap, fast, easy to test. Use an agent when **the number of steps and tools needed isn't known up front** (Anthropic, "Building effective agents"). Start simple and add complexity only when evals show it's needed.

## Evaluating agents

Measure **task completion rate**, steps, cost, and **trajectory quality** (did it use the right tools). Store full traces for debugging. Combine lessons 10 and 16.

## References

- Yao et al. (2023). ReAct: synergizing reasoning and acting in language models. *ICLR*.
- Anthropic (2024). Building effective agents (engineering guide).
- Schick et al. (2023). Toolformer. *NeurIPS*.

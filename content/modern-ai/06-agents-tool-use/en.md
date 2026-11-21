# AI agents and tool use

A plain LLM only **generates text**. An **agent** is a system that uses an LLM as a "brain" to **decide actions by itself**, **use tools** (search, run code, call APIs, read files) and **loop** until the goal is complete.

## From chatbot to agent

| Chatbot | Agent |
|---|---|
| Ask once, answer once | Automatic **multi-step** work |
| Uses only knowledge in the model | **Calls tools** to fetch data and act |
| Doesn't affect the world | Can **send email, edit code, book appointments** |

## Tool calling (function calling)

You **describe the tools** (name, description, parameters) to the model. When needed, the model **doesn't compute by itself** but returns a **structured call** (usually JSON); **your program** executes it and feeds the result back to the model.

```json
{"tool": "add", "args": {"a": 2, "b": 3}}
```

```python
TOOLS = {"add": add, "multiply": multiply}

def run_tool(call_json):
    call = json.loads(call_json)
    return TOOLS[call["tool"]](**call["args"])
```

**The model doesn't run tools**: it only **proposes**. Your code does the real work and decides whether to allow it (safety!).

Tool descriptions matter a lot, since the model picks tools based on them:

```json
{
  "name": "get_weather",
  "description": "Get the current weather of a city",
  "parameters": {"city": {"type": "string"}}
}
```

## The agent loop

```text
         ┌────────────────────────────────────────┐
         ▼                                        │
  Goal ─▶ LLM thinks ─▶ action? ──Yes──▶ run tool ─▶ observe (result)
                         │
                        No
                         ▼
                   Final answer
```

```python
history = []
while True:
    action = llm(history)              # 1. the model decides
    if action["type"] == "final":      # 2. done?
        print(action["answer"]); break
    result = run_tool(action["call"])  # 3. execute the tool
    history.append(result)             # 4. feed the observation back
```

The **ReAct** pattern (Reason + Act): the model alternates **reasoning** ("I need the current price") and **acting** (calling a tool), each **observation** informing the next step.

## The components of an agent

| Component | Role |
|---|---|
| **LLM** | Planning, decision making |
| **Tools** | Search, computation, code, APIs, databases |
| **Memory** | Conversation history, long-term notes (often a vector DB/RAG) |
| **Planning** | Break a big goal into small steps |
| **Controller** | The loop, step limits, error handling |

## Example: a math agent

The question "3 × 4 then add 2". The LLM:

1. Turn 1: calls `multiply(3, 4)` → observes 12.
2. Turn 2: calls `add(12, 2)` → observes 14.
3. Turn 3: answers "The total is 14".

Why not let the LLM compute itself? LLMs are **unreliable at mental arithmetic** with large numbers; a tool gives **exact** results. This is the general pattern: **the LLM handles reasoning, tools handle precision and action**.

## Risks and safety principles

| Risk | Mitigation |
|---|---|
| **Irreversible actions** (deleting data, spending money) | **Human confirmation** before sensitive actions |
| **Prompt injection** via tool-returned content (a web page with hidden commands) | Treat tool results as **data**, not instructions; least privilege |
| **Infinite loops**, rising cost | Limit steps and budget |
| **Overly broad permissions** | **Least-privilege principle** for each tool |
| **Silent errors** | Log every step, allow review |

## When to use an agent?

Agents are powerful but **unpredictable, costly and slow**. If a problem can be solved with **one LLM call** or **a fixed workflow** (every step known ahead of time), use that simpler approach. Use an agent only when **the number of steps and tools needed isn't known beforehand**.

## Multi-agent

Several specialized agents (a planner, a coder, a reviewer) cooperate. Flexible but adds complexity and cost.

## Standard tool protocols

Standards like **MCP** (Model Context Protocol) let a tool be written once and used with many AI applications, like a "USB port" for a model's tools.

## What did you just implement?

The two core parts every agent framework has: a **tool executor** (`run_tool`) and the **observe-act loop**. Frameworks like LangChain and agent SDKs just wrap extras: memory management, retries and monitoring.

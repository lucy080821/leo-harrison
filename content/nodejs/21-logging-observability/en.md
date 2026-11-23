# Structured logging and observability: levels, request ids and metrics

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

When your service runs at 3 a.m. and something breaks, all you have is **logs, metrics and traces**. A system you can't observe can't be operated reliably.

## Structured logs

Instead of `console.log("User 42 failed login from 1.2.3.4")` (free text, hard to filter), write **one JSON per line**:

```json
{"level":"warn","msg":"login failed","userId":42,"ip":"1.2.3.4","requestId":"r-1","service":"api"}
```

Tools (Loki, Elasticsearch, Datadog, CloudWatch) filter/aggregate by field: *"how many `login failed` by `ip` in 5 minutes?"*. Libraries: **pino** (fastest), winston.

![The three pillars of observability: logs, metrics, traces](/lessons/nodejs/21-logging-observability-fig-en.svg)
*The three pillars of observability: logs, metrics, traces*

## Log levels

| Level | Use for |
|---|---|
| `error` | an operation **failed**, needs attention |
| `warn` | abnormal but handled (retry, fallback) |
| `info` | important business events (startup, sign-in, an order) |
| `debug` | debugging detail (off in production) |

Set the level through an environment variable to change it **without redeploying**.



## Context: child loggers and request ids

Create a **child logger** carrying `requestId`, `userId` for each request: every line in that request automatically has context, letting you **follow one request** through multiple services.

## Don't log sensitive things

Passwords, tokens, card numbers, personal data (PII) **never** go into logs (logs get copied to many systems and kept long). Use **redaction** by key list (`pino` has `redact` built in). Comply with regulations (GDPR, Vietnam's Decree 13/2023/ND-CP on personal data protection).

## The three pillars of observability

| Pillar | Answers | Tools |
|---|---|---|
| **Logs** | what happened? | pino, ELK/Loki |
| **Metrics** | how is the system, what's the trend? | Prometheus + Grafana |
| **Traces** | where is a request slow across services? | **OpenTelemetry**, Jaeger |

## Metrics: look at percentiles, not averages

The mean **hides** the slow tail. Track **p50, p95, p99**: if p99 = 3 seconds, 1 in 100 people waits 3 seconds. The four "golden signals" (Google SRE): **latency, traffic, errors, saturation**.

## Alerting

Alert on **symptoms users feel** (5xx error rate, p99 latency), not on every CPU metric. Each alert must be **actionable**, with a runbook, or it causes **alert fatigue**.

## References

- pino documentation; OpenTelemetry documentation.
- Google SRE Book: "Monitoring Distributed Systems" (Four Golden Signals).
- OWASP: Logging Cheat Sheet.

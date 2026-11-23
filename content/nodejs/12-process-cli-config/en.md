# process, command-line arguments and configuration

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

A real Node program is more than code: it receives **arguments**, reads **configuration**, returns an **exit code**, and reacts to OS **signals**. The global `process` object is the gateway.

## Available information

| API | Tells you |
|---|---|
| `process.argv` | `['node', 'script.js', ...arguments]` |
| `process.env` | environment variables (strings) |
| `process.cwd()` | the current working directory |
| `process.platform`, `process.version` | OS, Node version |
| `process.exitCode` | the exit code on finish |

Node 20+ has `util.parseArgs` for parsing `--out=dist --minify` style arguments. For large CLIs use **commander**, **yargs**, or **citty**.



![Layered config: upper layers override lower ones](/lessons/nodejs/12-process-cli-config-fig-en.svg)
*Layered config: upper layers override lower ones*

## Layered configuration

Typical priority (high to low): **command-line args > environment variables > config file > in-code defaults**. Each layer **overrides** the ones below, so the same code runs on your machine, CI and production.

Per **The Twelve-Factor App**: *config is separate from code*, stored in the **environment**. **Never** commit secrets to git.

Every value in `process.env` is a **string**: `process.env.PORT` is `"3000"`, so coerce and **validate** (the same idea as Next.js course lesson 18):

```js
const port = Number(process.env.PORT ?? 3000)
if (!Number.isInteger(port)) throw new Error('invalid PORT')
```

## Exit codes

Unix convention: **0 = success**, non-zero = failure. Other tools (CI, shell `&&`) rely on it to know whether a command succeeded.

```js
process.exitCode = 1   // preferred: lets Node finish gracefully
process.exit(1)        // stops IMMEDIATELY, may lose unflushed logs
```

## Signals and graceful shutdown

When deploying (Docker, Kubernetes, systemd) the system sends **SIGTERM** asking you to stop. You should **catch the signal**, stop accepting new requests, wait for in-flight ones to finish, close database connections, then exit:

```js
process.on('SIGTERM', async () => {
  server.close()           // stop accepting new connections
  await db.end()           // close the database
  process.exit(0)
})
```

## Global errors

`process.on('uncaughtException')` and `unhandledRejection` are the **last safety net**: log the error then **exit** (state may be corrupt) so a supervisor restarts it. Since Node 15, `unhandledRejection` makes the process **exit** by default.

## References

- Node.js docs: `process`, `util.parseArgs`.
- The Twelve-Factor App: III. Config.
- POSIX: exit status; signal(7).

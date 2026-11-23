# Streams and processing large data with async generators

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Reading a 5 GB CSV with `fs.readFileSync` **loads it all into RAM** and crashes. **Streams** process data **chunk by chunk**: memory use stays nearly constant however large the data.

## Node's four stream types

| Type | Example |
|---|---|
| **Readable** | `fs.createReadStream`, an incoming HTTP request |
| **Writable** | `fs.createWriteStream`, an HTTP response |
| **Duplex** | a TCP socket |
| **Transform** | `zlib.createGzip()`, a custom parser |

```js
import { pipeline } from 'node:stream/promises'
await pipeline(
  fs.createReadStream('big.csv'),
  zlib.createGzip(),
  fs.createWriteStream('big.csv.gz'),
)
```

`pipeline` connects streams, **cleans up** and **propagates errors** properly (much better than manual `.pipe()`).



![Streams process chunk by chunk so memory stays almost flat](/lessons/nodejs/11-streams-generators-fig-en.svg)
*Streams process chunk by chunk so memory stays almost flat*

## Backpressure

If the reader is faster than the writer (fast disk reads, slow network sends), data **piles up in RAM**. Streams solve it by **pausing the source** when the destination can't keep up. `pipeline` and `for await` handle it automatically; hand-writing `.write()` while ignoring its return value is a classic bug.

## Async iterators: the modern style

Readable streams are **async iterables**; you write ordinary loops, and transformation steps are **async generators**:

```js
for await (const chunk of fs.createReadStream('log.txt', 'utf8')) { ... }

async function* lines(chunks) { ... }      // Transform = generator
async function* batch(iter, size) { ... }  // batch for per-group database writes
```

This lesson uses async generators so you can see the **idea** right in the browser; equivalent code runs on real Node with real streams.

## Pitfall: chunks don't align with boundaries

Data arrives in **arbitrary** chunks: a line/multi-byte character/JSON can be **cut between two chunks**. Always keep the **remainder** (`rest`) for next time, as in the `lines()` example.

## When to use streams

- **Large or unknown-size** files/uploads/downloads.
- ETL, compression, encryption, log processing, video delivery.
- For small data (a few MB), simple `readFile` is enough.

## Web Streams

Node also supports **Web Streams** (`ReadableStream`) like browsers and `fetch`: `Readable.fromWeb`, `toWeb` convert between them.

## References

- Node.js docs: `stream`, `stream/promises`, "Backpressuring in Streams".
- MDN: Async iterators and generators.

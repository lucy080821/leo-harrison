# Caching in services: LRU, TTL and pitfalls

> **Note:** a browser has no real Node, so Lexi Learn runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Caching is the **cheapest** way to make a system faster and more load-tolerant: store the result of costly work to return instantly next time. But it is also the **source of the subtlest bugs**.

## Cache-aside (the most common pattern)

```js
async function getUser(id) {
  const hit = await cache.get('user:' + id)
  if (hit) return hit                    // hit
  const user = await db.findUser(id)     // miss: fetch from the source
  await cache.set('user:' + id, user, { ttl: 60 })
  return user
}
```

The application manages the cache; when data changes you **delete/update** the matching entry.



![LRU evicts the least recently used entry when the cache is full](/lessons/nodejs/19-caching-lru-fig-en.svg)
*LRU evicts the least recently used entry when the cache is full*

## Two core questions

1. **When to evict an entry?** TTL (expire by time), **LRU** (evict the least recently used when full), LFU (least frequently used).
2. **When to invalidate?** After each change (clean but complex) or accept **stale data up to the TTL** (simple).

## Where to put the cache

| Where | Traits |
|---|---|
| **In-process** (Map/LRU) | fastest, but **one copy per process**; lost on restart |
| **Redis/Memcached** | shared by all machines, more durable; an extra network hop |
| **CDN/HTTP cache** | closest to the user |

## Famous pitfalls

- **Cache stampede (thundering herd)**: an entry expires, thousands of concurrent requests recompute it at once, crushing the database. Prevent with **coalescing concurrent calls** (share one Promise), jittered TTLs, background refresh (stale-while-revalidate).
- **Harmful stale data**: prices/stock/permissions: use short TTLs or **active invalidation**.
- **Cache keys missing information**: forgetting `userId`/language in the key ⇒ **user A sees user B's data**. A serious security bug.
- **Negative caching**: also cache "not found" results (short TTL) to block repeated queries for nonexistent data.
- **Unbounded memory**: always have a **size limit** (LRU).

## HTTP caching

For public responses: `Cache-Control: public, max-age=300, stale-while-revalidate=60`. For **conditional** requests: `ETag`/`If-None-Match` lets you return **304 Not Modified** with no body, saving bandwidth. Per-user data: `Cache-Control: private` or `no-store`.

## Principles

1. **Measure first**: caching pays off only when a query is truly slow/costly and reads outnumber writes.
2. Every cache has a **TTL and a limit**.
3. Track the **hit ratio**.

## References

- Redis docs: caching patterns; Wikipedia: Cache replacement policies.
- MDN: HTTP caching; RFC 9111 (HTTP Caching), RFC 5861 (stale-while-revalidate).

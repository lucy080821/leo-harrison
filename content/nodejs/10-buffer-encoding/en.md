# Buffer and encodings: hex, base64 and binary

> **Note:** a browser has no real Node, so Learn With Leo runs a **simulation** (in-memory fs, a mini `http`/`express`, testing with `app.inject`). The code you write is identical to real Node; each lesson ends with how to run it locally.

Computers store and transmit **bytes**, not "text". Whenever you read a file, receive network data, handle images or cryptography, you handle **bytes**. In Node, `Buffer` is an object holding a sequence of bytes.

## Characters aren't bytes

Text is encoded to bytes by a **character encoding**; today's standard is **UTF-8**: basic Latin 1 byte, accented Vietnamese letters 2-3 bytes, emoji 4 bytes.

```js
"Việt".length               // 4 characters
Buffer.byteLength("Việt")   // 6 bytes
```

Practical consequence: size limits (database columns, uploads, HTTP headers) count **bytes**; truncating a string by bytes can **break a character** in the middle.



![The same bytes written as text three ways](/lessons/nodejs/10-buffer-encoding-fig-en.svg)
*The same bytes written as text three ways*

## Representing bytes as text

| Encoding | Traits | Used for |
|---|---|---|
| **hex** | 2 characters per byte, readable | hashes, IDs, debugging |
| **base64** | 4 characters per 3 bytes (+33% size) | embedding images (`data:` URLs), email |
| **base64url** | swaps `+ /` for `- _`, drops `=` | **JWT**, URLs, filenames |

**Important:** base64 is **not security encoding**. Anyone can decode it instantly. It only carries bytes through channels that accept text.

## Common operations

```js
const b = Buffer.from("Node")             // from a string
Buffer.from("4e6f6465", "hex")            // from hex
b.toString("base64")                       // to base64
Buffer.concat([b1, b2])                    // concatenate
Buffer.alloc(16)                           // 16 zero bytes
crypto.randomBytes(16).toString("hex")     // secure random (for tokens)
```

## Pitfalls

- Concatenating a string with a Buffer (`"a" + buf`) calls UTF-8 `toString()`: corrupts **binary** data. Keep it a Buffer until needed.
- Reading a file **without an encoding** gives a Buffer (right); pass `'utf8'` for a string.
- When receiving data in chunks, **a multi-byte character can be split** between chunks: use `StringDecoder` or gather Buffers before decoding.
- Use `Buffer.alloc`, not `new Buffer()` (deprecated, unsafe).

## References

- Node.js docs: `Buffer`.
- RFC 4648 (Base16, Base32, Base64, base64url); RFC 3629 (UTF-8).

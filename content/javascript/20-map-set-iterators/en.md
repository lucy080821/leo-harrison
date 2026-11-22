# Map, Set and data structures

Besides arrays and objects, JavaScript has `Set` and `Map` for problems where arrays/objects are clumsy.

## Set: a collection with no duplicates

```javascript
const set = new Set([1, 2, 2, 3, 3, 3]);
set.size;          // 3
set.has(2);        // true   (fast lookup)
set.add(4);
set.delete(1);
[...set];          // [2, 3, 4]
```

- Each value appears **only once**; duplicates vanish automatically.
- Keeps **insertion order**.
- Trick to dedupe an array: `[...new Set(arr)]`.
- Set operations: intersection `[...a].filter(x => b.has(x))`, union `new Set([...a, ...b])`.

![Set removes duplicates, Map keeps any key](/lessons/javascript/20-map-set-iterators-fig-en.svg)
*Set removes duplicates, Map keeps any key*

## Map: key-value pairs with any key

```javascript
const map = new Map();
map.set("a", 1).set("b", 2);
map.get("a");      // 1
map.has("c");      // false
map.delete("b");
map.size;          // 1

for (const [key, value] of map) console.log(key, value);
```

### How is Map different from Object?

| | `Object` | `Map` |
|---|---|---|
| Keys | Strings or Symbols | **Any type** (objects, functions, numbers...) |
| Iteration order | Tricky with numeric keys | Always insertion order |
| Size | `Object.keys(o).length` | `map.size` |
| Performance with many adds/removes | Worse | Better |
| Inherited default keys (`toString`...) | Can cause confusion | None |

Use **Object** for records of fixed shape (like `{ name, age }`); use **Map** for dynamic **dictionaries**, especially when keys aren't strings.

## Counting frequencies: a very common pattern

```javascript
const words = "the cat and the dog".split(" ");
const freq = new Map();
for (const w of words) {
  freq.set(w, (freq.get(w) ?? 0) + 1);
}
// the → 2, cat → 1, and → 1, dog → 1
```

## Converting back and forth

```javascript
Object.fromEntries(map);        // Map → Object
new Map(Object.entries(obj));   // Object → Map
Array.from(map.values());       // values into an array
```

## WeakMap and WeakSet

They hold **weak references** to objects: once nothing else uses an object, it can be garbage-collected. Often used to attach extra data to objects without causing memory leaks.

## Which structure to choose?

| You need | Use |
|---|---|
| An ordered list accessed by position | **Array** |
| A record describing one thing (name, age...) | **Object** |
| A set of **unique** values with fast "is it in there?" | **Set** |
| A dynamic dictionary, any key, counting | **Map** |

> Complexity: `set.has(x)` and `map.get(k)` are roughly $O(1)$ (independent of size), whereas `array.includes(x)` is $O(n)$. With large data, switching to Set/Map is far faster.

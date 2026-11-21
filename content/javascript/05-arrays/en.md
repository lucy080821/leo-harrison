# Arrays

An **array** is an ordered list of values. Indexes **start at 0**.

```javascript
const fruits = ["apple", "orange", "mango"];
fruits[0];            // "apple"
fruits.length;        // 3
fruits[fruits.length - 1];   // "mango" (the last element)
fruits.at(-1);        // "mango" (shorter)
```

## Adding and removing

| Method | Effect | Mutates the array? |
|---|---|---|
| `push(x)` / `pop()` | Add / remove at the **end** | Yes |
| `unshift(x)` / `shift()` | Add / remove at the **start** | Yes |
| `splice(i, n)` | Remove `n` elements from position `i` | Yes |
| `slice(a, b)` | A copy from `a` up to (not incl.) `b` | **No** |
| `concat`, `[...a, ...b]` | Join arrays | No |

## Searching

```javascript
nums.includes(3);              // true/false
nums.indexOf(3);               // the position, or -1 if absent
nums.find(n => n > 6);         // first element that matches (or undefined)
nums.findIndex(n => n > 6);    // its position
nums.some(n => n > 6);         // does at least one match?
nums.every(n => n > 0);        // do all match?
```

## The three most important "transform" functions

All three **leave the original array untouched** and return something new.

```javascript
const nums = [1, 2, 3, 4];

nums.map(n => n * 2);              // [2, 4, 6, 8]    transform each element
nums.filter(n => n % 2 === 0);     // [2, 4]          keep matching elements
nums.reduce((total, n) => total + n, 0);  // 10        fold the array into ONE value
```

`reduce(fn, initial)`: at every step, `total` is the accumulated result so far. For the sum: $0+1=1,\ 1+2=3,\ 3+3=6,\ 6+4=10$.

They **chain** nicely:

```javascript
nums.filter(n => n % 2 === 0).map(n => n * n);   // [4, 16]
```

## Sorting

```javascript
const a = [10, 9, 1];
a.sort();                       // [1, 10, 9] ← WRONG! default compares as strings
a.sort((x, y) => x - y);        // [1, 9, 10] ascending
a.sort((x, y) => y - x);        // descending
```

`sort` **mutates the original**. To keep it, copy first: `[...a].sort(...)` or `a.toSorted(...)`.

## Iterating

```javascript
for (const item of fruits) console.log(item);
fruits.forEach((item, i) => console.log(i, item));
```

## Copies and "references"

```javascript
const a = [1, 2];
const b = a;          // b and a are the SAME array
b.push(3);            // a becomes [1, 2, 3] too!
const c = [...a];     // c is an independent copy
```

# JavaScript hiện đại (ES6+)

Từ **ES6 (2015)**, JavaScript có nhiều cú pháp giúp code ngắn và rõ hơn. Bạn đã gặp một số (`let/const`, arrow function, template string, `for...of`, spread). Bài này gom và bổ sung các tính năng quan trọng nhất.

## Destructuring (phân rã)

```javascript
// Mảng: theo VỊ TRÍ
const [first, second] = [10, 20, 30];       // first=10, second=20
const [head, ...rest] = [1, 2, 3, 4];       // rest = [2, 3, 4]
[a, b] = [b, a];                             // hoán đổi hai biến

// Đối tượng: theo TÊN
const { name, age = 18 } = user;            // age mặc định 18
const { address: { city } } = user;         // lồng nhau

// Ngay trong tham số hàm
function show({ name, age }) { return `${name} (${age})`; }
```

![Cú pháp ES6+: destructuring, spread, template literal](/lessons/javascript/13-modern-javascript-fig-vi.svg)
*Cú pháp ES6+: destructuring, spread, template literal*

## Spread (...) và Rest (...)

Cùng ba dấu chấm nhưng hai vai trò:

- **Spread**: **trải** mảng/đối tượng ra: `[...a, ...b]`, `{ ...user, age: 21 }`, `Math.max(...nums)`.
- **Rest**: **gom** phần còn lại: `function sum(...numbers)`, `const [x, ...rest] = arr`.

## Optional chaining `?.` và nullish coalescing `??`

```javascript
user.address?.city;          // address là null/undefined → trả undefined, KHÔNG lỗi
user.getName?.();            // chỉ gọi nếu hàm tồn tại
list?.[0];                   // truy cập mảng an toàn

const city = user.address?.city ?? "Không rõ";   // ?? chỉ thay khi null/undefined
```

`??` khác `||`:

| Biểu thức | Kết quả |
|---|---|
| `0 \|\| 99` | `99` (0 là falsy) |
| `0 ?? 99` | `0` (0 không phải null/undefined) |
| `"" ?? "x"` | `""` |

Dùng `??` khi `0`, `""` hay `false` là **giá trị hợp lệ**.

## Các tính năng hữu ích khác

```javascript
const key = "color";
const obj = { [key]: "red", name };          // khoá tính toán + viết tắt thuộc tính
"abc".padStart(5, "*");                      // "**abc"
[1, [2, [3]]].flat(Infinity);                // [1,2,3]
Object.fromEntries([["a", 1], ["b", 2]]);    // { a: 1, b: 2 }
arr.at(-1);                                  // phần tử cuối
structuredClone(obj);                        // sao chép sâu
x ||= 5; x ??= 5; x &&= 5;                   // gán có điều kiện
```

## Module (import/export)

Chia code thành nhiều file:

```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export default function main() { /* ... */ }

// app.js
import main, { PI, add } from "./math.js";
```

Trong HTML dùng `<script type="module" src="app.js">`. Với Next.js, React và Node.js hiện đại, bạn viết `import/export` ở khắp nơi. Khung thực hành ở đây chạy một file `script.js`, nên phần module bạn sẽ thực hành ở các khoá Node.js và Next.js.

## Cập nhật ngôn ngữ

JavaScript phát triển mỗi năm (ES2020, ES2021...). Tra cứu cú pháp trên **MDN Web Docs**: nguồn tham khảo chuẩn.

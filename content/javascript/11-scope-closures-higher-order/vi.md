# Scope, closure và hàm bậc cao

## Phạm vi (scope)

**Scope** quyết định biến nào "nhìn thấy" được ở đâu.

| Loại | Nơi nhìn thấy |
|---|---|
| **Toàn cục** | Mọi nơi (khai báo ngoài hàm/khối) |
| **Hàm** | Chỉ trong hàm đó |
| **Khối** (`let`, `const` trong `{ }`) | Chỉ trong khối `{ }` đó (if, for...) |

```javascript
const global = "ai cũng thấy";

function f() {
  const local = "chỉ trong f";
  if (true) {
    let block = "chỉ trong khối if";
  }
  // console.log(block);  // ReferenceError
}
```

Trình duyệt tìm biến theo **chuỗi phạm vi**: từ trong ra ngoài, gặp tên đầu tiên là dùng. `var` chỉ có phạm vi hàm (không phải khối) nên dễ gây lỗi, hãy dùng `let` và `const`.

![Closure: hàm bên trong nhớ biến của hàm bao ngoài](/lessons/javascript/11-scope-closures-higher-order-fig-vi.svg)
*Closure: hàm bên trong nhớ biến của hàm bao ngoài*

## Closure

**Closure** là hàm **ghi nhớ** các biến ở nơi nó được tạo ra, ngay cả khi hàm bên ngoài đã chạy xong.

```javascript
function makeCounter() {
  let count = 0;                // biến của hàm ngoài
  return function () {          // hàm trong "đóng gói" count
    count++;
    return count;
  };
}

const a = makeCounter();
a(); // 1
a(); // 2
```

- Mỗi lần gọi `makeCounter()` tạo ra `count` **mới**, nên các bộ đếm **độc lập** với nhau.
- `count` **không thể truy cập từ bên ngoài**: đây là cách tạo dữ liệu "riêng tư".

Closure xuất hiện khắp nơi: handler sự kiện, `setTimeout`, các hàm trả về hàm.

## Hàm bậc cao (higher-order function)

Là hàm **nhận hàm làm đối số** hoặc **trả về một hàm**. Bạn đã dùng nhiều: `map`, `filter`, `addEventListener`.

```javascript
// nhận hàm
function repeat(n, action) {
  for (let i = 0; i < n; i++) action(i);
}
repeat(3, (i) => console.log(i));

// trả về hàm ("nhà máy" hàm)
const multiplier = (k) => (n) => n * k;
const double = multiplier(2);
double(21);                       // 42
```

## Callback

**Callback** là hàm bạn đưa cho nơi khác **gọi lại sau**. Đây là nền tảng cho code bất đồng bộ (bài sau).

```javascript
setTimeout(() => console.log("sau 1 giây"), 1000);
```

## Compose: ghép hàm

```javascript
const compose = (f, g) => (x) => f(g(x));
const inc = (n) => n + 1;
const dbl = (n) => n * 2;
compose(inc, dbl)(5);             // inc(dbl(5)) = 11
```

> Cạm bẫy kinh điển: dùng `var` trong vòng `for` rồi tạo hàm bên trong: tất cả hàm chia sẻ **một** biến. Dùng `let` để mỗi vòng có biến riêng.

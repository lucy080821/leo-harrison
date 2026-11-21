# Hàm

**Hàm** là khối code có tên, nhận **đầu vào** (tham số), xử lý và có thể **trả về** kết quả. Hàm giúp bạn **không lặp code** và chia chương trình thành các phần nhỏ dễ hiểu.

## Khai báo và gọi hàm

```javascript
function add(a, b) {       // a, b là THAM SỐ (parameters)
  return a + b;
}

const result = add(2, 3);  // 2, 3 là ĐỐI SỐ (arguments)
console.log(result);       // 5
```

- `return` kết thúc hàm và đưa giá trị về nơi gọi. Hàm không có `return` trả về `undefined`.
- Hàm khai báo bằng `function` được **hoisting**: dùng được trước dòng khai báo.

## Tham số mặc định và rest

```javascript
function greet(name = "bạn") { return `Chào ${name}`; }
greet();            // "Chào bạn"

function sum(...nums) {          // gom mọi đối số vào mảng
  let t = 0;
  for (const n of nums) t += n;
  return t;
}
sum(1, 2, 3, 4);                 // 10
```

## Arrow function

```javascript
const square = (n) => n * n;               // một biểu thức: tự động return
const area = (w, h) => {                   // nhiều lệnh: dùng {} và return
  const result = w * h;
  return result;
};
const hello = () => "xin chào";            // không tham số
```

Arrow function ngắn gọn, hợp với hàm nhỏ truyền vào `map`, `filter`, sự kiện... (cách `this` hoạt động cũng khác, sẽ gặp ở bài lớp).

## Hàm là giá trị

Hàm có thể gán vào biến, truyền làm đối số, hoặc được trả về từ hàm khác (xem bài "Scope, closure và hàm bậc cao").

```javascript
const operations = { double: (x) => x * 2, negate: (x) => -x };
console.log(operations.double(21));   // 42
```

## Phạm vi (scope)

Biến khai báo **trong hàm** chỉ tồn tại trong hàm đó:

```javascript
function demo() {
  const secret = 1;
}
demo();
// console.log(secret);  // ReferenceError!
```

## Đệ quy

Hàm tự gọi chính nó để giải bài toán bằng cách chia nhỏ. Luôn cần **điều kiện dừng**, nếu không sẽ lặp mãi và gây lỗi tràn bộ nhớ.

$$
n! = \begin{cases} 1 & n = 0 \\ n \times (n-1)! & n > 0 \end{cases}
$$

```javascript
function factorial(n) {
  if (n === 0) return 1;           // điều kiện dừng
  return n * factorial(n - 1);     // bài toán nhỏ hơn
}
```

## Quy tắc đặt tên và thiết kế

- Tên hàm là **động từ**: `getUser`, `calculateTotal`, `isValid` (trả về đúng/sai thì bắt đầu bằng `is/has/can`).
- Mỗi hàm làm **một việc**.
- Ưu tiên hàm **thuần**: cùng đầu vào cho cùng đầu ra, không sửa dữ liệu bên ngoài.

# Biến, kiểu dữ liệu và console.log

**JavaScript** là ngôn ngữ lập trình chạy ngay trong trình duyệt. Trong bài này bạn dùng `console.log()` để in kết quả ra tab **Console** ở bên phải.

## Biến

Biến là một "chiếc hộp có tên" để lưu giá trị.

```javascript
const name = "Lexi";  // const: không gán lại được
let age = 20;         // let: có thể gán lại
age = 21;             // OK
```

- Ưu tiên `const`; chỉ dùng `let` khi giá trị cần thay đổi.
- Tránh `var` (cách cũ, dễ gây lỗi phạm vi).
- Tên biến phân biệt hoa thường, thường viết theo kiểu `camelCase`: `userName`.

## Các kiểu dữ liệu cơ bản

| Kiểu | Ví dụ | Ghi chú |
|---|---|---|
| `number` | `42`, `3.14` | số nguyên và số thực |
| `string` | `"chào"`, `'hi'`, `` `hello` `` | chuỗi ký tự |
| `boolean` | `true`, `false` | đúng/sai |
| `undefined` | `undefined` | biến chưa có giá trị |
| `null` | `null` | cố ý "không có gì" |

Dùng `typeof` để xem kiểu:

```javascript
console.log(typeof 42);       // "number"
console.log(typeof "hello");  // "string"
```

## Phép toán

```javascript
console.log(7 + 2);   // 9
console.log(7 - 2);   // 5
console.log(7 * 2);   // 14
console.log(7 / 2);   // 3.5
console.log(7 % 2);   // 1  (chia lấy dư)
console.log(2 ** 3);  // 8  (luỹ thừa)
```

Nối chuỗi và **template string** (dùng dấu huyền `` ` `` và `${...}`):

```javascript
const who = "Lexi";
console.log("Chào " + who);
console.log(`Chào ${who}, 1 + 2 = ${1 + 2}`);
```

## So sánh

```javascript
console.log(5 > 3);     // true
console.log(5 === 5);   // true  (bằng nhau cả giá trị lẫn kiểu)
console.log(5 === "5"); // false
```

> Luôn dùng `===` và `!==` thay vì `==` và `!=` để tránh những kết quả bất ngờ do tự ép kiểu.

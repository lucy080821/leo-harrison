# Vòng lặp

Vòng lặp chạy một khối code **nhiều lần** mà bạn không phải viết lại.

## for

```javascript
for (let i = 1; i <= 5; i++) {
  console.log(i);
}
```

Ba phần trong ngoặc, cách nhau bằng `;`:

1. **Khởi tạo** `let i = 1`: chạy một lần ở đầu.
2. **Điều kiện** `i <= 5`: kiểm tra trước mỗi lượt; sai thì dừng.
3. **Bước nhảy** `i++`: chạy sau mỗi lượt (`i++` nghĩa là `i = i + 1`).

![Vòng lặp for: khởi tạo, điều kiện, cập nhật](/lessons/javascript/03-loops-fig-vi.svg)
*Vòng lặp for: khởi tạo, điều kiện, cập nhật*

## while và do...while

```javascript
let n = 3;
while (n > 0) {       // kiểm tra TRƯỚC khi chạy
  console.log(n);
  n--;
}

do {                  // chạy ít nhất MỘT lần, rồi mới kiểm tra
  console.log("chạy một lần");
} while (false);
```

> Cẩn thận **vòng lặp vô hạn**: nếu quên `n--`, điều kiện luôn đúng và trình duyệt bị treo. Nếu trang xem trước bị đơ, hãy sửa code và tải lại.

## for...of: duyệt mảng và chuỗi

```javascript
for (const fruit of ["táo", "cam"]) console.log(fruit);
for (const ch of "abc") console.log(ch);
```

Ngoài ra, `for...in` duyệt **tên thuộc tính** của đối tượng:

```javascript
const user = { name: "An", age: 20 };
for (const key in user) console.log(key, user[key]);
```

## break và continue

```javascript
for (let i = 1; i <= 10; i++) {
  if (i === 3) continue;   // bỏ qua lượt này
  if (i === 6) break;      // thoát hẳn vòng lặp
  console.log(i);          // 1, 2, 4, 5
}
```

## Mẫu thường gặp

**Cộng dồn:**

```javascript
let total = 0;
for (let i = 1; i <= 100; i++) total += i;
```

Kết quả bằng công thức Gauss: $\sum_{i=1}^{n} i = \dfrac{n(n+1)}{2}$, với $n = 100$ ta được $5050$.

**Lồng nhau** (bảng cửu chương):

```javascript
for (let a = 1; a <= 3; a++) {
  for (let b = 1; b <= 3; b++) console.log(a, "x", b, "=", a * b);
}
```

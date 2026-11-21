# Chuỗi, số, Math và ngày tháng

## Chuỗi (string)

Chuỗi **không thể sửa tại chỗ** (immutable): mọi phương thức đều **trả về chuỗi mới**.

| Phương thức | Ví dụ → kết quả |
|---|---|
| `length` | `"abc".length` → `3` |
| `trim()` | `"  hi  ".trim()` → `"hi"` |
| `toUpperCase()`, `toLowerCase()` | `"Hi".toUpperCase()` → `"HI"` |
| `includes(s)`, `startsWith(s)`, `endsWith(s)` | `"hello".includes("ell")` → `true` |
| `indexOf(s)` | `"hello".indexOf("l")` → `2` (không có thì `-1`) |
| `slice(a, b)` | `"abcdef".slice(1, 4)` → `"bcd"` |
| `split(sep)` | `"a,b,c".split(",")` → `["a","b","c"]` |
| `replace(a, b)`, `replaceAll(a, b)` | `"a-b-c".replaceAll("-", "+")` → `"a+b+c"` |
| `padStart(n, c)` | `"5".padStart(3, "0")` → `"005"` |
| `repeat(n)` | `"ab".repeat(3)` → `"ababab"` |

Truy cập ký tự: `"hello"[1]` → `"e"`. Nối mảng thành chuỗi: `["a","b"].join("-")` → `"a-b"`.

**Template string** dùng dấu huyền cho phép chèn biểu thức và xuống dòng:

```javascript
const name = "Lexi";
const msg = `Xin chào ${name.toUpperCase()}, 2 + 3 = ${2 + 3}`;
```

## Số

JavaScript chỉ có **một kiểu số** `number` (số thực 64-bit).

```javascript
Number("42");        // 42
parseInt("12px");    // 12
parseFloat("3.5kg"); // 3.5
Number("abc");       // NaN  (Not a Number)
Number.isNaN(x);     // kiểm tra NaN đúng cách
(3.14159).toFixed(2);   // "3.14"  ← trả về CHUỖI
```

### Sai số số thực

```javascript
0.1 + 0.2;   // 0.30000000000000004
```

Đây không phải lỗi JavaScript mà là cách máy tính lưu số nhị phân. Khi so sánh số thập phân hoặc tính tiền: làm tròn (`toFixed`) hoặc tính bằng đơn vị nhỏ nhất (đồng, xu) dưới dạng số nguyên.

## Math

```javascript
Math.round(2.5);   // 3      làm tròn
Math.floor(2.9);   // 2      làm tròn xuống
Math.ceil(2.1);    // 3      làm tròn lên
Math.abs(-5);      // 5
Math.max(3, 9, 4); // 9
Math.min(...[3, 9, 4]); // 3
Math.sqrt(16);     // 4
Math.pow(2, 10);   // 1024   (hay 2 ** 10)
Math.random();     // số ngẫu nhiên trong [0, 1)
```

Số nguyên ngẫu nhiên từ `a` đến `b`:

$$
\text{randInt}(a, b) = \lfloor \text{random}() \times (b - a + 1) \rfloor + a
$$

```javascript
const randInt = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
```

## Ngày tháng

```javascript
const now = new Date();                  // thời điểm hiện tại
const d = new Date("2026-11-21");        // từ chuỗi ISO
d.getFullYear();                          // 2026
d.getMonth();                             // 10  ← THÁNG BẮT ĐẦU TỪ 0 (0 = tháng 1)
d.getDate();                              // 21 (ngày trong tháng)
d.getDay();                               // 6  (0 = Chủ nhật)
d.toISOString();                          // "2026-11-21T00:00:00.000Z"
d.toLocaleDateString("vi-VN");            // "21/11/2026"
Date.now();                               // mili giây từ 1/1/1970 (dùng đo thời gian)
```

> Tính chênh lệch ngày: trừ hai `Date` ra mili giây rồi chia `1000 * 60 * 60 * 24`. Với múi giờ phức tạp, hãy dùng thư viện như `date-fns` hoặc `Intl.DateTimeFormat`.

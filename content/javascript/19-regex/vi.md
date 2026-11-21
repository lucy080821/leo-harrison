# Biểu thức chính quy (Regex)

**Regex** là ngôn ngữ nhỏ để **mô tả mẫu chuỗi**: tìm số điện thoại, kiểm tra email, thay thế hàng loạt, tách dữ liệu...

## Viết regex

```javascript
const re = /abc/;            // dạng literal, giữa hai dấu /
const re2 = new RegExp("abc");

/hello/.test("say hello");   // true  (có khớp không?)
"say hello".match(/hello/);  // thông tin khớp
```

## Cờ (flags)

| Cờ | Ý nghĩa |
|---|---|
| `g` | Toàn cục: tìm **mọi** chỗ khớp, không dừng ở cái đầu |
| `i` | Không phân biệt hoa thường |
| `m` | `^`, `$` khớp theo từng **dòng** |

## Ký tự đặc biệt

| Mẫu | Khớp |
|---|---|
| `.` | Một ký tự bất kỳ (trừ xuống dòng) |
| `\d` / `\D` | Một chữ số / **không** phải chữ số |
| `\w` / `\W` | Chữ, số, `_` / ngược lại |
| `\s` / `\S` | Khoảng trắng / không phải khoảng trắng |
| `[abc]` | Một trong `a`, `b`, `c` |
| `[a-z0-9]` | Một ký tự trong khoảng |
| `[^abc]` | **Không phải** a, b, c |
| `^` / `$` | Đầu / cuối chuỗi |
| `\.` | Dấu chấm thật (escape bằng `\`) |
| `a\|b` | `a` hoặc `b` |

## Lượng từ (quantifier)

| Mẫu | Số lần |
|---|---|
| `a*` | 0 hoặc nhiều |
| `a+` | 1 hoặc nhiều |
| `a?` | 0 hoặc 1 |
| `a{3}` | Đúng 3 |
| `a{2,5}` | Từ 2 đến 5 |

Mặc định lượng từ **tham lam** (khớp nhiều nhất có thể); thêm `?` để thành **lười**: `.+?`.

## Nhóm và ví dụ

```javascript
/^\d{4}$/.test("2026");                   // true: đúng 4 chữ số
/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test("a@b.co");   // email đơn giản

const m = "21/11/2026".match(/(\d+)\/(\d+)\/(\d+)/);
m[1]; // "21"   m[2]; // "11"   m[3]; // "2026"   ← nhóm bắt (...)

// Nhóm có tên
const { groups } = "2026-11-21".match(/(?<y>\d+)-(?<m>\d+)-(?<d>\d+)/);
groups.y; // "2026"
```

Giải thích mẫu email: `^` đầu chuỗi; `[^\s@]+` một hay nhiều ký tự **không** là khoảng trắng/`@`; `@`; lại `[^\s@]+`; `\.` dấu chấm; `[^\s@]+`; `$` cuối chuỗi.

## Các phương thức dùng regex

```javascript
"a1b22".match(/\d+/g);                  // ["1","22"]   (với g: mảng mọi khớp)
"a1b22".replace(/\d+/g, "#");           // "a#b#"
"a1b22".replace(/(\d+)/g, "<$1>");      // "a<1>b<22>"  ($1 = nhóm 1)
"a, b;c".split(/[,;]\s*/);              // ["a","b","c"]
[..."a1b22".matchAll(/\d+/g)];          // lặp qua từng khớp kèm vị trí
```

## Lời khuyên

- **Đừng** dùng regex cho thứ phức tạp như phân tích HTML hay xác thực email đầy đủ theo chuẩn; hãy dùng thư viện hoặc kiểm tra bằng cách gửi email xác nhận.
- Regex quá phức tạp rất khó đọc: chia nhỏ và **thêm chú thích**.
- Thử và gỡ lỗi nhanh trên công cụ như **regex101.com**.
- Một số regex xấu gây **ReDoS** (chạy cực chậm với đầu vào lạ): cẩn thận với lượng từ lồng nhau như `(a+)+`.

# JSON và lưu trữ dữ liệu

## JSON là gì?

**JSON** (JavaScript Object Notation) là **định dạng văn bản** để trao đổi dữ liệu giữa các hệ thống: API trả về JSON, file cấu hình viết bằng JSON, `package.json`...

```json
{
  "name": "Lexi",
  "age": 20,
  "skills": ["HTML", "JS"],
  "active": true,
  "address": null
}
```

Khác với đối tượng JavaScript, JSON **nghiêm ngặt hơn**:

- Khoá **bắt buộc** nằm trong **dấu nháy kép** `"`.
- Chuỗi chỉ dùng nháy kép `"`, không dùng `'`.
- **Không** có dấu phẩy thừa, không có chú thích, không có hàm và `undefined`.
- Kiểu cho phép: chuỗi, số, boolean, `null`, mảng, đối tượng.

## stringify và parse

```javascript
const text = JSON.stringify({ a: 1, tags: ["x"] });   // '{"a":1,"tags":["x"]}'
const obj  = JSON.parse(text);                        // { a: 1, tags: ["x"] }

JSON.stringify(obj, null, 2);                         // in đẹp, thụt lề 2 ô
```

- `JSON.parse` ném `SyntaxError` nếu chuỗi sai định dạng: **bọc `try/catch`** khi dữ liệu không tin cậy.
- Hàm, `undefined` bị **bỏ qua**; `Date` thành chuỗi ISO (khi parse ngược không tự thành `Date`).

### Sao chép sâu nhanh (có giới hạn)

`JSON.parse(JSON.stringify(obj))` tạo bản sao sâu nhưng làm mất hàm và `Date`. Dùng `structuredClone(obj)` thì tốt hơn.

## Web Storage: lưu dữ liệu ngay trên trình duyệt

| | `localStorage` | `sessionStorage` | Cookie |
|---|---|---|---|
| Sống đến | **Mãi mãi** (đến khi bị xoá) | Hết khi **đóng tab** | Theo hạn đặt |
| Dung lượng | ~5 MB | ~5 MB | ~4 KB |
| Gửi lên server | Không | Không | **Có**, tự động mỗi request |

```javascript
localStorage.setItem("theme", "dark");
localStorage.getItem("theme");        // "dark"  (không có thì null)
localStorage.removeItem("theme");
localStorage.clear();
```

Web Storage **chỉ lưu chuỗi**. Muốn lưu đối tượng hoặc mảng phải đi qua JSON:

```javascript
function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
function load(key, fallback) {
  const raw = localStorage.getItem(key);
  return raw === null ? fallback : JSON.parse(raw);
}

save("todos", [{ text: "Học JS", done: false }]);
load("todos", []);
```

> **Cảnh báo bảo mật:** không lưu mật khẩu hay token nhạy cảm trong `localStorage`, vì mã JavaScript độc hại (XSS) đọc được nó. Với phiên đăng nhập, dùng cookie `HttpOnly` do server đặt.
>
> Khung thực hành này chạy sandbox không có quyền dùng `localStorage`, nên bài tập giả lập bằng một đối tượng thường. Trên trang web thật, bạn thay `storage` bằng `localStorage` là chạy.

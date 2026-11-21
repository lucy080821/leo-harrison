# Câu điều kiện

Chương trình cần **rẽ nhánh**: làm việc này nếu điều kiện đúng, việc khác nếu sai.

## if / else if / else

```javascript
const score = 85;

if (score >= 90) {
  console.log("Xuất sắc");
} else if (score >= 80) {
  console.log("Giỏi");
} else {
  console.log("Cố gắng thêm");
}
```

Các nhánh được kiểm tra **từ trên xuống**; nhánh đúng đầu tiên chạy và các nhánh còn lại bị bỏ qua. Vì vậy hãy kiểm tra điều kiện **hẹp/lớn nhất trước**.

## Toán tử so sánh và logic

| Toán tử | Ý nghĩa |
|---|---|
| `===`, `!==` | Bằng / khác (cả giá trị và kiểu) |
| `<`, `<=`, `>`, `>=` | So sánh số |
| `&&` | **VÀ**: cả hai vế đều đúng |
| `\|\|` | **HOẶC**: ít nhất một vế đúng |
| `!` | **PHỦ ĐỊNH** |

```javascript
if (age >= 18 && hasId) { /* ... */ }
if (role === "admin" || role === "editor") { /* ... */ }
if (!isLoggedIn) { /* ... */ }
```

`&&` và `||` dùng **đoản mạch**: dừng ngay khi đã biết kết quả. Mẹo hay dùng: `const name = input || "Ẩn danh";` (nếu `input` rỗng/falsy thì lấy giá trị sau).

## Truthy và falsy

Trong điều kiện, JavaScript tự đổi giá trị sang đúng/sai. **Falsy** (coi là sai) gồm đúng 6 giá trị:

`false`, `0`, `""` (chuỗi rỗng), `null`, `undefined`, `NaN`

Mọi giá trị khác là **truthy**, kể cả `"0"`, `[]` và `{}`.

## Toán tử 3 ngôi

```javascript
const message = age >= 18 ? "Người lớn" : "Trẻ em";
```

Chỉ nên dùng cho biểu thức ngắn; điều kiện phức tạp hãy dùng `if`.

## switch

Khi so sánh **một giá trị** với nhiều trường hợp:

```javascript
switch (day) {
  case 1:
    console.log("Thứ Hai");
    break;          // không có break thì sẽ "rơi" xuống case kế
  case 6:
  case 7:
    console.log("Cuối tuần");
    break;
  default:
    console.log("Ngày thường");
}
```

> Trong hàm, dùng `return` sớm để tránh lồng `if` sâu: `if (!user) return;`

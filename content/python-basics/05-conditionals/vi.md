# Câu điều kiện

## if / elif / else

```python
score = 85

if score >= 90:
    print("Xuất sắc")
elif score >= 80:
    print("Giỏi")
else:
    print("Cố gắng thêm")
```

Ba điều cần nhớ:

1. Sau điều kiện có **dấu hai chấm** `:`.
2. Khối lệnh bên dưới phải **thụt lề** (4 dấu cách). Đây là cách Python biết lệnh nào thuộc nhánh nào.
3. Python kiểm tra **từ trên xuống**, nhánh đúng đầu tiên chạy, các nhánh sau bị bỏ qua.

`elif` (else if) có thể có nhiều, `else` không bắt buộc.

## Phép so sánh

| Toán tử | Ý nghĩa |
|---|---|
| `==`, `!=` | Bằng, khác |
| `<`, `<=`, `>`, `>=` | So sánh thứ tự |
| `in`, `not in` | Có nằm trong chuỗi/danh sách không |
| `is`, `is not` | Cùng một đối tượng (hay dùng với `None`) |

Chú ý: **`==` để so sánh**, `=` để gán.

```python
5 == 5.0              # True
"a" < "b"             # True (so thứ tự chữ cái)
"th" in "python"      # True
x is None             # cách đúng để kiểm tra None
1 < x < 10            # so sánh dây chuyền, rất đặc trưng Python
```

## Toán tử logic: and, or, not

```python
age = 20
has_id = True

if age >= 18 and has_id:
    print("được vào")
if not has_id:
    print("cần giấy tờ")
if age < 13 or age > 65:
    print("giảm giá")
```

`and`/`or` dùng **đoản mạch**: dừng ngay khi đã biết kết quả.

## Truthy và falsy

Trong điều kiện, các giá trị "rỗng" coi là **sai** (falsy): `0`, `0.0`, `""`, `[]`, `{}`, `set()`, `None`, `False`. Còn lại là **đúng**.

```python
name = ""
if name:                  # chuỗi rỗng là falsy
    print("có tên")
else:
    print("chưa có tên")

items = []
if not items:             # cách ngắn gọn kiểm tra danh sách rỗng
    print("trống")
```

## Biểu thức điều kiện (toán tử 3 ngôi)

```python
status = "người lớn" if age >= 18 else "trẻ em"
```

## Lồng điều kiện và "early return"

Tránh lồng nhiều tầng bằng cách **thoát sớm** trong hàm:

```python
def ticket_price(age):
    if age < 5:
        return 0
    if age < 18:
        return 50
    return 100              # các trường hợp còn lại
```

## match (Python 3.10+)

```python
command = "stop"
match command:
    case "go":
        print("đi")
    case "stop" | "halt":
        print("dừng")
    case _:
        print("không hiểu")
```

> **Lỗi thường gặp:** quên dấu `:`, thụt lề sai, hoặc viết `if x = 5` (dùng `==`).

# Biến và kiểu dữ liệu

## Biến là gì?

**Biến** là một cái tên gắn với một giá trị trong bộ nhớ. Bạn tạo biến bằng dấu `=` (phép **gán**):

```python
name = "Lexi"
age = 20
```

- Không cần khai báo kiểu: Python tự biết `20` là số nguyên, `"Lexi"` là chuỗi.
- Có thể gán lại giá trị khác (thậm chí khác kiểu): `age = "hai mươi"`.
- Tên biến: chữ, số, dấu `_`, **không** bắt đầu bằng số, **phân biệt hoa thường**. Quy ước: `snake_case` như `user_name`.

![Mỗi biến trỏ tới một giá trị có kiểu](/lessons/python-basics/02-variables-types-fig-vi.svg)
*Mỗi biến trỏ tới một giá trị có kiểu*

## Các kiểu dữ liệu cơ bản

| Kiểu | Tên | Ví dụ |
|---|---|---|
| `int` | Số nguyên | `42`, `-7`, `1_000_000` |
| `float` | Số thực | `3.14`, `-0.5`, `2e3` |
| `str` | Chuỗi | `"chào"`, `'hi'` |
| `bool` | Đúng/sai | `True`, `False` |
| `NoneType` | "Không có gì" | `None` |

Dùng `type()` để xem kiểu:

```python
print(type(20))        # <class 'int'>
print(type("20"))      # <class 'str'>
```

`20` (số) và `"20"` (chuỗi) **khác nhau hoàn toàn**: `20 + 1` là `21`, còn `"20" + "1"` là `"201"`.

## f-string: chèn biến vào chuỗi

Đặt chữ **`f`** trước dấu nháy, và biến trong `{ }`:

```python
name = "Lexi"
age = 20
print(f"{name} is {age} years old")        # Lexi is 20 years old
print(f"Năm sau: {age + 1}")                # có thể tính ngay trong { }
print(f"Giá: {1234.5678:.2f}")              # 1234.57 (làm tròn 2 số lẻ)
print(f"Số: {1234567:,}")                   # 1,234,567 (ngăn cách hàng nghìn)
```

## Ép kiểu (type conversion)

```python
int("42")         # 42        chuỗi -> số nguyên
int(3.9)          # 3         cắt bỏ phần thập phân (KHÔNG làm tròn)
float("3.5")      # 3.5
str(100)          # "100"
bool(0), bool(""), bool([])    # False False False: các giá trị "rỗng"
bool(5), bool("a")             # True True
```

Ép kiểu không hợp lệ gây lỗi: `int("abc")` → `ValueError`.

## Gán nhiều biến

```python
x, y = 1, 2          # gán đồng thời
x, y = y, x          # hoán đổi hai biến, rất gọn!
a = b = 0            # cùng giá trị
PI = 3.14159         # quy ước: HẰNG SỐ viết HOA
```

## Python không đổi giá trị "tại chỗ" với số/chuỗi

Chuỗi và số là **bất biến** (immutable): các phép toán tạo **giá trị mới**, không sửa giá trị cũ. Điều này khác với danh sách (bài sau).

> **Mẹo:** gặp kết quả lạ, hãy `print(type(x))` để chắc chắn bạn đang cầm đúng kiểu.

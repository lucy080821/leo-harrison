# Hàm

**Hàm** là khối lệnh có tên, nhận **đầu vào** (tham số) và có thể **trả về** kết quả. Hàm giúp bạn không lặp code và chia chương trình thành các phần nhỏ dễ hiểu.

## Định nghĩa và gọi hàm

```python
def greet(name):
    return f"Xin chào, {name}!"

message = greet("Lexi")        # gọi hàm
print(message)
```

- `def` + tên + ngoặc tham số + dấu **`:`**, rồi khối lệnh **thụt lề**.
- `return` kết thúc hàm và đưa giá trị về nơi gọi. Hàm không có `return` trả về `None`.
- **Tham số** (parameter) là tên trong định nghĩa; **đối số** (argument) là giá trị truyền vào khi gọi.

> Phân biệt: `print` **hiển thị** ra màn hình, `return` **trả giá trị** để dùng tiếp. Hàm thường nên `return` thay vì `print`.

![Hàm: tham số vào, giá trị trả về](/lessons/python-basics/10-functions-fig-vi.svg)
*Hàm: tham số vào, giá trị trả về*

## Tham số mặc định và đối số có tên

```python
def greet(name, greeting="Xin chào"):
    return f"{greeting}, {name}!"

greet("Lexi")                        # dùng giá trị mặc định
greet("Lexi", "Hello")               # theo vị trí
greet(greeting="Hi", name="Lexi")    # theo TÊN, không cần đúng thứ tự
```

Tham số mặc định phải đứng **sau** tham số bắt buộc.

> **Bẫy:** đừng dùng giá trị mặc định thay đổi được như `def f(x, items=[])`: danh sách đó **dùng chung** giữa mọi lần gọi. Hãy viết `items=None` rồi tạo mới bên trong hàm.

## Số lượng đối số tuỳ ý: *args và **kwargs

```python
def average(*numbers):             # gom đối số vị trí thành tuple
    return sum(numbers) / len(numbers)
average(1, 2, 3, 4)                # 2.5

def show(**info):                  # gom đối số có tên thành dict
    for key, value in info.items():
        print(key, value)
show(name="An", age=20)
```

Ngược lại, dấu `*` khi **gọi** sẽ "rải" danh sách thành các đối số: `average(*[1, 2, 3])`.

## Trả về nhiều giá trị

```python
def min_max(items):
    return min(items), max(items)   # thực chất trả về tuple

lo, hi = min_max([3, 1, 4])         # giải nén
```

## Phạm vi biến (scope)

Biến tạo **trong hàm** là biến **cục bộ**, mất khi hàm kết thúc.

```python
def f():
    secret = 1          # chỉ tồn tại trong f
f()
# print(secret)         # NameError
```

Hàm **đọc** được biến toàn cục nhưng muốn **gán lại** phải khai báo `global x` (nên tránh). Cách tốt: truyền vào bằng tham số, trả ra bằng `return`.

## Docstring và chú thích kiểu

```python
def area(w: float, h: float) -> float:
    '''Trả về diện tích hình chữ nhật.'''
    return w * h

help(area)              # xem tài liệu của hàm
```

Chú thích kiểu (`: float`, `-> float`) không bắt buộc, nhưng giúp đọc code và công cụ kiểm tra lỗi.

## Hàm là giá trị

```python
def apply(fn, x):
    return fn(x)

print(apply(abs, -5))         # 5
operations = {"double": lambda x: x * 2, "negate": lambda x: -x}
print(operations["double"](21))   # 42
```

## Nguyên tắc thiết kế hàm tốt

- Mỗi hàm làm **một việc**, tên là **động từ** (`calculate_total`, `is_valid`).
- Ngắn gọn (vừa một màn hình).
- Ưu tiên hàm "thuần": cùng đầu vào cho cùng kết quả, không sửa dữ liệu bên ngoài.

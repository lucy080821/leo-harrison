# Lớp và lập trình hướng đối tượng

**Lớp (class)** là "khuôn" để tạo ra nhiều **đối tượng** có cùng cấu trúc và hành vi. Một lớp gom **dữ liệu** (thuộc tính) và **hành động** (phương thức) liên quan lại với nhau.

## Định nghĩa lớp

```python
class Rectangle:
    def __init__(self, width, height):     # hàm khởi tạo, chạy khi tạo đối tượng
        self.width = width                  # thuộc tính của TỪNG đối tượng
        self.height = height

    def area(self):                         # phương thức
        return self.width * self.height

r = Rectangle(3, 4)       # tạo đối tượng (instance)
print(r.width)            # 3
print(r.area())           # 12
```

- **`__init__`** khởi tạo đối tượng; gọi `Rectangle(3, 4)` sẽ tự chạy nó.
- **`self`** là chính đối tượng đang được xử lý, **luôn là tham số đầu tiên** của phương thức. Khi gọi `r.area()`, Python tự truyền `r` vào `self`.
- Tên lớp quy ước viết `PascalCase`.

![Lớp và đối tượng trong Python](/lessons/python-basics/15-classes-oop-fig-vi.svg)
*Lớp và đối tượng trong Python*

## Đối tượng độc lập nhau

```python
a = Rectangle(3, 4)
b = Rectangle(10, 2)
a.width = 99             # chỉ ảnh hưởng a
print(b.width)           # vẫn 10
```

## Phương thức "ma thuật" (dunder)

Tên dạng `__xxx__` cho phép đối tượng hoà nhập với cú pháp Python:

```python
class Rectangle:
    ...
    def __str__(self):                      # cho print() và str()
        return f"Rectangle({self.width}x{self.height})"
    def __eq__(self, other):                # cho phép dùng ==
        return (self.width, self.height) == (other.width, other.height)
    def __lt__(self, other):                # cho phép so sánh và sắp xếp
        return self.area() < other.area()

print(Rectangle(3, 4))        # Rectangle(3x4)
```

## Kế thừa

Lớp con **thừa hưởng** mọi thứ của lớp cha và có thể **thêm hoặc ghi đè**:

```python
class Animal:
    def __init__(self, name):
        self.name = name
    def speak(self):
        return f"{self.name} makes a sound"

class Dog(Animal):
    def __init__(self, name, breed):
        super().__init__(name)               # gọi __init__ của lớp cha
        self.breed = breed
    def speak(self):                         # ghi đè (override)
        return f"{self.name} barks"

d = Dog("Rex", "Husky")
print(d.speak())                 # Rex barks
isinstance(d, Animal)            # True
```

Chính nhờ kế thừa mà `Square(Rectangle)` tái sử dụng `area()` của `Rectangle`.

## Thuộc tính tính toán với @property

```python
class Circle:
    def __init__(self, r):
        self.r = r
    @property
    def area(self):                  # dùng như thuộc tính: c.area (không có ngoặc)
        return 3.14159 * self.r ** 2
```

## Thuộc tính lớp và phương thức tĩnh

```python
class Counter:
    total = 0                        # thuộc tính của LỚP, dùng chung mọi đối tượng
    def __init__(self):
        Counter.total += 1
    @staticmethod
    def describe():
        return "Đếm số đối tượng"
    @classmethod
    def create(cls):
        return cls()
```

## Quy ước "riêng tư"

Python không có `private` thật; quy ước dùng dấu gạch dưới: `_balance` nghĩa là "nội bộ, đừng đụng từ bên ngoài".

## Khi nào dùng class?

Khi bạn có **nhiều đối tượng cùng loại** mang cả **dữ liệu lẫn hành vi** (tài khoản, người dùng, sản phẩm, trò chơi...). Với việc đơn giản, **hàm + dict** là đủ. Với "chỉ chứa dữ liệu", dùng `@dataclass`:

```python
from dataclasses import dataclass

@dataclass
class Point:
    x: float
    y: float

print(Point(1, 2))        # Point(x=1, y=2): tự có __init__, __repr__, __eq__
```

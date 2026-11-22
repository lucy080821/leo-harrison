# Vòng lặp

Vòng lặp chạy một khối lệnh **nhiều lần**.

## for và range

```python
for i in range(5):
    print(i)             # 0, 1, 2, 3, 4
```

`range` tạo dãy số:

| Viết | Dãy |
|---|---|
| `range(5)` | 0, 1, 2, 3, 4 |
| `range(1, 6)` | 1, 2, 3, 4, 5 (**không** gồm 6) |
| `range(0, 10, 2)` | 0, 2, 4, 6, 8 (bước nhảy 2) |
| `range(5, 0, -1)` | 5, 4, 3, 2, 1 (đếm ngược) |

Vòng `for` thật ra duyệt qua **mọi thứ có thể lặp**: chuỗi, danh sách, từ điển...

```python
for ch in "abc":
    print(ch)

for fruit in ["táo", "cam", "xoài"]:
    print(fruit)
```

![Vòng for duyệt từng phần tử, while lặp theo điều kiện](/lessons/python-basics/06-loops-fig-vi.svg)
*Vòng for duyệt từng phần tử, while lặp theo điều kiện*

## Mẫu cộng dồn

```python
total = 0
for n in range(1, 101):
    total += n
print(total)             # 5050
```

Công thức Gauss: $\sum_{i=1}^{n} i = \dfrac{n(n+1)}{2}$. Với $n = 100$ ta có $5050$. (Python còn có sẵn `sum(range(1, 101))`.)

## while: lặp khi điều kiện còn đúng

```python
count = 3
while count > 0:
    print(count)
    count -= 1
print("Xong!")
```

> Cẩn thận **vòng lặp vô hạn**: nếu quên `count -= 1`, điều kiện luôn đúng. Trong khung thực hành, bấm **Dừng** nếu chương trình chạy mãi.

## break, continue, else

```python
for n in range(1, 10):
    if n == 3:
        continue         # bỏ qua lượt này
    if n == 6:
        break            # thoát hẳn vòng lặp
    print(n)             # 1, 2, 4, 5
```

Vòng lặp có thể có `else` chạy khi **không bị `break`**, tiện để tìm kiếm:

```python
for n in [3, 5, 7]:
    if n % 2 == 0:
        print("có số chẵn")
        break
else:
    print("toàn số lẻ")
```

## enumerate và zip

```python
names = ["An", "Bình", "Chi"]
scores = [8, 6, 10]

for i, name in enumerate(names, start=1):     # có số thứ tự
    print(i, name)

for name, score in zip(names, scores):        # duyệt song song hai danh sách
    print(name, score)
```

## Vòng lặp lồng nhau

```python
for a in range(1, 4):
    for b in range(1, 4):
        print(a * b, end=" ")
    print()              # xuống dòng sau mỗi hàng
```

## Mẹo

- Dùng `for` khi biết trước số lần/tập dữ liệu; dùng `while` khi **chưa biết bao giờ dừng** (đợi điều kiện).
- Đừng sửa danh sách trong lúc đang duyệt chính nó: hãy duyệt một bản sao `for x in items[:]:`.

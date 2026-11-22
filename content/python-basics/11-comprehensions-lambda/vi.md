# List comprehension và lambda

## List comprehension: tạo danh sách trong một dòng

Cách viết **ngắn gọn và rất "Python"** để tạo danh sách mới từ một dãy:

```python
squares = [n ** 2 for n in range(1, 6)]
# [1, 4, 9, 16, 25]
```

Cú pháp: `[biểu_thức for phần_tử in dãy]`. Tương đương vòng lặp:

```python
squares = []
for n in range(1, 6):
    squares.append(n ** 2)
```

### Thêm điều kiện lọc

```python
evens = [n for n in range(1, 11) if n % 2 == 0]
# [2, 4, 6, 8, 10]

squares_of_evens = [n ** 2 for n in range(1, 11) if n % 2 == 0]
# [4, 16, 36, 64, 100]
```

### Thêm điều kiện biến đổi (if/else đứng TRƯỚC for)

```python
labels = ["chẵn" if n % 2 == 0 else "lẻ" for n in range(1, 5)]
# ['lẻ', 'chẵn', 'lẻ', 'chẵn']
```

### Ví dụ thực tế

```python
names = ["  an ", "BINH", "chi  "]
clean = [n.strip().title() for n in names]        # ['An', 'Binh', 'Chi']
lengths = [len(w) for w in ["a", "bb", "ccc"]]    # [1, 2, 3]
pairs = [(x, y) for x in range(2) for y in range(2)]   # vòng lặp lồng
```

![List comprehension: lọc rồi biến đổi từng phần tử](/lessons/python-basics/11-comprehensions-lambda-fig-vi.svg)
*List comprehension: lọc rồi biến đổi từng phần tử*

## Dict và set comprehension

```python
words = ["pear", "fig", "banana"]
lengths = {w: len(w) for w in words}      # {'pear': 4, 'fig': 3, 'banana': 6}
unique_lens = {len(w) for w in words}      # {3, 4, 6}
```

## Khi nào không nên dùng?

Comprehension rất tuyệt khi **ngắn và dễ đọc**. Nếu phải lồng nhiều tầng hoặc điều kiện phức tạp, hãy viết vòng `for` thường cho rõ ràng. **Dễ đọc quan trọng hơn ngắn gọn.**

## Hàm lambda

**Lambda** là hàm **vô danh một biểu thức**, hay dùng làm đối số truyền cho hàm khác:

```python
square = lambda x: x ** 2
print(square(5))           # 25

add = lambda a, b: a + b
```

Dùng nhiều nhất với `key` của `sorted`, `min`, `max`:

```python
words = ["pear", "fig", "banana"]
sorted(words, key=lambda w: len(w))           # ['fig', 'pear', 'banana']
max(words, key=lambda w: len(w))              # 'banana'

students = [("An", 8), ("Binh", 6), ("Chi", 10)]
sorted(students, key=lambda s: s[1], reverse=True)   # theo điểm giảm dần
```

> Gán lambda vào một biến (`square = lambda ...`) chỉ để minh hoạ. Khi cần tái sử dụng hãy dùng `def` cho có tên và docstring.

## map và filter

```python
list(map(lambda x: x * 2, [1, 2, 3]))            # [2, 4, 6]
list(filter(lambda x: x > 1, [1, 2, 3]))         # [2, 3]
```

Hai hàm này cho kết quả giống comprehension; cộng đồng Python thường **ưu tiên comprehension** vì dễ đọc hơn.

## Hàm tổng hợp tiện ích

```python
sum(n for n in range(10))        # truyền "generator" vào sum: không tạo danh sách trung gian
any(n > 5 for n in [1, 9])        # có phần tử nào thoả không? True
all(n > 0 for n in [1, 9])        # mọi phần tử đều thoả? True
```

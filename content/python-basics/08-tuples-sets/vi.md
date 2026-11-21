# Tuple và Set

## Tuple: danh sách bất biến

```python
point = (3, 4)
rgb = (255, 128, 0)
single = (5,)          # tuple một phần tử CẦN dấu phẩy
```

- Giống danh sách (chỉ số, cắt lát, `len`, `in`) nhưng **không sửa được**: `point[0] = 1` gây lỗi.
- Dùng cho dữ liệu **cố định**: toạ độ, màu, bản ghi nhỏ, và là **khoá** của từ điển.
- Nhanh hơn và gọn hơn danh sách một chút.

### Giải nén (unpacking)

```python
x, y = (3, 4)               # x = 3, y = 4
a, b = b, a                 # hoán đổi: thực chất là tuple!
first, *rest = [1, 2, 3, 4] # first = 1, rest = [2, 3, 4]
```

Hàm "trả về nhiều giá trị" thật ra trả về một tuple:

```python
def min_max(nums):
    return min(nums), max(nums)

lo, hi = min_max([3, 1, 4])
```

## Set: tập hợp không trùng

```python
tags = {"python", "sql", "python"}      # {'python', 'sql'}: tự bỏ trùng
empty = set()                            # {} là từ điển rỗng, không phải set!
```

- Mỗi phần tử xuất hiện **một lần**.
- **Không có thứ tự** và **không có chỉ số**.
- Kiểm tra `x in s` **rất nhanh** (hơn nhiều so với danh sách lớn).
- Phần tử phải **băm được** (số, chuỗi, tuple; **không** phải list).

```python
s = {1, 2}
s.add(3)
s.discard(1)         # xoá, không lỗi nếu không có
2 in s               # True
len(s)
```

### Phép toán tập hợp

```python
a = {1, 2, 3, 4}
b = {3, 4, 5}

a & b          # giao: {3, 4}
a | b          # hợp: {1, 2, 3, 4, 5}
a - b          # hiệu: {1, 2}
a ^ b          # đối xứng: phần chỉ ở một bên {1, 2, 5}
a <= b         # a là tập con của b?
```

### Loại trùng khỏi danh sách

```python
nums = [1, 2, 2, 3, 3, 3]
list(set(nums))                 # [1, 2, 3] (thứ tự không đảm bảo)
sorted(set(nums))               # [1, 2, 3]
```

Muốn **giữ thứ tự**: `list(dict.fromkeys(nums))`.

## Chọn cấu trúc nào?

| Cần | Dùng |
|---|---|
| Danh sách có thứ tự, sửa được | `list` |
| Bộ dữ liệu cố định, làm khoá | `tuple` |
| Tập không trùng, kiểm tra "có không?" nhanh | `set` |
| Tra cứu theo khoá | `dict` (bài sau) |

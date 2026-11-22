# Số và toán tử

## Toán tử số học

| Toán tử | Ý nghĩa | Ví dụ | Kết quả |
|---|---|---|---|
| `+`, `-`, `*` | Cộng, trừ, nhân | `7 * 2` | `14` |
| `/` | Chia **thực** | `7 / 2` | `3.5` |
| `//` | Chia lấy **phần nguyên** | `7 // 2` | `3` |
| `%` | Chia lấy **dư** | `7 % 2` | `1` |
| `**` | Luỹ thừa | `2 ** 10` | `1024` |

Lưu ý: `/` **luôn** trả về số thực (`6 / 2` là `3.0`), còn `//` giữ số nguyên.

![Thứ tự ưu tiên của toán tử](/lessons/python-basics/03-numbers-operators-fig-vi.svg)
*Thứ tự ưu tiên của toán tử*

## Chia nguyên và chia dư: bộ đôi rất hữu ích

Hai toán tử này luôn đi cùng nhau: $a = (a // b) \times b + (a \% b)$.

```python
total = 3725
hours   = total // 3600            # 1
rest    = total % 3600             # 125
minutes = rest // 60               # 2
seconds = rest % 60                # 5
```

Các mẫu quen thuộc:

```python
n % 2 == 0           # n là số chẵn
n % 10               # chữ số hàng đơn vị
n // 10              # bỏ chữ số cuối
```

## Thứ tự ưu tiên

Giống toán học: `**` → `*` `/` `//` `%` → `+` `-`. Dùng **ngoặc** để rõ ý:

```python
print(2 + 3 * 4)       # 14
print((2 + 3) * 4)     # 20
print(-2 ** 2)         # -4  (luỹ thừa trước dấu trừ)
```

## Toán tử gán rút gọn

```python
x = 10
x += 5      # x = x + 5   -> 15
x -= 3      # 12
x *= 2      # 24
x //= 5     # 4
```

## Hàm số có sẵn

```python
abs(-5)             # 5
round(3.14159, 2)   # 3.14
round(2.5)          # 2   ← "làm tròn về số chẵn gần nhất" (banker's rounding)
max(3, 9, 4)        # 9
min(3, 9, 4)        # 3
sum([1, 2, 3])      # 6
divmod(17, 5)       # (3, 2): thương và dư cùng lúc
pow(2, 10)          # 1024
```

## Số thực và sai số

```python
print(0.1 + 0.2)              # 0.30000000000000004
print(round(0.1 + 0.2, 2))    # 0.3
```

Máy tính lưu số thực dạng nhị phân nên có **sai số nhỏ**. Khi so sánh số thực, dùng `abs(a - b) < 1e-9` hoặc `math.isclose(a, b)`. Với tiền tệ, dùng `decimal.Decimal` hoặc tính bằng số nguyên (đồng).

## Số lớn không tràn

```python
print(2 ** 200)     # Python xử lý số nguyên lớn tuỳ ý
```

Khác với nhiều ngôn ngữ khác, số nguyên Python **không bị tràn** (chỉ giới hạn bởi bộ nhớ).

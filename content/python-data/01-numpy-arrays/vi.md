# NumPy (1): mảng ndarray

> Khung bên phải chạy **Python thật** với NumPy. Lần đầu bạn `import numpy`, thư viện được tải về (vài giây).

**NumPy** là nền tảng của toàn bộ hệ sinh thái khoa học dữ liệu Python (pandas, matplotlib, scikit-learn... đều xây trên nó). Nó cung cấp **mảng nhiều chiều** `ndarray` và các phép toán trên cả mảng **nhanh gấp hàng chục đến hàng trăm lần** vòng lặp Python thuần.

## Vì sao không dùng list?

| | `list` | `ndarray` |
|---|---|---|
| Kiểu phần tử | Lẫn lộn | **Cùng một kiểu** (nhanh, gọn bộ nhớ) |
| Toán học cả mảng | Phải viết vòng lặp | `a * 2`, `a + b` trực tiếp |
| Nhiều chiều | Danh sách lồng nhau | Hỗ trợ chuẩn (ma trận, tensor) |

## Tạo mảng

```python
import numpy as np

a = np.array([1, 2, 3, 4, 5])          # từ list
np.arange(1, 11)                       # 1..10 (như range)
np.arange(0, 1, 0.25)                  # 0, 0.25, 0.5, 0.75
np.linspace(0, 1, 5)                   # 5 điểm CÁCH ĐỀU từ 0 đến 1 (gồm cả hai đầu)
np.zeros((2, 3))                       # ma trận 2x3 toàn 0
np.ones(4)
np.full((2, 2), 7)
np.eye(3)                              # ma trận đơn vị
np.random.default_rng(0).random(3)     # số ngẫu nhiên (có hạt giống)
```

## Thuộc tính quan trọng

```python
a = np.arange(1, 13).reshape(3, 4)
a.shape       # (3, 4)   số hàng, số cột
a.ndim        # 2        số chiều
a.size        # 12       tổng số phần tử
a.dtype       # int64    kiểu dữ liệu
```

`reshape` đổi **hình dạng** mà không đổi dữ liệu (tổng số phần tử phải khớp); dùng `-1` để NumPy tự tính: `a.reshape(-1, 2)`.

## Chỉ số và cắt lát

Giống list nhưng có **nhiều chiều**, ngăn cách bằng dấu phẩy `[hàng, cột]`:

```python
m = np.arange(1, 13).reshape(3, 4)
# [[ 1  2  3  4]
#  [ 5  6  7  8]
#  [ 9 10 11 12]]
m[1, 2]        # 7           hàng 1, cột 2
m[0]           # [1 2 3 4]   cả hàng 0
m[:, 0]        # [1 5 9]     cả cột 0
m[0:2, 1:3]    # [[2 3] [6 7]]   khối con
m[-1, -1]      # 12
```

## Chỉ số boolean (mask): lọc cực mạnh

```python
arr = np.arange(1, 11)
arr > 5                    # [False ... True True True True True]
arr[arr > 5]               # [ 6  7  8  9 10]
arr[arr % 2 == 0]          # [ 2  4  6  8 10]
arr[(arr > 3) & (arr < 8)] # kết hợp điều kiện bằng & | ~ (có ngoặc!)
```

> Dùng `&`, `|`, `~` (**không** dùng `and`, `or`, `not`) và đặt mỗi điều kiện trong **ngoặc**.

## Tổng hợp theo trục

```python
m.sum()            # 78        tổng tất cả
m.sum(axis=0)      # [15 18 21 24]   tổng theo CỘT (cộng dọc các hàng)
m.sum(axis=1)      # [10 26 42]      tổng theo HÀNG
m.mean(), m.min(), m.max()
```

`axis=0` nghĩa là "**thu gọn dọc theo chiều hàng**, còn lại các cột"; `axis=1` ngược lại.

## Ép kiểu và `tolist()`

```python
a.astype(float)            # đổi kiểu
a.tolist()                 # về list Python thường (tiện in ra và so sánh)
```

## Lưu ý: cắt lát là "khung nhìn", không sao chép

```python
b = a[0:2]
b[0, 0] = 99               # a cũng đổi!
c = a[0:2].copy()          # muốn độc lập: dùng .copy()
```

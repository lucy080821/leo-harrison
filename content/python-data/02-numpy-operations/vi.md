# NumPy (2): phép toán, broadcasting và thống kê

## Vector hoá: bỏ vòng lặp

Phép toán trên mảng NumPy áp dụng **lên từng phần tử cùng lúc**, gọi là **vector hoá**. Ngắn hơn và nhanh hơn vòng lặp rất nhiều.

```python
import numpy as np
x = np.array([1, 2, 3, 4])

x + 10         # [11 12 13 14]
x * 2          # [ 2  4  6  8]
x ** 2         # [ 1  4  9 16]
x * x          # nhân TỪNG cặp: [1 4 9 16]
np.sqrt(x)     # hàm áp lên từng phần tử
x > 2          # [False False  True  True]
```

Hai mảng **cùng hình dạng** tính theo từng cặp: `a + b`, `a * b`, `a / b`.

> `x * y` là nhân **từng cặp phần tử**, không phải nhân ma trận. Nhân ma trận dùng `x @ y` hoặc `np.dot`.

## Broadcasting: mảng khác hình dạng

NumPy tự "**kéo giãn**" mảng nhỏ để khớp mảng lớn, nếu các chiều **tương thích** (bằng nhau hoặc một bên là 1):

```python
prices = np.array([[10, 20, 30],
                   [40, 50, 60]])        # shape (2, 3)
weights = np.array([1, 2, 3])            # shape (3,)

prices * weights
# [[ 10  40  90]
#  [ 40 100 180]]       mỗi CỘT nhân với hệ số riêng
prices + 5               # cộng 5 vào mọi phần tử (số vô hướng cũng là broadcasting)
```

Tính **độ lệch so với trung bình từng cột**:

```python
prices - prices.mean(axis=0)
```

## Thống kê mô tả

```python
x = np.array([2, 4, 4, 4, 5, 5, 7, 9])
x.mean()           # 5.0     trung bình
np.median(x)       # 4.5     trung vị
x.std()            # 2.0     độ lệch chuẩn (mặc định chia cho n)
x.var()            # 4.0     phương sai
x.min(), x.max(), x.sum()
np.percentile(x, 25)   # phân vị thứ 25
```

Trung bình và độ lệch chuẩn (tổng thể):

$$
\mu = \frac{1}{n}\sum_{i=1}^{n} x_i,\qquad \sigma = \sqrt{\frac{1}{n}\sum_{i=1}^{n}(x_i-\mu)^2}
$$

> `x.std()` mặc định dùng $n$ (tổng thể). pandas `Series.std()` mặc định dùng $n-1$ (mẫu). Muốn thống nhất: `np.std(x, ddof=1)`.

## Chuẩn hoá z-score

Đưa dữ liệu về trung bình 0 và độ lệch chuẩn 1, bước chuẩn bị rất phổ biến trong Machine Learning:

$$
z_i = \frac{x_i - \mu}{\sigma}
$$

```python
z = (x - x.mean()) / x.std()
```

## np.where: điều kiện theo mảng

```python
temps = np.array([28, 31, 35, 29])
np.where(temps > 32, "hot", "ok")     # ['ok' 'ok' 'hot' 'ok']
np.where(x > 4, x, 0)                 # giữ giá trị > 4, còn lại 0
```

## Sắp xếp và tìm kiếm

```python
np.sort(x)              # bản sao đã sắp
np.argsort(x)           # CHỈ SỐ sắp xếp
x.argmax(), x.argmin()  # vị trí lớn nhất / nhỏ nhất
np.unique(x)            # giá trị khác nhau, đã sắp
np.unique(x, return_counts=True)
```

## Ghép và tách mảng

```python
np.concatenate([a, b])
np.vstack([a, b])       # xếp chồng theo hàng
np.hstack([a, b])       # ghép theo cột
```

## Sinh số ngẫu nhiên có kiểm soát

```python
rng = np.random.default_rng(42)       # đặt hạt giống để kết quả lặp lại được
rng.integers(1, 7, size=5)            # 5 lần tung xúc xắc
rng.normal(0, 1, size=100)            # 100 số theo phân phối chuẩn
```

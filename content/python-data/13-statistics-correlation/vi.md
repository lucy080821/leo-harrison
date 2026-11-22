# Thống kê mô tả và tương quan

**Thống kê mô tả** nén cả bộ dữ liệu thành vài con số có ý nghĩa: **trung tâm** ở đâu, **độ phân tán** ra sao, **hai biến liên quan** thế nào.

## Đo xu hướng trung tâm

| Đại lượng | pandas | Ý nghĩa |
|---|---|---|
| **Trung bình** (mean) | `s.mean()` | Tổng chia số lượng; **nhạy với ngoại lệ** |
| **Trung vị** (median) | `s.median()` | Giá trị **ở giữa** khi sắp xếp; **bền** với ngoại lệ |
| **Yếu vị** (mode) | `s.mode()` | Giá trị xuất hiện **nhiều nhất** |

Ví dụ thu nhập `[10, 12, 11, 13, 500]` triệu: trung bình là 109, nhưng trung vị là 12, phản ánh người "điển hình" tốt hơn nhiều. **Dữ liệu lệch hoặc có ngoại lệ → ưu tiên trung vị.**

![Hệ số tương quan r cho ba kiểu quan hệ](/lessons/python-data/13-statistics-correlation-fig-vi.svg)
*Hệ số tương quan r cho ba kiểu quan hệ*

## Đo độ phân tán

| Đại lượng | pandas | Ý nghĩa |
|---|---|---|
| Khoảng (range) | `s.max() - s.min()` | Khoảng cách xa nhất |
| **Phương sai** | `s.var()` | Trung bình bình phương độ lệch |
| **Độ lệch chuẩn** | `s.std()` | Căn của phương sai, cùng đơn vị với dữ liệu |
| **IQR** | `Q3 - Q1` | Độ rộng của 50% dữ liệu ở giữa |

Với mẫu gồm $n$ quan sát, trung bình $\bar{x}$ và độ lệch chuẩn mẫu:

$$
\bar{x} = \frac{1}{n}\sum_{i=1}^{n} x_i,\qquad s = \sqrt{\frac{1}{n-1}\sum_{i=1}^{n}(x_i-\bar{x})^2}
$$

> pandas `.std()` chia cho $n-1$ (độ lệch chuẩn **mẫu**); NumPy `np.std` mặc định chia cho $n$ (tổng thể).

## Phân vị và describe

```python
df["math"].quantile(0.5)                 # = trung vị
df["math"].quantile([0.25, 0.75])        # Q1 và Q3
df[["math", "physics"]].describe()       # count, mean, std, min, 25%, 50%, 75%, max
```

## Ngoại lệ: quy tắc IQR

Một giá trị bị coi là **ngoại lệ** nếu nằm ngoài:

$$
[\,Q_1 - 1.5\cdot IQR,\; Q_3 + 1.5\cdot IQR\,],\qquad IQR = Q_3 - Q_1
$$

```python
q1, q3 = df["math"].quantile([0.25, 0.75])
iqr = q3 - q1
low, high = q1 - 1.5 * iqr, q3 + 1.5 * iqr
outliers = df[(df["math"] < low) | (df["math"] > high)]
```

Đây cũng chính là quy tắc vẽ **boxplot**. Tìm ra ngoại lệ **không có nghĩa là xoá**: hãy hỏi nó là **lỗi nhập liệu** hay **giá trị thật hiếm gặp**.

Cách khác: **z-score** $|z| > 3$ (chỉ hợp khi dữ liệu gần phân phối chuẩn).

## Tương quan (correlation)

**Hệ số tương quan Pearson** $r$ đo mức độ **quan hệ tuyến tính** giữa hai biến, nằm trong $[-1, 1]$:

$$
r = \frac{\sum (x_i-\bar{x})(y_i-\bar{y})}{\sqrt{\sum (x_i-\bar{x})^2}\sqrt{\sum (y_i-\bar{y})^2}}
$$

| $r$ | Ý nghĩa |
|---|---|
| gần **+1** | Cùng tăng, quan hệ dương mạnh |
| gần **0** | Gần như **không có** quan hệ tuyến tính |
| gần **-1** | Một bên tăng, bên kia giảm, quan hệ âm mạnh |

```python
df["math"].corr(df["physics"])           # một cặp
df[["math", "physics", "literature"]].corr()    # ma trận tương quan
```

Quy ước thô: $|r| < 0.3$ yếu, $0.3$-$0.7$ vừa, $> 0.7$ mạnh.

### Ba lưu ý quan trọng

1. **Tương quan ≠ nhân quả.** Kem lạnh và đuối nước cùng tăng vào mùa hè, nguyên nhân chung là *thời tiết nóng*.
2. $r$ chỉ bắt **quan hệ tuyến tính**; quan hệ cong (hình chữ U) có thể cho $r \approx 0$. Hãy **luôn vẽ scatter** để nhìn.
3. **Ngoại lệ** có thể kéo $r$ lệch mạnh.

## Vẽ ma trận tương quan

```python
import matplotlib.pyplot as plt
corr = df[["math", "physics", "literature"]].corr()
plt.imshow(corr, cmap="coolwarm", vmin=-1, vmax=1)
plt.colorbar()
plt.xticks(range(3), corr.columns); plt.yticks(range(3), corr.columns)
```

## Kiểm định thống kê (giới thiệu)

Câu hỏi "chênh lệch giữa hai nhóm là **thật** hay chỉ do may rủi?" cần **kiểm định giả thuyết** (t-test, chi-square...). Thư viện `scipy.stats` cung cấp; bạn sẽ gặp lại trong khoá Toán cho Machine Learning.

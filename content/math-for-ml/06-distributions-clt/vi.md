# Phân phối xác suất và định lý giới hạn trung tâm

Một **phân phối xác suất** mô tả **khả năng** của từng giá trị mà một biến ngẫu nhiên có thể nhận. Việc chọn đúng phân phối là cốt lõi của mô hình hoá thống kê.

## Phân phối chuẩn (Gauss)

Hình chuông, xác định bởi trung bình $\mu$ và độ lệch chuẩn $\sigma$:

$$
f(x) = \frac{1}{\sigma\sqrt{2\pi}}\exp\!\left(-\frac{(x-\mu)^2}{2\sigma^2}\right)
$$

**Quy tắc 68-95-99.7:** khoảng $\mu\pm\sigma$ chứa ~68%, $\mu\pm2\sigma$ ~95%, $\mu\pm3\sigma$ ~99.7% dữ liệu.

```python
from scipy import stats
stats.norm.cdf(1) - stats.norm.cdf(-1)     # 0.6827
stats.norm.ppf(0.975)                       # 1.96: giá trị z cho khoảng tin cậy 95%
```

- `cdf(x)`: $P(X\le x)$ (hàm phân phối tích luỹ).
- `ppf(q)`: ngược của `cdf` (phân vị).
- **Chuẩn hoá z-score** $z = (x-\mu)/\sigma$ đưa mọi phân phối chuẩn về $N(0,1)$.

Phân phối chuẩn xuất hiện khắp nơi, vì sao? Do **CLT** (xem dưới).

## Các phân phối thường gặp

| Phân phối | Mô tả | Ví dụ |
|---|---|---|
| **Bernoulli**($p$) | Một lần thử, thành công/thất bại | Một khách có mua không? |
| **Nhị thức**($n,p$) | Số thành công trong $n$ lần thử | Số khách mua trong 100 khách |
| **Poisson**($\lambda$) | Số sự kiện hiếm trong một khoảng | Số cuộc gọi mỗi phút |
| **Đều** | Mọi giá trị đồng khả năng | Số ngẫu nhiên |
| **Mũ**($\lambda$) | Thời gian chờ giữa các sự kiện | Thời gian giữa hai khách |
| **Chuẩn**($\mu,\sigma^2$) | Hình chuông | Chiều cao, sai số đo |

Nhị thức: $P(X=k) = \binom{n}{k}p^k(1-p)^{n-k}$. Với 10 lần tung đồng xu, $P(X=3) = \binom{10}{3}/2^{10} = 120/1024 \approx 0.1172$.

## Định lý giới hạn trung tâm (CLT)

> Trung bình của **nhiều** biến ngẫu nhiên độc lập (bất kể phân phối gốc) **xấp xỉ phân phối chuẩn**.

Chính xác hơn: với $n$ mẫu độc lập có trung bình $\mu$ và độ lệch chuẩn $\sigma$, trung bình mẫu $\bar X$ có

$$
\bar X \approx N\!\left(\mu,\ \frac{\sigma^2}{n}\right),\qquad \text{độ lệch chuẩn của }\bar X = \frac{\sigma}{\sqrt{n}}
$$

Với phân phối mũ($\lambda=1$) có $\mu=\sigma=1$ và $n=50$: độ lệch chuẩn của trung bình $=1/\sqrt{50}\approx0.141$ (đúng thứ bạn sẽ đo được trong bài tập).

Vì sao quan trọng: nhờ CLT ta tính được **khoảng tin cậy** và **kiểm định giả thuyết** cho trung bình mà không cần biết phân phối gốc. Và $\sigma/\sqrt n$ cho thấy **muốn sai số giảm 10 lần phải tăng mẫu 100 lần**.

## Ước lượng hợp lý cực đại (MLE)

Cho dữ liệu và một mô hình có tham số $\theta$, **MLE** chọn $\theta$ làm dữ liệu quan sát được **có khả năng nhất**:

$$
\hat\theta = \arg\max_\theta \prod_{i}P(x_i\mid\theta) = \arg\max_\theta \sum_i \log P(x_i\mid\theta)
$$

(Lấy log cho tổng dễ tính và ổn định số học.)

- Với phân phối chuẩn, MLE cho $\hat\mu = \bar x$ và $\hat\sigma^2 = \frac1n\sum(x_i-\bar x)^2$.
- **Hồi quy tuyến tính với sai số chuẩn ⇔ cực tiểu MSE.**
- **Hồi quy logistic** cực tiểu **cross-entropy** chính là MLE của Bernoulli.

Nhiều hàm mất mát trong ML thực chất là **âm log-likelihood**.

## Lấy mẫu với NumPy

```python
rng = np.random.default_rng(42)
rng.normal(0, 1, 1000)
rng.binomial(10, 0.5, 1000)
rng.choice(items, size=5, replace=False)
```

# Xác suất cơ bản và định lý Bayes

Thế giới thật đầy **bất định**: dữ liệu nhiễu, cảm biến sai số, người dùng khó đoán. **Xác suất** là ngôn ngữ để lập luận trong bất định, và là nền tảng của gần như mọi mô hình ML.

## Xác suất

$P(A)\in[0,1]$ đo khả năng sự kiện $A$ xảy ra. Quy tắc cơ bản:

- $P(\text{không }A) = 1 - P(A)$
- $P(A\text{ hoặc }B) = P(A) + P(B) - P(A\text{ và }B)$
- Hai sự kiện **độc lập**: $P(A\text{ và }B) = P(A)P(B)$

![Cây xác suất cho định lý Bayes](/lessons/math-for-ml/05-probability-basics-fig-vi.svg)
*Cây xác suất cho định lý Bayes*

## Xác suất có điều kiện

$P(A\mid B)$ là xác suất của $A$ **biết rằng $B$ đã xảy ra**:

$$
P(A\mid B) = \frac{P(A\text{ và }B)}{P(B)}
$$

Ví dụ: xác suất một email là spam **biết rằng nó chứa từ "trúng thưởng"**. Mô hình phân loại chính là ước lượng các xác suất có điều kiện dạng $P(\text{nhãn}\mid\text{đặc trưng})$.

## Định lý Bayes

Từ định nghĩa trên suy ra:

$$
P(A\mid B) = \frac{P(B\mid A)\,P(A)}{P(B)}
$$

Cho phép **đảo chiều điều kiện** và **cập nhật niềm tin** khi có bằng chứng mới:

| Thành phần | Tên | Ý nghĩa |
|---|---|---|
| $P(A)$ | **Tiên nghiệm** (prior) | Niềm tin trước khi thấy bằng chứng |
| $P(B\mid A)$ | **Khả năng** (likelihood) | Bằng chứng có khả năng thế nào nếu $A$ đúng |
| $P(A\mid B)$ | **Hậu nghiệm** (posterior) | Niềm tin sau khi thấy bằng chứng |

### Ví dụ kinh điển: xét nghiệm bệnh hiếm

Bệnh có tỉ lệ $1\%$. Xét nghiệm có độ nhạy $99\%$ và dương tính giả $5\%$. Bạn dương tính, xác suất bạn **thật sự** bệnh?

$$
P(\text{bệnh}\mid +) = \frac{0.99 \times 0.01}{0.99\times 0.01 + 0.05\times 0.99} = \frac{0.0099}{0.0594}\approx 0.167
$$

Chỉ khoảng **16.7%**. Vì bệnh hiếm, số người khoẻ bị dương tính giả **lấn át** số người bệnh thật. Bài học: **luôn xét tỉ lệ nền (prior)**, và đây là lý do độ chính xác (accuracy) có thể đánh lừa với dữ liệu mất cân bằng.

**Naive Bayes** (khoá ML) áp dụng đúng công thức này để phân loại văn bản.

## Biến ngẫu nhiên, kỳ vọng và phương sai

**Kỳ vọng** (giá trị trung bình dài hạn) và **phương sai** (độ phân tán):

$$
E[X] = \sum_x x\,P(x),\qquad
\mathrm{Var}(X) = E\big[(X - E[X])^2\big] = \sum_x (x-E[X])^2P(x)
$$

Với xúc xắc công bằng: $E[X] = \dfrac{1+2+\dots+6}{6} = 3.5$, $\mathrm{Var}(X) = \dfrac{35}{12}\approx 2.9167$. Độ lệch chuẩn $\sigma = \sqrt{\mathrm{Var}}$.

Tính chất hữu ích: $E[aX+b] = aE[X]+b$ và $\mathrm{Var}(aX+b) = a^2\mathrm{Var}(X)$.

## Mô phỏng Monte Carlo

Khi khó tính trực tiếp, hãy **mô phỏng** nhiều lần và đếm:

```python
rng = np.random.default_rng(0)
rolls = rng.integers(1, 7, size=100_000)
rolls.mean()          # ≈ 3.5  (Luật số lớn)
(rolls == 6).mean()   # ≈ 1/6
```

**Luật số lớn**: càng nhiều mẫu, trung bình mẫu càng sát kỳ vọng thật.

## Hiệp phương sai và độc lập

- $\mathrm{Cov}(X,Y) = E[(X-\mu_X)(Y-\mu_Y)]$: hai biến **cùng biến thiên** không.
- Độc lập ⇒ không tương quan, nhưng **không ngược lại**.

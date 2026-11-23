# Chuỗi Taylor: xấp xỉ hàm phức tạp bằng đa thức

Đa thức dễ tính, dễ đạo hàm, dễ tích phân. **Chuỗi Taylor** (Brook Taylor, 1715) cho phép thay một hàm trơn bằng đa thức quanh một điểm a:

`f(x) ≈ f(a) + f′(a)(x − a) + f″(a)/2!·(x − a)² + f‴(a)/3!·(x − a)³ + …`

Khi a = 0 ta gọi là **chuỗi Maclaurin**.

## Các chuỗi cần nhớ

- `eˣ = 1 + x + x²/2! + x³/3! + …` (đúng với mọi x)
- `sin x = x − x³/3! + x⁵/5! − …`
- `ln(1 + x) = x − x²/2 + x³/3 − …` (với |x| < 1)

![Xấp xỉ Taylor của sin x bằng đa thức bậc 1, 3, 5](/lessons/prob-stats/33-taylor-series-taylor-vi.svg)
*Đa thức bám sát đường cong gần x = 0 và lệch dần ở xa; thêm số hạng thì vùng chính xác rộng ra.*

Càng nhiều số hạng, xấp xỉ càng tốt **gần điểm a**; xa a thì sai nhanh. Sai số còn lại bị chặn bởi số hạng kế tiếp (phần dư Lagrange).

## Ứng dụng nghề nghiệp

- **Xấp xỉ bậc nhất (tuyến tính)**: `ln(1 + r) ≈ r` khi lợi suất r nhỏ: với r = 1%, hai giá trị khác nhau chỉ ≈ 0,005%; với r = 20% sai lệch đáng kể. Cơ sở để cộng lợi suất log theo thời gian.
- **Xấp xỉ bậc hai**: tối ưu hoá dùng khai triển bậc hai quanh điểm hiện tại (phương pháp Newton, Hessian) và **độ lồi (convexity)** của trái phiếu.
- **Học máy**: gradient descent dùng xấp xỉ bậc nhất của hàm mất mát; Newton và các phương pháp bậc hai dùng bậc hai; phép xấp xỉ Laplace trong Bayes.
- **Phương pháp delta** trong thống kê: phương sai của hàm g(X̄) ≈ g′(μ)²·Var(X̄).

## Nguồn tham khảo

- Stewart, J. *Calculus*, chương 11 (Infinite sequences and series).
- MIT OCW 18.01SC: Taylor's formula.
- Boyd & Vandenberghe. *Convex Optimization*, mục 9.5 (Newton's method).

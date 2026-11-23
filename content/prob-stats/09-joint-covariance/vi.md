# Phân phối đồng thời, hiệp phương sai và danh mục đầu tư

Thực tế luôn có **nhiều biến cùng lúc**. Ta cần mô tả chúng *cùng nhau*.

## Phân phối đồng thời và biên

**Hàm khối xác suất đồng thời** p(x, y) = P(X = x, Y = y). **Phân phối biên** có được bằng cách cộng theo biến còn lại: p_X(x) = Σᵧ p(x, y). X và Y **độc lập** khi p(x, y) = p_X(x)·p_Y(y) với mọi x, y.

## Hiệp phương sai và tương quan

`Cov(X, Y) = E[(X − μ_X)(Y − μ_Y)] = E[XY] − E[X]E[Y]`

- Dương: cùng tăng; âm: ngược chiều; **độc lập ⇒ Cov = 0** (chiều ngược lại *không* đúng).
- Hệ số tương quan `ρ = Cov(X, Y) / (σ_X σ_Y)` ∈ [−1, 1].

## Phương sai của tổng

`Var(aX + bY) = a²Var(X) + b²Var(Y) + 2ab·Cov(X, Y)`

Khi X, Y độc lập, số hạng cuối biến mất (bài 5).

## Ví dụ nghề nghiệp: đa dạng hoá danh mục

Harry Markowitz (1952) chỉ ra rằng rủi ro (độ lệch chuẩn) của danh mục không phải trung bình rủi ro từng tài sản: nó phụ thuộc **tương quan**. Hai tài sản σ = 20% và 30%, ρ = 0,4, chia 50/50 có σ danh mục ≈ 21,1%, thấp hơn trung bình 25%. Tương quan càng thấp càng giảm được rủi ro: đó là *lợi ích của đa dạng hoá*.

![Độ lệch chuẩn của danh mục 50/50 giảm khi tương quan giảm](/lessons/prob-stats/09-joint-covariance-cov-vi.svg)
*Tại ρ = 1 không có lợi ích đa dạng hoá; ρ càng thấp rủi ro càng nhỏ.*

## Nguồn tham khảo

- Blitzstein & Hwang, *Introduction to Probability*, chương 7 (Joint distributions).
- Markowitz, H. (1952). Portfolio Selection. *The Journal of Finance* 7(1).
- Diez et al., *OpenIntro Statistics*, chương 7 (tương quan).

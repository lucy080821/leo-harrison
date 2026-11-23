# Ước lượng điểm và cực đại hợp lý (MLE)

Ta có dữ liệu, mô hình có tham số θ chưa biết (tỷ lệ p, tốc độ λ, trung bình μ…). **Ước lượng** là quy tắc biến dữ liệu thành một giá trị θ̂.

## Chất lượng của ước lượng

- **Độ chệch**: `Bias(θ̂) = E[θ̂] − θ`. Không chệch nếu bằng 0.
- **Phương sai** của θ̂: độ dao động giữa các mẫu.
- **MSE** = Var + Bias²: sai số bình phương trung bình. Đôi khi một ước lượng hơi chệch nhưng phương sai nhỏ có MSE nhỏ hơn (đánh đổi chệch–phương sai, nền tảng của regularization).

Ví dụ: s² chia **n − 1** là ước lượng không chệch của σ²; chia n thì chệch thấp (nhân (n − 1)/n).

## Cực đại hợp lý

**Hàm hợp lý** L(θ) = P(dữ liệu | θ), xem như hàm của θ. **MLE** là giá trị θ làm L lớn nhất (thường tối đa hoá log L cho dễ). Ronald Fisher phát triển ý này từ khoảng 1912–1922.

- Tung đồng xu: k ngửa trong n lần ⇒ L(p) = pᵏ(1 − p)ⁿ⁻ᵏ ⇒ **p̂ = k/n**.
- Phân phối mũ: **λ̂ = 1/x̄**.
- Phân phối chuẩn: μ̂ = x̄, σ̂² = Σ(xᵢ − x̄)²/n.

![Log hợp lý của tỷ lệ p cho 7 ngửa trong 10 lần, đạt cực đại tại p = 0,7](/lessons/prob-stats/13-estimation-mle-mle-vi.svg)
*Đỉnh của đường cong là MLE: giá trị khiến dữ liệu quan sát có khả năng nhất.*

## Vì sao MLE quan trọng trong nghề

MLE là cách *huấn luyện* nhiều mô hình: hồi quy tuyến tính (nhiễu chuẩn) cho kết quả trùng bình phương tối thiểu, hồi quy logistic và mạng nơ-ron phân loại tối thiểu hoá cross-entropy chính là tối đa hoá hợp lý. Khi n lớn, MLE nhất quán, gần không chệch và gần phương sai nhỏ nhất.

## Nguồn tham khảo

- Wasserman, L. *All of Statistics* (Springer), chương 9 (Parametric inference).
- Blitzstein & Hwang, *Introduction to Probability*, phần suy luận và MLE.
- Fisher, R. A. (1922). On the mathematical foundations of theoretical statistics. *Phil. Trans. R. Soc. A* 222.

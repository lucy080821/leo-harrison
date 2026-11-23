# Tối ưu hoá, đạo hàm riêng và gradient

## Tìm cực trị bằng đạo hàm

Nếu f có cực đại hoặc cực tiểu tại x (và f khả vi), thì **f′(x) = 0** (định lý Fermat). Giải f′(x) = 0 cho các **điểm tới hạn**; **đạo hàm cấp hai** f″ phân loại: f″ < 0 là cực đại, f″ > 0 là cực tiểu.

### Ví dụ thực tế: giá bán tối ưu

Cầu q = 100 − 2p, giá vốn 10. Lợi nhuận L(p) = (p − 10)(100 − 2p) = −2p² + 120p − 1000. L′(p) = −4p + 120 = 0 ⇒ **p = 30**, L(30) = 800 và L″ = −4 < 0 nên đó là cực đại. Giá cao hơn thì bán được ít đi; giá thấp hơn thì lãi mỏng. Đạo hàm cho ta điểm cân bằng.

![Parabol lợi nhuận theo giá bán, đỉnh tại p = 30](/lessons/prob-stats/31-optimisation-profit-vi.svg)
*Tại đỉnh tiếp tuyến nằm ngang (L′ = 0): đó là giá tối ưu.*

## Hàm nhiều biến, đạo hàm riêng

Mô hình thật có nhiều tham số. **Đạo hàm riêng** ∂f/∂x là đạo hàm theo x, coi các biến khác là hằng số. **Gradient** ∇f là vector các đạo hàm riêng:

`∇f = (∂f/∂x, ∂f/∂y, …)`

Gradient chỉ **hướng tăng nhanh nhất** của f; ngược lại, −∇f là hướng giảm nhanh nhất.

## Gradient descent

Thuật toán lặp: `θ ← θ − η · ∇f(θ)`, với η là **tốc độ học**. Augustin-Louis Cauchy đề xuất phương pháp này năm 1847. Đây là thuật toán huấn luyện cốt lõi của gần như mọi mô hình Machine Learning và Deep Learning: tham số θ được chỉnh để **hàm mất mát** giảm dần.

- η quá lớn: nhảy qua cực tiểu, có thể phân kỳ.
- η quá nhỏ: hội tụ rất chậm.
- Với hàm không lồi có thể kẹt ở cực tiểu địa phương.

![Đường đồng mức của f(x,y) và quỹ đạo gradient descent về cực tiểu](/lessons/prob-stats/31-optimisation-gd-vi.svg)
*Mỗi bước đi theo hướng −∇f, vuông góc với đường đồng mức.*

## Nguồn tham khảo

- Stewart, J. *Calculus*, chương 4 (Applications of differentiation) và 14 (Partial derivatives).
- Boyd, S. & Vandenberghe, L. *Convex Optimization* (Cambridge University Press), chương 9.
- Cauchy, A.-L. (1847). Méthode générale pour la résolution des systèmes d'équations simultanées. *C. R. Acad. Sci.* 25.
- Goodfellow, Bengio, Courville. *Deep Learning*, chương 4 (Numerical computation).

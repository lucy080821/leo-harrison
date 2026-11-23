# Giải tích nhiều biến: gradient, Hessian và nhân tử Lagrange

Mô hình thực có nhiều tham số: hàm mất mát của một mạng nơ-ron có hàng triệu biến. Bài này mở rộng đạo hàm sang nhiều biến.

## Đạo hàm riêng và gradient

**Đạo hàm riêng** ∂f/∂xᵢ: đạo hàm theo xᵢ, giữ các biến khác cố định. **Gradient** `∇f = (∂f/∂x₁, …, ∂f/∂xₙ)` chỉ **hướng tăng nhanh nhất**, độ lớn là tốc độ tăng. **Quy tắc chuỗi nhiều biến** là nền của lan truyền ngược (backpropagation).

## Ma trận Hessian và phân loại điểm tới hạn

Tại điểm tới hạn (∇f = 0), **Hessian H** (ma trận đạo hàm riêng cấp hai, `Hᵢⱼ = ∂²f/∂xᵢ∂xⱼ`) cho biết dạng cong:

- Mọi trị riêng của H **dương** (H xác định dương) ⇒ **cực tiểu**.
- Mọi trị riêng **âm** ⇒ **cực đại**.
- Trị riêng cả dương và âm ⇒ **điểm yên ngựa** (saddle), rất phổ biến trong học sâu.

![Đường đồng mức của hàm có cực tiểu và hàm có điểm yên ngựa](/lessons/prob-stats/34-multivariable-calculus-surface-vi.svg)
*Bên trái: các đường khép kín quanh một cực tiểu. Bên phải: điểm yên ngựa, tăng theo một hướng và giảm theo hướng kia.*

## Tối ưu có ràng buộc: nhân tử Lagrange

Tối đa hoá f(x, y) với ràng buộc g(x, y) = c: tại cực trị, **∇f song song ∇g**, tức `∇f = λ∇g`. λ (nhân tử) có ý nghĩa kinh tế: *giá bóng* của ràng buộc, nghĩa là f tối đa tăng bao nhiêu nếu nới ràng buộc một đơn vị.

Ví dụ: tối đa lợi ích U = xy với ngân sách x + y = 10 cho x = y = 5, U = 25.

## Ứng dụng nghề nghiệp

Phân bổ ngân sách quảng cáo, tối ưu danh mục (Markowitz), huấn luyện mô hình (gradient + Hessian xấp xỉ), SVM (nhân tử Lagrange trong bài toán đối ngẫu), entropy cực đại.

## Nguồn tham khảo

- Stewart, J. *Calculus*, chương 14 (Partial derivatives).
- Boyd & Vandenberghe. *Convex Optimization*, chương 4 và 5.
- Nocedal & Wright. *Numerical Optimization* (Springer).

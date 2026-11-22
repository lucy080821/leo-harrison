# Tích phân: diện tích và tích luỹ

## Ý tưởng: cộng vô số mảnh nhỏ

Muốn tính **diện tích dưới đường cong** f(x) từ a đến b, ta chia thành n hình chữ nhật hẹp rộng Δx, cộng diện tích rồi cho n → ∞. Tổng này là **tổng Riemann** (Bernhard Riemann, 1854) và giới hạn của nó là **tích phân xác định**:

`∫ₐᵇ f(x) dx = lim Σ f(xᵢ) Δx`

![Tổng Riemann của y = x² trên [0, 3] với 6 và 24 hình chữ nhật](/lessons/prob-stats/14-integrals-riemann-vi.svg)
*Càng nhiều hình chữ nhật, tổng càng sát diện tích thật (9).*

Nghĩa tổng quát: **tích luỹ**. Nếu f là *tốc độ* thì ∫f là *tổng lượng*: tốc độ bơm nước → lượng nước trong bể; vận tốc → quãng đường; điện công suất → năng lượng tiêu thụ.

## Định lý cơ bản của giải tích

Hai phép toán đạo hàm và tích phân là **ngược nhau**. Nếu F′ = f thì

`∫ₐᵇ f(x) dx = F(b) − F(a)`

Ví dụ ∫₀³ x² dx = [x³/3]₀³ = 9 − 0 = **9**, đúng với số liệu từ code. Định lý này nối hai nửa của giải tích mà Newton và Leibniz cùng khám phá.

## Tính số khi không có nguyên hàm đẹp

Nhiều hàm như e^(−x²/2) **không có nguyên hàm biểu diễn bằng hàm sơ cấp**. Ta tính bằng **tích phân số** (quy tắc hình thang, Simpson) hoặc tra bảng. Đây chính là cách xác suất chuẩn trong bài 6 được tính.

## Nối với xác suất

Với biến liên tục, **hàm mật độ** f thoả ∫ f = 1 và `P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx`. **Kỳ vọng** `E[X] = ∫ x·f(x) dx`. Nghĩa là xác suất chính là *diện tích*.

## Nguồn tham khảo

- Stewart, J. *Calculus*, chương 5 (Integrals) và 7 (Techniques of integration).
- MIT OCW 18.01SC: Definite integrals, Fundamental theorem.
- Riemann, B. (1854). Über die Darstellbarkeit einer Function durch eine trigonometrische Reihe.
- Blitzstein & Hwang, *Introduction to Probability*, chương 5.

# Phương trình vi phân: mô hình hoá sự thay đổi theo thời gian

Nhiều hiện tượng được mô tả bằng **tốc độ thay đổi**, không phải giá trị: dân số tăng nhanh tỷ lệ với dân số hiện có; thuốc thải khỏi máu với tốc độ tỷ lệ với nồng độ. Một **phương trình vi phân** liên hệ hàm y(t) với đạo hàm của nó.

## Tăng trưởng và phân rã mũ

`dy/dt = k·y` có nghiệm `y(t) = y₀·e^(kt)`.

- k > 0: tăng trưởng (lãi kép liên tục, lây lan ban đầu).
- k < 0: phân rã; **chu kỳ bán rã** `t½ = ln 2 / |k|`. Thuốc có t½ = 6 giờ còn 1/4 sau 12 giờ.

## Tăng trưởng logistic

Không thứ gì tăng mãi. Mô hình logistic (Verhulst, 1838):

`dP/dt = r·P·(1 − P/K)`

tăng gần mũ lúc đầu rồi bão hoà ở **sức chứa K**: dạng đường chữ S. Dùng cho thâm nhập thị trường, dân số, lan truyền sản phẩm.

![Tăng trưởng mũ so với tăng trưởng logistic bão hoà ở sức chứa K](/lessons/prob-stats/35-ode-ode-vi.svg)
*Mũ tăng vô hạn; logistic có dạng chữ S và dừng ở K = 1000.*

## Phương pháp số: Euler

Hầu hết phương trình không có nghiệm đóng. **Euler** đi từng bước nhỏ h theo độ dốc hiện tại: `yₙ₊₁ = yₙ + h·f(tₙ, yₙ)`. Bước nhỏ thì chính xác hơn nhưng tốn công; các phương pháp tốt hơn (Runge–Kutta) dùng nhiều điểm trong mỗi bước. `scipy.integrate.solve_ivp` làm điều này.

## Ứng dụng nghề nghiệp

Dược động học (nồng độ thuốc), dịch tễ học (mô hình SIR), tài chính (định giá, mô hình lãi suất), kỹ thuật điều khiển, mô hình lan truyền người dùng. Mạng nơ-ron "ODE" xem tầng mạng như bước Euler.

## Nguồn tham khảo

- Strogatz, S. *Nonlinear Dynamics and Chaos* (Westview).
- Stewart, J. *Calculus*, chương 9 (Differential equations).
- Kermack, W. O. & McKendrick, A. G. (1927). A contribution to the mathematical theory of epidemics. *Proc. R. Soc. A* 115.

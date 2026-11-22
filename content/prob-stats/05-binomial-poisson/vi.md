# Phân phối nhị thức và Poisson

## Nhị thức (Binomial)

Một **thử Bernoulli** có hai kết quả: thành công (xác suất p) hoặc thất bại. Lặp **n** thử độc lập giống nhau, gọi X là số lần thành công, thì X ~ **Binomial(n, p)**:

`P(X = k) = C(n, k) · pᵏ · (1 − p)ⁿ⁻ᵏ`

với C(n, k) = n! / (k!(n − k)!) là số cách chọn k vị trí thành công. **E[X] = np, Var(X) = np(1 − p).**

Ví dụ thực tế: trong 20 khách vào cửa hàng, mỗi người mua với xác suất 0,3, số người mua theo Binomial(20; 0,3), trung bình 6 người.

![Cột xác suất của Binomial(20; 0,3), đỉnh ở k = 6](/lessons/prob-stats/05-binomial-poisson-binom-vi.svg)
*Số người mua phổ biến nhất là 6 (= np); phân phối lệch nhẹ sang phải.*

## Poisson

Khi đếm số sự kiện **hiếm, độc lập** xảy ra trong một khoảng thời gian/không gian cố định với tốc độ trung bình λ, ta dùng **Poisson(λ)**:

`P(X = k) = e⁻λ · λᵏ / k!`, với **E[X] = Var(X) = λ**.

Siméon Poisson công bố năm 1837; ví dụ lịch sử nổi tiếng là số lính Phổ chết vì ngựa đá mỗi năm do Ladislaus Bortkiewicz (1898) phân tích. Ứng dụng ngày nay: số cuộc gọi đến tổng đài mỗi phút, số lỗi mỗi 1.000 dòng code, số khách vào quầy mỗi giờ.

## Poisson là giới hạn của nhị thức

Khi n lớn, p nhỏ và np = λ giữ cố định, Binomial(n, p) xấp xỉ Poisson(λ). Vì vậy Poisson thích hợp cho "nhiều cơ hội, mỗi cơ hội rất hiếm".

## Nguồn tham khảo

- Blitzstein & Hwang, *Introduction to Probability*, chương 3 và 4 (Binomial, Poisson).
- NIST/SEMATECH *e-Handbook*, mục 1.3.6.6 (Probability distributions).
- Bortkiewicz, L. von (1898). *Das Gesetz der kleinen Zahlen*.

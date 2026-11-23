# Phân phối đều, hình học và mũ: thời gian chờ

Bài 6 đếm *số* sự kiện. Bài này mô hình hoá **chờ bao lâu** hoặc **thử bao nhiêu lần**.

## Phân phối đều U(a, b)

Mọi giá trị trong [a, b] đều đồng khả năng: mật độ f(x) = 1/(b − a). E[X] = (a + b)/2. Dùng cho "giờ đến ngẫu nhiên trong khoảng" và là nền để sinh số ngẫu nhiên.

## Phân phối hình học

Lặp thử Bernoulli độc lập xác suất p cho đến lần thành công đầu tiên. Gọi X là số lần thử:

`P(X = k) = (1 − p)ᵏ⁻¹ · p`, **E[X] = 1/p**.

Ví dụ: tỷ lệ chốt đơn 20% ⇒ trung bình cần 5 cuộc gọi cho một đơn.

## Phân phối mũ Exp(λ)

Với sự kiện xảy ra độc lập ở tốc độ λ (xem Poisson), **thời gian chờ giữa hai sự kiện** T có mật độ `f(t) = λe^(−λt)`, t ≥ 0:

- `P(T > t) = e^(−λt)` (hàm sống sót), **E[T] = 1/λ**.
- **Không nhớ (memoryless):** P(T > s + t | T > s) = P(T > t). Đã chờ 5 phút không làm cuộc gọi tới "sắp tới hơn". Đây là tính chất đặc trưng của phân phối mũ (và hình học ở bản rời rạc).

![Hàm khối xác suất hình học và hàm mật độ mũ](/lessons/prob-stats/07-other-distributions-dist-vi.svg)
*Cả hai giảm dần: lần thành công đầu tiên hay xảy ra sớm; thời gian chờ ngắn phổ biến hơn dài.*

## Ứng dụng nghề nghiệp

- **Độ tin cậy**: thời gian đến khi hỏng thiết bị (mô hình mũ đơn giản; thực tế thường dùng Weibull).
- **Hàng đợi** và thiết kế tổng đài: thời gian đến và thời gian phục vụ.
- **Phân tích chuyển đổi**: số lần tiếp cận tới khi khách mua.
- Mở rộng: **Gamma** (tổng k thời gian chờ mũ) và **Beta** (phân phối trên [0, 1], dùng ở bài suy luận Bayes).

## Nguồn tham khảo

- Blitzstein & Hwang, *Introduction to Probability*, chương 4 và 5 (Geometric, Exponential, memorylessness).
- NIST/SEMATECH *e-Handbook*, mục 1.3.6.6 (Exponential, Gamma, Weibull).
- Ross, S. *Introduction to Probability Models*, chương 5.

# Chuỗi Markov: mô hình hệ thống thay đổi trạng thái

## Tính chất Markov

Một quá trình có trạng thái X₀, X₁, X₂, … là **chuỗi Markov** nếu *tương lai chỉ phụ thuộc vào hiện tại, không phụ thuộc cách ta tới đây*:

`P(Xₙ₊₁ = j | Xₙ = i, quá khứ) = P(Xₙ₊₁ = j | Xₙ = i) = P_ij`

Các P_ij xếp thành **ma trận chuyển P**; mỗi hàng cộng bằng 1. Nếu phân phối hiện tại là vector hàng π, thì sau một bước là `π P`, sau n bước là `π Pⁿ`.

![Sơ đồ trạng thái thời tiết: nắng và mưa với xác suất chuyển](/lessons/prob-stats/11-markov-chains-markov-vi.svg)
*Mũi tên có nhãn là xác suất chuyển trong một ngày; mỗi trạng thái có tổng xác suất đi ra bằng 1.*

## Phân phối dừng

Với chuỗi "đủ tốt" (không tách thành các phần rời nhau và không có chu kỳ), π Pⁿ **hội tụ** về một phân phối duy nhất **π\*** không phụ thuộc điểm xuất phát, thoả `π* P = π*`. Nó cho biết tỷ lệ thời gian *dài hạn* ở mỗi trạng thái. Với mô hình thời tiết trên: 5/6 ngày nắng, 1/6 ngày mưa.

## Ứng dụng nghề nghiệp

- **PageRank** (Brin & Page, 1998): người lướt web ngẫu nhiên là chuỗi Markov trên đồ thị liên kết; điểm trang là phân phối dừng.
- **Hành vi khách hàng**: các trạng thái "dùng / ngủ đông / rời bỏ" để ước lượng giá trị vòng đời.
- **Hàng đợi, độ tin cậy, mô hình ngôn ngữ cổ điển (n-gram)**.
- **Học tăng cường** và MCMC (Bayes) đều xây trên chuỗi Markov.

## Nguồn tham khảo

- Blitzstein & Hwang, *Introduction to Probability*, chương 11 (Markov chains).
- Norris, J. R. *Markov Chains* (Cambridge University Press, 1997).
- Brin, S. & Page, L. (1998). The anatomy of a large-scale hypertextual Web search engine. *Computer Networks* 30.

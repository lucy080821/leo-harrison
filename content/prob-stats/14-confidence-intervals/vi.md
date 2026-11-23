# Ước lượng và khoảng tin cậy

## Từ mẫu suy ra tổng thể

Ta hiếm khi đo được cả **tổng thể (population)**, nên lấy một **mẫu (sample)** rồi suy ra. Giá trị tính từ mẫu (như x̄ hay tỷ lệ p̂) là **ước lượng điểm** của tham số thật (μ hay p). Mẫu khác cho ước lượng khác, vì vậy ta cần nói *độ chắc chắn*.

Mẫu phải được chọn **ngẫu nhiên**; mẫu lệch (ví dụ chỉ hỏi người dùng mạng) gây **sai lệch hệ thống (bias)** mà tăng cỡ mẫu cũng không cứu được. Cuộc thăm dò *Literary Digest* năm 1936 gửi hơn 2 triệu phiếu nhưng dự đoán sai kết quả bầu cử Mỹ do mẫu lệch.

## Khoảng tin cậy

Theo CLT, p̂ xấp xỉ chuẩn với sai số chuẩn **SE = √(p̂(1 − p̂) / n)**. **Khoảng tin cậy 95%:**

`p̂ ± 1,96 · SE`

Số 1,96 là điểm z chứa 95% giữa hai phía của phân phối chuẩn.

![20 khoảng tin cậy 95% từ 20 mẫu khác nhau quanh giá trị thật](/lessons/prob-stats/14-confidence-intervals-ci-vi.svg)
*Hầu hết khoảng chứa giá trị thật (đường nét đứt); khoảng màu đỏ là khoảng trượt.*

### Hiểu đúng "95%"

Nếu lặp lại việc lấy mẫu và dựng khoảng nhiều lần, **khoảng 95% số khoảng** sẽ chứa tham số thật. Đây là tính chất của *phương pháp*; nó **không** có nghĩa "xác suất 95% tham số nằm trong khoảng cụ thể này" (với phương pháp tần suất, tham số cố định, không ngẫu nhiên).

## Ví dụ thực tế: biên sai số

Thăm dò 1.000 người, p̂ = 0,52: SE ≈ 0,0158, khoảng tin cậy ≈ [0,489; 0,551]. "Biên sai số ±3%" thường thấy trên báo chính là 1,96·SE trong trường hợp xấu nhất p = 0,5. Vì SE tỷ lệ 1/√n, muốn giảm một nửa sai số phải tăng cỡ mẫu gấp bốn.

## Nguồn tham khảo

- Diez et al., *OpenIntro Statistics*, chương 5 (Foundations for inference), mục 5.2.
- Blitzstein & Hwang, *Introduction to Probability*, chương 10 và phần suy luận.
- Squire, P. (1988). Why the 1936 Literary Digest poll failed. *Public Opinion Quarterly* 52(1).
- Neyman, J. (1937). Outline of a theory of statistical estimation based on the classical theory of probability.

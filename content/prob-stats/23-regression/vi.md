# Tương quan và hồi quy tuyến tính

## Tương quan

**Hệ số tương quan Pearson** r đo độ mạnh của quan hệ *tuyến tính* giữa hai biến, từ −1 đến 1:

`r = Σ(xᵢ − x̄)(yᵢ − ȳ) / √(Σ(xᵢ − x̄)² · Σ(yᵢ − ȳ)²)`

r ≈ 1: tăng cùng chiều; r ≈ −1: ngược chiều; r ≈ 0: không có quan hệ **tuyến tính** (vẫn có thể có quan hệ phi tuyến).

## Hồi quy tuyến tính đơn

Ta tìm đường thẳng ŷ = a + bx **gần dữ liệu nhất**. "Gần nhất" nghĩa là **bình phương tối thiểu (least squares)**: chọn a, b làm nhỏ nhất tổng bình phương **phần dư** (sai khác giữa y thật và ŷ). Phương pháp do Legendre (1805) công bố và Gauss (1809) phát triển. Lời giải đóng:

`b = Σ(xᵢ − x̄)(yᵢ − ȳ) / Σ(xᵢ − x̄)²`,  `a = ȳ − b·x̄`

![Biểu đồ phân tán diện tích–giá với đường hồi quy và các phần dư](/lessons/prob-stats/23-regression-reg-vi.svg)
*Mỗi đoạn thẳng đứng là một phần dư; bình phương tối thiểu chọn đường làm tổng bình phương các đoạn này nhỏ nhất.*

**Hệ số xác định R²** (= r² trong hồi quy đơn) cho biết bao nhiêu phần biến thiên của y được mô hình giải thích.

## Tên gọi "hồi quy"

Francis Galton (1886) quan sát con cái của người rất cao có xu hướng thấp hơn bố mẹ một chút và "hồi quy" về trung bình, nên có từ *regression*. Đây cũng là một hiện tượng thống kê tổng quát, **hồi quy về trung bình**, thường bị nhầm là có nguyên nhân.

## Ví dụ thực tế: định giá nhà

Từ diện tích dự đoán giá. Cảnh báo: chỉ nên dự đoán **trong khoảng dữ liệu đã quan sát** (nội suy), việc ngoại suy rất rủi ro; và hãy luôn vẽ **đồ thị phần dư** để kiểm tra mô hình có hợp lý không.

> Đây chính là nền tảng của Machine Learning có giám sát: hồi quy tuyến tính là mô hình đầu tiên trong khoá ML của Lexi Learn.

## Nguồn tham khảo

- Diez et al., *OpenIntro Statistics*, chương 7 (Introduction to linear regression).
- Legendre, A.-M. (1805). *Nouvelles méthodes pour la détermination des orbites des comètes*.
- Galton, F. (1886). Regression towards mediocrity in hereditary stature. *J. Anthropological Institute* 15.
- NIST/SEMATECH *e-Handbook*, chương 4 (Process Modeling).

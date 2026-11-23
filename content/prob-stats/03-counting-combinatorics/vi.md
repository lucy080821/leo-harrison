# Đếm: hoán vị, tổ hợp và bài toán sinh nhật

Nhiều xác suất chỉ là **đếm**: P(A) = (số kết quả thuận lợi) / (số kết quả có thể) khi các kết quả đồng khả năng. Vì vậy ta cần đếm nhanh và chính xác. Blitzstein & Hwang gọi đây là nền của xác suất cổ điển.

## Quy tắc nhân

Nếu việc 1 có a cách và với mỗi cách đó việc 2 có b cách thì tổng cộng có **a × b** cách. Mật khẩu 8 ký tự từ 62 ký tự (a–z, A–Z, 0–9) có 62⁸ ≈ 2,18·10¹⁴ khả năng.

## Hoán vị và tổ hợp

- **Hoán vị** (có thứ tự): xếp k phần tử chọn từ n: `P(n, k) = n! / (n − k)!`. Xếp n người vào n ghế: `n!`.
- **Tổ hợp** (không thứ tự): `C(n, k) = n! / (k!(n − k)!)`.

Quan hệ: P(n, k) = C(n, k) · k! (chọn xong còn phải xếp thứ tự).

> Mẹo hỏi: "đổi chỗ có tạo ra kết quả mới không?" Có ⇒ hoán vị; không ⇒ tổ hợp.

## Ví dụ thực tế: xổ số 6/45

Có C(45, 6) = 8.145.060 cách chọn, nên một vé trúng độc đắc với xác suất ≈ 1,2·10⁻⁷. (Điều này chỉ nói về **xác suất**; giải thưởng và luật chơi quyết định giá trị kỳ vọng.)

![Xác suất trùng sinh nhật tăng nhanh theo số người, vượt 50% ở n = 23](/lessons/prob-stats/03-counting-combinatorics-birthday-vi.svg)
*Đường cong chạm mức 50% khi có 23 người.*

## Bài toán sinh nhật

Trong n người, xác suất *không ai trùng* sinh nhật là (365/365)(364/365)…((365 − n + 1)/365). Chỉ với **n = 23** xác suất có ít nhất một cặp trùng đã vượt 50%. Trực giác sai vì ta đếm **số cặp**: 23 người tạo C(23, 2) = 253 cặp. Cùng nguyên lý này giải thích **va chạm băm** (hash collision) trong khoa học máy tính.

## Nguồn tham khảo

- Blitzstein & Hwang, *Introduction to Probability*, chương 1 (Counting).
- Ross, S. *A First Course in Probability*, chương 1.
- Feller, W. *An Introduction to Probability Theory and Its Applications*, Vol. 1.

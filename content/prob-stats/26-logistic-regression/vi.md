# Hồi quy logistic: dự đoán xác suất cho kết quả có/không

Khi y chỉ là 0/1 (đỗ/trượt, mua/không, bệnh/khoẻ), hồi quy tuyến tính có thể cho xác suất âm hoặc > 1. **Hồi quy logistic** mô hình hoá **xác suất** p = P(y = 1 | x).

## Odds và logit

- **Odds** = p/(1 − p): p = 0,8 ⇒ odds 4 ("4 trên 1").
- **Logit** = log(odds) ∈ (−∞, +∞).

Mô hình: **logit(p) = β₀ + β₁x₁ + … + β_p x_p**, tương đương

`p = 1 / (1 + e^−(β₀ + β₁x₁ + …))` (hàm **sigmoid**).

![Đường sigmoid của hồi quy logistic và các điểm dữ liệu 0/1](/lessons/prob-stats/26-logistic-regression-logit-vi.svg)
*Xác suất tăng dần theo x; điểm cắt p = 0,5 là ranh giới phân loại mặc định.*

## Ước lượng và diễn giải

Hệ số tìm bằng **cực đại hợp lý** (bài 13), không có công thức đóng; dùng Newton–Raphson (IRLS) hoặc gradient. Diễn giải: tăng xⱼ một đơn vị làm **log-odds** tăng βⱼ, nghĩa là odds nhân với **e^βⱼ** (**tỷ số odds**, odds ratio). Ví dụ β = 0,7 ⇒ odds gấp ≈ 2 lần.

## Đánh giá

- Vì đầu ra là xác suất, hãy dùng **log loss**, **AUC–ROC**, độ chính xác, precision/recall và **đường hiệu chuẩn** (calibration) thay vì R².
- Ngưỡng 0,5 không bắt buộc: chọn theo chi phí sai lầm (bỏ sót bệnh đắt hơn báo nhầm).

## Ứng dụng nghề nghiệp

Dự đoán rời bỏ khách hàng, chấm điểm tín dụng, y học (nguy cơ bệnh), phản hồi quảng cáo. Là đơn vị cơ bản của mạng nơ-ron phân loại (một nơ-ron sigmoid) và là mô hình nền bắt buộc cần thử trước khi dùng mô hình phức tạp.

## Nguồn tham khảo

- Hosmer, Lemeshow, Sturdivant. *Applied Logistic Regression* (Wiley).
- James et al. *An Introduction to Statistical Learning*, chương 4.
- Cox, D. R. (1958). The regression analysis of binary sequences. *J. Royal Statistical Society B* 20(2).

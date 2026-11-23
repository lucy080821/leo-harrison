# Hồi quy bội: nhiều biến giải thích

Bài 23 chỉ có một biến x. Dữ liệu thực có nhiều yếu tố cùng tác động: giá nhà theo diện tích, số phòng, khu vực… **Hồi quy bội**:

`y = β₀ + β₁x₁ + β₂x₂ + … + β_p x_p + ε`

## Dạng ma trận

Với n quan sát, ghép thành `y = Xβ + ε` (X có cột 1 cho hệ số chặn). Bình phương tối thiểu cho lời giải **phương trình chuẩn**:

`β̂ = (XᵀX)⁻¹ Xᵀ y`

(trong thực tế dùng QR/SVD ổn định hơn, xem bài 39; `np.linalg.lstsq` làm việc này.)

## Diễn giải hệ số

βⱼ là mức thay đổi trung bình của y khi xⱼ tăng 1 đơn vị **và các biến khác giữ nguyên**. Cụm "giữ nguyên" là điểm khác biệt quan trọng với hồi quy đơn: hệ số của diện tích khi *đã tính* số phòng thường khác hệ số khi chỉ có diện tích.

![Giá trị thực và giá trị dự đoán của hồi quy bội nằm gần đường chéo](/lessons/prob-stats/24-multiple-regression-mreg-vi.svg)
*Mô hình tốt thì các điểm (dự đoán, thực tế) bám sát đường chéo y = x.*

## Đánh giá mô hình

- **R²** luôn tăng khi thêm biến, kể cả biến vô nghĩa. Dùng **R² hiệu chỉnh** = 1 − (1 − R²)(n − 1)/(n − p − 1) để phạt số biến.
- **Kiểm định t** từng hệ số và **kiểm định F** toàn mô hình.
- **Đa cộng tuyến**: các biến giải thích tương quan mạnh với nhau làm hệ số bất ổn, sai số chuẩn lớn. Đo bằng **VIF** (VIF > 5–10 đáng lo); xử lý bằng bỏ biến, gộp biến hoặc regularization (Ridge/Lasso trong khoá ML).

## Biến phân loại (biến giả)

Biến "quận" có k mức được mã hoá bằng k − 1 cột 0/1; hệ số cho biết khác biệt so với nhóm tham chiếu. ANOVA (bài 19) chính là hồi quy với toàn biến giả.

## Nguồn tham khảo

- Gelman, Hill, Vehtari. *Regression and Other Stories* (Cambridge, 2020).
- James, Witten, Hastie, Tibshirani. *An Introduction to Statistical Learning*, chương 3.
- Kutner et al. *Applied Linear Statistical Models*.

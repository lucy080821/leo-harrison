# Đánh giá mô hình hồi quy: MAE, RMSE, R² và phân tích phần dư

Mô hình dự đoán **số** (giá nhà, doanh số, thời gian giao hàng) cần chỉ số và biểu đồ khác phân loại.

## Các chỉ số chính

| Chỉ số | Công thức | Tính chất |
|---|---|---|
| **MAE** | trung bình `|y − ŷ|` | dễ hiểu, cùng đơn vị, bền với ngoại lai |
| **RMSE** | `√trung bình (y − ŷ)²` | phạt nặng sai số lớn |
| **R²** | `1 − SS_res / SS_tot` | tỷ lệ phương sai giải thích; **có thể âm** trên tập kiểm tra |
| **MAPE** | trung bình `|y − ŷ|/|y|` | tương đối; hỏng khi y ≈ 0 |

`RMSE ≥ MAE`; khoảng cách lớn nghĩa là có vài sai số rất lớn.

![Phần dư cho thấy mô hình sai ở đâu mà một con số không cho thấy](/lessons/machine-learning/17-regression-metrics-fig-vi.svg)
*Phần dư cho thấy mô hình sai ở đâu mà một con số không cho thấy*

## Luôn so với baseline

`DummyRegressor()` dự đoán trung bình tập huấn luyện (R² ≈ 0). Mô hình phức tạp chỉ đáng giá khi **thắng đáng kể** baseline và mô hình tuyến tính đơn giản.

## Phân tích phần dư

Một con số che giấu *chỗ* mô hình sai:

1. **Dự đoán so với thực tế**: điểm nên bám đường chéo.
2. **Phần dư so với dự đoán**: nên là đám mây quanh 0. Hình **phễu** (sai số tăng theo giá trị) nghĩa là phương sai không đều: thử dự đoán `log(y)`.
3. **Phần dư theo nhóm** (vùng, tháng): phát hiện nhóm bị thiên lệch.
4. Xem **các ca sai nhiều nhất** để tìm lỗi dữ liệu hoặc đặc trưng thiếu.

## Dự đoán log

Khi y lệch phải (giá, doanh thu): huấn luyện trên `log1p(y)` rồi `expm1` khi dự đoán (`TransformedTargetRegressor`). Sai số trở thành **tương đối**, thường hợp lý hơn.

## Nguồn tham khảo

- scikit-learn User Guide, "Metrics and scoring: regression metrics".
- Hyndman & Koehler (2006). Another look at measures of forecast accuracy. *International Journal of Forecasting* 22(4).
- James et al. *An Introduction to Statistical Learning*, chương 3.

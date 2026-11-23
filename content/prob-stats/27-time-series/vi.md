# Chuỗi thời gian: xu hướng, mùa vụ và dự báo cơ bản

Dữ liệu doanh thu, lưu lượng, nhu cầu được ghi **theo thời gian**, và các quan sát **không độc lập**: tháng này giống tháng trước. Mọi công cụ ở bài trước giả định độc lập, nên chuỗi thời gian cần cách tiếp cận riêng.

## Phân rã

`Chuỗi = Xu hướng + Mùa vụ + Phần còn lại`

- **Xu hướng** (trend): hướng đi dài hạn.
- **Mùa vụ** (seasonality): mẫu lặp theo chu kỳ cố định (tuần, năm).
- **Phần còn lại**: nhiễu. Có thể cộng (additive) hoặc nhân (multiplicative, khi mùa vụ to ra theo mức).

![Chuỗi doanh số 24 tháng và xu hướng tách ra bằng trung bình trượt](/lessons/prob-stats/27-time-series-ts-vi.svg)
*Đường liền là dữ liệu có mùa vụ; đường nét đứt là xu hướng tăng.*

## Tự tương quan

**ACF** đo tương quan của chuỗi với chính nó trễ k bước: `ρₖ = Σ(xₜ − x̄)(xₜ₊ₖ − x̄)/Σ(xₜ − x̄)²`. Đỉnh ở lag 12 (dữ liệu tháng) báo hiệu mùa vụ năm. Chuỗi dừng (không xu hướng) với ACF suy giảm nhanh là điều kiện của nhiều mô hình cổ điển (ARIMA).

## Dự báo cơ bản

- **Trung bình trượt**: làm mượt và ước lượng xu hướng.
- **Làm mịn mũ đơn** `sₜ = α·xₜ + (1 − α)·sₜ₋₁`: trọng số giảm theo hàm mũ về quá khứ; α lớn thì phản ứng nhanh. Mở rộng: Holt (xu hướng), Holt–Winters (mùa vụ).
- **ARIMA**, **mô hình học máy** với đặc trưng trễ, **Prophet**.

## Đánh giá đúng cách

**Không xáo trộn dữ liệu.** Chia theo thời gian (huấn luyện trước, kiểm thử sau) và dùng *rolling-origin cross-validation*. Đo bằng **MAE**, **RMSE**, **MAPE**; so với **dự báo ngây thơ** (lấy giá trị kỳ trước): mô hình phức tạp phải thắng nó.

## Ứng dụng nghề nghiệp

Dự báo nhu cầu và tồn kho, nhân sự tổng đài, doanh thu theo mùa, phát hiện bất thường vận hành.

## Nguồn tham khảo

- Hyndman, R. J. & Athanasopoulos, G. *Forecasting: Principles and Practice* (3rd ed., OTexts, otexts.com/fpp3).
- Box, Jenkins, Reinsel, Ljung. *Time Series Analysis: Forecasting and Control*.
- Shumway, R. & Stoffer, D. *Time Series Analysis and Its Applications*.

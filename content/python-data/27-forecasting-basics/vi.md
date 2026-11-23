# Dự báo chuỗi thời gian cơ bản và đo sai số

Dự báo doanh số, lượng truy cập, tồn kho là nhu cầu thường trực. Nguyên tắc nghề: **luôn bắt đầu bằng baseline đơn giản**; mô hình phức tạp chỉ đáng dùng nếu thắng được baseline.

## Chia dữ liệu theo thời gian

Với chuỗi thời gian **không được xáo trộn** hay chia ngẫu nhiên: huấn luyện bằng quá khứ, kiểm tra bằng tương lai (như thực tế). Chia ngẫu nhiên làm rò rỉ tương lai vào huấn luyện, điểm số đẹp giả.

![Dự báo baseline: lặp lại tuần trước và trung bình trượt](/lessons/python-data/27-forecasting-basics-fig-vi.svg)
*Dự báo baseline: lặp lại tuần trước và trung bình trượt*

## Các baseline

| Baseline | Ý tưởng | Khi nào mạnh |
|---|---|---|
| Naive | ngày mai = hôm nay | chuỗi ít biến động |
| **Seasonal naive** | lặp lại cùng ngày của chu kỳ trước (tuần) | chuỗi có mùa vụ rõ |
| Trung bình trượt | trung bình N ngày gần nhất | nhiễu cao |
| Drift | naive cộng xu hướng trung bình | có xu hướng đều |

## Đo sai số

- **MAE** = trung bình |sai số|: dễ hiểu, cùng đơn vị với dữ liệu.
- **RMSE** = căn trung bình bình phương: phạt nặng sai số lớn.
- **MAPE** = trung bình |sai số|/|thực tế| ×100%: so sánh được giữa các chuỗi, **hỏng khi giá trị thực gần 0**.

## Thành phần của chuỗi

`quan sát = xu hướng + mùa vụ + nhiễu`. Nhận ra từng thành phần (phân rã bằng `statsmodels.tsa.seasonal_decompose` hoặc rolling thủ công) quyết định baseline và mô hình phù hợp.

## Bước tiếp theo

Holt-Winters (làm mượt mũ có mùa vụ), ARIMA/SARIMA, Prophet, rồi học máy với đặc trưng trễ (lag features). Khoá Machine Learning sẽ đi tiếp hướng này.

## Nguồn tham khảo

- Hyndman & Athanasopoulos. *Forecasting: Principles and Practice* (3rd ed., OTexts, đọc miễn phí).
- Makridakis et al. (2020). The M4 Competition. *International Journal of Forecasting* 36(1).

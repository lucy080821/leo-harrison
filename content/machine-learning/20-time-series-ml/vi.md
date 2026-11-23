# Học máy cho chuỗi thời gian: đặc trưng trễ và kiểm định theo thời gian

Mô hình ML thông thường (rừng, boosting, hồi quy) **không biết thời gian**. Ta biến chuỗi thành **bảng**: mỗi dòng là một ngày, đặc trưng là **quá khứ** của nó.

## Đặc trưng cho dự báo

| Nhóm | Ví dụ | Ghi chú |
|---|---|---|
| **Trễ (lag)** | giá trị hôm qua, 7 ngày trước | `shift(k)` |
| **Cửa sổ trượt** | trung bình 7 ngày gần nhất | `shift(1).rolling(7).mean()` |
| **Lịch** | thứ, tháng, lễ, cuối tháng | biết trước tương lai |
| **Biến ngoại sinh** | khuyến mãi đã lên kế hoạch, thời tiết dự báo | chỉ khi *biết trước* |

![Đặc trưng trễ biến chuỗi thời gian thành bảng để học máy](/lessons/machine-learning/20-time-series-ml-fig-vi.svg)
*Đặc trưng trễ biến chuỗi thời gian thành bảng để học máy*

## Quy tắc sống còn: không nhìn tương lai

Mọi đặc trưng của ngày *t* chỉ được dùng thông tin **trước t**. Lỗi kinh điển: `rolling(7).mean()` **bao gồm ngày t** (dùng chính đáp án). Phải `shift(1)` trước khi cuộn.

## Quy trình

1. Tạo đặc trưng, `dropna()` các dòng đầu thiếu lịch sử.
2. **Chia theo thời gian**: quá khứ để huấn luyện, giai đoạn cuối để kiểm tra (hoặc `TimeSeriesSplit`).
3. So với **baseline seasonal naive**. Chỉ khi thắng rõ rệt mới đáng dùng mô hình phức tạp.
4. Phân tích phần dư theo thời gian (có còn mùa vụ sót?).

## Dự báo nhiều bước

Hai cách: **đệ quy** (dự báo ngày mai, dùng làm lag cho ngày kia; sai số tích luỹ) hoặc **trực tiếp** (một mô hình cho mỗi khoảng cách dự báo). Cây quyết định **không ngoại suy xu hướng**: hãy khử xu hướng (dự báo chênh lệch) hoặc thêm đặc trưng xu hướng tuyến tính.

## Nguồn tham khảo

- Hyndman & Athanasopoulos. *Forecasting: Principles and Practice* (3rd ed.).
- Bergmeir & Benítez (2012). On the use of cross-validation for time series predictor evaluation. *Information Sciences* 191.
- scikit-learn User Guide, "TimeSeriesSplit".

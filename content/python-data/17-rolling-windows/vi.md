# Cửa sổ trượt, luỹ kế và trung bình mũ

Số liệu hằng ngày **nhiễu** và có **mùa vụ tuần** (cuối tuần khác ngày thường). Muốn thấy xu hướng, ta làm mượt bằng **cửa sổ trượt**.

## Ba loại cửa sổ

| Loại | Mã | Ý nghĩa |
|---|---|---|
| **Trượt** (rolling) | `s.rolling(7).mean()` | trung bình 7 kỳ gần nhất, cửa sổ cố định |
| **Mở rộng** (expanding) | `s.expanding().mean()` | từ đầu đến hiện tại (trung bình luỹ kế) |
| **Mũ** (EWM) | `s.ewm(span=7).mean()` | kỳ gần có trọng số lớn hơn, không cần cửa sổ cứng |

Cửa sổ **7 ngày** triệt tiêu mùa vụ tuần; **30 ngày** cho xu hướng tháng. Vài giá trị đầu là `NaN` (chưa đủ dữ liệu), đặt `min_periods` nếu muốn.

![Trung bình trượt làm mượt biến động ngày](/lessons/python-data/17-rolling-windows-fig-vi.svg)
*Trung bình trượt làm mượt biến động ngày*

## Luỹ kế

`cumsum()` (tổng luỹ kế), `cummax()`, `cumprod()`: doanh thu luỹ kế so mục tiêu, drawdown trong tài chính.

## Phát hiện bất thường bằng cửa sổ

Điểm z cục bộ: `z = (x − rolling_mean)/rolling_std`; **|z| > 3** là điểm bất thường so với hành vi gần đây (khác ngưỡng toàn cục vì thích nghi theo xu hướng). Ứng dụng: giám sát doanh thu bất thường, lỗi hệ thống.

## Lưu ý

- Cửa sổ **căn giữa** (`center=True`) làm mượt đẹp nhưng "nhìn thấy tương lai": **không dùng cho dự báo**.
- Chọn độ rộng theo **chu kỳ** của dữ liệu (7 cho tuần, 12 cho tháng/năm).
- EWM phản ứng nhanh với thay đổi nhưng nhạy với nhiễu hơn trung bình trượt dài.

## Nguồn tham khảo

- pandas documentation, "Windowing operations".
- Hyndman & Athanasopoulos. *Forecasting: Principles and Practice*, chương về làm mịn mũ.
- Montgomery, D. *Introduction to Statistical Quality Control* (biểu đồ kiểm soát EWMA).

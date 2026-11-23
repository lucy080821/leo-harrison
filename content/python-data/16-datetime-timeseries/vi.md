# Ngày giờ và chuỗi thời gian trong pandas

Phân tích kinh doanh gần như luôn có chiều **thời gian**. pandas có công cụ mạnh cho việc này, nhưng trước hết dữ liệu phải thật sự là **ngày**, không phải chuỗi.

## Chuyển đúng kiểu

```python
df["date"] = pd.to_datetime(df["date"])           # hoặc read_csv(..., parse_dates=["date"])
df["date"].dt.year, .dt.month, .dt.dayofweek, .dt.day_name()
```

Đặt cột ngày làm **chỉ mục** (`set_index("date")`) để dùng các thao tác theo thời gian.

## Lấy mẫu lại (resample)

```python
s.resample("MS").sum()      # tổng theo tháng (MS = đầu tháng)
s.resample("W").mean()      # trung bình theo tuần
```

Mã kỳ thường dùng: `D` ngày, `W` tuần, `MS` tháng, `QS` quý, `YS` năm. (Phiên bản mới dùng `ME`, `QE` cho **cuối** kỳ; kiểm tra tài liệu phiên bản bạn dùng.)

![Gom theo tuần và tháng bằng resample](/lessons/python-data/16-datetime-timeseries-fig-vi.svg)
*Gom theo tuần và tháng bằng resample*

## So sánh với kỳ trước

- `shift(1)`: dời dữ liệu một kỳ; `s - s.shift(1)` là chênh lệch.
- `pct_change()`: **tăng trưởng %** so với kỳ trước; `pct_change(12)` so cùng kỳ năm trước (nếu dữ liệu tháng).
- `diff()`: hiệu giữa các kỳ liên tiếp.

## Cạm bẫy

- **Múi giờ**: dữ liệu UTC cần chuyển (`tz_convert`) trước khi gom theo ngày.
- **Ngày thiếu**: `resample` tự thêm kỳ rỗng (tổng 0); `asfreq("D")` làm lộ khoảng trống.
- Gom theo **thứ trong tuần** (`dayofweek`) và **tháng** giúp thấy **tính mùa vụ**: nền tảng của dự báo.

## Nguồn tham khảo

- pandas documentation, "Time series / date functionality".
- Hyndman, R. & Athanasopoulos, G. *Forecasting: Principles and Practice* (otexts.com/fpp3).
- McKinney, W. *Python for Data Analysis*, chương 11.

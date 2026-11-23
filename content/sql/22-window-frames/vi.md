# Hàm cửa sổ (3): tổng luỹ kế, trung bình trượt, LAG/LEAD

Hàm cửa sổ có thể chỉ xét **một phần** cửa sổ quanh dòng hiện tại: **khung (frame)**. Nhờ đó ta tính tổng luỹ kế, trung bình trượt và so sánh với kỳ trước ngay trong SQL.

## Khung cửa sổ

```sql
SUM(revenue) OVER (ORDER BY month ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)
```

- `UNBOUNDED PRECEDING`: từ dòng đầu; `n PRECEDING`: n dòng trước; `CURRENT ROW`; `n FOLLOWING`; `UNBOUNDED FOLLOWING`.
- **Mặc định** khi có `ORDER BY`: từ dòng đầu đến dòng hiện tại (và các dòng **cùng giá trị** với nó, kiểu `RANGE`). Muốn đúng theo từng dòng hãy ghi `ROWS` rõ ràng.

## Ba mẫu cần thuộc

1. **Tổng luỹ kế**: `SUM(x) OVER (ORDER BY ngay)`: doanh thu tích luỹ trong năm.
2. **Trung bình trượt** (3 tháng): làm mượt biến động ngẫu nhiên, nhìn rõ xu hướng.
3. **So với kỳ trước**: `LAG(x)` lấy dòng trước (`LEAD` lấy dòng sau). Tăng trưởng `= (x − LAG(x)) / LAG(x)`. `LAG(x, 12)` so cùng kỳ năm trước (YoY).

![Khung cửa sổ cho tổng luỹ kế, trung bình trượt và so kỳ trước](/lessons/sql/22-window-frames-fig-vi.svg)
*Khung cửa sổ cho tổng luỹ kế, trung bình trượt và so kỳ trước*

## Điểm cần cẩn thận

- Chia cho `LAG` bằng 0 hoặc `NULL` (dòng đầu): lọc hoặc dùng `NULLIF`.
- Thiếu tháng trong dữ liệu làm `LAG` so nhầm tháng: dựng bảng lịch (bài CTE đệ quy) để đủ mọi kỳ.
- Trung bình trượt ở đầu chuỗi chỉ có ít dòng (chưa đủ 3): quyết định bỏ hay giữ.

## Nghề nghiệp

Báo cáo doanh thu lũy kế so mục tiêu, phát hiện bất thường (so với trung bình trượt), tăng trưởng MoM/YoY: nền tảng của bảng điều khiển KPI.

## Nguồn tham khảo

- SQLite documentation, "Window Functions: frame specifications", sqlite.org.
- ISO/IEC 9075-2: window frame clause (SQL:2003).
- Beaulieu, A. *Learning SQL* (3rd ed.), chương 16.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

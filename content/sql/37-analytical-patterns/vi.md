# Các mẫu phân tích kinh doanh: Pareto, tỷ trọng, YoY

Sau khi nắm cú pháp, giá trị của người phân tích nằm ở **câu hỏi hay** và **mẫu tính toán quen thuộc**. Dưới đây là những mẫu xuất hiện trong hầu hết báo cáo.

## 1. Tỷ trọng trên tổng

```sql
revenue * 100.0 / SUM(revenue) OVER ()
```

`SUM() OVER ()` (cửa sổ rỗng) cho **tổng toàn bảng trên mỗi dòng** mà không cần truy vấn con. Dùng cho: cơ cấu doanh thu theo kênh, thị phần nội bộ.

## 2. Pareto (quy tắc 80/20)

Vilfredo Pareto (1896) quan sát 80% đất đai thuộc 20% dân số. Trong kinh doanh thường vài sản phẩm/khách tạo phần lớn doanh thu. Cách làm: sắp theo doanh thu giảm dần, tính **tỷ trọng luỹ kế**, tìm mốc đạt 80%.

![Pareto, tỷ trọng và tăng trưởng theo kỳ](/lessons/sql/37-analytical-patterns-fig-vi.svg)
*Pareto, tỷ trọng và tăng trưởng theo kỳ*

Dùng để **ưu tiên**: nhóm khách tạo 80% doanh thu cần dịch vụ riêng; "đuôi dài" sản phẩm có nên cắt không.

## 3. Tăng trưởng theo kỳ

Tháng này so tháng trước (MoM), so cùng kỳ năm trước (YoY) bằng `LAG` (bài hàm cửa sổ 3). Luôn kèm **giá trị tuyệt đối**: +200% từ 1 lên 3 khác +20% từ 1.000 lên 1.200.

## 4. Top-N và "phần còn lại"

Top 5 sản phẩm + gộp phần còn lại thành "Khác" cho biểu đồ gọn: dùng `ROW_NUMBER`, `CASE WHEN rn <= 5 THEN name ELSE 'Khác' END`, rồi nhóm lại.

## 5. So với mục tiêu / trung bình

Doanh thu thực tế / chỉ tiêu; mỗi cửa hàng so với **trung bình công ty** (`AVG(x) OVER ()`).

## Cảnh báo

- Tỷ trọng trên **tổng sai** (đã lọc hay chưa?): xác định mẫu số trước.
- Chỉ số **tỷ lệ** không cộng được: tính lại từ tử số và mẫu số khi gộp.
- Mỗi bảng KPI nên kèm **định nghĩa** và **khoảng thời gian**.

## Nguồn tham khảo

- Pareto, V. (1896). *Cours d'économie politique*.
- Koch, R. *The 80/20 Principle*.
- Beaulieu, A. *Learning SQL* (3rd ed.), chương 16.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

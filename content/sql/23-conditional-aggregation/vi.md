# Tổng hợp có điều kiện và bảng xoay (pivot)

`GROUP BY` cho ra **một dòng mỗi nhóm**. Báo cáo thường cần **nhiều cột**: doanh thu từng quý, số người dùng từng kênh cạnh nhau. Kỹ thuật chuẩn: **tổng hợp có điều kiện** với `CASE`.

## Khuôn mẫu

```sql
SUM(CASE WHEN dieu_kien THEN gia_tri ELSE 0 END)
COUNT(CASE WHEN dieu_kien THEN 1 END)      -- COUNT bỏ qua NULL
```

Mỗi `CASE` quyết định dòng có "góp" vào cột đó hay không; `SUM` cộng phần góp.

## Xoay hàng thành cột (pivot)

```sql
SELECT country,
  SUM(CASE WHEN channel='organic' THEN 1 ELSE 0 END) AS organic,
  SUM(CASE WHEN channel='ads'     THEN 1 ELSE 0 END) AS ads
FROM users GROUP BY country;
```

![SUM(CASE …) xoay hàng thành cột](/lessons/sql/23-conditional-aggregation-fig-vi.svg)
*SUM(CASE …) xoay hàng thành cột*

Từ dạng "dài" (mỗi dòng một cặp quốc gia–kênh) sang dạng "rộng" (mỗi kênh một cột), dễ đọc cho báo cáo. Hạn chế: **tên cột phải biết trước** (SQL chuẩn không xoay động).

## Tỷ lệ và tỷ trọng

`100.0 * SUM(CASE …) / COUNT(*)`: viết `100.0` để phép chia là **số thực** (chia hai số nguyên trong SQL cho số nguyên!). Ví dụ: tỷ lệ chuyển đổi, tỷ lệ huỷ đơn, tỷ trọng một kênh trong tổng.

## Nghề nghiệp

- Bảng KPI theo kỳ/khu vực/kênh trong một truy vấn.
- Đếm theo trạng thái (mới, đang xử lý, hoàn tất) cho từng nhóm.
- Dễ kiểm tra: tổng các cột phải khớp `COUNT(*)`.
- PostgreSQL có `FILTER (WHERE …)`: `COUNT(*) FILTER (WHERE channel = 'ads')`; SQLite cũng hỗ trợ cú pháp này.

## Nguồn tham khảo

- Beaulieu, A. *Learning SQL*, chương 11 (Conditional Logic).
- SQLite documentation, "Aggregate Functions: FILTER clause", sqlite.org.
- Celko, J. *SQL for Smarties*, mục về bảng chéo (cross-tab).

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

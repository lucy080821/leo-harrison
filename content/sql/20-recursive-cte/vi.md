# CTE đệ quy: cây phân cấp và dãy sinh ra

Có những bài toán mà số bước **không biết trước**: cây quản lý nhiều cấp, danh mục sản phẩm lồng nhau, chuỗi giới thiệu bạn bè. **CTE đệ quy** giải chúng trong SQL thuần.

## Cấu trúc

```sql
WITH RECURSIVE ten(cột...) AS (
  SELECT ...            -- phần NEO: các dòng khởi đầu
  UNION ALL
  SELECT ... FROM ten JOIN ...   -- phần ĐỆ QUY: dùng kết quả vòng trước
)
SELECT ... FROM ten;
```

Quy trình: chạy phần neo; rồi lặp lại phần đệ quy **trên các dòng mới nhất** cho tới khi **không sinh thêm dòng**. Phải có **điều kiện dừng** (`WHERE i < 5` hoặc dữ liệu cạn), nếu không vòng lặp vô hạn.

![CTE đệ quy duyệt cây quản lý và sinh dãy số](/lessons/sql/20-recursive-cte-fig-vi.svg)
*CTE đệ quy duyệt cây quản lý và sinh dãy số*

## Hai công dụng chính

1. **Duyệt cây/đồ thị**: bảng `employees(id, manager_id)`: phần neo lấy người đứng đầu (`manager_id IS NULL`), phần đệ quy lấy cấp dưới trực tiếp của mỗi người vừa tìm được và cộng `level`. Tương tự: tổng hợp doanh thu lên các cấp danh mục.
2. **Sinh dãy**: dãy số, **dãy ngày** để dựng bảng lịch lấp các tháng/ngày thiếu dữ liệu (nối `LEFT JOIN` với dữ liệu thật).

## Cảnh báo nghề nghiệp

- Dữ liệu có **chu trình** (A quản lý B, B quản lý A) làm đệ quy không dừng: thêm giới hạn độ sâu (`WHERE level < 20`) hoặc theo dõi đường đi.
- PostgreSQL, MySQL 8+, SQL Server đều hỗ trợ CTE đệ quy (SQL Server không viết chữ `RECURSIVE`); chuẩn có từ SQL:1999.

## Nguồn tham khảo

- SQLite documentation, "WITH clause: Recursive Common Table Expressions", sqlite.org.
- Celko, J. *Trees and Hierarchies in SQL for Smarties*.
- ISO/IEC 9075:1999 (SQL:1999).

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

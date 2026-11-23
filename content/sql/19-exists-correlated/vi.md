# EXISTS và truy vấn con tương quan

Truy vấn con thường (bài 8) chạy **một lần**. **Truy vấn con tương quan** tham chiếu cột của truy vấn ngoài nên về logic **chạy lại cho từng dòng ngoài**.

## EXISTS: có hay không

```sql
WHERE EXISTS (SELECT 1 FROM orders o WHERE o.customer_id = c.id AND o.status = 'completed')
```

`EXISTS` trả `TRUE` ngay khi tìm thấy **một** dòng khớp, nên **không nhân đôi dòng** như `JOIN` khi có nhiều khớp, và thường nhanh vì dừng sớm. `SELECT 1` chỉ là quy ước (cột trả về không quan trọng). `NOT EXISTS` là anti-join an toàn.

> **Vì sao `NOT EXISTS` an toàn hơn `NOT IN`:** nếu danh sách trong `NOT IN (...)` chứa `NULL`, kết quả luôn rỗng (so sánh với NULL là chưa biết). `NOT EXISTS` không dính cạm bẫy này.

## Truy vấn con tương quan

Cho mỗi nhân viên, so lương với trung bình **phòng của họ**:

```sql
WHERE e.salary > (SELECT AVG(salary) FROM employees x WHERE x.department_id = e.department_id)
```

![EXISTS kiểm tra tồn tại; truy vấn con tương quan chạy theo từng dòng ngoài](/lessons/sql/19-exists-correlated-fig-vi.svg)
*EXISTS kiểm tra tồn tại; truy vấn con tương quan chạy theo từng dòng ngoài*

Bên trong dùng `e.department_id` của dòng ngoài. Có thể thay bằng `JOIN` với truy vấn tổng hợp hoặc **hàm cửa sổ** (`AVG(salary) OVER (PARTITION BY department_id)`), thường dễ đọc và nhanh hơn trên dữ liệu lớn.

## Nghề nghiệp

Lọc "khách có đơn gần đây", "sản phẩm bán trên mức trung bình ngành hàng", loại bản ghi mồ côi. Khi hiệu năng quan trọng, hãy đọc kế hoạch thực thi (bài về hiệu năng).

## Nguồn tham khảo

- Beaulieu, A. *Learning SQL*, chương 9 (Subqueries).
- Celko, J. *SQL for Smarties*, mục về `EXISTS` và `NULL`.
- SQLite documentation, "Subqueries", sqlite.org.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

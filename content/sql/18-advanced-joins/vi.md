# JOIN nâng cao: anti-join, semi-join, cross join và self-join

`INNER JOIN` và `LEFT JOIN` (bài 6–7) giải quyết phần lớn bài toán. Dân chuyên nghiệp cần thêm vài **mẫu nối** đặc biệt.

## Anti-join: "có ở A mà không có ở B"

```sql
SELECT p.name FROM products p
LEFT JOIN order_items oi ON oi.product_id = p.id
WHERE oi.id IS NULL;
```

`LEFT JOIN` giữ mọi sản phẩm; những sản phẩm không khớp có cột bên phải là `NULL`, ta lọc đúng chúng. Đây là câu hỏi hay gặp: khách chưa mua, mặt hàng chưa bán, người dùng chưa kích hoạt.

## Semi-join: "có ít nhất một khớp"

Chỉ cần biết *có tồn tại* bản ghi khớp, không cần các cột của nó. Dùng `EXISTS` (bài sau) thay vì `JOIN` để tránh nhân đôi dòng khi có nhiều khớp.

## Self-join: nối bảng với chính nó

Dùng hai bí danh cho cùng một bảng: cặp khách cùng thành phố, nhân viên với **quản lý** của họ (cột `manager_id`).

```sql
JOIN customers b ON a.city = b.city AND a.id < b.id
```

`a.id < b.id` loại cặp (A, A) và tránh lặp (A, B) rồi (B, A).

![Anti-join, semi-join và self-join](/lessons/sql/18-advanced-joins-fig-vi.svg)
*Anti-join, semi-join và self-join*

## Cross join: tích Descartes

Mọi tổ hợp của hai tập (m × n dòng). Hữu ích để dựng **khung đầy đủ** (mọi tháng × mọi sản phẩm) rồi `LEFT JOIN` dữ liệu thật vào, nhờ đó các ô không có dữ liệu hiện ra thay vì biến mất. Cẩn thận kích thước: bảng 10.000 dòng cross join chính nó cho 100 triệu dòng.

## Nối theo điều kiện không phải bằng

`ON` có thể dùng `<`, `BETWEEN`: nối sự kiện với **khoảng khuyến mãi** (`order_date BETWEEN start AND end`), hoặc tra bậc thuế theo ngưỡng.

## Nguồn tham khảo

- Beaulieu, A. *Learning SQL*, chương 5 và 10 (Joins).
- Celko, J. *SQL for Smarties* (Morgan Kaufmann).
- SQLite documentation, "SELECT: join clauses", sqlite.org.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

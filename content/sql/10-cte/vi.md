# CTE: truy vấn viết theo từng bước

**CTE** (Common Table Expression) cho phép bạn **đặt tên cho một truy vấn con** và dùng nó như một bảng tạm ở phần còn lại. Nó biến truy vấn rối rắm thành các **bước đọc từ trên xuống**.

## Cú pháp

```sql
WITH order_totals AS (
  SELECT oi.order_id, SUM(oi.quantity * p.price) AS total
  FROM order_items oi
  JOIN products p ON p.id = oi.product_id
  GROUP BY oi.order_id
)
SELECT order_id, total
FROM order_totals
WHERE total > 5000000;
```

- `WITH tên AS ( truy vấn )` định nghĩa CTE.
- Câu `SELECT` chính phía sau dùng `tên` như một bảng.
- CTE **chỉ tồn tại trong câu lệnh đó**, không lưu lại gì.

## Nhiều CTE nối tiếp

Cách nhau bằng dấu phẩy; CTE sau **dùng được** CTE trước:

```sql
WITH order_totals AS (
  SELECT oi.order_id, SUM(oi.quantity * p.price) AS total
  FROM order_items oi JOIN products p ON p.id = oi.product_id
  GROUP BY oi.order_id
),
customer_spend AS (
  SELECT o.customer_id, SUM(t.total) AS spent
  FROM orders o JOIN order_totals t ON t.order_id = o.id
  GROUP BY o.customer_id
)
SELECT c.name, cs.spent
FROM customer_spend cs
JOIN customers c ON c.id = cs.customer_id
ORDER BY cs.spent DESC;
```

Mỗi CTE là **một bước có tên**: "tổng mỗi đơn" → "chi tiêu mỗi khách" → "gắn tên". Dễ đọc, dễ kiểm tra từng bước (chạy riêng phần `SELECT * FROM order_totals`).

## Vì sao dùng CTE thay subquery?

| Subquery lồng | CTE |
|---|---|
| Đọc từ trong ra ngoài, khó theo dõi | Đọc từ trên xuống như văn bản |
| Phải lặp lại nếu dùng hai lần | Đặt tên một lần, dùng nhiều lần |
| Khó gỡ lỗi | Chạy thử từng bước |

## CTE đệ quy

Dùng cho dữ liệu dạng **cây** (sơ đồ tổ chức, danh mục lồng nhau) hoặc sinh dãy số:

```sql
WITH RECURSIVE counter(n) AS (
  SELECT 1                         -- phần gốc
  UNION ALL
  SELECT n + 1 FROM counter        -- phần đệ quy tự gọi chính nó
  WHERE n < 5                      -- điều kiện dừng!
)
SELECT n FROM counter;             -- 1, 2, 3, 4, 5
```

Cấp bậc quản lý trong `employees`:

```sql
WITH RECURSIVE chain AS (
  SELECT id, name, manager_id, 0 AS level FROM employees WHERE manager_id IS NULL
  UNION ALL
  SELECT e.id, e.name, e.manager_id, c.level + 1
  FROM employees e JOIN chain c ON e.manager_id = c.id
)
SELECT name, level FROM chain ORDER BY level, name;
```

> Luôn có **điều kiện dừng** cho đệ quy, nếu không truy vấn chạy mãi. Nếu khung kết quả "đơ", bấm **Dừng**.

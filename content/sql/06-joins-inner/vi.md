# JOIN: kết hợp nhiều bảng

Trong cơ sở dữ liệu quan hệ, dữ liệu được **chia thành nhiều bảng** để không lặp lại. Bảng `orders` chỉ lưu `customer_id`, còn tên khách nằm ở `customers`. Để thấy cả hai, ta **JOIN**.

## Khoá chính và khoá ngoại

- **Khoá chính** (primary key): cột định danh duy nhất mỗi dòng (`customers.id`).
- **Khoá ngoại** (foreign key): cột trỏ tới khoá chính của bảng khác (`orders.customer_id` → `customers.id`).

```text
customers          orders
┌────┬─────────┐   ┌────┬─────────────┬────────────┐
│ id │ name    │   │ id │ customer_id │ order_date │
├────┼─────────┤   ├────┼─────────────┼────────────┤
│  1 │ An      │◄──│  1 │      1      │ 2024-08-01 │
│  2 │ Binh    │◄──│  3 │      2      │ 2024-08-03 │
└────┴─────────┘   └────┴─────────────┴────────────┘
```

## INNER JOIN

```sql
SELECT o.id AS order_id, c.name AS customer, o.order_date
FROM orders AS o
JOIN customers AS c ON c.id = o.customer_id;
```

- `JOIN` (= `INNER JOIN`): giữ các cặp dòng **khớp điều kiện** `ON`.
- **Bí danh bảng** (`o`, `c`) giúp gõ ngắn và phân biệt cột trùng tên (`o.id` khác `c.id`).
- Dòng **không khớp** ở một trong hai bảng sẽ **bị loại**.

Mỗi dòng của `orders` ghép với **đúng một** khách hàng, nên kết quả có 14 dòng, bằng số đơn.

## Nối nhiều hơn hai bảng

Cứ thêm `JOIN` nối tiếp:

```sql
SELECT o.id, c.name AS customer, p.name AS product, oi.quantity
FROM order_items AS oi
JOIN orders    AS o ON o.id = oi.order_id
JOIN customers AS c ON c.id = o.customer_id
JOIN products  AS p ON p.id = oi.product_id;
```

## Kết hợp với WHERE, GROUP BY

```sql
-- Doanh thu theo từng khách hàng
SELECT c.name, SUM(oi.quantity * p.price) AS revenue
FROM customers c
JOIN orders o       ON o.customer_id = c.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p     ON p.id = oi.product_id
GROUP BY c.name
ORDER BY revenue DESC;
```

## Lỗi hay gặp

| Lỗi | Hậu quả |
|---|---|
| Quên điều kiện `ON` | Ra **tích Descartes** (mọi cặp dòng): hàng nghìn dòng vô nghĩa |
| Cột trùng tên không có tiền tố bảng | `ambiguous column name` |
| Điều kiện `ON` sai cột | Kết quả ít hơn mong đợi |

> **Mẹo:** nếu số dòng kết quả khác mong đợi, hãy đếm `COUNT(*)` từng bảng và kiểm tra **mối quan hệ** (một-nhiều: số dòng bằng bảng "nhiều").

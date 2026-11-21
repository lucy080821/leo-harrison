# LEFT JOIN và self-join

`INNER JOIN` **loại** dòng không khớp. Đôi khi bạn lại muốn **giữ lại** chúng.

## LEFT JOIN

Giữ **mọi dòng của bảng bên trái**; nếu không có dòng khớp ở bảng phải, các cột bên phải là `NULL`.

```sql
SELECT c.name, o.id AS order_id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id;
```

| name | order_id |
|---|---|
| An Nguyen | 1 |
| An Nguyen | 2 |
| ... | ... |
| Em Hoang | **NULL** |
| Hoa Bui | **NULL** |

Em Hoang và Hoa Bui chưa đặt hàng nên vẫn xuất hiện, với `order_id = NULL`.

## Mẫu "anti-join": tìm dòng KHÔNG có quan hệ

`LEFT JOIN` rồi lọc `IS NULL` ở bảng phải cho ra **những dòng bên trái không có đối ứng**:

```sql
SELECT c.name
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id
WHERE o.id IS NULL;                 -- khách chưa mua gì
```

Hay dùng để tìm: khách chưa mua, sản phẩm chưa bán, nhân viên chưa có phòng ban...

## Các loại JOIN

| JOIN | Giữ lại |
|---|---|
| `INNER JOIN` | Chỉ cặp **khớp ở cả hai** bảng |
| `LEFT JOIN` | **Mọi dòng bảng trái** + phần khớp của bảng phải |
| `RIGHT JOIN` | Mọi dòng bảng phải (SQLite mới hỗ trợ; có thể đổi chỗ hai bảng rồi dùng LEFT) |
| `FULL OUTER JOIN` | Mọi dòng cả hai bảng (SQLite mới hỗ trợ) |
| `CROSS JOIN` | Mọi cặp có thể (tích Descartes) |

## Cẩn thận: điều kiện nằm ở `ON` hay `WHERE`?

Với `LEFT JOIN`, lọc trên **bảng phải** trong `WHERE` sẽ **vô tình biến nó thành INNER JOIN** (vì dòng NULL bị loại). Nếu muốn lọc mà vẫn giữ dòng bên trái, đặt điều kiện vào **`ON`**:

```sql
-- Mọi khách; chỉ ghép đơn đã hoàn thành
SELECT c.name, o.id
FROM customers c
LEFT JOIN orders o ON o.customer_id = c.id AND o.status = 'completed';
```

## Self-join: nối bảng với chính nó

Khi bảng có cột trỏ về **chính nó** (ví dụ `employees.manager_id` trỏ tới `employees.id`), hãy dùng **hai bí danh** cho cùng một bảng:

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON m.id = e.manager_id;
```

`LEFT JOIN` ở đây để người đứng đầu (không có quản lý) vẫn xuất hiện.

## UNION: nối kết quả theo chiều dọc

```sql
SELECT name FROM customers
UNION                         -- loại trùng; UNION ALL giữ trùng
SELECT name FROM employees;
```

Hai truy vấn phải có **cùng số cột** với kiểu tương thích.

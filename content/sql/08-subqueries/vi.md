# Truy vấn con (Subquery)

**Truy vấn con** là một câu `SELECT` **nằm bên trong** câu lệnh khác, đặt trong ngoặc `( )`. Nó giải quyết những bài toán "trả lời câu hỏi này trước, rồi dùng kết quả để trả lời câu hỏi kia".

## Subquery trả về một giá trị

Dùng được ở bất cứ chỗ nào cần **một giá trị**:

```sql
-- Sản phẩm đắt hơn mức trung bình
SELECT name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);
```

Cơ sở dữ liệu tính `AVG(price)` trước (một con số), rồi dùng nó trong `WHERE`. Bạn **không thể** viết `WHERE price > AVG(price)` trực tiếp vì `WHERE` chạy trước khi có hàm tổng hợp.

![Truy vấn con chạy trước, kết quả đưa cho truy vấn ngoài](/lessons/sql/08-subqueries-fig-vi.svg)
*Truy vấn con chạy trước, kết quả đưa cho truy vấn ngoài*

## Subquery trả về một danh sách: IN

```sql
SELECT name
FROM customers
WHERE id IN (SELECT customer_id FROM orders);       -- khách đã mua hàng

SELECT name
FROM customers
WHERE id NOT IN (SELECT customer_id FROM orders);   -- khách chưa mua
```

> **Cẩn thận `NOT IN`:** nếu danh sách trả về chứa `NULL`, `NOT IN` sẽ không khớp dòng nào. Dùng `NOT EXISTS` hoặc `LEFT JOIN ... IS NULL` an toàn hơn.

## EXISTS: có tồn tại dòng nào không?

```sql
SELECT c.name
FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);
```

Đây là **subquery tương quan** (correlated): truy vấn con tham chiếu đến `c` của truy vấn ngoài, nên được chạy **lại cho mỗi khách hàng**. `EXISTS` chỉ quan tâm "có hay không", nên thường nhanh.

## Subquery trong SELECT

Trả về **một giá trị cho mỗi dòng**:

```sql
SELECT c.name,
       (SELECT COUNT(*) FROM orders o WHERE o.customer_id = c.id) AS num_orders
FROM customers c;
```

## Subquery trong FROM (bảng dẫn xuất)

Coi kết quả của truy vấn con như một **bảng tạm** (bắt buộc đặt bí danh):

```sql
SELECT AVG(n) AS avg_orders_per_customer
FROM (
  SELECT customer_id, COUNT(*) AS n
  FROM orders
  GROUP BY customer_id
) AS per_customer;
```

## Subquery hay JOIN?

Nhiều bài toán giải được bằng cả hai. Hãy ưu tiên cách **dễ đọc**. Khi truy vấn con lồng sâu thành khó hiểu, hãy chuyển sang **CTE** (bài sau) để viết tuần tự từng bước.

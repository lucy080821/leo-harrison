# Hàm tổng hợp

**Hàm tổng hợp** (aggregate) gom **nhiều dòng thành một giá trị**: đếm, cộng, trung bình, lớn nhất, nhỏ nhất.

| Hàm | Ý nghĩa |
|---|---|
| `COUNT(*)` | Đếm **số dòng** |
| `COUNT(cột)` | Đếm số dòng mà `cột` **không NULL** |
| `COUNT(DISTINCT cột)` | Đếm số giá trị **khác nhau** |
| `SUM(cột)` | Tổng |
| `AVG(cột)` | Trung bình |
| `MIN(cột)`, `MAX(cột)` | Nhỏ nhất, lớn nhất |

```sql
SELECT
  COUNT(*)   AS num_products,
  MIN(price) AS cheapest,
  MAX(price) AS priciest,
  AVG(price) AS avg_price,
  SUM(stock) AS total_stock
FROM products;
```

Kết quả chỉ có **một dòng**, vì mọi dòng đã được gom lại.

## Kết hợp với WHERE

`WHERE` lọc **trước**, rồi mới tổng hợp trên các dòng còn lại:

```sql
SELECT COUNT(*) FROM orders WHERE status = 'completed';
SELECT AVG(price) FROM products WHERE category = 'Electronics';
```

## Tính toán bên trong hàm

```sql
SELECT SUM(price * stock) AS inventory_value FROM products;   -- tổng giá trị kho
```

Trung bình có công thức quen thuộc: $\text{AVG} = \dfrac{\text{SUM}}{\text{COUNT}}$ (trên các giá trị không NULL).

## NULL bị bỏ qua

Mọi hàm tổng hợp (trừ `COUNT(*)`) **bỏ qua NULL**:

```sql
SELECT COUNT(*) AS all_rows, COUNT(email) AS has_email FROM customers;
-- all_rows = 8, has_email = 7  (Em Hoang không có email)
```

## COUNT(DISTINCT)

```sql
SELECT COUNT(DISTINCT city) AS num_cities FROM customers;   -- 5
```

## Lỗi hay gặp

Không trộn **cột thường** với **hàm tổng hợp** trong cùng `SELECT` mà không có `GROUP BY` (bài sau):

```sql
SELECT name, MAX(price) FROM products;   -- ý nghĩa mơ hồ, đừng làm
```

Hãy dùng `GROUP BY`, hoặc `ORDER BY price DESC LIMIT 1` nếu cần "sản phẩm đắt nhất".

## Làm tròn

```sql
SELECT ROUND(AVG(price), 2) FROM products;     -- làm tròn 2 chữ số thập phân
```

# GROUP BY và HAVING

Hàm tổng hợp cho **một** kết quả cho cả bảng. Muốn kết quả **theo từng nhóm** (mỗi thành phố, mỗi nhóm sản phẩm...), dùng `GROUP BY`.

## GROUP BY

```sql
SELECT city, COUNT(*) AS num_customers
FROM customers
GROUP BY city;
```

| city | num_customers |
|---|---|
| Hanoi | 3 |
| Ho Chi Minh | 2 |
| Da Nang | 1 |
| ... | ... |

Cơ sở dữ liệu **chia các dòng thành nhóm** theo giá trị của `city`, rồi chạy hàm tổng hợp **trong từng nhóm**.

**Quy tắc vàng:** mọi cột trong `SELECT` phải **hoặc** nằm trong `GROUP BY`, **hoặc** nằm trong một hàm tổng hợp.

```sql
SELECT category, COUNT(*) AS n, AVG(price) AS avg_price, MAX(price) AS top_price
FROM products
GROUP BY category;
```

Nhóm theo **nhiều cột**: `GROUP BY category, city` (mỗi cặp giá trị là một nhóm).

## HAVING: lọc các nhóm

- `WHERE` lọc **dòng**, chạy **trước** khi nhóm.
- `HAVING` lọc **nhóm**, chạy **sau** khi nhóm, nên dùng được hàm tổng hợp.

```sql
SELECT category, COUNT(*) AS n
FROM products
GROUP BY category
HAVING COUNT(*) > 2;          -- chỉ giữ nhóm có hơn 2 sản phẩm
```

Kết hợp cả hai:

```sql
SELECT category, AVG(price) AS avg_price
FROM products
WHERE stock > 0                -- 1) loại sản phẩm hết hàng (lọc DÒNG)
GROUP BY category              -- 2) nhóm
HAVING AVG(price) > 1000000    -- 3) lọc NHÓM
ORDER BY avg_price DESC;       -- 4) sắp xếp
```

## Thứ tự thực thi (quan trọng!)

```text
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT
```

Vì `WHERE` chạy trước khi có nhóm nên **không thể** viết `WHERE COUNT(*) > 2`. Điều kiện trên kết quả tổng hợp phải để ở `HAVING`.

## Mẫu thường dùng

**Top N theo nhóm:**

```sql
SELECT city, COUNT(*) AS n
FROM customers
GROUP BY city
ORDER BY n DESC
LIMIT 3;
```

**Tìm giá trị bị trùng** (lỗi dữ liệu):

```sql
SELECT email, COUNT(*) FROM customers GROUP BY email HAVING COUNT(*) > 1;
```

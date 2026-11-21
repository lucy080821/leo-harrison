# Sắp xếp, giới hạn và loại trùng

## ORDER BY: sắp xếp kết quả

```sql
SELECT name, price FROM products ORDER BY price;          -- tăng dần (mặc định)
SELECT name, price FROM products ORDER BY price DESC;     -- giảm dần
```

- `ASC` = tăng dần (mặc định), `DESC` = giảm dần.
- Sắp theo **nhiều cột**: cột sau chỉ dùng khi cột trước **bằng nhau**.

```sql
SELECT name, category, price
FROM products
ORDER BY category ASC, price DESC;    -- theo nhóm A→Z, trong nhóm đắt trước
```

`ORDER BY` luôn nằm **gần cuối** câu lệnh. Bạn có thể sắp theo bí danh hoặc theo vị trí cột (`ORDER BY 2`), nhưng nên dùng tên cho rõ.

Với `NULL`: trong SQLite, `NULL` được coi là **nhỏ nhất** (đứng đầu khi `ASC`).

## LIMIT và OFFSET: lấy một phần

```sql
SELECT name FROM products ORDER BY price DESC LIMIT 3;            -- 3 dòng đầu
SELECT name FROM products ORDER BY price DESC LIMIT 3 OFFSET 3;   -- bỏ 3 dòng đầu, lấy 3 dòng tiếp
```

Đây là cơ sở của **phân trang**: trang $n$ (mỗi trang $k$ dòng) dùng `LIMIT k OFFSET (n-1)*k`.

> **Luôn kèm `ORDER BY` khi dùng `LIMIT`**, nếu không "3 dòng đầu" là 3 dòng bất kỳ.

## DISTINCT: loại dòng trùng

```sql
SELECT city FROM customers;                  -- Hanoi lặp 3 lần
SELECT DISTINCT city FROM customers;         -- mỗi thành phố một lần
SELECT DISTINCT city, category ...           -- DISTINCT áp dụng cho CẶP cột
```

## Thứ tự viết các mệnh đề

```sql
SELECT   ...
FROM     ...
WHERE    ...
ORDER BY ...
LIMIT    ...;
```

Thứ tự **thực thi** của cơ sở dữ liệu thì khác: `FROM` → `WHERE` → (nhóm, bài sau) → `SELECT` → `ORDER BY` → `LIMIT`. Vì vậy `ORDER BY` dùng được bí danh khai báo ở `SELECT`, còn `WHERE` thì không.

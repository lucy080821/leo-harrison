# CASE, NULL và hàm tiện ích

## CASE: điều kiện trong SQL

`CASE` là "if/else" trong câu truy vấn, tạo ra **giá trị mới theo điều kiện**.

```sql
SELECT name, price,
  CASE
    WHEN price >= 5000000 THEN 'premium'
    WHEN price >= 1000000 THEN 'standard'
    ELSE 'budget'
  END AS tier
FROM products;
```

- Các `WHEN` được xét **từ trên xuống**, nhánh đúng đầu tiên thắng.
- Không có `ELSE` mà không nhánh nào đúng thì kết quả là `NULL`.
- Rất hợp để **gộp nhóm** và **đếm có điều kiện**:

```sql
SELECT
  SUM(CASE WHEN status = 'completed' THEN 1 ELSE 0 END) AS completed,
  SUM(CASE WHEN status = 'pending'   THEN 1 ELSE 0 END) AS pending
FROM orders;
```

## Xử lý NULL

```sql
COALESCE(email, 'no email')     -- giá trị đầu tiên KHÔNG NULL trong danh sách
NULLIF(a, b)                    -- trả NULL nếu a = b (hay dùng tránh chia cho 0)
IFNULL(x, 0)                    -- rút gọn COALESCE hai tham số (SQLite/MySQL)
```

Ví dụ tránh lỗi chia cho 0: `total / NULLIF(count, 0)`.

## Hàm chuỗi

| Hàm | Ví dụ → kết quả |
|---|---|
| `UPPER(s)`, `LOWER(s)` | `UPPER('abc')` → `ABC` |
| `LENGTH(s)` | `LENGTH('hello')` → `5` |
| `SUBSTR(s, bắt_đầu, độ_dài)` | `SUBSTR('abcdef', 2, 3)` → `bcd` |
| `TRIM(s)` | Bỏ khoảng trắng hai đầu |
| `REPLACE(s, a, b)` | Thay `a` bằng `b` |
| `s1 \|\| s2` | Nối chuỗi |
| `INSTR(s, sub)` | Vị trí của `sub` trong `s` (0 nếu không có) |

## Hàm số

```sql
ROUND(3.14159, 2)    -- 3.14
ABS(-5)              -- 5
price * 1.1          -- phép tính thường
CAST(price AS REAL) / 1000
```

Chia hai số nguyên trong SQLite là **chia nguyên**: `7 / 2 = 3`. Muốn ra số thập phân, nhân với `1.0`: `7 * 1.0 / 2 = 3.5`.

## Ngày giờ (SQLite)

Ngày lưu dạng chữ `'YYYY-MM-DD'`.

```sql
DATE('now')                              -- ngày hôm nay
strftime('%Y-%m', order_date)            -- '2024-08' (gom theo tháng)
strftime('%Y', order_date)               -- năm
strftime('%w', order_date)               -- thứ trong tuần (0 = Chủ nhật)
DATE(order_date, '+7 days')              -- cộng thêm 7 ngày
julianday('2024-09-01') - julianday('2024-08-01')   -- số ngày chênh lệch: 31
```

```sql
-- Số đơn theo tháng
SELECT strftime('%Y-%m', order_date) AS month, COUNT(*) AS orders
FROM orders
GROUP BY month
ORDER BY month;
```

> Mỗi hệ quản trị (MySQL, PostgreSQL, SQL Server) có tên hàm ngày giờ **khác nhau** (`DATE_FORMAT`, `DATE_TRUNC`, `FORMAT`...), nhưng ý tưởng giống hệt.

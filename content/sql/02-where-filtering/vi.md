# Lọc dữ liệu với WHERE

`WHERE` giữ lại **chỉ những dòng thoả điều kiện**.

```sql
SELECT name, city
FROM customers
WHERE city = 'Hanoi';
```

> Trong SQL, chuỗi nằm trong **dấu nháy đơn** `'...'` (nháy kép dành cho tên cột/bảng). So sánh bằng chỉ dùng **một** dấu `=`.

## Toán tử so sánh

| Toán tử | Ý nghĩa |
|---|---|
| `=` , `<>` (hoặc `!=`) | Bằng, khác |
| `<`, `<=`, `>`, `>=` | Nhỏ hơn, lớn hơn |
| `BETWEEN a AND b` | Trong khoảng, **gồm cả hai đầu** |
| `IN (a, b, c)` | Thuộc một trong các giá trị |
| `LIKE 'mẫu'` | Khớp mẫu chuỗi |
| `IS NULL`, `IS NOT NULL` | Có/không có giá trị |

```sql
SELECT * FROM products WHERE price BETWEEN 1000000 AND 5000000;
SELECT * FROM products WHERE category IN ('Furniture', 'Stationery');
```

## Kết hợp điều kiện: AND, OR, NOT

```sql
SELECT name, price FROM products
WHERE category = 'Electronics' AND price < 5000000;

SELECT name FROM customers
WHERE city = 'Hanoi' OR city = 'Hue';

SELECT name FROM customers WHERE NOT city = 'Hanoi';
```

`AND` được tính **trước** `OR`. Khi trộn cả hai, luôn dùng **ngoặc** cho rõ:

```sql
WHERE category = 'Furniture' AND (price < 500000 OR stock = 0)
```

## LIKE: tìm theo mẫu chuỗi

| Ký tự | Nghĩa |
|---|---|
| `%` | Chuỗi bất kỳ (kể cả rỗng) |
| `_` | Đúng **một** ký tự |

```sql
SELECT name FROM customers WHERE name LIKE 'P%';      -- bắt đầu bằng P
SELECT name FROM customers WHERE name LIKE '%Nguyen'; -- kết thúc bằng Nguyen
SELECT name FROM products  WHERE name LIKE '_en';     -- Pen
```

Với SQLite, `LIKE` mặc định **không phân biệt hoa thường** cho chữ ASCII.

## NULL: giá trị "không biết"

`NULL` nghĩa là **không có dữ liệu**, **không phải** số 0 hay chuỗi rỗng. So sánh với `NULL` bằng `=` luôn cho kết quả không xác định, nên bắt buộc dùng `IS NULL`:

```sql
SELECT name FROM customers WHERE email IS NULL;       -- ĐÚNG
SELECT name FROM customers WHERE email = NULL;        -- SAI: không trả dòng nào
```

Cũng vì vậy `NOT IN` với danh sách chứa `NULL` có thể cho kết quả bất ngờ: cẩn thận khi dùng.

## Mẹo

- Thử điều kiện từng bước: viết `SELECT *` rồi thêm dần `WHERE`.
- So sánh ngày dạng chữ `'YYYY-MM-DD'` hoạt động đúng nhờ thứ tự chữ cái: `WHERE order_date >= '2024-09-01'`.

# Tạo bảng, ràng buộc, chỉ mục và view

Nhóm lệnh định nghĩa cấu trúc dữ liệu gọi là **DDL** (Data Definition Language): `CREATE`, `ALTER`, `DROP`.

## CREATE TABLE

```sql
CREATE TABLE reviews (
  id         INTEGER PRIMARY KEY,
  product_id INTEGER NOT NULL REFERENCES products(id),
  rating     INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment    TEXT DEFAULT ''
);
```

Mỗi cột có **tên**, **kiểu dữ liệu** và các **ràng buộc**.

![Bảng với ràng buộc và chỉ mục](/lessons/sql/13-create-table-constraints-fig-vi.svg)
*Bảng với ràng buộc và chỉ mục*

## Kiểu dữ liệu

SQLite có kiểu **linh hoạt**; các nhóm chính:

| Kiểu | Dùng cho |
|---|---|
| `INTEGER` | Số nguyên |
| `REAL` | Số thực |
| `TEXT` | Chuỗi (kể cả ngày `'YYYY-MM-DD'`) |
| `BLOB` | Dữ liệu nhị phân |

Các CSDL khác (PostgreSQL, MySQL) có thêm nhiều kiểu chặt chẽ: `VARCHAR(100)`, `DECIMAL(10,2)`, `DATE`, `BOOLEAN`, `TIMESTAMP`... Tiền bạc **nên** dùng `DECIMAL` hoặc lưu số nguyên theo đơn vị nhỏ nhất, **không** dùng số thực.

## Ràng buộc (constraint)

Ràng buộc là **luật bảo vệ dữ liệu**: CSDL từ chối dòng vi phạm.

| Ràng buộc | Ý nghĩa |
|---|---|
| `PRIMARY KEY` | Định danh duy nhất, không NULL |
| `NOT NULL` | Bắt buộc có giá trị |
| `UNIQUE` | Không được trùng (ví dụ `email`) |
| `DEFAULT x` | Giá trị mặc định khi bỏ trống |
| `CHECK (điều kiện)` | Phải thoả điều kiện |
| `FOREIGN KEY` / `REFERENCES` | Phải trỏ tới dòng có thật ở bảng khác |

```sql
INSERT INTO reviews (product_id, rating) VALUES (1, 9);
-- Lỗi: CHECK constraint failed: rating BETWEEN 1 AND 5
```

> Ràng buộc là **hàng rào cuối cùng** bảo vệ dữ liệu, dù ứng dụng có lỗi. Hãy đặt chúng ở CSDL chứ đừng chỉ kiểm tra trong code.

Với SQLite, khoá ngoại chỉ được thực thi khi bật `PRAGMA foreign_keys = ON;` (MySQL/PostgreSQL luôn thực thi).

## ALTER và DROP

```sql
ALTER TABLE customers ADD COLUMN phone TEXT;
ALTER TABLE customers RENAME COLUMN phone TO mobile;
DROP TABLE reviews;                 -- XOÁ HẲN bảng và dữ liệu
DROP TABLE IF EXISTS reviews;
```

## Chỉ mục (INDEX): tìm nhanh hơn

Không có chỉ mục, tìm `WHERE customer_id = 3` phải **quét cả bảng**. Chỉ mục giống **mục lục sách**: nhảy thẳng tới chỗ cần.

```sql
CREATE INDEX idx_orders_customer ON orders(customer_id);
CREATE UNIQUE INDEX idx_customers_email ON customers(email);
```

- Nên đánh chỉ mục cho cột hay dùng trong `WHERE`, `JOIN`, `ORDER BY`.
- Đổi lại, chỉ mục tốn **dung lượng** và làm lệnh ghi **chậm hơn một chút**: đừng đánh bừa.
- Xem cách chạy: `EXPLAIN QUERY PLAN SELECT ...`.

## VIEW: truy vấn lưu sẵn

```sql
CREATE VIEW completed_orders AS
SELECT * FROM orders WHERE status = 'completed';

SELECT COUNT(*) FROM completed_orders;     -- dùng như một bảng
```

View **không lưu dữ liệu**, mỗi lần dùng nó chạy lại truy vấn gốc. Dùng để **đơn giản hoá** truy vấn phức tạp và **giới hạn quyền xem** (ẩn cột nhạy cảm).

# INSERT, UPDATE, DELETE

Đến giờ bạn mới **đọc** dữ liệu. Bài này dạy **ghi**: thêm, sửa, xoá. Nhóm lệnh này gọi là **DML** (Data Manipulation Language).

> Trong khung thực hành, mỗi lần chạy **nạp lại CSDL mẫu từ đầu**, nên bạn thoải mái thử mà không sợ làm hỏng. Trên CSDL thật mọi thay đổi là **vĩnh viễn**.

## INSERT: thêm dòng

```sql
INSERT INTO customers (id, name, email, city, joined_date)
VALUES (9, 'Khanh Ly', 'khanh@example.com', 'Hue', '2024-08-01');
```

- Liệt kê **tên cột** rồi các **giá trị** tương ứng theo thứ tự.
- Cột bỏ qua sẽ nhận **giá trị mặc định** hoặc `NULL`.
- Thêm **nhiều dòng một lệnh**:

```sql
INSERT INTO customers (id, name, city) VALUES
  (10, 'Lan Anh', 'Hanoi'),
  (11, 'Minh Quan', 'Da Nang');
```

- Cột `INTEGER PRIMARY KEY` có thể **tự tăng**: bỏ qua `id` và để CSDL tự điền.
- Thêm từ kết quả truy vấn: `INSERT INTO archive SELECT * FROM orders WHERE status = 'completed';`

![Ba lệnh thay đổi dữ liệu](/lessons/sql/12-insert-update-delete-fig-vi.svg)
*Ba lệnh thay đổi dữ liệu*

## UPDATE: sửa dòng

```sql
UPDATE products
SET price = price * 1.1, stock = stock - 5
WHERE category = 'Furniture';
```

## DELETE: xoá dòng

```sql
DELETE FROM products WHERE stock = 0;
```

## ⚠️ QUY TẮC SỐNG CÒN: luôn có WHERE

```sql
UPDATE products SET price = 0;      -- GIÁ MỌI SẢN PHẨM = 0 !!!
DELETE FROM customers;              -- XOÁ SẠCH BẢNG !!!
```

Quên `WHERE` là một trong những sự cố dữ liệu phổ biến nhất. Thói quen an toàn:

1. Viết **`SELECT` trước** với đúng điều kiện `WHERE` để xem dòng nào sẽ bị ảnh hưởng.
2. Khi đã đúng, đổi `SELECT ...` thành `UPDATE`/`DELETE` giữ nguyên `WHERE`.
3. Trên hệ thống thật, bọc trong **giao dịch** (transaction) để hoàn tác nếu sai.

## Giao dịch (transaction)

Nhóm nhiều lệnh thành **một khối tất cả-hoặc-không-gì**:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;        -- lưu cả hai; hoặc ROLLBACK; để huỷ cả hai
```

Nếu lỗi giữa chừng, `ROLLBACK` trả mọi thứ về như cũ. Đây là một phần của tính chất **ACID**, nền tảng của các CSDL tin cậy (chuyển tiền không thể trừ bên này mà quên cộng bên kia).

## Ràng buộc bảo vệ dữ liệu

`NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `CHECK` sẽ **chặn** lệnh ghi sai (bài sau). Ví dụ thêm hai khách cùng `id` sẽ báo lỗi `UNIQUE constraint failed`.

## Thay thế hoặc bỏ qua khi trùng

```sql
INSERT OR IGNORE INTO customers (id, name) VALUES (1, 'X');   -- bỏ qua nếu trùng khoá
INSERT OR REPLACE INTO customers (id, name) VALUES (1, 'X');  -- ghi đè dòng cũ
```

# View, trigger và ràng buộc ở mức CSDL

Quy tắc nghiệp vụ nên **nằm gần dữ liệu**, nơi mọi ứng dụng đều phải tuân theo, thay vì lặp lại ở từng chương trình.

## View: truy vấn được đặt tên

```sql
CREATE VIEW v_customer_revenue AS SELECT … ;
SELECT * FROM v_customer_revenue;    -- dùng như một bảng
```

View **không lưu dữ liệu** (chạy lại truy vấn mỗi lần). Lợi ích: **đơn giản hoá** truy vấn phức tạp, **một định nghĩa duy nhất** cho "doanh thu" hay "khách hoạt động", và **che cột nhạy cảm** (cấp quyền trên view thay vì bảng). **Materialized view** (PostgreSQL, BigQuery) *lưu* kết quả để đọc nhanh, đổi lại phải làm mới.

## Trigger: tự chạy khi dữ liệu đổi

```sql
CREATE TRIGGER trg AFTER UPDATE OF price ON products
BEGIN INSERT INTO price_log VALUES (OLD.id, OLD.price, NEW.price); END;
```

`BEFORE/AFTER` × `INSERT/UPDATE/DELETE`; trong thân dùng `OLD.cot` và `NEW.cot`. Ứng dụng: **nhật ký kiểm toán** (ai đổi gì, khi nào), giữ cột tổng hợp, từ chối thay đổi không hợp lệ.

![View lưu sẵn câu truy vấn; trigger tự chạy khi dữ liệu đổi](/lessons/sql/35-views-triggers-fig-vi.svg)
*View lưu sẵn câu truy vấn; trigger tự chạy khi dữ liệu đổi*

> **Dùng có chừng mực:** trigger là logic "ẩn", khó gỡ lỗi và có thể làm chậm ghi. Ưu tiên ràng buộc khai báo khi đủ dùng.

## Ràng buộc khai báo

`NOT NULL`, `UNIQUE`, `PRIMARY KEY`, `FOREIGN KEY`, `CHECK (price >= 0)`: CSDL **từ chối** dữ liệu sai ngay từ đầu, mạnh hơn kiểm tra sau.

## Nguồn tham khảo

- SQLite documentation, "CREATE VIEW", "CREATE TRIGGER", sqlite.org.
- PostgreSQL documentation, "Materialized Views".
- Date, C. J. *An Introduction to Database Systems* (ràng buộc toàn vẹn).

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

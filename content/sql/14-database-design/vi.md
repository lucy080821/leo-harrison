# Thiết kế cơ sở dữ liệu

Thiết kế tốt giúp dữ liệu **nhất quán, không lặp, dễ mở rộng**. Thiết kế dở dẫn đến lỗi và truy vấn đau đầu mãi về sau.

## Các bước

1. **Liệt kê "thực thể"** (danh từ): khách hàng, sản phẩm, đơn hàng...
2. Mỗi thực thể thành **một bảng**; mỗi thuộc tính thành **một cột**.
3. Mỗi bảng có **khoá chính**.
4. Xác định **quan hệ** giữa các bảng và biểu diễn bằng **khoá ngoại**.
5. **Chuẩn hoá** để loại dữ liệu lặp.

## Ba loại quan hệ

### Một - nhiều (1-n): phổ biến nhất

Một tác giả có **nhiều** sách; mỗi sách thuộc **một** tác giả. Đặt **khoá ngoại ở phía "nhiều"**:

```sql
CREATE TABLE authors (id INTEGER PRIMARY KEY, name TEXT NOT NULL);
CREATE TABLE books (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER NOT NULL REFERENCES authors(id)
);
```

```text
authors 1 ───────< n books
```

### Nhiều - nhiều (n-n): cần bảng nối

Một sinh viên học **nhiều** khoá; một khoá có **nhiều** sinh viên. Không thể nhét khoá ngoại vào một bảng, ta tạo **bảng nối** (junction/bridge table):

```sql
CREATE TABLE enrollments (
  student_id INTEGER NOT NULL REFERENCES students(id),
  course_id  INTEGER NOT NULL REFERENCES courses(id),
  PRIMARY KEY (student_id, course_id)       -- khoá chính GHÉP: chặn ghi danh trùng
);
```

```text
students 1 ──< enrollments >── 1 courses
```

Trong khoá này, `order_items` cũng là bảng nối giữa `orders` và `products` (kèm thêm cột `quantity`).

### Một - một (1-1)

Hiếm gặp: tách thông tin ít dùng hoặc nhạy cảm sang bảng riêng, khoá ngoại có `UNIQUE`.

## Chuẩn hoá (normalization)

Xem bảng **chưa chuẩn hoá** sau:

| order_id | customer_name | customer_city | product | price |
|---|---|---|---|---|
| 1 | An | Hanoi | Laptop | 15000000 |
| 2 | An | Hanoi | Pen | 8000 |

Tên và thành phố của An bị **lặp**. Hệ quả:

- **Sửa**: đổi thành phố của An phải sửa nhiều dòng, dễ sót, dữ liệu **mâu thuẫn**.
- **Thêm**: không thể lưu khách hàng chưa có đơn.
- **Xoá**: xoá đơn cuối của An là mất luôn thông tin về An.

**Giải pháp:** tách thành `customers`, `orders`, `products`, `order_items` (đúng như CSDL mẫu bạn đang dùng), mỗi thông tin chỉ lưu **một lần**.

| Dạng chuẩn | Quy tắc |
|---|---|
| **1NF** | Mỗi ô chỉ một giá trị (không nhét danh sách "a, b, c" vào một ô) |
| **2NF** | Mọi cột phụ thuộc **toàn bộ** khoá chính (không chỉ một phần khoá ghép) |
| **3NF** | Cột không-khoá không phụ thuộc cột không-khoá khác (ví dụ không lưu `city` kèm `zip` nếu `zip` đã xác định `city`) |

Thực tế 3NF là mục tiêu phổ biến.

## Khi nào cố ý "phi chuẩn hoá"?

Kho dữ liệu phân tích (data warehouse) hay **gộp bảng** cho truy vấn báo cáo nhanh, đánh đổi bằng dữ liệu lặp. Quy tắc: **chuẩn hoá cho hệ thống ghi** (ứng dụng), **phi chuẩn hoá có chủ đích cho hệ thống đọc/phân tích**.

## Mẹo thực tế

- Khoá chính nên là **số nguyên tự tăng** hoặc UUID, **không** dùng dữ liệu có thể đổi (email, tên).
- Đặt tên nhất quán: bảng số nhiều `customers`, khoá ngoại `customer_id`.
- Luôn thêm `created_at`, và cân nhắc cột `deleted_at` (xoá mềm).
- **Vẽ sơ đồ ERD** trước khi code: dùng giấy hoặc công cụ như dbdiagram.io.

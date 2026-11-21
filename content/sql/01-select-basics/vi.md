# SELECT cơ bản

**SQL** (Structured Query Language) là ngôn ngữ để **truy vấn và quản lý dữ liệu** trong cơ sở dữ liệu quan hệ (MySQL, PostgreSQL, SQLite, SQL Server...). Dữ liệu được lưu trong **bảng** gồm **cột** (thuộc tính) và **dòng** (bản ghi).

Khung code bên phải chạy **SQLite thật** ngay trong trình duyệt. Bạn gõ truy vấn, kết quả hiện thành bảng bên dưới.


## Bộ dữ liệu dùng trong khoá

Mọi bài trong khoá này dùng cùng một cơ sở dữ liệu mẫu (được nạp mới mỗi lần bạn chạy, nên bạn thoải mái thử, không sợ làm hỏng):

| Bảng | Cột chính |
|---|---|
| `customers` | `id`, `name`, `email`, `city`, `joined_date` |
| `products` | `id`, `name`, `category`, `price`, `stock` |
| `orders` | `id`, `customer_id`, `order_date`, `status` |
| `order_items` | `id`, `order_id`, `product_id`, `quantity` |
| `departments` | `id`, `name` |
| `employees` | `id`, `name`, `department_id`, `salary`, `manager_id`, `hire_date` |


## Câu lệnh SELECT

```sql
SELECT cột1, cột2
FROM tên_bảng;
```

- `SELECT`: chọn **cột nào** để hiển thị.
- `FROM`: lấy dữ liệu **từ bảng nào**.
- Kết thúc bằng dấu `;`.

```sql
SELECT * FROM customers;               -- dấu * = mọi cột
SELECT name, city FROM customers;      -- chỉ hai cột
```

> Hãy **tránh `SELECT *`** trong ứng dụng thật: chỉ lấy cột cần dùng để nhanh hơn và an toàn khi bảng đổi cấu trúc.

## Bí danh (alias) với AS

Đổi tên cột (hoặc bảng) **trong kết quả**:

```sql
SELECT name AS customer_name, city AS location FROM customers;
```

## Biểu thức

Có thể tính toán ngay trong `SELECT`:

```sql
SELECT name, price, price * 0.9 AS discounted_price FROM products;
SELECT name, price / 1000 AS price_k FROM products;
SELECT 'Xin chào' AS greeting, 1 + 2 AS total;      -- không cần FROM
```

Nối chuỗi trong SQLite dùng `||`:

```sql
SELECT name || ' (' || city || ')' AS label FROM customers;
```

## Chú thích

```sql
-- chú thích một dòng
/* chú thích
   nhiều dòng */
```

## Quy ước viết

- Từ khoá (SELECT, FROM...) **không phân biệt hoa thường**, nhưng nên viết **HOA** để dễ đọc.
- Xuống dòng mỗi mệnh đề (`SELECT`, `FROM`, `WHERE`...) để truy vấn dài vẫn rõ ràng.
- Tên bảng, cột thường dùng `snake_case` (`order_items`).

> **Thứ tự dòng không đảm bảo.** Nếu không có `ORDER BY` (bài sau), cơ sở dữ liệu có thể trả dòng theo thứ tự bất kỳ.

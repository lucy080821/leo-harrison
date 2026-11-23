# Hàm chuỗi: làm sạch và tách văn bản

Dữ liệu thực hiếm khi sạch: tên viết hoa lộn xộn, khoảng trắng thừa, email cần tách tên miền. Bước **làm sạch và chuẩn hoá chuỗi** thường chiếm phần lớn thời gian của người phân tích dữ liệu.

## Các hàm cốt lõi

| Hàm | Việc làm | Ví dụ |
|---|---|---|
| `UPPER(s)`, `LOWER(s)` | đổi hoa/thường | `UPPER('an')` → `AN` |
| `LENGTH(s)` | số ký tự | `LENGTH('Hanoi')` → 5 |
| `TRIM(s)` | bỏ khoảng trắng hai đầu | `TRIM('  a ')` → `a` |
| `SUBSTR(s, bắt_đầu, độ_dài)` | cắt chuỗi (vị trí tính từ **1**) | `SUBSTR('Hanoi', 1, 3)` → `Han` |
| `INSTR(s, t)` | vị trí của t trong s (0 nếu không có) | `INSTR('a@b.com','@')` → 2 |
| `REPLACE(s, cũ, mới)` | thay thế | `REPLACE('a b',' ','_')` → `a_b` |
| `a \|\| b` | **nối chuỗi** (SQLite, PostgreSQL) | `'An' \|\| ' Nguyen'` |

> Lưu ý: nối chuỗi với `NULL` cho kết quả `NULL`. Dùng `COALESCE(cột, 'n/a')` trước khi nối.

## Tách tên miền email

```sql
SELECT SUBSTR(email, INSTR(email, '@') + 1) AS domain FROM customers;
```

`INSTR` tìm vị trí `@`, `SUBSTR` lấy phần phía sau.

![Tách tên miền từ email bằng INSTR và SUBSTR](/lessons/sql/15-string-functions-fig-vi.svg)
*Tách tên miền từ email bằng INSTR và SUBSTR*

## Tìm kiếm mẫu bằng LIKE

`LIKE` dùng hai ký tự đại diện: `%` (nhiều ký tự bất kỳ) và `_` (đúng một ký tự). `name LIKE 'An%'` bắt đầu bằng An; `email LIKE '%@example.com'` kết thúc bằng tên miền. SQLite so sánh `LIKE` **không phân biệt hoa thường** với chữ ASCII; ở PostgreSQL dùng `ILIKE` cho không phân biệt.

## Nghề nghiệp

- **Chuẩn hoá khoá nối**: `LOWER(TRIM(email))` trước khi `JOIN` để tránh lệch do hoa/thường và khoảng trắng.
- **Trích xuất thông tin** từ cột văn bản (mã đơn, URL, tên miền).
- Tránh hàm trên cột đã lập chỉ mục trong `WHERE` (bài về hiệu năng): `WHERE LOWER(email) = ...` không dùng được chỉ mục thường.

## Nguồn tham khảo

- SQLite documentation, "Core Functions" và "LIKE operator", sqlite.org.
- ISO/IEC 9075 (SQL), phần hàm chuỗi.
- Forta, B. *SQL in 10 Minutes, Sams Teach Yourself*.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

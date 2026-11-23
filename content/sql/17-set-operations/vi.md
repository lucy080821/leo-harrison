# Phép toán tập hợp: UNION, INTERSECT, EXCEPT

`JOIN` ghép bảng **theo chiều ngang** (thêm cột). **Phép toán tập hợp** ghép kết quả truy vấn **theo chiều dọc** (thêm dòng), coi mỗi kết quả là một tập hợp.

## Bốn phép

| Phép | Ý nghĩa | Trùng lặp |
|---|---|---|
| `UNION` | hợp: dòng có ở A hoặc B | **loại** trùng |
| `UNION ALL` | nối A rồi B | **giữ** trùng (nhanh hơn) |
| `INTERSECT` | giao: dòng có ở cả A và B | loại trùng |
| `EXCEPT` | hiệu: dòng có ở A nhưng không ở B | loại trùng |

**Điều kiện:** hai truy vấn phải có **cùng số cột** và kiểu tương thích; tên cột lấy từ truy vấn đầu. `ORDER BY` chỉ viết **một lần ở cuối**.

![UNION, INTERSECT và EXCEPT như phép toán tập hợp](/lessons/sql/17-set-operations-fig-vi.svg)
*UNION, INTERSECT và EXCEPT như phép toán tập hợp*

## Khi nào dùng

- **`EXCEPT`** trả lời "có ở A mà không có ở B": khách chưa mua, sản phẩm chưa bán. (Cũng làm được bằng `LEFT JOIN … IS NULL` hoặc `NOT EXISTS`, bài kế tiếp.)
- **`INTERSECT`**: người dùng vừa xem vừa mua.
- **`UNION ALL`** để *gộp nhiều bảng cùng cấu trúc* (log theo tháng, dữ liệu nhiều chi nhánh). Dùng `UNION ALL` thay `UNION` khi biết không có trùng, vì `UNION` phải sắp xếp để loại trùng.

## Lưu ý nghề nghiệp

- `NULL` được coi là **bằng nhau** trong phép tập hợp (khác với `=`).
- Với `EXCEPT` hãy chắc cột so sánh không chứa `NULL` ngoài ý muốn.
- PostgreSQL gọi `EXCEPT`, Oracle gọi `MINUS`; MySQL mới hỗ trợ `INTERSECT`/`EXCEPT` từ phiên bản 8.0.31.

## Nguồn tham khảo

- SQLite documentation, "SELECT: compound select statements", sqlite.org.
- Beaulieu, A. *Learning SQL*, chương 6 (Working with Sets).
- ISO/IEC 9075-2 (SQL/Foundation): phép toán tập hợp.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

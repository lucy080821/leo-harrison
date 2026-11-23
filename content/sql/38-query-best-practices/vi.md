# Thực hành tốt khi viết SQL chuyên nghiệp

Truy vấn của bạn sẽ được **người khác đọc** (và chính bạn sau ba tháng). Đây là các thói quen phân biệt người mới và người làm nghề.

## 1. Cấu trúc rõ ràng

- Dùng **CTE** đặt tên theo ý nghĩa (`completed_orders`, `order_revenue`), mỗi CTE làm **một việc**; đọc từ trên xuống như các bước giải thích.
- Viết hoa từ khoá, **bí danh có nghĩa** (`o`, `oi` chấp nhận được, `t1` thì không), một cột một dòng.
- **Chú thích** *vì sao*, không chú thích *cái gì*.

## 2. Đúng trước, nhanh sau

- **Kiểm tra số dòng và tổng ở từng bước**: sau mỗi `JOIN`, số dòng có tăng bất ngờ không?
- **Đối chiếu** với con số đã biết (tổng doanh thu bảng gốc).
- Thử trên **một khách hàng/đơn cụ thể** và kiểm tra bằng tay.

## 3. Bốn cái bẫy hay gặp

| Bẫy | Biểu hiện | Cách tránh |
|---|---|---|
| **Nhân dòng (fan-out)** | tổng tăng sau `JOIN` một-nhiều | tổng hợp trước rồi mới nối; `COUNT(DISTINCT …)` |
| **NULL** | `NOT IN`, `=` NULL sai | `IS NULL`, `COALESCE`, `NOT EXISTS` |
| **Chia số nguyên** | `7/2 = 3` | nhân `1.0` |
| **Lọc sai chỗ** | `WHERE` trên bảng phải của `LEFT JOIN` biến nó thành `INNER` | đặt điều kiện vào `ON` |

![Viết truy vấn dễ đọc, đúng và dễ bảo trì](/lessons/sql/38-query-best-practices-fig-vi.svg)
*Viết truy vấn dễ đọc, đúng và dễ bảo trì*

## 4. Bảo trì

- **Tái dùng** bằng view hoặc mô hình dbt; tránh sao chép dán logic "doanh thu" ở nhiều nơi.
- Lưu truy vấn quan trọng trong **kiểm soát phiên bản** (Git).
- Ghi **định nghĩa chỉ số** (doanh thu có trừ hoàn trả không?).

## Nguồn tham khảo

- Holywell, S. "SQL Style Guide" (sqlstyle.guide).
- Winand, M. *SQL Performance Explained*.
- Beaulieu, A. *Learning SQL*.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

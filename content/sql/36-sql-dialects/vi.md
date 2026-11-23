# Các phương ngữ SQL: chuyển kỹ năng giữa các hệ thống

SQL có chuẩn ISO/IEC 9075, nhưng mỗi hệ thống thêm **phương ngữ** riêng. Phần lõi (SELECT, JOIN, GROUP BY, hàm cửa sổ, CTE) dùng được ở mọi nơi; khác biệt nằm ở các **chi tiết**.

## Bảng khác biệt thường gặp

| Việc | SQLite | PostgreSQL | MySQL | BigQuery |
|---|---|---|---|---|
| Nối chuỗi | `a \|\| b` | `a \|\| b` | `CONCAT(a, b)` | `a \|\| b` |
| Giới hạn dòng | `LIMIT n OFFSET m` | như SQLite | như SQLite | như SQLite |
| Cắt theo tháng | `strftime('%Y-%m', d)` | `DATE_TRUNC('month', d)` | `DATE_FORMAT(d,'%Y-%m')` | `DATE_TRUNC(d, MONTH)` |
| Cộng ngày | `date(d,'+7 days')` | `d + INTERVAL '7 days'` | `DATE_ADD(d, INTERVAL 7 DAY)` | `DATE_ADD(d, INTERVAL 7 DAY)` |
| Phân vị | tự dựng | `PERCENTILE_CONT` | tự dựng (≥ 8.0 cửa sổ) | `APPROX_QUANTILES` |
| Không phân biệt hoa thường | `LIKE` | `ILIKE` | `LIKE` (tuỳ collation) | `LOWER(...)` |
| Chia số nguyên | `7/2 = 3` | `7/2 = 3` | `7/2 = 3.5` | `7/2 = 3.5` |

(Hãy kiểm tra tài liệu phiên bản bạn dùng; nội dung bảng thay đổi theo thời gian.)

![So sánh cú pháp SQLite, PostgreSQL, MySQL và BigQuery](/lessons/sql/36-sql-dialects-fig-vi.svg)
*So sánh cú pháp SQLite, PostgreSQL, MySQL và BigQuery*

## Chiến lược nghề nghiệp

1. Nắm vững **SQL chuẩn** và tư duy tập hợp: dùng được ở mọi nơi.
2. Khi đổi hệ thống, tra **sổ tay phương ngữ** cho: ngày giờ, chuỗi, kiểu dữ liệu, `NULL`, cách tạo bảng tạm.
3. Viết truy vấn **dễ đọc** (CTE, bí danh rõ): dễ chuyển đổi hơn.
4. Dùng công cụ như **dbt** hoặc **SQLGlot** để dịch giữa phương ngữ.

## Loại SQL theo mục đích

- **OLTP** (giao dịch): PostgreSQL, MySQL, SQL Server, Oracle.
- **OLAP/kho dữ liệu** (phân tích): BigQuery, Snowflake, Redshift, ClickHouse; tối ưu quét cột lớn, không dùng chỉ mục như OLTP.

## Nguồn tham khảo

- ISO/IEC 9075 (SQL). Tài liệu chính thức của SQLite, PostgreSQL, MySQL, BigQuery.
- Winand, M. "Modern SQL" (modern-sql.com): bảng hỗ trợ tính năng theo hệ thống.
- SQLGlot, github.com/tobymao/sqlglot.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

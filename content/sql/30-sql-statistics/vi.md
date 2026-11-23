# Thống kê mô tả trong SQL: trung vị, phân vị, độ lệch chuẩn

SQL chuẩn có `AVG`, `MIN`, `MAX`, `SUM`, `COUNT`, nhưng **trung vị** và **phân vị** thường không có hàm sẵn (PostgreSQL có `PERCENTILE_CONT`; BigQuery có `APPROX_QUANTILES`; SQLite không). Ta tự dựng bằng hàm cửa sổ.

## Trung vị

**Trung vị** bền với ngoại lai hơn trung bình (xem bài 1 của khoá thống kê). Với n dòng sắp xếp:

- n lẻ: dòng thứ `(n + 1)/2`.
- n chẵn: trung bình hai dòng `n/2` và `n/2 + 1`.

Gộp hai trường hợp: lấy `AVG` các dòng có `rn IN ((cnt+1)/2, (cnt+2)/2)` (phép chia nguyên của SQLite).

## Phân vị bất kỳ

Dùng `ROW_NUMBER` và `COUNT() OVER ()`: phân vị 90 xấp xỉ dòng `CEIL(0,9 × n)`. `NTILE(100)` hoặc `PERCENT_RANK()` cũng cho vị trí tương đối.

![Trung vị, phân vị và thống kê mô tả trong SQL](/lessons/sql/30-sql-statistics-fig-vi.svg)
*Trung vị, phân vị và thống kê mô tả trong SQL*

## Phương sai, độ lệch chuẩn, tương quan

```sql
-- phương sai mẫu = (Σx² − (Σx)²/n) / (n − 1)
(SUM(x*x) - SUM(x)*SUM(x)/COUNT(*)) / (COUNT(*) - 1)
```

Cẩn thận **số nguyên**: nhân `1.0 *` để tính bằng số thực và tránh tràn/cắt cụt. Tương quan Pearson cũng tính được từ `SUM(x)`, `SUM(y)`, `SUM(x*y)`, `SUM(x*x)`, `SUM(y*y)` (PostgreSQL có hàm `CORR`).

## Khi nào dùng SQL, khi nào kéo ra Python

- **SQL**: tổng hợp trên hàng triệu dòng, nơi dữ liệu đang nằm (không kéo cả bảng về).
- **Python/R**: phân tích sâu, biểu đồ, kiểm định. Kéo về **bảng đã tổng hợp**.
- So sánh **trung bình vs trung vị** là phép thử nhanh độ lệch của phân phối doanh thu.

## Nguồn tham khảo

- PostgreSQL documentation, "Aggregate Functions" (ordered-set: percentile_cont).
- Google BigQuery documentation, "Approximate aggregate functions".
- Khoá "Toán và Thống kê": bài mô tả dữ liệu.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

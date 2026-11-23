# Ngày giờ: gom theo tháng, tuần và tính khoảng cách

Phân tích kinh doanh luôn gắn với **thời gian**: doanh thu theo tháng, thời gian từ đăng ký đến mua, ngày hoạt động gần nhất. SQLite lưu ngày dạng văn bản ISO `YYYY-MM-DD` (hoặc số), nên các hàm dưới đây là công cụ chính.

## Hàm quan trọng

- `date('2024-05-03', '+7 days')` → `2024-05-10`; `date('now')` là hôm nay. Các bộ điều chỉnh: `'-1 month'`, `'start of month'`, `'weekday 1'`.
- `strftime(định_dạng, ngày)`: `'%Y'` năm, `'%Y-%m'` tháng, `'%W'` tuần trong năm, `'%w'` thứ (0 = Chủ nhật).
- `julianday(ngày)`: số ngày liên tục; **hiệu hai giá trị = số ngày giữa hai ngày**.

## Gom theo kỳ

```sql
SELECT strftime('%Y-%m', purchase_date) AS month, SUM(amount) AS revenue
FROM purchases GROUP BY month ORDER BY month;
```

![Gom doanh thu theo tháng bằng strftime](/lessons/sql/16-date-time-functions-fig-vi.svg)
*Gom doanh thu theo tháng bằng strftime*

## Khoảng cách thời gian

```sql
julianday(ngày_sau) - julianday(ngày_trước)   -- số ngày
```

Ví dụ nghề nghiệp: **thời gian đến lần mua đầu** (time-to-first-purchase) cho thấy kênh nào đưa người dùng đến quyết định mua nhanh hơn.

## Cạm bẫy

- **Múi giờ**: dữ liệu thường lưu UTC; chuyển múi giờ trước khi cắt theo ngày.
- **Tháng thiếu dữ liệu**: `GROUP BY` chỉ ra các tháng *có dòng*; muốn đủ mọi tháng cần bảng lịch hoặc CTE đệ quy (bài sau).
- **Ngày dạng văn bản không chuẩn** (`3/5/2024`) làm sắp xếp sai. Chuẩn hoá về `YYYY-MM-DD` ngay từ đầu.
- Phương ngữ khác nhau: PostgreSQL dùng `DATE_TRUNC('month', d)`, `d + INTERVAL '7 days'`; MySQL dùng `DATE_FORMAT`, `DATEDIFF`.

## Nguồn tham khảo

- SQLite documentation, "Date And Time Functions", sqlite.org.
- ISO 8601: biểu diễn ngày và giờ.
- Beaulieu, A. *Learning SQL* (O'Reilly), chương về dữ liệu thời gian.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

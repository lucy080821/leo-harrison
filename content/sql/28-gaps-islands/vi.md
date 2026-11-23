# Chuỗi liên tiếp: gaps and islands

Nhiều câu hỏi dạng **"bao nhiêu ngày liên tiếp"**: chuỗi đăng nhập liên tục, số ngày không có đơn, giai đoạn máy chạy không lỗi. Đây là bài toán **đảo (islands)** và **khoảng trống (gaps)**.

## Kỹ thuật hiệu số hạng

Với các ngày **khác nhau** đã sắp xếp của một người, hai đại lượng cùng tăng 1 mỗi dòng khi ngày **liên tiếp**:

- `ROW_NUMBER()` (1, 2, 3, …)
- `julianday(ngay)`

Nên hiệu `julianday(ngay) − ROW_NUMBER()` **không đổi trong cùng một chuỗi** và **nhảy** khi có khoảng trống. Dùng hiệu làm khoá nhóm:

```sql
SELECT user_id, MIN(d), MAX(d), COUNT(*)
FROM (SELECT user_id, d,
        julianday(d) - ROW_NUMBER() OVER (PARTITION BY user_id ORDER BY d) AS grp
      FROM days)
GROUP BY user_id, grp;
```

![Chuỗi ngày liên tiếp bằng kỹ thuật hiệu số hạng](/lessons/sql/28-gaps-islands-fig-vi.svg)
*Chuỗi ngày liên tiếp bằng kỹ thuật hiệu số hạng*

Mỗi nhóm `grp` là một **đảo**: ngày bắt đầu, ngày kết thúc, độ dài. Chuỗi **dài nhất** = `MAX` độ dài theo người.

## Khoảng trống bằng LAG

`LAG(d)` lấy ngày hoạt động trước; hiệu `d − LAG(d)` > 1 nghĩa là có khoảng trống. Dùng để tìm kỳ **ngưng hoạt động**, khoảng thời gian giữa hai lần mua (tính chu kỳ mua lại).

## Lưu ý

- **Khử trùng ngày** trước (`DISTINCT`), nếu không `ROW_NUMBER` đếm cả bản trùng và phá hiệu số.
- Với "tuần liên tiếp" hãy gom về tuần trước rồi đánh số.
- Ứng dụng: tính chỉ số "streak" kiểu ứng dụng học ngoại ngữ, phát hiện gián đoạn dịch vụ, thời gian không hoạt động của thiết bị.

## Nguồn tham khảo

- Itzik Ben-Gan. *T-SQL Window Functions* (chương Gaps and Islands).
- Celko, J. *SQL for Smarties*.
- SQLite documentation, "Window Functions", sqlite.org.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

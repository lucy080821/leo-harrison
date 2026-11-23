# Hiệu năng truy vấn: chỉ mục và kế hoạch thực thi

Một truy vấn đúng nhưng chậm vẫn là truy vấn hỏng khi bảng có hàng chục triệu dòng. Hiệu năng là kỹ năng cốt lõi để **ra nghề**.

## Chỉ mục (index)

Không có chỉ mục, `WHERE user_id = 42` phải **quét toàn bộ bảng** (full scan, O(n)). **Chỉ mục B-tree** là cấu trúc sắp xếp riêng trên cột, cho phép **tìm O(log n)** như tra mục lục sách.

```sql
CREATE INDEX idx_events_user ON events(user_id);
```

![Chỉ mục B-tree giúp truy vấn không phải quét cả bảng](/lessons/sql/31-performance-indexes-fig-vi.svg)
*Chỉ mục B-tree giúp truy vấn không phải quét cả bảng*

**Cái giá:** tốn dung lượng, làm `INSERT/UPDATE/DELETE` chậm hơn (phải cập nhật chỉ mục). Vì vậy chỉ lập chỉ mục cho cột **hay dùng để lọc, nối, sắp xếp**.

## Chỉ mục phức hợp

`(event_type, event_date)` giúp lọc theo `event_type` rồi theo `event_date`. **Thứ tự cột quan trọng**: dùng được cho điều kiện trên **cột đầu** (hoặc cả hai), không dùng hiệu quả nếu chỉ lọc cột sau.

## Đọc kế hoạch thực thi

`EXPLAIN QUERY PLAN SELECT …` cho biết SQLite làm gì: `SCAN` (quét cả bảng) hay `SEARCH … USING INDEX` (dùng chỉ mục). PostgreSQL dùng `EXPLAIN ANALYZE` (cho thời gian thật), MySQL `EXPLAIN`.

## Truy vấn "sargable" (dùng được chỉ mục)

- Tốt: `WHERE user_id = 42`, `WHERE event_date >= '2024-01-01'`.
- **Phá chỉ mục**: bọc cột trong hàm (`WHERE strftime('%Y', event_date) = '2024'`, `WHERE LOWER(email) = …`), `LIKE '%abc'` (bắt đầu bằng ký tự đại diện), so khác kiểu.
- Viết lại: `event_date >= '2024-01-01' AND event_date < '2025-01-01'`.

## Thói quen nghề nghiệp

- Chỉ chọn cột cần (`SELECT *` kéo nhiều dữ liệu).
- Lọc **sớm** (trước khi nối/tổng hợp); `LIMIT` khi thăm dò.
- Đo trước khi tối ưu: nút cổ chai thường ở một vài truy vấn.

## Nguồn tham khảo

- Winand, M. *SQL Performance Explained* (use-the-index-luke.com).
- SQLite documentation, "Query Planning" và "EXPLAIN QUERY PLAN", sqlite.org.
- Knuth, D. *The Art of Computer Programming*, Vol. 3 (cây tìm kiếm).

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

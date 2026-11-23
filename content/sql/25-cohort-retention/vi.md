# Phân tích nhóm (cohort) và tỷ lệ giữ chân

Số "người dùng hoạt động" tổng thể có thể tăng chỉ vì ta liên tục thu hút người mới, trong khi người cũ bỏ đi. **Phân tích nhóm (cohort)** tách hai điều đó: gom người dùng theo **thời điểm bắt đầu** rồi theo dõi từng nhóm qua thời gian.

## Khái niệm

- **Cohort**: nhóm người dùng có chung mốc (tháng đăng ký, kênh thu hút).
- **Tháng kể từ đăng ký** (age): 0, 1, 2…
- **Giữ chân (retention)** tại tháng k = số người của nhóm còn hoạt động ở tháng k / quy mô nhóm.

## Công thức SQL

1. Gán mỗi người một `cohort_month` từ ngày đăng ký.
2. Lấy các cặp (người, tháng hoạt động) **khác nhau** (`DISTINCT`).
3. Tính `age = số tháng giữa tháng hoạt động và cohort_month`.
4. `COUNT(DISTINCT user_id)` theo (cohort, age), chia cho quy mô nhóm.

```sql
(CAST(strftime('%Y', a) AS INT) - CAST(strftime('%Y', c) AS INT)) * 12
 + CAST(strftime('%m', a) AS INT) - CAST(strftime('%m', c) AS INT)
```

![Bảng giữ chân theo nhóm tháng đăng ký](/lessons/sql/25-cohort-retention-fig-vi.svg)
*Bảng giữ chân theo nhóm tháng đăng ký*

## Đọc bảng giữ chân

Mỗi **hàng** là một nhóm, mỗi **cột** là tháng kể từ đăng ký; thường vẽ thành bản đồ nhiệt. Hãy tìm: (1) **đường cong tụt** nhanh hay chậm (sản phẩm có "giá trị dài hạn" không); (2) nhóm mới **tốt hơn hay tệ hơn** nhóm cũ (cải tiến có hiệu quả); (3) nhóm theo **kênh** nào giữ chân tốt.

## Cạm bẫy

- **Nhóm quá nhỏ** cho tỷ lệ dao động mạnh; gộp theo quý.
- **Nhóm gần đây** chưa đủ thời gian quan sát: không so với nhóm cũ ở cùng độ tuổi chưa tới.
- Định nghĩa "hoạt động" phải rõ (có xem trang? có mua?).

## Nguồn tham khảo

- Ries, E. *The Lean Startup* (nói về cohort analysis và chỉ số hành động).
- Croll, A. & Yoskovitz, B. *Lean Analytics* (O'Reilly).
- Fader, P. & Hardie, B. (2010). Customer-base valuation in a contractual setting. *Marketing Science* 29(1).

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

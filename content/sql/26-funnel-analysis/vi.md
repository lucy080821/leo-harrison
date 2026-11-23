# Phễu chuyển đổi (funnel analysis)

Hành trình mua hàng là chuỗi bước: **xem → bỏ vào giỏ → thanh toán → mua**. Ở mỗi bước ta mất một phần người dùng. **Phân tích phễu** đo mất bao nhiêu và **mất ở đâu**, để biết nên sửa chỗ nào trước.

## Cách đo

- **Người dùng đạt bước k**: `COUNT(DISTINCT user_id)` các sự kiện loại bước k.
- **Tỷ lệ bước kế tiếp**: users(k+1) / users(k).
- **Tỷ lệ từ đầu**: users(k) / users(bước 1).
- **Rơi rụng (drop-off)** = 1 − tỷ lệ bước kế.

![Phễu chuyển đổi: xem → giỏ hàng → thanh toán → mua](/lessons/sql/26-funnel-analysis-fig-vi.svg)
*Phễu chuyển đổi: xem → giỏ hàng → thanh toán → mua*

## Hai cách tính

1. **Phễu đơn giản** (đếm theo loại sự kiện): nhanh, đủ cho tổng quan, nhưng một người có thể "mua" mà không có sự kiện "giỏ" nếu dữ liệu thiếu.
2. **Phễu tuần tự** (mỗi bước phải xảy ra **sau** bước trước, trong một khoảng thời gian, ví dụ 7 ngày): chính xác hơn; dùng self-join/`EXISTS` hoặc hàm cửa sổ trên sự kiện.

## Phân đoạn

Quan trọng hơn con số tổng là **so sánh**: phễu theo kênh, thiết bị, quốc gia, phiên bản trang. Hai kênh có cùng số người xem nhưng tỷ lệ giỏ→mua khác nhau chỉ ra chất lượng lưu lượng khác nhau.

## Diễn giải đúng

- Bước **rơi nhiều nhất** chưa chắc là chỗ nên sửa; hãy xét **cơ hội** (số người × cải thiện khả thi).
- Cẩn thận **thiên lệch người sống sót** khi so nhóm đã đi qua nhiều bước.
- Kết hợp phỏng vấn/khảo sát: dữ liệu cho biết **ở đâu**, không cho biết **vì sao**.

## Nguồn tham khảo

- Croll, A. & Yoskovitz, B. *Lean Analytics*, chương về phễu (funnels).
- Kaushik, A. *Web Analytics 2.0*.
- Google Analytics Help: "Funnel exploration".

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

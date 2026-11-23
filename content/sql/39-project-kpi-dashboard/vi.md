# Dự án: bộ truy vấn KPI cho bảng điều khiển

Bài cuối tổng hợp mọi kỹ năng thành sản phẩm thực tế: **bộ truy vấn KPI** nuôi một bảng điều khiển (Cerno, Power BI, Looker…). Công việc của người phân tích dữ liệu.

## Quy trình

1. **Chốt chỉ số và định nghĩa** với người dùng bảng điều khiển: "người dùng mới" tính theo ngày đăng ký nào? "doanh thu" gồm hoàn trả không?
2. **Xác định hạt và nguồn**: bảng nào, tính theo tháng/tuần/kênh nào.
3. **Viết từng khối bằng CTE**, kiểm tra từng khối với con số đã biết.
4. **Hợp nhất** thành truy vấn cuối thân thiện với công cụ BI (cột tên rõ, kiểu nhất quán).
5. **Kiểm tra chất lượng** (bài 24) và hiệu năng (bài 31).

![Truy vấn KPI cho bảng điều khiển bán hàng và sản phẩm](/lessons/sql/39-project-kpi-dashboard-fig-vi.svg)
*Truy vấn KPI cho bảng điều khiển bán hàng và sản phẩm*

## Bộ chỉ số điển hình cho sản phẩm số

| Nhóm | Chỉ số | Cách tính gợi ý |
|---|---|---|
| Thu hút | người dùng mới | `COUNT` theo tháng đăng ký |
| Kích hoạt | tỷ lệ có hành động đầu tiên | phễu (bài 26) |
| Doanh thu | doanh thu, **ARPPU** (doanh thu / người mua) | `SUM(amount) / COUNT(DISTINCT user_id)` |
| Chuyển đổi | người mua / người dùng | `100.0 * buyers / users` |
| Giữ chân | giữ chân tháng 2 | cohort (bài 25) |
| Phân khúc | RFM | NTILE (bài 27) |

## Việc cần chú ý

- **Chỉ số tỷ lệ** tính lại từ tử và mẫu khi gộp theo nhiều chiều.
- **Mốc thời gian** nhất quán (múi giờ, tháng chưa kết thúc thì ghi chú "chưa đủ tháng").
- Ghi **ngày cập nhật dữ liệu** cạnh bảng điều khiển.

## Nguồn tham khảo

- Croll, A. & Yoskovitz, B. *Lean Analytics*.
- Few, S. *Information Dashboard Design*.
- Kimball, R. *The Data Warehouse Toolkit*.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

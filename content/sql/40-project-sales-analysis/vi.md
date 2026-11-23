# Dự án: Phân tích doanh số

Đây là bài **tổng hợp**: bạn đóng vai nhà phân tích dữ liệu của cửa hàng và trả lời các câu hỏi kinh doanh bằng SQL. Mọi kỹ năng của khoá đều dùng đến.

## Quy trình của người phân tích

1. **Hiểu câu hỏi** thật rõ: "doanh thu" tính đơn nào? (hoàn thành hay tất cả?) theo thời gian nào?
2. **Khám phá dữ liệu:** `SELECT * ... LIMIT 5`, đếm số dòng, xem giá trị khác nhau (`DISTINCT`).
3. **Xây dần truy vấn từng bước:** thêm JOIN rồi kiểm tra số dòng, thêm WHERE, rồi mới GROUP BY.
4. **Kiểm tra kết quả:** tổng các nhóm có bằng tổng toàn bộ không? Con số có hợp lý không?
5. **Trình bày:** đặt tên cột dễ hiểu, sắp xếp hợp lý.

![Quy trình phân tích bán hàng bằng SQL](/lessons/sql/40-project-sales-analysis-fig-vi.svg)
*Quy trình phân tích bán hàng bằng SQL*

## Công thức doanh thu

Mỗi dòng `order_items` đóng góp $\text{quantity} \times \text{price}$ vào doanh thu, nên

$$
\text{Doanh thu} = \sum \text{quantity}_i \times \text{price}_i
$$

```sql
SUM(oi.quantity * p.price) AS revenue
```

Cần nối ba bảng: `orders` (ngày, trạng thái) → `order_items` (số lượng) → `products` (giá).

## Mẫu truy vấn: doanh thu theo nhóm

```sql
SELECT p.category, SUM(oi.quantity * p.price) AS revenue
FROM order_items oi
JOIN products p ON p.id = oi.product_id
GROUP BY p.category
ORDER BY revenue DESC;
```

## Bài toán gợi ý để tự luyện thêm

Thử tự trả lời, mỗi câu dùng kỹ thuật khác nhau:

| Câu hỏi | Kỹ thuật gợi ý |
|---|---|
| Khách hàng nào chi tiêu nhiều nhất? | JOIN + GROUP BY + CTE |
| Tỉ lệ đơn bị huỷ là bao nhiêu %? | `CASE` + `SUM` / `COUNT` |
| Mỗi tháng tăng trưởng bao nhiêu % so với tháng trước? | `LAG()` window function |
| Sản phẩm nào chưa bán được cái nào? | `LEFT JOIN ... IS NULL` |
| Với mỗi thành phố, khách mua nhiều nhất là ai? | `ROW_NUMBER() OVER (PARTITION BY ...)` |
| Giá trị trung bình của một đơn hàng? | CTE tổng mỗi đơn rồi `AVG` |
| Sản phẩm nào thường được mua cùng nhau? | Self-join `order_items` theo `order_id` |

Ví dụ tăng trưởng theo tháng:

```sql
WITH monthly AS (
  SELECT strftime('%Y-%m', o.order_date) AS month,
         SUM(oi.quantity * p.price) AS revenue
  FROM orders o
  JOIN order_items oi ON oi.order_id = o.id
  JOIN products p ON p.id = oi.product_id
  WHERE o.status = 'completed'
  GROUP BY month
)
SELECT month, revenue,
       ROUND((revenue - LAG(revenue) OVER (ORDER BY month)) * 100.0
             / LAG(revenue) OVER (ORDER BY month), 1) AS growth_pct
FROM monthly;
```

Tăng trưởng được tính bằng

$$
\text{growth} = \frac{R_t - R_{t-1}}{R_{t-1}} \times 100\%
$$

## Chúc mừng!

Bạn đã đi từ `SELECT` đầu tiên tới window function, CTE và thiết kế CSDL. Với nền tảng này bạn đã đủ sức làm báo cáo thật trên bất kỳ hệ quản trị nào (PostgreSQL, MySQL, BigQuery, SQL Server): cú pháp khác đôi chút, tư duy giống hệt. Bước tiếp theo trong lộ trình Dữ liệu là **Python cho Data Analyst**, nơi bạn kết hợp SQL với pandas.

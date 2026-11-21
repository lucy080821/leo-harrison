# Dự án: Báo cáo doanh số

Dự án cuối khoá **Python cho Data Analyst**. Bạn sẽ làm đúng công việc của một nhà phân tích: nhận file dữ liệu bán hàng, **làm sạch → tổng hợp → trực quan hoá → rút ra kết luận**.

> Dữ liệu: `sales.csv` (60 đơn hàng, 01/2024 đến 06/2024). Bài này đúng là phần "cuối cùng" ghép mọi kỹ năng đã học.

## Quy trình phân tích hoàn chỉnh

```text
1. Hiểu câu hỏi     "Doanh thu biến động thế nào? Sản phẩm nào đóng góp nhiều nhất?"
2. Nạp dữ liệu      pd.read_csv(..., parse_dates=["date"])
3. Khám phá         shape, info, describe, isna, value_counts
4. Làm sạch         trùng lặp, thiếu, kiểu dữ liệu, chuẩn hoá chữ
5. Biến đổi         revenue = units * unit_price, month = date.dt...
6. Tổng hợp         groupby / pivot_table
7. Trực quan hoá    biểu đồ đúng loại, có tiêu đề + nhãn
8. Kết luận         viết thành lời: con số nói gì? khuyến nghị gì?
```

## Bước 1-3: nạp và biến đổi

```python
df = pd.read_csv("sales.csv", parse_dates=["date"])
df["revenue"] = df["units"] * df["unit_price"]
df["month"] = df["date"].dt.to_period("M").astype(str)       # '2024-01'
```

Định nghĩa doanh thu mỗi đơn là $\text{revenue} = \text{units} \times \text{unit price}$.

## Bước 6: các con số then chốt (KPI)

```python
total_revenue = df["revenue"].sum()
avg_order     = df["revenue"].mean()
n_orders      = len(df)

monthly = df.groupby("month")["revenue"].sum()
by_region = df.groupby("region")["revenue"].sum().sort_values(ascending=False)
top_products = (df.groupby("product")["revenue"].sum()
                  .sort_values(ascending=False).head(3))
```

**Tăng trưởng theo tháng** (% so với tháng trước):

```python
growth = monthly.pct_change() * 100          # (R_t - R_{t-1}) / R_{t-1}
```

$$
\text{growth}_t = \frac{R_t - R_{t-1}}{R_{t-1}} \times 100\%
$$

**Tỉ trọng đóng góp (Pareto):** vài sản phẩm thường tạo ra phần lớn doanh thu.

```python
share = df.groupby("product")["revenue"].sum().sort_values(ascending=False)
share_pct = (share / share.sum() * 100).round(1)
cumulative = share_pct.cumsum()              # tích luỹ: 80% doanh thu đến từ bao nhiêu sản phẩm?
```

## Bước 7: trực quan hoá

```python
fig, axes = plt.subplots(1, 2, figsize=(12, 4))
monthly.plot(kind="bar", ax=axes[0], title="Doanh thu theo tháng")
top_products.plot(kind="barh", ax=axes[1], title="Top 3 sản phẩm")
plt.tight_layout()
plt.show()
```

Chọn đúng biểu đồ: **đường/cột** cho thời gian, **cột ngang đã sắp xếp** cho xếp hạng.

## Bước 8: kể chuyện bằng dữ liệu

Một báo cáo tốt không chỉ có biểu đồ mà còn **thông điệp**. Ví dụ:

> "Doanh thu 6 tháng đạt X. Vùng **South** đóng góp nhiều nhất (Y%). **Laptop** và **Phone** tạo ra hơn Z% doanh thu, nên cần ưu tiên tồn kho hai mặt hàng này."

Cấu trúc nên theo: **Phát hiện → Bằng chứng (con số/biểu đồ) → Khuyến nghị**.

## Gợi ý mở rộng (tự thử)

- Tạo `pivot_table` doanh thu theo **vùng × nhóm hàng** và vẽ **heatmap** bằng `plt.imshow`.
- Tính **giá trị đơn hàng trung bình theo vùng** và so sánh.
- Tìm **ngày trong tuần** bán chạy nhất (`dt.day_name()`).
- Phát hiện **đơn hàng ngoại lệ** bằng IQR.
- Viết các bước thành **hàm** `load_data()`, `clean()`, `summarize()` để tái sử dụng và kiểm thử.
- Lưu kết quả ra CSV: `monthly.to_csv("monthly.csv")` hoặc Excel `to_excel`.

## Chúc mừng!

Bạn đã hoàn thành lộ trình phân tích dữ liệu với Python: NumPy, pandas (đọc, làm sạch, biến đổi, nhóm, ghép, pivot), matplotlib và thống kê mô tả. Kết hợp với **SQL** bạn đã có bộ công cụ cốt lõi của một Data Analyst. Bước tiếp theo trong lộ trình là **Toán cho Machine Learning** và **Machine Learning**.

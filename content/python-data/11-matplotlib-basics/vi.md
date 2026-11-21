# Vẽ biểu đồ với matplotlib

Con số khó đọc, **biểu đồ** thì dễ. Trực quan hoá giúp bạn **thấy** xu hướng, ngoại lệ và quan hệ mà bảng số che giấu.

> Trong khung thực hành, biểu đồ hiện thành **ảnh** ngay bên dưới khi bạn gọi `plt.show()`.

## Biểu đồ đầu tiên

```python
import matplotlib.pyplot as plt

months = ["Jan", "Feb", "Mar", "Apr"]
revenue = [120, 150, 90, 200]

plt.plot(months, revenue, marker="o")
plt.title("Doanh thu theo tháng")
plt.xlabel("Tháng")
plt.ylabel("Doanh thu (triệu)")
plt.grid(True)
plt.show()
```

Mỗi biểu đồ tốt cần: **tiêu đề**, **nhãn trục** (có đơn vị), và dễ đọc.

## Chọn loại biểu đồ

| Muốn thể hiện | Biểu đồ | Hàm |
|---|---|---|
| Xu hướng theo thời gian | **Đường** | `plt.plot(x, y)` |
| So sánh giữa các nhóm | **Cột** | `plt.bar(names, values)` |
| Phân bố của một biến số | **Histogram** | `plt.hist(data, bins=10)` |
| Quan hệ giữa hai biến số | **Phân tán** | `plt.scatter(x, y)` |
| Tỉ lệ thành phần (ít nhóm) | Tròn | `plt.pie(values, labels=...)` |
| Phân bố & ngoại lệ | **Hộp** | `plt.boxplot(data)` |

```python
plt.bar(["A", "B", "C"], [3, 7, 5], color="#0b6fd6")      # cột
plt.barh(["A", "B", "C"], [3, 7, 5])                       # cột ngang (tên dài thì dùng cái này)
plt.hist(scores, bins=8, edgecolor="white")                # histogram
plt.scatter(heights, weights, alpha=0.6)                   # alpha: độ trong suốt
```

## Tuỳ biến

```python
plt.plot(x, y, color="tomato", linestyle="--", marker="o", linewidth=2, label="Năm nay")
plt.plot(x, y2, color="gray", label="Năm ngoái")
plt.legend()                       # hiện chú giải cho các label
plt.xlim(0, 10); plt.ylim(0, 100)  # giới hạn trục
plt.xticks(rotation=45)            # xoay nhãn trục x
plt.tight_layout()                 # tránh nhãn bị cắt
```

## Hai cách viết: pyplot và hướng đối tượng

Cách `plt.xxx` ở trên rất nhanh. Khi cần **nhiều biểu đồ** hoặc kiểm soát chi tiết, hãy dùng `Figure` và `Axes`:

```python
fig, ax = plt.subplots(figsize=(6, 4))      # figsize: (rộng, cao) tính bằng inch
ax.plot(x, y)
ax.set_title("Tiêu đề")                     # với ax: set_title, set_xlabel, set_ylabel
ax.set_xlabel("x")
ax.set_ylabel("y")
plt.show()
```

Hai chữ cần nhớ: **Figure** là tờ giấy; **Axes** là một biểu đồ vẽ trên tờ giấy đó (một Figure có thể chứa nhiều Axes).

## Vẽ nhiều biểu đồ cạnh nhau

```python
fig, axes = plt.subplots(1, 2, figsize=(10, 4))     # 1 hàng, 2 cột
axes[0].plot(x, y);  axes[0].set_title("Đường")
axes[1].bar(names, values); axes[1].set_title("Cột")
plt.tight_layout()
plt.show()
```

## Lưu thành file

```python
plt.savefig("chart.png", dpi=150, bbox_inches="tight")
```

## Nguyên tắc trực quan hoá tốt

1. **Một biểu đồ, một thông điệp** rõ ràng.
2. Trục cột/histogram nên **bắt đầu từ 0** (tránh gây hiểu lầm).
3. Hạn chế màu mè, đừng dùng biểu đồ tròn khi có hơn 5 nhóm.
4. **Sắp xếp** cột theo giá trị để dễ so sánh.
5. Luôn có **tiêu đề** và **nhãn trục kèm đơn vị**.

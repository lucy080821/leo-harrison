# Khám phá dữ liệu bằng biểu đồ (EDA)

**EDA** (Exploratory Data Analysis, phân tích khám phá) là bước **nhìn vào dữ liệu trước khi kết luận**: dữ liệu phân bố ra sao, có ngoại lệ không, biến nào liên quan nhau? Biểu đồ là công cụ trung tâm.

> Bài này dùng `students.csv`: 30 học sinh, điểm `math`, `physics`, `literature` và lớp `class` (A, B, C).

## Quy trình EDA gợi ý

1. **Một biến một lần:** phân bố của từng cột (histogram, boxplot, đếm).
2. **Hai biến:** quan hệ (scatter, so sánh theo nhóm).
3. **Nhiều biến:** ma trận tương quan, so sánh nhóm.
4. **Ghi lại phát hiện** và câu hỏi mới.

## Biểu đồ trực tiếp từ pandas

pandas bọc sẵn matplotlib nên bạn vẽ nhanh từ DataFrame:

```python
df["math"].plot(kind="hist", bins=8)
df.groupby("class")["math"].mean().plot(kind="bar")
df.plot(kind="scatter", x="math", y="physics")
df["literature"].plot(kind="box")
```

Đây là cách **nhanh nhất** để khám phá. Khi cần trình bày đẹp hơn, chuyển sang `plt` và `ax` như bài trước.

## Phân bố một biến: histogram và boxplot

```python
plt.hist(df["math"], bins=8, edgecolor="white")
plt.title("Phân bố điểm Toán")
```

- **Histogram** chia dải giá trị thành các **khoảng (bin)** và đếm số mẫu mỗi khoảng. Số bins ảnh hưởng hình dạng: thử vài giá trị.
- Đọc: dữ liệu tập trung ở đâu? **đối xứng** hay **lệch**? có **nhiều đỉnh**? có **giá trị lạ** xa nhóm chính?

**Boxplot (biểu đồ hộp)** tóm tắt phân bố bằng 5 số:

```text
   ┌─────┬─────┐
├──┤  Q1 │ Q3  ├──┤     ○ ngoại lệ
   └─────┴─────┘
   min  median  max (trong khoảng cho phép)
```

Hộp từ Q1 đến Q3 (50% dữ liệu), vạch giữa là trung vị, các chấm lẻ là ngoại lệ.

```python
df.boxplot(column="math", by="class")     # so sánh phân bố giữa các nhóm
```

## Quan hệ hai biến: scatter

```python
plt.scatter(df["math"], df["physics"], alpha=0.7)
plt.xlabel("math"); plt.ylabel("physics")
```

Nhìn các điểm: **đi lên** (tương quan dương), **đi xuống** (âm), hay **tản mát** (gần như không liên quan)? Có điểm nào "lạc loài"?

Tô màu theo nhóm:

```python
for c, g in df.groupby("class"):
    plt.scatter(g["math"], g["physics"], label=f"Lớp {c}")
plt.legend()
```

## So sánh theo nhóm

```python
df.groupby("class")[["math", "physics", "literature"]].mean().plot(kind="bar")
```

## Nhiều biểu đồ một hình: subplots

```python
fig, axes = plt.subplots(1, 3, figsize=(13, 4))
axes[0].hist(df["math"], bins=8)
axes[1].scatter(df["math"], df["physics"])
df.boxplot(column="math", by="class", ax=axes[2])
plt.tight_layout()
plt.show()
```

Truyền `ax=axes[i]` để vẽ vào đúng ô.

## Cảnh báo khi đọc biểu đồ

- **Tương quan không phải nhân quả:** hai biến cùng đi lên không có nghĩa cái này gây ra cái kia.
- Ít dữ liệu thì hình dạng dễ **đánh lừa**.
- Số bins hoặc thang trục khác nhau có thể làm **cùng dữ liệu trông rất khác**.

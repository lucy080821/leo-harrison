# Dự án: Sổ điểm học sinh

Dự án cuối của khoá Python cơ bản. Bạn sẽ dựng một chương trình **quản lý điểm học sinh**: tính trung bình, xếp loại, xếp hạng và in báo cáo gọn gàng. Bài này dùng gần như mọi thứ đã học.

## Dữ liệu

Cấu trúc tự nhiên: **từ điển** với khoá là tên học sinh, giá trị là **danh sách** điểm.

```python
students = {
    "An":   [8, 9, 7],
    "Binh": [6, 5, 7],
    "Chi":  [10, 9, 10],
}
```

## Chia việc thành các hàm nhỏ

Mỗi hàm **một việc**, dễ kiểm tra riêng:

```python
def average(scores):
    return sum(scores) / len(scores)

def letter(avg):
    if avg >= 9:
        return "A"
    elif avg >= 8:
        return "B"
    elif avg >= 6.5:
        return "C"
    return "D"
```

Trung bình cộng của $n$ điểm: $\bar{x} = \dfrac{1}{n}\sum_{i=1}^{n} x_i$.

## In báo cáo đẹp với f-string

```python
for name, scores in students.items():
    avg = average(scores)
    print(f"{name:<6} {avg:5.2f}  {letter(avg)}")
```

Định dạng `{name:<6}` canh trái độ rộng 6; `{avg:5.2f}` rộng 5, 2 chữ số thập phân.

```text
An      8.00  B
Binh    6.00  D
Chi     9.67  A
```

## Xếp hạng với sorted và key

```python
ranking = sorted(students, key=lambda n: average(students[n]), reverse=True)
```

`key` cho `sorted` biết **sắp theo tiêu chí nào**.

## Kế hoạch từng bước (cách tiếp cận tốt cho mọi dự án)

1. **Dữ liệu trước:** chọn cấu trúc (dict/list) hợp lý.
2. **Viết hàm nhỏ**, thử từng hàm với vài ví dụ.
3. **Ghép lại** bằng vòng lặp để in báo cáo.
4. **Bổ sung** tính năng dần dần.

## Gợi ý mở rộng (tự làm thêm)

- Thêm hàm `add_score(name, score)` và `add_student(name)`.
- Tìm học sinh **có môn thấp nhất**, hoặc **điểm cao nhất** của cả lớp.
- Thống kê: điểm trung bình cả lớp, số học sinh mỗi loại A/B/C/D (dùng `collections.Counter`).
- Lưu/đọc sổ điểm bằng **JSON** (bài File, JSON và CSV).
- Biến thành **class** `GradeBook` với các phương thức, hoặc `Student` có `.average()`.
- Bắt lỗi khi điểm ngoài khoảng 0-10 bằng `raise ValueError`.

## Chúc mừng!

Bạn đã đi hết khoá Python cơ bản: biến, kiểu dữ liệu, điều kiện, vòng lặp, list/tuple/set/dict, hàm, comprehension, module, file, ngoại lệ và lớp. Bước tiếp theo là **Python cho Data Analyst** (numpy, pandas, biểu đồ) rồi **Machine Learning**.

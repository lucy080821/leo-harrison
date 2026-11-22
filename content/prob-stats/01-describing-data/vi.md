# Mô tả dữ liệu: trung bình, trung vị, độ lệch chuẩn

**Thống kê mô tả (descriptive statistics)** tóm tắt một tập dữ liệu bằng vài con số và biểu đồ trước khi làm bất cứ suy luận nào. Giáo trình NIST/SEMATECH *e-Handbook of Statistical Methods* và John Tukey (*Exploratory Data Analysis*, 1977) nhấn mạnh: **hãy nhìn dữ liệu trước khi tính toán**.

## Đo vị trí trung tâm

- **Trung bình (mean)** x̄ = (x₁ + … + xₙ) / n. Nhạy với giá trị cực đoan.
- **Trung vị (median)**: giá trị ở giữa khi sắp xếp. Bền vững với ngoại lai.
- **Mốt (mode)**: giá trị xuất hiện nhiều nhất.

Ví dụ lương 10 nhân viên (triệu đồng/tháng) có một giám đốc lương 120: trung bình bị kéo lên 27,7 nhưng trung vị chỉ 17. Khi nói "lương trung bình của công ty", hãy hỏi *trung bình hay trung vị?*

## Đo độ phân tán

- **Khoảng (range)**: lớn nhất − nhỏ nhất.
- **Phương sai mẫu** s² = Σ(xᵢ − x̄)² / (n − 1) và **độ lệch chuẩn** s = √s². Mẫu số n − 1 (hiệu chỉnh Bessel) làm s² là ước lượng không chệch của phương sai tổng thể.
- **Khoảng tứ phân vị (IQR)** = Q3 − Q1: độ rộng của 50% dữ liệu ở giữa, bền vững với ngoại lai.

## Biểu đồ hộp và ngoại lai

Tukey đề xuất **biểu đồ hộp (box plot)**: hộp từ Q1 đến Q3, vạch ở trung vị, "râu" kéo ra tới các điểm còn nằm trong [Q1 − 1,5·IQR, Q3 + 1,5·IQR]; điểm ngoài khoảng đó được vẽ riêng và gọi là **ngoại lai (outlier)** theo quy ước phổ biến này.

![Biểu đồ hộp của 10 mức lương; điểm 120 là ngoại lai](/lessons/prob-stats/01-describing-data-box-vi.svg)
*Hộp từ Q1 đến Q3, vạch đỏ là trung vị; trung bình bị kéo lên bởi ngoại lai.*

> Quy tắc 1,5·IQR là quy ước, không phải định luật. Ngoại lai có thể là lỗi nhập liệu, nhưng cũng có thể là thông tin quan trọng nhất.

## Thử ngay

Đổi 120 thành 30 và so sánh trung bình với trung vị.

## Nguồn tham khảo

- NIST/SEMATECH. *e-Handbook of Statistical Methods*, chương 1 (Exploratory Data Analysis), itl.nist.gov/div898/handbook.
- Tukey, J. W. (1977). *Exploratory Data Analysis*. Addison-Wesley.
- Diez, Çetinkaya-Rundel, Barr. *OpenIntro Statistics*, chương 2 (Summarizing data).

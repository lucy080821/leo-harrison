# Ngoại lai và điền giá trị thiếu (imputation)

Hai việc làm sạch gây tranh luận nhất. Quyết định sai làm **lệch** kết quả hoặc **thổi phồng** độ chắc chắn.

## Phát hiện ngoại lai

- **Quy tắc IQR** (Tukey): ngoại lai nếu `< Q1 − 1,5·IQR` hoặc `> Q3 + 1,5·IQR`. Bền với phân phối lệch.
- **Điểm z**: `|z| > 3`. Nhạy với chính ngoại lai (trung bình và độ lệch chuẩn bị kéo), nên kém tin cậy khi mẫu nhỏ.
- **Theo ngữ cảnh**: tuổi 200 hay diện tích âm là sai logic, không cần công thức.

## Làm gì với ngoại lai?

1. **Điều tra trước**: lỗi nhập hay thông tin thật (khách VIP)?
2. Giữ nếu thật; dùng **thống kê bền** (trung vị, IQR) thay trung bình.
3. **Winsorize**: kẹp vào [Pk, P(100−k)] (`clip`) để giảm ảnh hưởng mà không mất dòng.
4. Loại chỉ khi chắc là lỗi, và **báo cáo** số lượng.

![Phát hiện ngoại lai bằng IQR và điền giá trị thiếu](/lessons/python-data/21-outliers-imputation-fig-vi.svg)
*Phát hiện ngoại lai bằng IQR và điền giá trị thiếu*

## Điền giá trị thiếu (imputation)

| Cách | Khi nào | Rủi ro |
|---|---|---|
| Trung bình/trung vị | thiếu ngẫu nhiên, ít | thu hẹp phương sai |
| **Trung vị theo nhóm** | biết nhóm liên quan (số phòng) | tốt hơn toàn cục |
| Điền giá trị trước (`ffill`) | chuỗi thời gian | chỉ khi hợp lý nghiệp vụ |
| Mô hình (KNN, hồi quy) | thiếu có cấu trúc | phức tạp |

**Luôn tạo cột cờ** `x_missing`: bản thân việc thiếu có thể mang thông tin.

## Nguy hiểm: rò rỉ dữ liệu

Khi làm mô hình dự đoán, tính trung vị để điền **chỉ trên tập huấn luyện**, rồi áp dụng cho tập kiểm tra. Điền bằng thống kê của **toàn bộ** dữ liệu làm lộ thông tin từ tập kiểm tra (data leakage).

## Nguồn tham khảo

- Tukey, J. W. (1977). *Exploratory Data Analysis*.
- Little, R. & Rubin, D. *Statistical Analysis with Missing Data* (Wiley).
- pandas documentation, "Working with missing data".

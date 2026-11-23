# Phân tích cohort và giữ chân người dùng

Trung bình toàn bộ che giấu xu hướng. **Cohort** là nhóm người dùng có chung đặc điểm xuất phát (thường tháng đăng ký). So cohort cho thấy sản phẩm đang **tốt lên hay tệ đi**.

## Ba bước

1. **Gán cohort**: tháng đăng ký của mỗi người (`dt.to_period("M")`).
2. **Tính tuổi**: số tháng từ lúc đăng ký đến mỗi sự kiện (tháng 0, 1, 2…).
3. **Đếm người duy nhất** hoạt động theo (cohort, tuổi) rồi **chia cho quy mô cohort**.

![Ma trận giữ chân theo nhóm tháng đăng ký](/lessons/python-data/24-cohort-retention-fig-vi.svg)
*Ma trận giữ chân theo nhóm tháng đăng ký*

## Đọc ma trận giữ chân

- Hàng = cohort, cột = tháng thứ k; ô = % người còn hoạt động.
- **Cột 0 gần 100%** (hoạt động ngay tháng đăng ký). Đường cong dốc xuống rồi **phẳng** là dấu hiệu sản phẩm có người dùng trung thành.
- So **cùng cột giữa các hàng**: cohort mới có giữ chân tốt hơn cohort cũ không? Đó là tác động của cải tiến sản phẩm.

## Lưu ý dữ liệu

- Sự kiện của người dùng **không có trong bảng users** (mồ côi) làm hỏng phép nối: loại ra và báo cáo.
- Cohort tháng cuối chưa đủ thời gian quan sát: **đừng** so sánh ngang các ô chưa đủ tuổi.
- Định nghĩa "hoạt động" phải rõ (mọi sự kiện hay chỉ sự kiện có giá trị?).

## Nguồn tham khảo

- pandas documentation, `Period`, `groupby`, `unstack`.
- Croll & Yoskovitz. *Lean Analytics*, chương về giữ chân.
- Khoá SQL của Lexi Learn, bài phân tích cohort (cùng phương pháp bằng SQL).

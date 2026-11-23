# Phân khúc khách hàng RFM

Không phải khách nào cũng như nhau. **RFM** là cách phân khúc kinh điển trong marketing cơ sở dữ liệu, dùng ba số tính được từ lịch sử mua hàng:

- **R (Recency)**: lần mua gần nhất cách đây bao lâu (càng ít càng tốt).
- **F (Frequency)**: mua bao nhiêu lần.
- **M (Monetary)**: tổng tiền đã chi.

## Các bước

1. **Tính R, F, M** cho từng khách (`GROUP BY user_id`): `julianday(mốc) − julianday(MAX(ngay_mua))`, `COUNT(*)`, `SUM(tien)`.
2. **Chấm điểm** mỗi chỉ số bằng `NTILE(n)` (thường n = 3–5). Lưu ý R **ngược chiều**: số ngày ít = điểm cao.
3. **Đặt tên phân khúc** từ tổ hợp điểm, ví dụ:
   - R cao, F cao, M cao: **Khách trung thành (Champions)**.
   - R cao, F thấp: **Khách mới**.
   - R thấp, F/M cao trước đây: **Sắp rời bỏ** (cần chiến dịch kéo lại).
   - R, F, M đều thấp: **Đã mất**.

![Phân khúc khách hàng RFM bằng NTILE](/lessons/sql/27-rfm-segmentation-fig-vi.svg)
*Phân khúc khách hàng RFM bằng NTILE*

## Dùng RFM để hành động

Mỗi phân khúc một chiến lược: thưởng cho khách trung thành, ưu đãi kéo lại cho nhóm "sắp rời bỏ", không tốn ngân sách cho nhóm đã mất. Đo hiệu quả bằng thử nghiệm A/B.

## Hạn chế

- Chỉ nhìn **hành vi mua**, bỏ qua nhân khẩu học và sản phẩm.
- Ngưỡng NTILE chia đều theo **thứ hạng**, không phản ánh khoảng cách thật; có thể dùng ngưỡng theo nghiệp vụ.
- Khi nhiều khách cùng giá trị, NTILE chia **không ổn định**: thêm tiêu chí phụ (`ORDER BY monetary DESC, user_id`) để kết quả xác định.

## Nguồn tham khảo

- Hughes, A. M. (1994). *Strategic Database Marketing*.
- Fader, P., Hardie, B., Lee, K. L. (2005). RFM and CLV: using iso-value curves for customer base analysis. *Journal of Marketing Research* 42(4).
- Winand, M.: ví dụ NTILE; SQLite documentation, "Window Functions".

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

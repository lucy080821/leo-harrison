# Phân khúc khách hàng bằng RFM

Không thể đối xử mọi khách như nhau. **RFM** là kỹ thuật phân khúc kinh điển trong marketing dựa trên hành vi mua:

| Chữ | Nghĩa | Câu hỏi |
|---|---|---|
| **R**ecency | số ngày từ lần mua gần nhất | Còn "nóng" không? |
| **F**requency | số lần mua | Mua thường xuyên không? |
| **M**onetary | tổng chi tiêu | Giá trị bao nhiêu? |

![Chấm điểm RFM chia khách hàng thành nhóm hành động được](/lessons/python-data/25-rfm-segmentation-fig-vi.svg)
*Chấm điểm RFM chia khách hàng thành nhóm hành động được*

## Quy trình

1. **Làm sạch** (bỏ đơn trùng) và chọn **ngày tham chiếu** (ngày cuối + 1).
2. `groupby(khách).agg(...)` ra R, F, M.
3. **Chấm điểm 1–4** bằng `pd.qcut` (chia theo tứ phân vị). R đảo chiều vì *nhỏ là tốt*.
4. Gộp thành **phân khúc có tên** và gắn hành động.

## Phân khúc và hành động gợi ý

| Phân khúc | Quy tắc | Hành động |
|---|---|---|
| Champions | R, F, M đều cao | thưởng, xin giới thiệu |
| Cần giữ chân | từng mua nhiều, lâu không quay lại | chiến dịch "nhớ bạn", ưu đãi |
| Mới | R cao, F thấp | hướng dẫn, khuyến khích mua lần 2 |
| Ngủ đông | R thấp, F thấp | cân nhắc chi phí kích hoạt lại |

## Lưu ý

- `qcut` lỗi khi có quá nhiều giá trị trùng: dùng `rank(method="first")` trước.
- Ngưỡng điểm phải **hợp với ngành** (cà phê mua hằng tuần khác nội thất mua 5 năm một lần).
- RFM mô tả quá khứ; để **dự đoán** giá trị tương lai dùng mô hình (BG/NBD, hồi quy).

## Nguồn tham khảo

- Hughes, A. M. (1994). *Strategic Database Marketing*.
- pandas documentation, `qcut`.
- Fader & Hardie, các tài liệu về mô hình CLV (BG/NBD).

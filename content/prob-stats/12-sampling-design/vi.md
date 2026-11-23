# Thiết kế mẫu: chọn ai để hỏi và sai lệch nào cần tránh

Kết luận từ mẫu chỉ đáng tin nếu **mẫu được chọn đúng**. Tăng cỡ mẫu *không* sửa được một mẫu lệch.

## Các cách chọn mẫu

- **Mẫu ngẫu nhiên đơn giản (SRS)**: mọi nhóm n người đều có cùng xác suất được chọn. Nền tảng của lý thuyết.
- **Mẫu phân tầng**: chia tổng thể thành các tầng đồng nhất (vùng, nhóm tuổi), lấy mẫu trong từng tầng rồi gộp có trọng số. Giảm phương sai khi các tầng khác nhau nhiều.
- **Mẫu chùm (cluster)**: chọn ngẫu nhiên *cả nhóm* (trường, quận) rồi khảo sát mọi người trong nhóm. Rẻ hơn nhưng kém chính xác hơn.
- **Mẫu hệ thống**: lấy mỗi người thứ k trong danh sách.

![Bốn cách chọn mẫu minh hoạ trên lưới các cá thể](/lessons/prob-stats/12-sampling-design-sample-vi.svg)
*Chấm đậm là cá thể được chọn: ngẫu nhiên, phân tầng, chùm và hệ thống.*

## Các nguồn sai lệch

1. **Chọn mẫu**: khung lấy mẫu thiếu một nhóm (chỉ hỏi người dùng mạng).
2. **Không phản hồi**: người trả lời khác người bỏ qua.
3. **Tự chọn**: khảo sát tự nguyện thu hút người có ý kiến mạnh.
4. **Đo lường**: câu hỏi gợi ý hoặc nhớ sai.

Cuộc thăm dò *Literary Digest* năm 1936 (hơn 2 triệu phiếu) dự đoán sai vì khung lấy mẫu lệch; một mẫu nhỏ hơn nhưng ngẫu nhiên của Gallup lại đúng.

## Cỡ mẫu cho khảo sát tỷ lệ

Biên sai số `e = z·√(p(1 − p)/n)` suy ra `n = z²·p(1 − p)/e²`. Dùng p = 0,5 (trường hợp xấu nhất): biên ±3% ở độ tin cậy 95% cần n ≈ **1.068**, gần như độc lập với dân số (khi mẫu nhỏ so với dân số).

## Nguồn tham khảo

- Lohr, S. *Sampling: Design and Analysis* (CRC Press).
- Diez et al., *OpenIntro Statistics*, chương 1 (Sampling) và 5.
- Squire, P. (1988). Why the 1936 Literary Digest poll failed. *Public Opinion Quarterly* 52(1).

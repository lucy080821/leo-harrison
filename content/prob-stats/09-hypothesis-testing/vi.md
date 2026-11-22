# Kiểm định giả thuyết và p-value

## Logic của kiểm định

Câu hỏi: *chênh lệch ta thấy là có thật, hay chỉ do may rủi khi chọn mẫu?* Quy trình (Fisher, Neyman–Pearson, ngày nay thường trộn lẫn):

1. Đặt **giả thuyết không H₀**: "không có khác biệt" (hai phiên bản có tỷ lệ chuyển đổi như nhau).
2. Chọn **thống kê kiểm định** (ví dụ điểm z) đo dữ liệu lệch khỏi H₀ bao nhiêu.
3. Tính **p-value**: xác suất thu được kết quả *ít nhất cực đoan như đã quan sát*, **nếu H₀ đúng**.
4. p nhỏ ⇒ dữ liệu khó giải thích bằng H₀ ⇒ nghi ngờ H₀.

![Đường chuẩn với hai đuôi tô màu ứng với |z| lớn hơn quan sát](/lessons/prob-stats/09-hypothesis-testing-pval-vi.svg)
*p-value là tổng diện tích hai đuôi: xác suất thấy kết quả cực đoan như vậy nếu H₀ đúng.*

## Hai loại sai lầm

| | H₀ đúng | H₀ sai |
|---|---|---|
| Bác bỏ H₀ | **Sai lầm loại I** (dương tính giả), xác suất α | đúng (power = 1 − β) |
| Không bác bỏ | đúng | **Sai lầm loại II** (âm tính giả), xác suất β |

Ngưỡng α = 0,05 là quy ước phổ biến do Ronald Fisher gợi ý, **không phải luật tự nhiên**.

## Cảnh báo: p-value hay bị hiểu sai

Tuyên bố của Hiệp hội Thống kê Mỹ (ASA, Wasserstein & Lazar, 2016) nêu sáu nguyên tắc, trong đó:

- p-value **không** phải xác suất giả thuyết là đúng.
- Kết luận không nên chỉ dựa vào việc p vượt ngưỡng hay không.
- Cần báo cáo đầy đủ và minh bạch; thử nhiều phân tích rồi chỉ báo cáo cái "có ý nghĩa" (*p-hacking*) làm kết quả vô nghĩa.
- p-value không đo **độ lớn** hay **tầm quan trọng thực tế** của hiệu ứng: với mẫu rất lớn, chênh lệch nhỏ xíu cũng có p nhỏ.

## Ví dụ thực tế: thử nghiệm A/B

Nút "Mua ngay" xanh (A) chuyển đổi 10,0%, nút cam (B) 12,0%, mỗi nhóm 2.000 lượt. Điểm z ≈ 2,02, p ≈ 0,043 ⇒ ở mức 5% có bằng chứng B khác A. Nhưng hãy hỏi thêm: chênh lệch +2 điểm % có đáng thay đổi không (ý nghĩa thực tế)? Khoảng tin cậy của hiệu là bao nhiêu?

## Nguồn tham khảo

- Wasserstein, R. L. & Lazar, N. A. (2016). The ASA Statement on p-Values: Context, Process, and Purpose. *The American Statistician* 70(2), 129–133.
- Diez et al., *OpenIntro Statistics*, chương 5–6 (Inference for proportions).
- Fisher, R. A. (1925). *Statistical Methods for Research Workers*.
- MIT OCW 18.05: Null hypothesis significance testing.

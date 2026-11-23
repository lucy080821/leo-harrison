# So sánh bội: khi chạy nhiều kiểm định

Chạy **một** kiểm định ở α = 5% có 5% khả năng báo nhầm. Chạy **20** kiểm định mà *không có gì thật*, xác suất có ít nhất một "phát hiện" giả là 1 − 0,95²⁰ ≈ **64%**. Đây là cạm bẫy khi phân tích nhiều chỉ số, nhiều nhóm khách, nhiều phiên bản, hoặc đào bới dữ liệu (*p-hacking*, như tuyên bố ASA 2016 cảnh báo).

![Xác suất có ít nhất một dương tính giả tăng nhanh theo số kiểm định](/lessons/prob-stats/21-multiple-testing-mult-vi.svg)
*Với 20 kiểm định ở mức 5% đã có khoảng 64% khả năng gặp một dương tính giả.*

## Hai thước đo lỗi

- **FWER** (family-wise error rate): xác suất có **ít nhất một** dương tính giả trong cả họ.
- **FDR** (false discovery rate): **tỷ lệ kỳ vọng** các phát hiện là sai.

## Cách hiệu chỉnh

- **Bonferroni**: bác bỏ khi p ≤ α/m. Kiểm soát FWER, đơn giản nhưng rất thận trọng (mất power) khi m lớn.
- **Holm**: tuần tự, kiểm soát FWER và luôn mạnh hơn Bonferroni.
- **Benjamini–Hochberg (1995)**: sắp xếp p₍₁₎ ≤ … ≤ p₍ₘ₎, tìm i lớn nhất có `p₍ᵢ₎ ≤ (i/m)·q`, bác bỏ i giả thuyết đầu. Kiểm soát FDR ở mức q; phù hợp khi sàng lọc nhiều ứng viên (gen, đặc trưng, chỉ số).

Với 10 giá trị p ví dụ: Bonferroni bác bỏ 1, Benjamini–Hochberg (q = 0,05) bác bỏ 2.

## Lời khuyên nghề nghiệp

- **Khai báo trước** các kiểm định cần chạy (tiền đăng ký phân tích).
- Chọn **một chỉ số chính**; các chỉ số khác là khám phá, báo cáo kèm hiệu chỉnh.
- Báo cáo **tất cả** những gì đã thử, không chỉ cái "có ý nghĩa".

## Nguồn tham khảo

- Benjamini, Y. & Hochberg, Y. (1995). Controlling the false discovery rate. *J. Royal Statistical Society B* 57(1).
- Holm, S. (1979). A simple sequentially rejective multiple test procedure. *Scand. J. Statist.* 6.
- Wasserstein & Lazar (2016). The ASA statement on p-values. *The American Statistician* 70(2).

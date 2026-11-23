# Chẩn đoán hồi quy: phần dư, đòn bẩy và bộ tứ Anscombe

Một mô hình hồi quy luôn cho ra con số, kể cả khi nó **sai**. Chẩn đoán là bước kiểm tra xem các giả định có hợp lý không. Francis Anscombe (1973) minh hoạ bằng **bốn bộ dữ liệu** có cùng trung bình, phương sai, tương quan (≈ 0,816) và đường hồi quy, nhưng hình dạng hoàn toàn khác: một tuyến tính, một cong, một có ngoại lai, một bị một điểm kéo.

![Hai bộ dữ liệu Anscombe có cùng đường hồi quy nhưng hình dạng khác hẳn, kèm đồ thị phần dư](/lessons/prob-stats/25-regression-diagnostics-diag-vi.svg)
*Bộ I tuyến tính; bộ II cong nên phần dư có dạng parabol, báo hiệu mô hình sai.*

**Bài học: luôn vẽ dữ liệu.**

## Các giả định (LINE)

1. **L**inearity: quan hệ trung bình là tuyến tính.
2. **I**ndependence: phần dư độc lập (hay bị phá vỡ ở chuỗi thời gian).
3. **N**ormality: phần dư xấp xỉ chuẩn (quan trọng cho khoảng tin cậy khi n nhỏ).
4. **E**qual variance: phương sai phần dư không đổi (*homoscedasticity*).

## Công cụ chẩn đoán

- **Đồ thị phần dư theo giá trị dự đoán**: phải trông như đám mây ngẫu nhiên quanh 0. Hình cong ⇒ thiếu số hạng phi tuyến; hình phễu ⇒ phương sai thay đổi (xử lý bằng log, hồi quy có trọng số, sai số chuẩn bền vững).
- **Q–Q plot** của phần dư: kiểm tra tính chuẩn.
- **Đòn bẩy** hᵢ: điểm có x xa trung tâm. Với hồi quy đơn `hᵢ = 1/n + (xᵢ − x̄)²/Sxx`.
- **Khoảng cách Cook** Dᵢ: đo mức một điểm làm đổi toàn bộ đường hồi quy; điểm vừa có đòn bẩy cao vừa có phần dư lớn là điểm **ảnh hưởng**.

## Xử lý điểm ảnh hưởng

Điều tra trước khi xoá: là lỗi nhập liệu hay thông tin thật? Chạy mô hình có và không có điểm đó, báo cáo cả hai.

## Nguồn tham khảo

- Anscombe, F. J. (1973). Graphs in statistical analysis. *The American Statistician* 27(1).
- Cook, R. D. (1977). Detection of influential observation in linear regression. *Technometrics* 19(1).
- Gelman, Hill, Vehtari. *Regression and Other Stories*, chương 11 (Assumptions, diagnostics).

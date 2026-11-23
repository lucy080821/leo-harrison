# ANOVA: so sánh nhiều nhóm cùng lúc

Muốn so **ba nhóm trở lên** (3 phương pháp, 4 vùng, 5 phiên bản trang), chạy nhiều kiểm định t từng cặp làm tăng sai dương tính (bài 21). **ANOVA** (Ronald Fisher, những năm 1920) kiểm định một lần: *các trung bình có bằng nhau không?*

## Ý tưởng: so hai nguồn biến thiên

- **Giữa các nhóm** `SSB = Σ nⱼ(x̄ⱼ − x̄)²`: các trung bình nhóm cách nhau thế nào.
- **Trong nhóm** `SSW = Σ Σ (xᵢⱼ − x̄ⱼ)²`: độ phân tán bên trong từng nhóm (nhiễu).

`F = (SSB/(k − 1)) / (SSW/(N − k))`

F lớn ⇒ khác biệt giữa nhóm lớn so với nhiễu trong nhóm ⇒ bác bỏ H₀: μ₁ = … = μ_k. F có phân phối F (k − 1 và N − k bậc tự do) khi dữ liệu chuẩn, phương sai tương đương và độc lập.

![Ba nhóm dữ liệu với trung bình nhóm và trung bình chung](/lessons/prob-stats/19-anova-anova-vi.svg)
*Khoảng cách giữa các trung bình nhóm (giữa nhóm) so với độ rộng của từng nhóm (trong nhóm) quyết định F.*

## Cỡ hiệu ứng

`η² = SSB / (SSB + SSW)` cho biết **tỷ lệ biến thiên được giải thích** bởi nhóm. Ví dụ ba nhóm [5–7], [8–10], [11–13]: F = 27 và η² ≈ 0,90.

## Sau ANOVA

ANOVA chỉ nói *có ít nhất một khác biệt*, không nói **nhóm nào**. Dùng **so sánh sau** có hiệu chỉnh: Tukey HSD hoặc kiểm định t kèm Bonferroni/Holm. Nếu dữ liệu không chuẩn hay phương sai chênh nhiều: **Kruskal–Wallis** (phi tham số) hoặc Welch-ANOVA.

## Ứng dụng nghề nghiệp

Kiểm tra A/B/C/n phiên bản giao diện, so hiệu quả vận hành giữa các chi nhánh, so các phương pháp đào tạo. ANOVA cũng là trường hợp riêng của **hồi quy tuyến tính** với biến giả (bài 24).

## Nguồn tham khảo

- Fisher, R. A. (1925). *Statistical Methods for Research Workers*.
- Diez et al., *OpenIntro Statistics*, chương 7.5 (ANOVA).
- NIST/SEMATECH *e-Handbook*, mục 7.4.3 (One-way ANOVA).

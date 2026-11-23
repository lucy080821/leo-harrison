# Kiểm định t: so sánh trung bình

Bài 14 dùng điểm z, đúng khi biết σ hoặc n lớn. Thực tế ta **ước lượng σ bằng s** từ mẫu nhỏ, và độ bất định thêm này làm phân phối rộng hơn.

## Phân phối t

William Gosset ("Student", 1908), làm việc tại nhà máy bia Guinness, đưa ra **phân phối t**: với dữ liệu xấp xỉ chuẩn,

`t = (x̄ − μ) / (s/√n)` ~ **t với n − 1 bậc tự do**.

Đuôi dày hơn chuẩn, tiến dần về chuẩn khi n tăng.

![Phân phối t với 3 và 30 bậc tự do so với phân phối chuẩn](/lessons/prob-stats/15-t-tests-t-vi.svg)
*Với ít dữ liệu, đuôi t dày hơn (cần ngưỡng lớn hơn); khi n lớn t gần như trùng chuẩn.*

## Ba kiểm định hay dùng

1. **Một mẫu**: trung bình có bằng μ₀ không? `t = (x̄ − μ₀)/(s/√n)`.
2. **Hai mẫu độc lập (Welch)**: `t = (x̄₁ − x̄₂)/√(s₁²/n₁ + s₂²/n₂)`. Không giả định phương sai bằng nhau; nên là mặc định.
3. **Ghép cặp**: cùng đối tượng đo hai lần (trước–sau): lấy hiệu d rồi làm kiểm định một mẫu với μ₀ = 0. Mạnh hơn hai mẫu độc lập vì loại bỏ khác biệt giữa các cá nhân.

## Giả định và kiểm tra

Dữ liệu độc lập; xấp xỉ chuẩn (n nhỏ cần vẽ biểu đồ, n lớn nhờ CLT ít lo hơn); không có ngoại lai chi phối. Nếu vi phạm: dùng kiểm định phi tham số hoặc bootstrap (bài 20).

## Ví dụ nghề nghiệp

So thời gian tải trang trước và sau tối ưu, hiệu quả đào tạo (ghép cặp), năng suất hai ca. Luôn báo cáo **khoảng tin cậy của hiệu**, không chỉ p-value (xem bài 16).

## Nguồn tham khảo

- Student (Gosset, W. S.) (1908). The probable error of a mean. *Biometrika* 6(1).
- Diez et al., *OpenIntro Statistics*, chương 7 (Inference for numerical data).
- NIST/SEMATECH *e-Handbook*, mục 1.3.5.2 (t-test).

# Năng lực kiểm định và cỡ mẫu cho thử nghiệm A/B

Bài 16 nói về sai lầm loại I (α). Nhưng nếu hiệu ứng *có thật* mà thử nghiệm quá nhỏ không phát hiện được thì sao? Đó là sai lầm loại II.

## Power

**Power = 1 − β** = xác suất bác bỏ H₀ **khi H₀ sai** (phát hiện được hiệu ứng thật). Quy ước phổ biến là 80%. Power phụ thuộc bốn thứ:

1. **Cỡ mẫu n** (tăng n ⇒ tăng power).
2. **Cỡ hiệu ứng** δ (hiệu ứng lớn dễ phát hiện).
3. **Độ nhiễu** σ (nhiễu thấp ⇒ power cao).
4. **Mức α** (α lớn hơn ⇒ power cao hơn, đổi lại sai dương tính nhiều hơn).

![Hai phân phối của thống kê kiểm định dưới H₀ và dưới giả thuyết thay thế, vùng power được tô](/lessons/prob-stats/17-power-sample-size-power-vi.svg)
*Vùng tô xanh là power: xác suất vượt ngưỡng khi hiệu ứng có thật; vùng đỏ là sai lầm loại II (β).*

## Tính cỡ mẫu

Để so hai tỷ lệ p₁ và p₂ (mỗi nhóm n):

`n = 2·(z_{α/2} + z_β)² · p̄(1 − p̄) / (p₂ − p₁)²`, p̄ = (p₁ + p₂)/2.

Phát hiện tỷ lệ chuyển đổi tăng 10% → 12% ở α = 0,05, power 80% cần ≈ **3.800 người mỗi nhóm**. Hiệu ứng giảm một nửa ⇒ cỡ mẫu tăng khoảng **4 lần** (n tỷ lệ 1/δ²).

## Thực hành nghề nghiệp

- **Xác định MDE** (hiệu ứng nhỏ nhất đáng phát hiện) *trước* khi chạy, theo giá trị kinh doanh chứ không theo dữ liệu.
- **Đừng dừng sớm khi thấy p < 0,05** (peeking làm tăng sai dương tính); hoặc dùng phương pháp kiểm định tuần tự.
- Một thử nghiệm thiếu power không "chứng minh không có tác dụng"; nó chỉ không đủ thông tin.

## Nguồn tham khảo

- Cohen, J. (1988). *Statistical Power Analysis for the Behavioral Sciences* (2nd ed.).
- Kohavi, R., Tang, D., Xu, Y. (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.
- Diez et al., *OpenIntro Statistics*, mục 5.4 (Power).

# Phân phối chuẩn và điểm z

## Biến liên tục và hàm mật độ

Với biến **liên tục** (chiều cao, thời gian), xác suất một giá trị đúng bằng 0; ta nói về xác suất trong **khoảng**, bằng **diện tích dưới hàm mật độ f(x)**: P(a ≤ X ≤ b) = ∫ₐᵇ f(x) dx (bài tích phân sẽ nói rõ hơn).

## Phân phối chuẩn

**Phân phối chuẩn N(μ, σ²)** có mật độ hình chuông:

`f(x) = 1/(σ√(2π)) · exp(−(x − μ)² / (2σ²))`

μ là tâm, σ là độ rộng. Do Abraham de Moivre (1733) tìm ra khi xấp xỉ nhị thức, Gauss (1809) dùng để mô tả sai số đo, nên còn gọi là phân phối Gauss.

**Quy tắc 68–95–99,7:** khoảng μ ± 1σ chứa ≈ 68%, μ ± 2σ ≈ 95%, μ ± 3σ ≈ 99,7% xác suất.

![Đường cong chuẩn với vùng 68%, 95%, 99,7% tô theo độ lệch chuẩn](/lessons/prob-stats/06-normal-normal-vi.svg)
*Diện tích dưới đường cong trong khoảng ±1σ, ±2σ, ±3σ lần lượt xấp xỉ 68%, 95%, 99,7%.*

## Điểm z: chuẩn hoá

`z = (x − μ) / σ` cho biết x cách trung bình bao nhiêu độ lệch chuẩn. Nhờ đó mọi phân phối chuẩn quy về **N(0, 1)** và ta có thể so sánh những thứ khác đơn vị: một học sinh được 85/100 ở bài thi trung bình 70, σ = 10 (z = 1,5) so với 600/800 ở bài thi trung bình 500, σ = 100 (z = 1) ⇒ học sinh đầu tương đối tốt hơn.

## Khi nào dùng chuẩn?

Chiều cao, sai số đo, điểm nhiễu thường xấp xỉ chuẩn; thu nhập, giá nhà, thời gian chờ thì thường **lệch phải** nên không nên dùng chuẩn. Lý do chuẩn xuất hiện nhiều được giải thích bởi **định lý giới hạn trung tâm** (bài 7).

## Nguồn tham khảo

- Blitzstein & Hwang, *Introduction to Probability*, chương 5 (Continuous random variables) và 5.4 (Normal).
- NIST/SEMATECH *e-Handbook*, mục 1.3.6.6.1 (Normal distribution).
- Diez et al., *OpenIntro Statistics*, chương 3 (Distributions of random variables).

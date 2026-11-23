# Suy luận Bayes: cập nhật niềm tin từ dữ liệu

Bài 4 giới thiệu công thức Bayes cho *sự kiện*. Suy luận Bayes áp dụng nó cho **tham số**: coi θ cũng là đại lượng bất định có phân phối.

`p(θ | dữ liệu) ∝ p(dữ liệu | θ) · p(θ)`

**Hậu nghiệm ∝ Hợp lý × Tiên nghiệm.** Tiên nghiệm mã hoá hiểu biết trước khi thấy dữ liệu; dữ liệu cập nhật nó.

## Mô hình Beta–nhị thức

Tỷ lệ chuyển đổi p, tiên nghiệm **Beta(α, β)**. Quan sát k thành công trong n lần ⇒ hậu nghiệm cũng là Beta:

`p | dữ liệu ~ Beta(α + k, β + n − k)`

(đây là **liên hợp**: tiên nghiệm và hậu nghiệm cùng họ nên tính tay được). Beta(1, 1) là phân phối đều (không biết gì). Trung bình hậu nghiệm `(α + k)/(α + β + n)`.

![Tiên nghiệm Beta(1,1) và hậu nghiệm Beta(8,4) sau 7 thành công trong 10 lần](/lessons/prob-stats/22-bayesian-inference-bayes2-vi.svg)
*Dữ liệu dồn niềm tin về quanh 0,67; vùng tô là khoảng tin cậy Bayes 95%.*

## Khoảng tin cậy Bayes (credible interval)

Khoảng chứa p với xác suất 95% **theo hậu nghiệm**; diễn giải trực tiếp: "p nằm trong khoảng này với xác suất 95%". Khác khoảng tin cậy tần suất (bài 14).

## Vì sao dân chuyên nghiệp dùng Bayes

- Trả lời **câu hỏi kinh doanh trực tiếp**: P(B tốt hơn A) = 94%, không cần giải thích p-value.
- Kết hợp **kiến thức sẵn có** (tiên nghiệm) khi dữ liệu ít.
- Cập nhật liên tục khi dữ liệu về; nền của phân tích tuần tự, bandit, mô hình phân cấp.
- Với mô hình phức tạp ta dùng **MCMC** (Stan, PyMC) thay vì công thức đóng.

Cảnh báo: kết quả phụ thuộc tiên nghiệm khi dữ liệu ít; hãy báo cáo độ nhạy với lựa chọn tiên nghiệm.

## Nguồn tham khảo

- Gelman, A. et al. *Bayesian Data Analysis* (3rd ed., CRC Press).
- McElreath, R. *Statistical Rethinking* (2nd ed., CRC Press).
- Blitzstein & Hwang, *Introduction to Probability*, chương 8 (Beta).

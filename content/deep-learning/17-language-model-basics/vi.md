# Mô hình ngôn ngữ: n-gram, xác suất và perplexity

ChatGPT, Claude, Gemini đều là **mô hình ngôn ngữ**: chúng làm đúng một việc, **dự đoán token kế tiếp** `P(token | các token trước)`. Hiểu bản gốc đơn giản nhất (n-gram) là bước đệm tốt để hiểu LLM.

## Xác suất chuỗi

Theo quy tắc nhân: `P(w₁…wₙ) = Π P(wᵢ | w₁…wᵢ₋₁)`. Ngữ cảnh dài thì không đếm nổi, nên **giả định Markov**: chỉ nhìn `n−1` từ gần nhất. **Bigram**: `P(wᵢ | wᵢ₋₁) = đếm(wᵢ₋₁ wᵢ) / đếm(wᵢ₋₁)`.

![Mô hình ngôn ngữ dự đoán từ kế tiếp; perplexity đo độ bối rối](/lessons/deep-learning/17-language-model-basics-fig-vi.svg)
*Mô hình ngôn ngữ dự đoán từ kế tiếp; perplexity đo độ bối rối*

## Vấn đề dữ liệu thưa và làm mượt

Cặp chưa từng xuất hiện có xác suất 0 làm cả câu thành 0. **Làm mượt Laplace**: cộng `α` vào mọi đếm, `P = (đếm + α)/(đếm_ngữ_cảnh + α|V|)`. Các kỹ thuật tốt hơn: Kneser–Ney, backoff.

## Perplexity: đo chất lượng

`PPL = exp(−trung bình log P)` trên tập kiểm tra: có thể hiểu là **"số từ mô hình đang phân vân chọn"**. Càng thấp càng tốt; đoán đều trên `V` từ cho PPL = V. Câu bị xáo trộn có perplexity cao hơn câu tự nhiên.

## Từ n-gram đến LLM

| | n-gram | Mạng nơ-ron / Transformer |
|---|---|---|
| Ngữ cảnh | vài từ | hàng nghìn đến triệu token |
| Biểu diễn | đếm rời rạc | **embedding** học được, tổng quát hoá cho từ tương tự |
| Dữ liệu thưa | nghiêm trọng | giảm mạnh |
| Mục tiêu | giống nhau | giống nhau: **dự đoán token kế tiếp** (entropy chéo) |

## Sinh văn bản

Lấy mẫu `wₙ ~ P(· | ngữ cảnh)`, nối vào, lặp lại. Điều chỉnh bằng **nhiệt độ** (cao ⇒ đa dạng, thấp ⇒ tất định), **top-k/top-p**. Xem khoá "AI hiện đại".

## Nguồn tham khảo

- Jurafsky & Martin. *Speech and Language Processing*, chương N-gram Language Models.
- Chen & Goodman (1999). An empirical study of smoothing techniques for language modeling.
- Bengio et al. (2003). A neural probabilistic language model. *JMLR* 3.

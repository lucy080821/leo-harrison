# Mô hình ngôn ngữ: từ n-gram đến token hoá BPE

**Mô hình ngôn ngữ** (language model, LM) gán **xác suất** cho chuỗi từ, hoặc nói cách khác dự đoán **từ tiếp theo**. Mọi trợ lý AI hội thoại hiện nay đều là mô hình ngôn ngữ cực lớn.

## Xác suất của một câu

Theo **quy tắc chuỗi** của xác suất:

$$
P(w_1,w_2,\dots,w_n)=\prod_{t=1}^{n}P(w_t\mid w_1,\dots,w_{t-1})
$$

Mô hình ngôn ngữ chỉ cần học $P(\text{từ tiếp theo}\mid\text{các từ trước})$. Sinh văn bản = **lấy mẫu từng từ một** từ phân phối đó (**tự hồi quy**).

## Mô hình n-gram

Quá khó điều kiện trên **toàn bộ lịch sử**, nên xấp xỉ bằng $n-1$ từ gần nhất (**giả định Markov**). **Bigram** ($n=2$):

$$
P(w_t\mid w_{t-1})=\frac{\text{count}(w_{t-1},w_t)}{\text{count}(w_{t-1})}
$$

Với corpus `the cat sat the cat ran the dog sat`: "the" xuất hiện 3 lần làm từ trước; "the cat" có 2 lần ⇒ $P(\text{cat}\mid\text{the})=2/3$. "cat" xuất hiện 2 lần, "cat sat" 1 lần ⇒ $P(\text{sat}\mid\text{cat})=1/2$.

```python
bigrams = Counter(zip(corpus[:-1], corpus[1:]))
unigrams = Counter(corpus[:-1])
P = bigrams[("the", "cat")] / unigrams["the"]
```

**Sinh văn bản** với bigram: bắt đầu từ một từ, lấy mẫu từ kế tiếp theo xác suất, lặp lại. Kết quả đúng "mùi" văn bản nhưng **mất mạch** vì chỉ nhớ 1 từ.

### Hạn chế của n-gram

- **Thưa**: tổ hợp chưa từng thấy có xác suất 0 ⇒ cần **làm trơn** (Laplace, Kneser-Ney).
- **Ngữ cảnh ngắn**; tăng $n$ làm số tổ hợp **bùng nổ**.
- **Không có khái niệm tương đồng**: "chó" và "mèo" tách biệt hoàn toàn (khác embedding).

## Perplexity: đo chất lượng mô hình ngôn ngữ

Mô hình tốt cho **xác suất cao** với văn bản thật. **Perplexity** (độ bối rối) là **trung bình nhân nghịch đảo** xác suất:

$$
\text{PPL}=\exp\!\Big(-\frac1N\sum_{t=1}^{N}\ln P(w_t\mid w_{<t})\Big)
$$

Hiểu là "**số lựa chọn hiệu dụng** mô hình đang phân vân mỗi bước". Càng **thấp càng tốt**. Đây chính là **cross-entropy** (bài Toán) được lấy mũ.

## Từ n-gram đến mạng nơ-ron

| Thế hệ | Cách làm | Ngữ cảnh |
|---|---|---|
| n-gram | Đếm | 1-4 từ |
| RNN/LSTM | Trạng thái ẩn | Dài hơn, nhưng quên dần |
| **Transformer** | **Attention** | Hàng nghìn đến **triệu token** |

Mô hình nơ-ron nhận **embedding** của các từ trước, qua mạng, rồi cho ra **softmax trên toàn bộ từ vựng** (xác suất từ kế tiếp). Huấn luyện = cực tiểu **cross-entropy** trên lượng văn bản khổng lồ.

## Token hoá từ con: BPE

Từ vựng theo **từ nguyên vẹn** gặp vấn đề từ lạ, còn theo **ký tự** thì chuỗi quá dài. **Byte-Pair Encoding (BPE)** cân bằng:

1. Bắt đầu mỗi từ là **chuỗi ký tự**.
2. Tìm **cặp token liền kề xuất hiện nhiều nhất** trong dữ liệu.
3. **Gộp** cặp đó thành token mới.
4. Lặp lại đến khi đủ cỡ từ vựng (ví dụ 50,000).

Ví dụ `l o w l o w e r`: cặp `(l, o)` xuất hiện 2 lần ⇒ gộp thành `lo`, rồi `(lo, w)` ⇒ `low`... Cuối cùng từ phổ biến thành **một token**, từ hiếm tách thành **các mảnh quen thuộc** (không bao giờ "lạ").

```python
Counter(zip(tokens[:-1], tokens[1:])).most_common(1)     # cặp gộp tiếp theo
```

Hệ quả thực tế cho LLM:

- **Token ≠ từ**: tiếng Anh ~ 0.75 từ/token; **tiếng Việt, tiếng Trung thường tốn nhiều token hơn** cho cùng nội dung ⇒ đắt hơn và ngữ cảnh ngắn hơn.
- Giới hạn "ngữ cảnh 128k token" tính theo token.
- Lỗi ở chữ cái/chữ số một phần do **token hoá** (mô hình nhìn "strawberry" như vài mảnh, không phải từng chữ).

## Sinh văn bản có điều kiện

Mô hình thật còn nhận **lời nhắc (prompt)** làm lịch sử, rồi sinh tiếp. Cách chọn token kế tiếp (nhiệt độ, top-k, top-p) quyết định văn bản **sáng tạo hay chắc chắn**: bài sau.

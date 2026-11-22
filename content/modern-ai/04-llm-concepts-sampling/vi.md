# Mô hình ngôn ngữ lớn (LLM): huấn luyện và sinh văn bản

**LLM** (Large Language Model) là Transformer **chỉ giải mã** với hàng chục đến hàng trăm **tỉ tham số**, huấn luyện trên lượng văn bản khổng lồ để **dự đoán token kế tiếp**. Từ nhiệm vụ đơn giản đó, các khả năng như viết, dịch, lập trình, lập luận **xuất hiện**.

## Vòng đời huấn luyện

```text
 1. Tiền huấn luyện  ──▶  2. Tinh chỉnh theo chỉ dẫn  ──▶  3. Căn chỉnh (RLHF/DPO)
   (kiến thức, ngôn ngữ)      (làm theo yêu cầu)              (hữu ích, an toàn)
```

### 1. Tiền huấn luyện (pretraining)

Học **dự đoán token kế tiếp** trên hàng nghìn tỉ token (sách, web, mã nguồn):

$$
L=-\sum_t\log P_\theta(w_t\mid w_{<t})
$$

Là **học tự giám sát**: nhãn chính là phần văn bản kế tiếp, **không cần gán nhãn tay**. Tốn hàng nghìn GPU trong nhiều tuần. Kết quả là **mô hình nền** biết nhiều nhưng chưa biết "làm theo yêu cầu".

**Quy luật scaling:** hiệu năng cải thiện **đều đặn theo luỹ thừa** khi tăng **tham số, dữ liệu và tính toán**. Đây là động lực đầu tư vào mô hình lớn hơn.

### 2. Tinh chỉnh theo chỉ dẫn (SFT)

Huấn luyện tiếp trên **hàng chục nghìn cặp (yêu cầu → câu trả lời tốt)** do người viết, để mô hình **biết đối thoại** và làm theo hướng dẫn.

### 3. Căn chỉnh với sở thích con người (RLHF, DPO)

Con người **so sánh các câu trả lời** (A tốt hơn B). Học một **mô hình phần thưởng** rồi dùng **học tăng cường** (hoặc **DPO**, trực tiếp hơn) để mô hình ưu tiên câu trả lời hữu ích, trung thực, an toàn.

![Nhiệt độ làm phân phối nhọn hơn hoặc phẳng hơn](/lessons/modern-ai/04-llm-concepts-sampling-fig-vi.svg)
*Nhiệt độ làm phân phối nhọn hơn hoặc phẳng hơn*

## Sinh văn bản: chọn token kế tiếp

Mỗi bước mô hình cho **logit** $z_i$ cho mọi token trong từ vựng; $\text{softmax}$ biến thành xác suất. Cách **chọn** quyết định tính cách đầu ra.

### Nhiệt độ (temperature)

$$
P_i=\frac{e^{z_i/T}}{\sum_j e^{z_j/T}}
$$

| $T$ | Hiệu ứng | Dùng cho |
|---|---|---|
| **Thấp** ($\to0$) | Phân phối **nhọn**, gần như luôn chọn token xác suất cao nhất | Trích xuất, mã, câu trả lời nhất quán |
| $T=1$ | Phân phối gốc của mô hình | Mặc định |
| **Cao** ($>1$) | Phân phối **phẳng**, đa dạng, rủi ro | Viết sáng tạo, động não ý tưởng |

Với logits $(2,1,0)$: $T=1$ cho $(0.665,0.245,0.090)$; $T=0.5$ cho $(0.867,0.117,0.016)$ (tập trung hơn).

### Giải mã tham lam và lấy mẫu

- **Greedy**: luôn chọn token xác suất cao nhất (lặp lại, nhàm).
- **Lấy mẫu** theo phân phối: đa dạng hơn, nhưng đuôi dài có thể chứa token vô nghĩa.

### Top-k và top-p (nucleus)

Cắt "đuôi" xác suất thấp trước khi lấy mẫu:

- **Top-k**: chỉ giữ $k$ token xác suất cao nhất.
- **Top-p**: giữ **tập nhỏ nhất** có tổng xác suất $\ge p$ (ví dụ 0.9). Số token giữ lại **thích nghi** theo độ chắc chắn.

```python
order = np.argsort(-probs)
cum = np.cumsum(probs[order])
keep = order[: np.searchsorted(cum, p) + 1]
```

Với $(0.5, 0.3, 0.1, 0.06, 0.04)$ và $p=0.85$: tích luỹ $(0.5,0.8,0.9,\dots)$ nên giữ **3 token đầu**.

Sau khi cắt, **chuẩn hoá lại** xác suất rồi lấy mẫu.

### Các điều khiển khác

| Tham số | Tác dụng |
|---|---|
| **Max tokens** | Giới hạn độ dài |
| **Stop sequences** | Dừng khi gặp chuỗi nào đó |
| **Repetition penalty** | Phạt lặp từ |
| **Seed** | Tái lập kết quả |

## Cửa sổ ngữ cảnh

Mô hình chỉ "nhìn" được **một số token nhất định** (ví dụ 128k-1M), gồm cả **lời nhắc + lịch sử + câu trả lời**. Quá giới hạn thì **bị cắt**. Chi phí attention tăng theo độ dài (bài Transformer).

## Hạn chế quan trọng của LLM

| Vấn đề | Giải thích |
|---|---|
| **Ảo giác (hallucination)** | Sinh nội dung **nghe hợp lý nhưng sai**: mục tiêu là "văn bản có khả năng", không phải "sự thật" |
| **Kiến thức có hạn chót** | Chỉ biết đến thời điểm huấn luyện |
| **Thiên lệch** | Thừa hưởng từ dữ liệu |
| **Khó kiểm chứng** | "Hộp đen" |
| **Chi phí** | Huấn luyện và suy luận tốn kém |
| **Lập luận nhiều bước** | Có thể sai; cải thiện bằng **chuỗi suy luận** (chain-of-thought) |

Các cách giảm ảo giác: **RAG** (đưa tài liệu thật vào ngữ cảnh), cho phép **dùng công cụ**, yêu cầu **trích dẫn nguồn**, kiểm tra chéo (bài sau).

## Tinh chỉnh hiệu quả tham số

Tinh chỉnh toàn bộ tỉ tham số rất đắt. **LoRA** chỉ huấn luyện **các ma trận hạng thấp nhỏ** thêm vào, giảm bộ nhớ hàng chục lần mà chất lượng gần tương đương. **Lượng tử hoá** (4-bit, 8-bit) giúp chạy mô hình lớn trên phần cứng nhỏ.

## Dùng LLM qua API (ví dụ, chạy ngoài trình duyệt)

```python
# Minh hoạ ý tưởng; cần khoá API của nhà cung cấp
response = client.messages.create(
    model="<tên-mô-hình>",
    max_tokens=500,
    temperature=0.2,
    messages=[{"role": "user", "content": "Tóm tắt đoạn văn sau..."}],
)
```

Bạn đã tự cài **softmax có nhiệt độ** và **top-p**: hai thứ cốt lõi nằm sau tham số `temperature` và `top_p` đó.

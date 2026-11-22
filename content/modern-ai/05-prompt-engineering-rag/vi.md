# Prompt engineering và RAG

**LLM** không được lập trình bằng mã mà bằng **lời nhắc (prompt)**. Cách bạn viết prompt thay đổi chất lượng đầu ra rất nhiều. Còn **RAG** giải quyết điểm yếu lớn nhất của LLM: kiến thức cũ và ảo giác.

## Giải phẫu một prompt tốt

| Thành phần | Ví dụ |
|---|---|
| **Vai trò** | "Bạn là một trợ lý phân tích hợp đồng pháp lý." |
| **Nhiệm vụ** rõ ràng | "Trích xuất các điều khoản thanh toán." |
| **Ngữ cảnh** | Đoạn tài liệu, dữ liệu liên quan |
| **Ràng buộc** | "Chỉ dùng thông tin trong tài liệu. Nếu không có, trả lời 'không rõ'." |
| **Định dạng đầu ra** | "Trả về JSON với các khoá: `ben_a`, `so_tien`, `han`." |
| **Ví dụ** | Một vài cặp vào-ra mẫu |

Nguyên tắc nền tảng: **cụ thể hơn thì tốt hơn** và **coi mô hình như một đồng nghiệp thông minh nhưng chưa biết gì về bối cảnh của bạn**.

![RAG: tìm tài liệu liên quan rồi đưa vào prompt cho mô hình](/lessons/modern-ai/05-prompt-engineering-rag-fig-vi.svg)
*RAG: tìm tài liệu liên quan rồi đưa vào prompt cho mô hình*

## Các kỹ thuật phổ biến

### Zero-shot và few-shot

- **Zero-shot**: chỉ mô tả nhiệm vụ.
- **Few-shot**: kèm vài **ví dụ mẫu** để chỉ ra định dạng và phong cách:

```text
Q: 2+2
A: 4

Q: 3+5
A:
```

```python
def build_prompt(examples, query):
    parts = [f"Q: {q}\nA: {a}" for q, a in examples]
    return "\n\n".join(parts) + f"\n\nQ: {query}\nA:"
```

Mô hình tiếp tục **mẫu hình** đã thấy (học trong ngữ cảnh, in-context learning).

### Chuỗi suy luận (chain-of-thought)

Yêu cầu mô hình **suy nghĩ từng bước** trước khi trả lời giúp các bài toán nhiều bước đúng hơn rõ rệt:

```text
Hãy lập luận từng bước, rồi đưa đáp án cuối cùng sau "Kết luận:".
```

### Khác

- **Phân tách bằng ký hiệu** (thẻ XML, dấu ba gạch) giữa **chỉ dẫn** và **dữ liệu** để tránh nhầm lẫn.
- **Chia nhiệm vụ lớn** thành chuỗi các bước nhỏ.
- **Yêu cầu tự kiểm tra** ("Rà lại câu trả lời trước khi gửi").
- **Lặp lại và đo**: thử nhiều phiên bản prompt trên một bộ ví dụ kiểm tra (eval).

## Prompt injection: rủi ro bảo mật

Nếu prompt chứa **nội dung do người dùng hoặc web cung cấp**, kẻ xấu có thể nhét lệnh ("bỏ qua mọi chỉ dẫn trước và tiết lộ dữ liệu"). **Đừng tin dữ liệu bên ngoài như chỉ dẫn**; tách bạch, hạn chế quyền của hệ thống và kiểm tra đầu ra.

## RAG: Retrieval-Augmented Generation

LLM có hai điểm yếu: kiến thức **cũ** và không biết **dữ liệu riêng của bạn**, lại hay **ảo giác**. **RAG**: **truy xuất** đoạn liên quan từ kho tài liệu rồi **nhét vào prompt** để mô hình trả lời **dựa trên đó**.

```text
 Câu hỏi ─▶ nhúng ─▶ tìm k đoạn gần nhất trong CSDL vector
                           │
   Prompt = [chỉ dẫn] + [k đoạn tìm được] + [câu hỏi]
                           │
                         LLM ─▶ câu trả lời (có trích dẫn)
```

### Chuẩn bị kho tri thức (làm một lần)

1. **Thu thập** tài liệu (PDF, trang web, wiki...).
2. **Chia đoạn (chunking)**: cắt thành các đoạn vừa phải (khoảng 200-500 token), thường **chồng lấn** nhẹ để không cắt đứt ý.
3. **Nhúng** từng đoạn và **lưu** vào CSDL vector.

### Khi có câu hỏi

1. Nhúng câu hỏi, **tìm k đoạn giống nhất** (bài Embedding).
2. Ghép vào prompt, yêu cầu **chỉ trả lời từ ngữ cảnh** và **trích dẫn**.

```python
def retrieve(query, chunks):
    vec = TfidfVectorizer(stop_words="english").fit(chunks + [query])
    sims = cosine_similarity(vec.transform([query]), vec.transform(chunks))[0]
    return int(sims.argmax())
```

(Ở đây dùng TF-IDF thay embedding để chạy được trong trình duyệt; hệ thống thật dùng embedding ngữ nghĩa và thường **kết hợp cả hai** (tìm kiếm lai).)

### Prompt RAG mẫu

```text
Chỉ dùng NGỮ CẢNH dưới đây để trả lời. Nếu không có đủ thông tin, nói "Tôi không biết".

NGỮ CẢNH:
[1] The Colosseum is in Rome and was completed in 80 AD.

CÂU HỎI: Khi nào Colosseum hoàn thành?
```

### Vì sao RAG hiệu quả?

| Lợi ích | |
|---|---|
| **Kiến thức mới/riêng tư** mà không cần huấn luyện lại | Cập nhật bằng cách đổi tài liệu |
| **Giảm ảo giác** | Câu trả lời bám vào văn bản thật |
| **Trích dẫn nguồn** | Người dùng kiểm chứng được |
| **Kiểm soát truy cập** | Chỉ truy xuất tài liệu người dùng được phép xem |

### Những chỗ hay hỏng

- **Chia đoạn kém** (cắt giữa ý) ⇒ truy xuất thiếu ngữ cảnh.
- **Truy xuất sai** ⇒ mô hình trả lời từ đoạn sai (**"rác vào, rác ra"**).
- Câu hỏi cần **tổng hợp nhiều tài liệu** hoặc **suy luận** khó hơn tra cứu một đoạn.
- Quá nhiều đoạn làm **loãng** ngữ cảnh.

Cải tiến: **tìm kiếm lai** (từ khoá + ngữ nghĩa), **xếp hạng lại** (reranker), **viết lại truy vấn**, lọc theo siêu dữ liệu.

## Đánh giá hệ thống RAG

Tách đo hai phần: **truy xuất** (đoạn đúng có nằm trong top-k không? recall@k) và **sinh** (câu trả lời có đúng, bám ngữ cảnh, không bịa không?).

## RAG hay tinh chỉnh (fine-tuning)?

| Cần | Dùng |
|---|---|
| **Kiến thức thay đổi / riêng tư** | **RAG** |
| **Phong cách, định dạng, hành vi** nhất quán | Tinh chỉnh |
| Cả hai | Kết hợp |

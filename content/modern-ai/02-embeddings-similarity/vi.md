# Embedding và tìm kiếm theo ngữ nghĩa

**Embedding** biểu diễn một đối tượng (từ, câu, ảnh, người dùng...) bằng một **vector dày đặc** (vài trăm đến vài nghìn số thực) sao cho **các đối tượng giống nhau về nghĩa nằm gần nhau**. Đây là cây cầu giữa **ngữ nghĩa** và **toán học** làm nền cho tìm kiếm ngữ nghĩa, RAG, gợi ý và các LLM.

## Từ one-hot đến embedding

**One-hot**: mỗi từ là một vector toàn 0 trừ một số 1 (kích thước = cỡ từ vựng, ví dụ 50,000). Mọi cặp từ đều **vuông góc**, tức "chó" cũng xa "mèo" như xa "tên lửa". Không có ngữ nghĩa.

**Embedding**: ánh xạ mỗi từ vào vector **ngắn (ví dụ 300 chiều)** do mạng **học được**, sao cho:

- "chó" và "mèo" **gần nhau**, xa "tên lửa".
- Có **cấu trúc tuyến tính** của quan hệ ngữ nghĩa.

![Embedding minh hoạ: từ gần nghĩa nằm gần nhau](/lessons/modern-ai/02-embeddings-similarity-fig-vi.svg)
*Embedding minh hoạ: từ gần nghĩa nằm gần nhau*

## Học embedding: "biết từ qua bạn bè của nó"

> "Bạn sẽ biết một từ qua những từ đi cùng nó." (J. R. Firth)

**Word2Vec** (2013): huấn luyện mạng nhỏ **dự đoán từ từ ngữ cảnh xung quanh** (hoặc ngược lại). Các từ xuất hiện trong **ngữ cảnh giống nhau** nhận **vector giống nhau**. Trọng số của lớp embedding chính là các vector từ. **GloVe**, **fastText** tương tự.

Ngày nay các **Transformer** (BERT, các mô hình embedding câu) cho **embedding theo ngữ cảnh**: cùng từ "bank" có vector khác nhau trong "river bank" và "bank account".

## Phép toán trên embedding

Quan hệ ngữ nghĩa thành **hướng** trong không gian:

$$
\vec{\text{king}}-\vec{\text{man}}+\vec{\text{woman}}\approx\vec{\text{queen}}
$$

Với vector đồ chơi $[\text{hoàng gia},\text{nam},\text{nữ}]$: $(1,1,0)-(0,1,0)+(0,0,1)=(1,0,1)$ chính là "queen". (Với embedding thật, kết quả chỉ **gần đúng**.)

## Đo độ giống: cosine

Dùng **cosine** (bài Toán) chứ không phải khoảng cách Euclid, vì độ dài vector ít quan trọng:

$$
\cos(\mathbf a,\mathbf b)=\frac{\mathbf a\cdot\mathbf b}{\|\mathbf a\|\,\|\mathbf b\|}
$$

Nếu các vector đã **chuẩn hoá về độ dài 1**, cosine chính là **tích vô hướng**: nhanh hơn nhiều.

## Tìm kiếm theo ngữ nghĩa (semantic search)

Tìm kiếm từ khoá (TF-IDF) chỉ khớp **từ giống hệt**. Tìm kiếm ngữ nghĩa khớp **ý nghĩa**:

1. **Nhúng** mọi tài liệu thành vector (làm một lần, lưu lại).
2. Khi có truy vấn: **nhúng truy vấn** bằng cùng mô hình.
3. Tìm **$k$ tài liệu có cosine cao nhất**.

```python
def top_k(query, matrix, k):
    sims = (matrix @ query) / (np.linalg.norm(matrix, axis=1) * np.linalg.norm(query))
    return np.argsort(-sims)[:k]          # chỉ số k hàng giống nhất
```

Truy vấn "cách nấu phở" sẽ tìm ra bài viết về "công thức nước dùng bò" dù **không chung từ nào**.

## Tìm láng giềng gần đúng (ANN) và cơ sở dữ liệu vector

So với mọi vector là $O(N)$: chậm khi có hàng triệu. Giải pháp: **chỉ mục láng giềng gần đúng** (HNSW, IVF) đánh đổi chút chính xác lấy tốc độ cực lớn. Các thư viện/CSDL: **FAISS**, **pgvector**, **Chroma**, **Pinecone**, **Qdrant**...

## Embedding câu và văn bản

Mô hình như `sentence-transformers` (ví dụ `all-MiniLM-L6-v2`) biến cả **câu/đoạn** thành một vector:

```python
# chạy ngoài trình duyệt
from sentence_transformers import SentenceTransformer
model = SentenceTransformer("all-MiniLM-L6-v2")
vecs = model.encode(["tôi thích mèo", "I love cats", "bầu trời xanh"])
```

Các mô hình **đa ngôn ngữ** đặt câu cùng nghĩa ở các ngôn ngữ khác nhau **gần nhau**.

## Ứng dụng

| Ứng dụng | Ý tưởng |
|---|---|
| **RAG** (bài sau) | Truy xuất đoạn liên quan cho LLM |
| **Gợi ý** | Embedding người dùng/sản phẩm; gợi ý sản phẩm gần |
| **Loại bỏ trùng lặp** | Tìm văn bản gần giống |
| **Phân cụm chủ đề** | K-Means trên embedding |
| **Phát hiện bất thường** | Điểm xa mọi cụm |
| **Embedding ảnh** (CLIP) | Tìm ảnh bằng câu mô tả |

## Lưu ý và hạn chế

- Embedding **thừa hưởng thiên lệch** của dữ liệu huấn luyện (ví dụ gắn nghề nghiệp với giới tính).
- **Không so sánh** embedding của hai mô hình khác nhau.
- Chất lượng phụ thuộc **miền dữ liệu**: mô hình chung có thể kém ở y tế/pháp lý.
- Cosine cao ≠ "đúng câu trả lời": chỉ là **tương tự về chủ đề**.

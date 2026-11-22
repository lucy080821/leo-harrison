# NLP: biểu diễn văn bản (token, túi từ, TF-IDF)

**NLP** (Natural Language Processing, xử lý ngôn ngữ tự nhiên) dạy máy hiểu và sinh ngôn ngữ con người: dịch máy, tìm kiếm, chatbot, phân tích cảm xúc, tóm tắt. Vấn đề đầu tiên: **máy chỉ làm việc với số**, vậy làm sao biến văn bản thành số?

## Bước 1: Tách từ (tokenization)

Chia văn bản thành các **token** (đơn vị nhỏ nhất mô hình xử lý).

```python
import re
tokens = re.findall(r"[a-z']+", "The cat sat on the mat!".lower())
# ['the', 'cat', 'sat', 'on', 'the', 'mat']
```

| Mức | Token là | Ưu/nhược |
|---|---|---|
| **Từ** | từ nguyên vẹn | Dễ hiểu; từ vựng khổng lồ, **từ lạ (OOV)** không xử lý được |
| **Ký tự** | từng chữ cái | Không có từ lạ; chuỗi rất dài |
| **Từ con (subword)** | mảnh từ (BPE, WordPiece) | **Cân bằng**: chuẩn của LLM hiện đại |

Với tiếng Việt, từ ghép nhiều âm tiết ("học sinh") nên cần công cụ **tách từ** riêng (VnCoreNLP, underthesea) hoặc dùng subword.

### Tiền xử lý thường gặp

- Chuyển **chữ thường**, bỏ dấu câu.
- Bỏ **stop word** ("the", "và", "là"): từ rất phổ biến, ít thông tin.
- **Stemming/lemmatization**: đưa "running", "ran" về gốc "run".
- Mô hình hiện đại (Transformer) thường **bỏ qua** các bước này và học trực tiếp từ văn bản thô.

![Từ văn bản đến vector: tách token → mã số → túi từ](/lessons/modern-ai/01-nlp-text-representation-fig-vi.svg)
*Từ văn bản đến vector: tách token → mã số → túi từ*

## Bước 2: Túi từ (Bag of Words, BoW)

Mỗi tài liệu thành **vector đếm** theo từ vựng, **bỏ qua thứ tự**:

| | cat | dog | sat | the |
|---|---|---|---|---|
| "the cat sat" | 1 | 0 | 1 | 1 |
| "the dog sat the" | 0 | 1 | 1 | 2 |

```python
from sklearn.feature_extraction.text import CountVectorizer
X = CountVectorizer().fit_transform(docs)       # ma trận thưa
```

Dữ liệu **thưa**: hầu hết ô là 0 (mỗi tài liệu chứa vài chục trong hàng chục nghìn từ). Dùng **ma trận thưa** để tiết kiệm bộ nhớ.

Nhược điểm: mất **thứ tự** ("chó cắn người" ≈ "người cắn chó") và **ngữ nghĩa**; các từ phổ biến ("the") lấn át.

## Bước 3: TF-IDF: giảm trọng số từ phổ biến

**TF-IDF** cho **điểm cao** cho từ xuất hiện **nhiều trong tài liệu này** nhưng **hiếm ở các tài liệu khác** (đặc trưng cho tài liệu):

$$
\text{tf-idf}(t,d)=\underbrace{\text{tf}(t,d)}_{\text{số lần }t\text{ trong }d}\times\underbrace{\ln\frac{1+N}{1+\text{df}(t)}+1}_{\text{idf: nghịch đảo tần suất tài liệu}}
$$

- $\text{tf}$: từ lặp nhiều trong tài liệu ⇒ quan trọng với tài liệu đó.
- $\text{df}(t)$: số tài liệu chứa $t$. Từ **có mặt ở mọi nơi** ("the") có idf **thấp**.

```python
from sklearn.feature_extraction.text import TfidfVectorizer
vec = TfidfVectorizer(stop_words="english")
M = vec.fit_transform(docs)
vec.get_feature_names_out()
```

Mặc định sklearn còn **chuẩn hoá L2** từng dòng để so sánh tài liệu bằng cosine.

## Ứng dụng của TF-IDF

| Việc | Cách |
|---|---|
| **Tìm kiếm** | Biến truy vấn thành vector, xếp hạng tài liệu theo **cosine** |
| **Phân loại văn bản** | TF-IDF + hồi quy logistic / Naive Bayes / SVM (baseline rất mạnh) |
| **Từ khoá** | Từ có TF-IDF cao nhất mỗi tài liệu |
| **Tài liệu tương tự** | Cosine giữa các dòng ma trận |

```python
from sklearn.metrics.pairwise import cosine_similarity
cosine_similarity(M[0], M)          # độ giống tài liệu 0 với mọi tài liệu
```

## Giới hạn của biểu diễn thưa

1. **Không có ngữ nghĩa**: "ô tô" và "xe hơi" là hai cột hoàn toàn khác nhau, dù cùng nghĩa.
2. **Mất thứ tự từ** và ngữ cảnh.
3. **Số chiều khổng lồ** (kích thước từ vựng).

Bước đột phá: **embedding** (bài tiếp theo), biểu diễn **mỗi từ/câu bằng vector dày đặc**, nơi các từ **gần nghĩa nằm gần nhau**. Đây là nền tảng của mọi mô hình ngôn ngữ hiện đại.

## Pipeline phân loại văn bản kinh điển

```python
from sklearn.pipeline import make_pipeline
from sklearn.linear_model import LogisticRegression
clf = make_pipeline(TfidfVectorizer(), LogisticRegression(max_iter=1000))
clf.fit(train_texts, train_labels)
clf.predict(["free money now"])
```

Đây vẫn là **baseline** bạn nên thử trước khi dùng mô hình lớn: nhanh, rẻ, dễ diễn giải (xem hệ số để biết từ nào đẩy về lớp nào).

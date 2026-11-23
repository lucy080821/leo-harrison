# RAG thực chiến: chia đoạn (chunking) và đo chất lượng truy xuất

Bài 5 giới thiệu RAG. Ở đây là phần quyết định **chất lượng thật**: *chia tài liệu thế nào* và *đo truy xuất ra sao*. Phần lớn lỗi của hệ RAG nằm ở **truy xuất**, không phải ở LLM.

## Chunking: chia tài liệu thành đoạn

Mô hình embedding và cửa sổ ngữ cảnh có giới hạn, nên tài liệu phải chia thành đoạn.

| Quyết định | Quá nhỏ | Quá lớn |
|---|---|---|
| **Kích thước đoạn** | mất ngữ cảnh ("nó" chỉ gì?) | loãng ý, tốn token, nhiễu |
| **Chồng lấn (overlap)** | thông tin bị cắt ở biên | tốn lưu trữ, trùng lặp |

Điểm khởi đầu thực dụng: **200–500 token, chồng lấn 10–20%**. Tốt hơn là chia theo **cấu trúc** (tiêu đề, đoạn văn, mục) thay vì cắt cứng theo ký tự; giữ **siêu dữ liệu** (nguồn, tiêu đề, trang) để trích dẫn.

![Cắt tài liệu thành đoạn có chồng lấn để không mất ngữ cảnh ở biên](/lessons/modern-ai/09-rag-chunking-retrieval-fig-vi.svg)
*Cắt tài liệu thành đoạn có chồng lấn để không mất ngữ cảnh ở biên*

## Truy xuất

- **Từ vựng (BM25/TF-IDF)**: mạnh với từ khoá chính xác (mã sản phẩm, tên riêng).
- **Ngữ nghĩa (embedding)**: hiểu đồng nghĩa, diễn đạt khác nhau.
- **Lai (hybrid)** + **rerank** bằng mô hình cross-encoder thường tốt nhất: lấy 50 ứng viên rồi xếp lại, đưa top 3–5 vào prompt.

## Đo truy xuất độc lập với LLM

Dựng **bộ kiểm thử**: câu hỏi và đoạn đúng. Đo:

- **recall@k**: tỷ lệ câu hỏi có đoạn đúng trong top-k. Nếu thấp, LLM không thể trả lời đúng.
- **MRR** (mean reciprocal rank): trung bình `1/vị trí` của đoạn đúng đầu tiên.
- **nDCG** khi có nhiều mức liên quan.

Sau đó mới đo **câu trả lời**: có bám nguồn (faithfulness) không, có đúng không.

## Lỗi hay gặp của RAG

1. Câu trả lời nằm **giữa hai đoạn** (cần chồng lấn hoặc đoạn to hơn).
2. Truy xuất đúng nhưng **LLM bỏ qua** ngữ cảnh ("lost in the middle", Liu et al. 2023): đặt đoạn quan trọng ở đầu/cuối, giảm số đoạn.
3. Câu hỏi mơ hồ: **viết lại câu hỏi** (query rewriting) trước khi truy xuất.
4. Dữ liệu **lỗi thời/mâu thuẫn**: cần quản lý phiên bản và ngày hiệu lực.
5. Không có thông tin: buộc mô hình trả lời "không biết" và **trích dẫn nguồn**.

## Nguồn tham khảo

- Lewis et al. (2020). Retrieval-augmented generation for knowledge-intensive NLP tasks. *NeurIPS*.
- Liu et al. (2023). Lost in the middle: how language models use long contexts. *TACL*.
- Robertson & Zaragoza (2009). The probabilistic relevance framework: BM25 and beyond.

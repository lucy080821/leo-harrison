# Tìm kiếm vector ở quy mô lớn: brute-force, LSH và recall

RAG, hệ gợi ý và tìm kiếm ngữ nghĩa đều quy về một bài toán: **tìm các vector gần nhất** với vector truy vấn trong hàng triệu đến hàng tỷ vector.

## Tìm chính xác

Tính tương đồng với **mọi** vector: `O(n·d)` mỗi truy vấn. Với vector đã **chuẩn hoá về độ dài 1**, `cosine = tích vô hướng`, nên chỉ cần một phép nhân ma trận: nhanh với vài chục nghìn vector, **quá chậm** khi hàng triệu.

![Tìm kiếm xấp xỉ đánh đổi một chút độ chính xác lấy tốc độ lớn](/lessons/modern-ai/18-vector-search-ann-fig-vi.svg)
*Tìm kiếm xấp xỉ đánh đổi một chút độ chính xác lấy tốc độ lớn*

## Tìm xấp xỉ (ANN)

Chấp nhận **bỏ sót vài láng giềng** (recall < 100%) để nhanh hơn 10–1000 lần. Các họ phương pháp:

| Họ | Ý tưởng | Ví dụ |
|---|---|---|
| **Băm (LSH)** | vector gần nhau rơi vào cùng bucket với xác suất cao | siêu phẳng ngẫu nhiên |
| **Đồ thị** | đi theo đồ thị láng giềng từ điểm vào | **HNSW** (rất phổ biến) |
| **Chia cụm (IVF)** | chia không gian thành cụm, chỉ tìm vài cụm gần nhất | FAISS IVF |
| **Nén (PQ)** | lượng tử hoá vector để tiết kiệm bộ nhớ | Product Quantization |

## LSH siêu phẳng ngẫu nhiên

Chọn `b` siêu phẳng ngẫu nhiên; mỗi vector thành **chuỗi `b` bit** theo phía của mỗi siêu phẳng. Vector gần nhau (góc nhỏ) thường cùng chuỗi bit. Chỉ quét ứng viên **cùng bucket**; dùng nhiều bảng băm để tăng recall.

Đánh đổi: **nhiều bit** ⇒ bucket nhỏ, nhanh nhưng dễ bỏ sót; **nhiều bảng** ⇒ recall cao hơn nhưng tốn bộ nhớ/thời gian.

## Đo bằng recall@k

So với kết quả chính xác: `recall@k = |ANN ∩ chính xác| / k`. Luôn vẽ **đường cong recall so với độ trễ** khi chọn tham số (`efSearch` của HNSW, `nprobe` của IVF).

## Chọn công cụ

- Vài trăm nghìn vector: **brute force** hoặc thư viện đơn giản (NumPy, FAISS flat) là đủ.
- Hàng triệu trở lên: **HNSW/IVF** trong FAISS, hnswlib, hoặc CSDL vector (pgvector, Qdrant, Milvus, Pinecone…).
- Cần **lọc theo siêu dữ liệu** (người dùng, ngày) kết hợp tìm vector: kiểm tra CSDL hỗ trợ lọc trước/sau.
- Cập nhật/xoá thường xuyên: chú ý chi phí xây lại chỉ mục.

## Nguồn tham khảo

- Malkov & Yashunin (2020). Efficient and robust approximate nearest neighbor search using HNSW graphs. *IEEE TPAMI* 42(4).
- Charikar (2002). Similarity estimation techniques from rounding algorithms. *STOC* (LSH siêu phẳng).
- Johnson, Douze, Jégou (2021). Billion-scale similarity search with GPUs (FAISS). *IEEE Trans. Big Data*.
- Aumüller et al. ANN-Benchmarks.

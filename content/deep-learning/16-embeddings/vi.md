# Embedding: biểu diễn từ và thực thể bằng vector

Mạng nơ-ron chỉ hiểu số. Làm sao đưa **từ, sản phẩm, người dùng** (danh mục rời rạc) vào mạng?

## One-hot: đơn giản nhưng ngốc

Mỗi từ là vector toàn 0 với một số 1: kích thước bằng cỡ từ vựng (hàng chục nghìn), **thưa** và **mọi từ cách đều nhau** (king không gần queen hơn apple).

## Embedding: vector dày, có nghĩa

Mỗi mục tương ứng một **vector dày** nhỏ (50–1024 chiều) *học được*. Về bản chất là **bảng tra cứu**: ma trận `E` cỡ `|V| × d`, embedding của từ `i` chính là **hàng `i`**. (Tương đương one-hot nhân E.)

![Từ đồng nghĩa nằm gần nhau trong không gian vector](/lessons/deep-learning/16-embeddings-fig-vi.svg)
*Từ đồng nghĩa nằm gần nhau trong không gian vector*

## Học embedding từ ngữ cảnh

*"Bạn biết một từ qua bạn bè của nó"* (Firth, 1957). **word2vec** (Mikolov 2013) huấn luyện mạng dự đoán từ từ ngữ cảnh (CBOW) hoặc ngữ cảnh từ từ (skip-gram): từ xuất hiện trong ngữ cảnh giống nhau thu được vector gần nhau. GloVe và fastText cùng ý tưởng.

## Cấu trúc hình học

- **Cosine** đo gần nghĩa: king~queen cao, king~apple thấp.
- **Phép loại suy** gần đúng: `king − man + woman ≈ queen`: các hướng như "giới tính" được mã hoá thành phương trong không gian.

## Embedding hiện đại

- **Ngữ cảnh hoá**: BERT, GPT cho một vector khác nhau tuỳ câu ("bank" bờ sông vs ngân hàng).
- **Embedding câu/tài liệu** cho tìm kiếm ngữ nghĩa và RAG.
- Dùng cho **mọi thực thể**: người dùng, sản phẩm (hệ gợi ý), mã bưu điện, ID bất kỳ (`nn.Embedding`).

## Cảnh báo

Embedding học từ dữ liệu **thừa hưởng thiên kiến xã hội** (Bolukbasi et al., 2016). Kiểm tra trước khi dùng trong quyết định ảnh hưởng đến con người.

## Nguồn tham khảo

- Mikolov et al. (2013). Efficient estimation of word representations in vector space. *arXiv:1301.3781*.
- Pennington, Socher, Manning (2014). GloVe. *EMNLP*.
- Bolukbasi et al. (2016). Man is to computer programmer as woman is to homemaker? *NeurIPS*.

# Toán của CNN: kích thước đầu ra, tham số và vùng tiếp nhận

Khi thiết kế hoặc gỡ lỗi CNN, bạn phải **tính được kích thước tensor và số tham số** từng tầng. Lỗi "shape mismatch" là lỗi phổ biến nhất của người mới.

## Kích thước đầu ra

Với đầu vào rộng `W`, kernel `K`, padding `P`, stride `S`:

`W_out = ⌊(W − K + 2P) / S⌋ + 1`

- `K=3, P=1, S=1`: **giữ nguyên** kích thước ("same").
- `K=2, S=2` (pooling): **giảm một nửa**.
- `K=7, P=3, S=2` (tầng đầu ResNet): 224 → 112.

![Kích thước đầu ra và số tham số của một tầng tích chập](/lessons/deep-learning/15-cnn-architecture-math-fig-vi.svg)
*Kích thước đầu ra và số tham số của một tầng tích chập*

## Đếm tham số

Tầng conv: `c_out × (c_in × K × K + 1)` (+1 là bias). Quan trọng: **không phụ thuộc kích thước ảnh**, nhờ **chia sẻ trọng số**: cùng một bộ lọc quét toàn ảnh.

So sánh: tầng dense nối ảnh 32×32×3 với đầu ra 32×32×16 cần **~50 triệu** tham số, trong khi conv 3×3 chỉ **448**. Đây là lý do CNN hiệu quả: **tính cục bộ** và **bất biến tịnh tiến**.

## Pooling

Max pooling giữ giá trị lớn nhất mỗi cửa sổ: giảm kích thước, tăng bất biến với dịch chuyển nhỏ, **không có tham số**. Kiến trúc hiện đại thường thay bằng conv stride 2.

## Vùng tiếp nhận (receptive field)

Một nơ-ron "nhìn thấy" bao nhiêu pixel gốc? Mỗi tầng `K, S` cộng thêm `(K−1) × (tích stride các tầng trước)`. Ba conv 3×3 liên tiếp có vùng 7×7 (bằng một conv 7×7 nhưng **ít tham số hơn và nhiều phi tuyến hơn**, ý tưởng của VGG). Chồng nhiều tầng và pooling ⇒ nơ-ron sâu thấy **đối tượng lớn**.

## Lời khuyên thiết kế

- Giảm kích thước dần, **tăng số kênh** (32 → 64 → 128).
- Đếm tham số bằng `model.summary()` / `sum(p.numel())` để kiểm tra.
- Dùng **học chuyển giao** thay vì thiết kế từ đầu.

## Nguồn tham khảo

- Dumoulin & Visin (2016). A guide to convolution arithmetic for deep learning. *arXiv:1603.07285*.
- Simonyan & Zisserman (2015). Very deep convolutional networks (VGG). *ICLR*.
- He et al. (2016). Deep residual learning for image recognition. *CVPR*.
- Stanford CS231n, "Convolutional Neural Networks".

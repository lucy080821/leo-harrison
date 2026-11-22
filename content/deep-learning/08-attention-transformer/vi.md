# Attention và Transformer

**Transformer** (2017, "Attention Is All You Need") là kiến trúc đứng sau **hầu hết mô hình AI hiện đại**: GPT, BERT, Claude, Gemini, Vision Transformer... Nó thay RNN bằng cơ chế **attention** (chú ý): mọi phần tử của chuỗi **nhìn trực tiếp mọi phần tử khác**, và tính toán **song song** được.

## Trực giác của attention

Khi dịch/hiểu từ "**nó**" trong "Con mèo không ăn vì **nó** mệt", mô hình cần **chú ý nhiều hơn tới "con mèo"**. Attention cho phép mỗi từ **chọn lọc thông tin từ các từ khác** với mức quan tâm khác nhau.

Hình dung như **tra cứu mềm** trong từ điển:

- **Query** (truy vấn, $Q$): "tôi đang tìm gì".
- **Key** (khoá, $K$): "tôi là gì" (nhãn để so khớp).
- **Value** (giá trị, $V$): "nội dung tôi mang theo".

So khớp **query** với mọi **key** ⇒ trọng số ⇒ trộn các **value** theo trọng số.

![Ma trận attention minh hoạ: mỗi từ chú ý tới các từ khác](/lessons/deep-learning/08-attention-transformer-fig-vi.svg)
*Ma trận attention minh hoạ: mỗi từ chú ý tới các từ khác*

## Scaled dot-product attention

$$
\text{Attention}(Q,K,V)=\text{softmax}\!\left(\frac{QK^T}{\sqrt{d_k}}\right)V
$$

Từng bước (với $n$ token, kích thước khoá $d_k$):

1. $QK^T$: ma trận $n\times n$ **điểm tương hợp** giữa mọi cặp token.
2. Chia $\sqrt{d_k}$: tránh tích vô hướng quá lớn làm softmax **bão hoà** (gradient ~0).
3. **Softmax theo hàng**: mỗi hàng thành phân phối (tổng bằng 1) = **trọng số chú ý**.
4. Nhân với $V$: mỗi token = **trung bình có trọng số** của các value.

```python
scores = Q @ K.T / np.sqrt(d)
weights = softmax(scores, axis=-1)
out = weights @ V
```

### Self-attention

$Q,K,V$ đều được tính từ **cùng một chuỗi** bằng các phép chiếu học được: $Q=XW_Q$, $K=XW_K$, $V=XW_V$. Mỗi token **cập nhật biểu diễn của mình dựa trên mọi token khác**.

### Mặt nạ nhân quả (causal mask)

Mô hình sinh văn bản (GPT) **không được nhìn từ tương lai**: đặt điểm số của các vị trí sau bằng $-\infty$ trước softmax để trọng số bằng 0.

## Multi-head attention

Chạy **nhiều attention song song** ("đầu"), mỗi đầu có phép chiếu riêng, rồi **ghép lại**:

$$
\text{MultiHead}=\text{Concat}(\text{head}_1,\dots,\text{head}_h)\,W_O
$$

Mỗi đầu có thể học một kiểu quan hệ khác (cú pháp, đồng tham chiếu, vị trí gần...).

## Mã hoá vị trí (positional encoding)

Attention **không biết thứ tự** (đảo từ vẫn cho cùng kết quả). Phải **cộng thêm thông tin vị trí** vào embedding. Bản gốc dùng sin/cos:

$$
PE_{(pos,2i)}=\sin\!\left(\frac{pos}{10000^{2i/d}}\right),\qquad
PE_{(pos,2i+1)}=\cos\!\left(\frac{pos}{10000^{2i/d}}\right)
$$

Các tần số khác nhau giúp mô hình suy ra **khoảng cách tương đối**. Mô hình hiện đại hay dùng **RoPE** (mã hoá xoay) hoặc vị trí học được.

## Khối Transformer

```text
  x ─▶ [ Multi-Head Self-Attention ] ─▶ (+x) ─▶ LayerNorm
     ─▶ [ MLP (mạng dense 2 tầng) ]  ─▶ (+)  ─▶ LayerNorm ─▶ ra
```

- **Kết nối tắt (residual)** $+x$ quanh mỗi khối: gradient chảy tốt.
- **Layer Normalization** ổn định huấn luyện.
- **MLP theo từng vị trí** (thường mở rộng 4 lần rồi nén lại, dùng GELU).
- **Xếp chồng** hàng chục đến hàng trăm khối.

## Vì sao Transformer thắng RNN?

| | RNN/LSTM | Transformer |
|---|---|---|
| Song song hoá | **Không** (tuần tự) | **Có** (mọi token cùng lúc) |
| Đường đi giữa hai token xa | Qua $T$ bước | **Một bước** (attention trực tiếp) |
| Phụ thuộc xa | Khó | **Tốt** |
| Chi phí theo độ dài $n$ | $O(n)$ | $O(n^2)$ (ma trận attention) |

Cái giá: chi phí **bình phương** theo độ dài ngữ cảnh. Vì vậy nhiều nghiên cứu về attention hiệu quả (FlashAttention, thưa, cửa sổ trượt).

## Ba họ kiến trúc

| Họ | Ví dụ | Dùng cho |
|---|---|---|
| **Chỉ bộ mã hoá** | BERT | Hiểu văn bản: phân loại, tìm kiếm, embedding |
| **Chỉ bộ giải mã** | GPT, Claude, Llama | **Sinh văn bản** (mô hình ngôn ngữ lớn) |
| **Mã hoá-giải mã** | T5, mô hình dịch gốc | Dịch máy, tóm tắt |

## Mã mẫu PyTorch (chạy ngoài trình duyệt)

```python
import torch.nn as nn
layer = nn.TransformerEncoderLayer(d_model=256, nhead=8, dim_feedforward=1024, batch_first=True)
encoder = nn.TransformerEncoder(layer, num_layers=6)
y = encoder(x)        # x: (batch, độ_dài, 256)
```

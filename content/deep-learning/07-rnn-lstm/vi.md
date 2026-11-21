# Mạng hồi quy (RNN) và LSTM

Nhiều dữ liệu là **chuỗi**: văn bản (chuỗi từ), âm thanh, chuỗi thời gian, DNA. Đặc điểm: **thứ tự quan trọng** và **độ dài thay đổi**. MLP và CNN không có "trí nhớ" về các bước trước. **RNN** (Recurrent Neural Network) thì có.

## RNN: mạng có vòng lặp

Tại mỗi bước thời gian $t$, RNN nhận đầu vào $\mathbf x_t$ **và trạng thái ẩn trước** $\mathbf h_{t-1}$ (bộ nhớ), tạo trạng thái ẩn mới:

$$
\mathbf h_t=\tanh\big(\mathbf x_tW_x+\mathbf h_{t-1}W_h+\mathbf b\big)
$$

```text
   x1        x2        x3
   ↓         ↓         ↓
 [ RNN ]─h1→[ RNN ]─h2→[ RNN ]─h3→ ...
```

**Cùng một bộ trọng số** $(W_x,W_h,\mathbf b)$ dùng ở **mọi** bước (chia sẻ trọng số theo thời gian), nên xử lý được chuỗi **dài tuỳ ý**.

```python
h = np.zeros(hidden)
for x_t in seq:
    h = np.tanh(x_t @ Wx + h @ Wh + b)
```

Có thể lấy **đầu ra ở mỗi bước** (gán nhãn từng từ) hoặc chỉ **bước cuối** $\mathbf h_T$ (phân loại cả câu).

## Huấn luyện: BPTT

Trải mạng theo thời gian thành một mạng **rất sâu** (mỗi bước một tầng, cùng trọng số) rồi lan truyền ngược: **Backpropagation Through Time (BPTT)**. Gradient của $W_h$ là **tổng đóng góp từ mọi bước**.

## Gradient biến mất và bùng nổ

Gradient từ bước $T$ về bước 1 đi qua $T$ lần nhân với $W_h$ và đạo hàm tanh:

$$
\frac{\partial\mathbf h_T}{\partial\mathbf h_1}=\prod_{t=2}^{T}\frac{\partial\mathbf h_t}{\partial\mathbf h_{t-1}}\;\sim\;w^{\,T}
$$

| Hệ số $w$ | Sau $T=20$ bước | Hậu quả |
|---|---|---|
| $0.5$ | $9.5\times10^{-7}$ | **Biến mất**: RNN **quên** thông tin xa |
| $1.0$ | $1$ | Ổn định (hiếm khi giữ được) |
| $1.5$ | $3.3\times10^{3}$ | **Bùng nổ**: huấn luyện bất ổn |

Bùng nổ xử lý bằng **cắt gradient** (clipping). **Biến mất** là vấn đề cốt lõi: RNN thường **không học được phụ thuộc xa** (ví dụ chủ ngữ ở đầu câu dài quyết định động từ ở cuối).

## LSTM: bộ nhớ có cổng

**LSTM** (Long Short-Term Memory, 1997) thêm **trạng thái ô nhớ** $\mathbf c_t$ chạy "xa lộ" xuyên suốt chuỗi và **ba cổng** (giá trị 0-1) điều khiển luồng thông tin:

$$
\begin{aligned}
\mathbf f_t&=\sigma(W_f[\mathbf h_{t-1},\mathbf x_t]+\mathbf b_f) &&\text{cổng quên}\\
\mathbf i_t&=\sigma(W_i[\mathbf h_{t-1},\mathbf x_t]+\mathbf b_i) &&\text{cổng vào}\\
\tilde{\mathbf c}_t&=\tanh(W_c[\mathbf h_{t-1},\mathbf x_t]+\mathbf b_c) &&\text{ứng viên ô nhớ}\\
\mathbf c_t&=\mathbf f_t\odot\mathbf c_{t-1}+\mathbf i_t\odot\tilde{\mathbf c}_t &&\text{cập nhật ô nhớ}\\
\mathbf o_t&=\sigma(W_o[\mathbf h_{t-1},\mathbf x_t]+\mathbf b_o) &&\text{cổng ra}\\
\mathbf h_t&=\mathbf o_t\odot\tanh(\mathbf c_t)
\end{aligned}
$$

- **Cổng quên** quyết định giữ hay xoá ô nhớ cũ.
- **Cổng vào** quyết định ghi thông tin mới nào.
- **Cổng ra** quyết định hiển thị phần nào.

Mấu chốt: ô nhớ cập nhật bằng **phép cộng** $\mathbf f\odot\mathbf c_{t-1}+\dots$ thay vì nhân liên tiếp qua tanh, nên gradient **chảy xa hơn nhiều** mà không biến mất. **GRU** là phiên bản gọn hơn (2 cổng).

```python
# PyTorch (chạy ngoài trình duyệt)
import torch.nn as nn
lstm = nn.LSTM(input_size=128, hidden_size=256, num_layers=2, batch_first=True)
out, (h, c) = lstm(x)          # x: (batch, thời_gian, 128)
```

## RNN hai chiều và seq2seq

- **Bi-RNN**: chạy cả xuôi và ngược để mỗi vị trí thấy cả **ngữ cảnh trước và sau**.
- **Seq2seq** (mã hoá-giải mã): dịch máy, tóm tắt. Mã hoá nén cả câu thành một vector, giải mã sinh câu đích.

## Giới hạn và sự thay thế

- **Tuần tự**: bước $t$ phải đợi bước $t-1$, **không song song hoá được** trên GPU ⇒ chậm.
- Vẫn khó với phụ thuộc **rất xa**.
- Nút thắt "nén cả câu vào một vector".

**Cơ chế attention** (bài tiếp theo) và **Transformer** giải quyết đồng thời các vấn đề này, và đã thay thế RNN/LSTM trong hầu hết ứng dụng ngôn ngữ. LSTM/GRU vẫn dùng trong dữ liệu chuỗi nhỏ, thiết bị nhúng, chuỗi thời gian.

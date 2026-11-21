# Mạng tích chập (CNN)

Ảnh 224×224 màu có **150,528 điểm ảnh**. Một tầng dense với 1000 nơ-ron cần **150 triệu trọng số**: quá lớn và **bỏ qua cấu trúc không gian** của ảnh. **CNN** (Convolutional Neural Network) khai thác hai quan sát:

1. **Cục bộ**: đặc trưng hữu ích (cạnh, góc) chỉ cần nhìn một **vùng nhỏ**.
2. **Bất biến dịch chuyển**: một cạnh ở góc trên hay góc dưới đều là cạnh ⇒ **dùng chung cùng một bộ phát hiện** trên toàn ảnh.

## Phép tích chập (convolution)

Một **kernel** (bộ lọc) nhỏ (ví dụ 3×3) **trượt** trên ảnh; tại mỗi vị trí tính **tổng của tích từng phần tử** giữa vùng ảnh và kernel:

$$
\text{out}[i,j]=\sum_{u=0}^{k_h-1}\sum_{v=0}^{k_w-1}\text{image}[i+u,\,j+v]\cdot K[u,v]
$$

(Về kỹ thuật đây là **tương quan chéo**; trong deep learning người ta vẫn gọi là "tích chập".)

```python
out[i, j] = np.sum(image[i:i + kh, j:j + kw] * k)
```

Kernel $\begin{pmatrix}1&0&-1\\1&0&-1\\1&0&-1\end{pmatrix}$ đáp ứng mạnh với **cạnh dọc** (sáng bên trái, tối bên phải). CNN **học các kernel** thay vì ta thiết kế tay.

### Kích thước đầu ra

Ảnh $H\times W$, kernel $k$, **padding** $p$, **stride** $s$:

$$
H_{out}=\left\lfloor\frac{H+2p-k}{s}\right\rfloor+1
$$

- **Stride**: bước trượt (stride 2 giảm một nửa kích thước).
- **Padding**: viền số 0 quanh ảnh. `same` giữ nguyên kích thước; `valid` (không đệm) thu nhỏ.

## Tầng tích chập và các kênh

- Đầu vào có **nhiều kênh** (ảnh RGB có 3).
- Mỗi tầng có **nhiều kernel** (ví dụ 32): mỗi kernel cho một **bản đồ đặc trưng** (feature map).
- Số tham số một tầng: $k_h\cdot k_w\cdot C_{in}\cdot C_{out}+C_{out}$. Với 3×3, 3→32 kênh: $3\cdot3\cdot3\cdot32+32=896$ tham số, **không phụ thuộc kích thước ảnh**.

So sánh: tầng dense cho ảnh 224×224 cần hàng chục triệu; tầng tích chập chỉ vài trăm. Đó là sức mạnh của **chia sẻ trọng số**.

## Pooling: thu nhỏ

**Max pooling** 2×2 giữ **giá trị lớn nhất** mỗi ô, giảm một nửa kích thước, tăng **bất biến với dịch chuyển nhỏ** và giảm tính toán:

```python
x.reshape(H // 2, 2, W // 2, 2).max(axis=(1, 3))
```

**Average pooling** lấy trung bình. **Global average pooling** thu mỗi bản đồ đặc trưng về một số, thay cho tầng dense lớn ở cuối.

## Kiến trúc CNN điển hình

```text
 Ảnh ─▶ [Conv → ReLU → Pool] × n ─▶ Flatten ─▶ Dense ─▶ Softmax
        └── trích xuất đặc trưng ──┘   └── phân loại ──┘
```

Các tầng đầu học **cạnh, góc**; tầng giữa học **hoa văn, bộ phận**; tầng sâu học **vật thể**. Đây là **phân cấp đặc trưng** mà bạn thấy trong các trực quan hoá.

## Các kiến trúc nổi tiếng

| Mạng | Đóng góp |
|---|---|
| **LeNet** (1998) | CNN đầu tiên nhận dạng chữ số |
| **AlexNet** (2012) | Mở đầu cách mạng deep learning (GPU, ReLU, dropout) |
| **VGG** | Chồng nhiều kernel 3×3 nhỏ |
| **ResNet** | **Kết nối tắt (residual)** $y=F(x)+x$ cho phép huấn luyện hàng trăm tầng |
| **EfficientNet** | Cân bằng độ sâu/rộng/độ phân giải |

**Kết nối tắt** giải quyết gradient biến mất bằng cách cho gradient chảy thẳng qua phép cộng $+x$.

## Mã mẫu PyTorch (để chạy ngoài trình duyệt)

```python
import torch.nn as nn

model = nn.Sequential(
    nn.Conv2d(1, 16, kernel_size=3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Conv2d(16, 32, kernel_size=3, padding=1), nn.ReLU(), nn.MaxPool2d(2),
    nn.Flatten(),
    nn.Linear(32 * 7 * 7, 10),          # ảnh 28x28 -> 10 lớp
)
```

## Ứng dụng ngoài ảnh

- **Phát hiện vật thể** (YOLO), **phân vùng** (U-Net), **nhận dạng khuôn mặt**.
- **Âm thanh/chuỗi**: tích chập 1 chiều.
- Ngày nay **Vision Transformer (ViT)** cạnh tranh với CNN, nhưng ý tưởng cục bộ và chia sẻ trọng số vẫn rất quan trọng.

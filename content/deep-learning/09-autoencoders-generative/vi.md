# Autoencoder và mô hình sinh (GAN, VAE, khuếch tán)

Từ đầu khoá, mạng nơ-ron **dự đoán nhãn** từ đầu vào. Bài này nói về hai ý tưởng khác: **học biểu diễn nén không cần nhãn** (autoencoder) và **sinh dữ liệu mới** (mô hình sinh).

## Autoencoder

Một mạng được huấn luyện để **tái dựng chính đầu vào** qua một **nút thắt** hẹp:

```text
 x ──▶ [ Bộ mã hoá ] ──▶ z (mã, ít chiều) ──▶ [ Bộ giải mã ] ──▶ x̂ ≈ x
```

Mất mát: $L=\|\mathbf x-\hat{\mathbf x}\|^2$. Vì $\mathbf z$ **ít chiều hơn** $\mathbf x$, mạng buộc phải **nén**, giữ lại những yếu tố quan trọng nhất. $\mathbf z$ là **biểu diễn ẩn** (latent).

### Quan hệ với PCA

Autoencoder **tuyến tính** (không kích hoạt) với MSE cho ra đúng **không gian con của PCA**: mã hoá $=$ chiếu lên $k$ vector kỳ dị đầu, giải mã $=$ phép chiếu ngược:

```python
code = Xc @ Vt[:k].T
X_hat = code @ Vt[:k] + mean
```

Autoencoder **phi tuyến** (có kích hoạt) mạnh hơn: nén được cấu trúc cong mà PCA bỏ lỡ.

### Ứng dụng

| Ứng dụng | Cách làm |
|---|---|
| **Giảm chiều / trực quan hoá** | Dùng mã $\mathbf z$ |
| **Khử nhiễu** (denoising AE) | Đưa vào ảnh nhiễu, bắt tái dựng ảnh sạch |
| **Phát hiện bất thường** | Mẫu lạ có **lỗi tái dựng lớn** |
| **Học trước (pretraining)** | Biểu diễn dùng cho bài toán khác |

## Mô hình sinh (generative models)

Mục tiêu: học phân phối dữ liệu $p(\mathbf x)$ để **sinh mẫu mới** trông như thật (ảnh, văn bản, âm thanh). Ba họ chính:

### 1. VAE (Variational Autoencoder)

Autoencoder **xác suất**: bộ mã hoá cho ra **phân phối** (trung bình và độ lệch chuẩn) của $\mathbf z$ thay vì một điểm, và ép phân phối đó gần $N(0,I)$ bằng số hạng **KL**:

$$
L = \underbrace{\|\mathbf x-\hat{\mathbf x}\|^2}_{\text{tái dựng}} + \underbrace{D_{KL}\big(q(\mathbf z\mid\mathbf x)\,\|\,N(0,I)\big)}_{\text{giữ không gian ẩn mượt}}
$$

Sinh mẫu: lấy $\mathbf z\sim N(0,I)$ rồi giải mã. Ảnh hơi mờ nhưng huấn luyện ổn định.

### 2. GAN (Generative Adversarial Network)

Hai mạng **đối kháng**:

- **Bộ sinh** $G$: tạo ảnh giả từ nhiễu $\mathbf z$.
- **Bộ phân biệt** $D$: phân biệt ảnh **thật** và **giả**.

$$
\min_G\max_D\ \mathbb{E}[\log D(\mathbf x)]+\mathbb{E}[\log(1-D(G(\mathbf z)))]
$$

Với $D(\text{thật})=0.9$ và $D(\text{giả})=0.2$:

$$
L_D=-\big[\ln 0.9+\ln(1-0.2)\big]\approx0.3285,\qquad
L_G=-\ln(0.2)\approx1.6094\ \text{(dạng không bão hoà)}
$$

$D$ cố **giảm** $L_D$ (nhận đúng), $G$ cố **giảm** $L_G$ (lừa được $D$). Hai bên **tiến hoá cùng nhau**. Ảnh sắc nét nhưng huấn luyện **khó và bất ổn** (sụp đổ chế độ: chỉ sinh vài kiểu mẫu).

### 3. Mô hình khuếch tán (diffusion)

Nền tảng của Stable Diffusion, DALL·E, Midjourney.

- **Quá trình xuôi:** dần **thêm nhiễu Gauss** vào ảnh qua $T$ bước cho đến khi chỉ còn nhiễu thuần tuý.
- **Quá trình ngược:** huấn luyện mạng (thường **U-Net** hoặc Transformer) **dự đoán và loại nhiễu** từng bước. Sinh ảnh = bắt đầu từ nhiễu thuần, **khử nhiễu dần** thành ảnh.

```text
 ảnh thật ──thêm nhiễu──▶ ... ──▶ nhiễu thuần
 ảnh mới  ◀──khử nhiễu── ... ◀── nhiễu ngẫu nhiên
```

Cho chất lượng cao và huấn luyện ổn định; có thể **điều kiện hoá bằng văn bản** (text-to-image). Nhược điểm là sinh mẫu cần **nhiều bước** (chậm hơn GAN).

## Mô hình ngôn ngữ cũng là mô hình sinh

LLM là **mô hình sinh tự hồi quy**: học $p(\text{từ}_t\mid\text{các từ trước})$ rồi sinh từng từ một. (Bạn sẽ gặp trong khoá AI hiện đại.)

## So sánh nhanh

| Họ | Chất lượng mẫu | Độ ổn định | Tốc độ sinh |
|---|---|---|---|
| **VAE** | Trung bình (mờ) | **Ổn định** | Nhanh |
| **GAN** | Rất tốt (sắc nét) | **Khó huấn luyện** | **Rất nhanh** |
| **Khuếch tán** | **Tốt nhất** | Ổn định | Chậm (nhiều bước) |
| **Tự hồi quy** (LLM) | Rất tốt (văn bản) | Ổn định | Tuần tự từng token |

## Mã mẫu PyTorch (chạy ngoài trình duyệt)

```python
import torch.nn as nn
class AutoEncoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.enc = nn.Sequential(nn.Linear(784, 128), nn.ReLU(), nn.Linear(128, 16))
        self.dec = nn.Sequential(nn.Linear(16, 128), nn.ReLU(), nn.Linear(128, 784), nn.Sigmoid())
    def forward(self, x):
        return self.dec(self.enc(x))
# loss = nn.MSELoss()(model(x), x)
```

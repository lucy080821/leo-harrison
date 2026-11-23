# Khởi tạo trọng số: Xavier, He và gradient biến mất

Mạng sâu **không học được** nếu tín hiệu *tắt dần* hoặc *nổ tung* khi đi qua các tầng, dù thuật toán tối ưu có tốt đến đâu. Khởi tạo ban đầu quyết định điều này.

## Vấn đề

Mỗi tầng nhân với ma trận W. Nếu phương sai của W quá nhỏ, độ lớn kích hoạt **co lại theo cấp số nhân** theo độ sâu (gradient biến mất); quá lớn thì **nổ** (gradient bùng nổ). Cả hai làm huấn luyện đứng yên hoặc cho NaN.

![Độ lệch chuẩn của kích hoạt qua các tầng với ba cách khởi tạo](/lessons/deep-learning/11-weight-initialization-fig-vi.svg)
*Độ lệch chuẩn của kích hoạt qua các tầng với ba cách khởi tạo*

## Giữ phương sai ổn định

Với `y = Σ w·x` của `n_in` đầu vào độc lập: `Var(y) = n_in · Var(w) · Var(x)`. Muốn `Var(y) = Var(x)` ⇒ `Var(w) = 1/n_in`.

| Cách | `Var(w)` | Dùng với |
|---|---|---|
| **Xavier/Glorot** | `2/(n_in + n_out)` hoặc `1/n_in` | tanh, sigmoid |
| **He/Kaiming** | `2/n_in` | **ReLU** (ReLU triệt nửa đầu ra nên cần gấp đôi) |
| Quá nhỏ (0,01) | cố định | tín hiệu tắt ở mạng sâu |
| **Toàn 0** | 0 | các nơ-ron **giống hệt nhau** (đối xứng), không bao giờ khác biệt |

## Vì sao khởi tạo bằng 0 hỏng

Mọi nơ-ron trong một tầng nhận cùng gradient nên **luôn bằng nhau**: mạng 256 nơ-ron chỉ như 1. Khởi tạo **ngẫu nhiên** phá vỡ đối xứng. (Hệ số chặn có thể khởi tạo 0.)

## Công cụ bổ trợ

Ngày nay khởi tạo đúng thường kết hợp **chuẩn hoá theo batch/tầng**, kết nối **tắt (residual)** và bộ tối ưu thích nghi (Adam), giúp mạng hàng trăm tầng huấn luyện được. PyTorch/Keras đã đặt mặc định hợp lý (Keras: Glorot; `kaiming_normal_` cho ReLU).

## Nguồn tham khảo

- Glorot & Bengio (2010). Understanding the difficulty of training deep feedforward neural networks. *AISTATS*.
- He, Zhang, Ren, Sun (2015). Delving deep into rectifiers. *ICCV*.
- Goodfellow, Bengio, Courville. *Deep Learning*, mục 8.4.

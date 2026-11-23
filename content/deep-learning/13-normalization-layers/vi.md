# Chuẩn hoá: BatchNorm và LayerNorm

Khi các tầng phía trước thay đổi, **phân phối đầu vào của tầng sau cũng trôi** (*internal covariate shift*, giả thuyết gốc của BatchNorm). Chuẩn hoá giữ kích hoạt ở thang ổn định, cho phép **tốc độ học lớn hơn** và huấn luyện **nhanh, ổn định** hơn.

## Hai biến thể

| | **BatchNorm** | **LayerNorm** |
|---|---|---|
| Tính thống kê trên | cả **batch**, từng đặc trưng (cột) | **từng mẫu**, qua các đặc trưng (hàng) |
| Phụ thuộc kích thước batch | **có** (kém khi batch nhỏ) | không |
| Train khác inference | **có** (dùng trung bình/phương sai chạy) | không |
| Hay dùng ở | CNN thị giác | **Transformer**, RNN, NLP |

![BatchNorm chuẩn hoá theo batch; LayerNorm chuẩn hoá theo từng mẫu](/lessons/deep-learning/13-normalization-layers-fig-vi.svg)
*BatchNorm chuẩn hoá theo batch; LayerNorm chuẩn hoá theo từng mẫu*

## Công thức

`x̂ = (x − μ) / √(σ² + ε)`, rồi `y = γ·x̂ + β`. `γ` và `β` là tham số **học được** để mạng có thể *hoàn tác* chuẩn hoá nếu cần.

## BatchNorm khi suy luận

Không có batch để tính thống kê (có thể chỉ một mẫu), nên dùng **trung bình/phương sai chạy (moving average)** tích luỹ khi huấn luyện. Quên chuyển sang `model.eval()` là lỗi kinh điển cho kết quả suy luận sai.

## Tác dụng phụ

BatchNorm có hiệu ứng **regularization** nhẹ (nhiễu từ thống kê batch). Nghiên cứu sau cho rằng lợi ích chính là **làm mượt bề mặt mất mát** (Santurkar et al., 2018), không hẳn là giảm covariate shift.

## Khi nào dùng

- CNN, batch đủ lớn (≥ 16–32): BatchNorm (hoặc GroupNorm khi batch nhỏ).
- Transformer, chuỗi, batch nhỏ: LayerNorm (hoặc RMSNorm trong các LLM hiện đại).

## Nguồn tham khảo

- Ioffe & Szegedy (2015). Batch Normalization. *ICML*.
- Ba, Kiros, Hinton (2016). Layer Normalization. *arXiv:1607.06450*.
- Santurkar et al. (2018). How does batch normalization help optimization? *NeurIPS*.

# Lịch tốc độ học, warmup và cắt gradient

**Tốc độ học (learning rate, LR)** là siêu tham số quan trọng nhất. Một LR cố định hiếm khi tối ưu: ban đầu cần lớn để tiến nhanh, cuối cần nhỏ để hội tụ chính xác.

## Các lịch phổ biến

| Lịch | Ý tưởng |
|---|---|
| **Step decay** | nhân 0,1 sau mỗi N epoch |
| **Cosine** | giảm mượt như nửa chu kỳ cos về ≈ 0 |
| **Warmup** | tăng tuyến tính từ ≈ 0 trong vài trăm bước đầu |
| **One-cycle** | tăng rồi giảm trong một chu kỳ, cho hội tụ nhanh |
| **Giảm khi đứng yên** (ReduceLROnPlateau) | hạ LR khi mất mát validation không cải thiện |

![Warmup rồi giảm cosine: lịch tốc độ học phổ biến của Transformer](/lessons/deep-learning/14-learning-rate-schedules-fig-vi.svg)
*Warmup rồi giảm cosine: lịch tốc độ học phổ biến của Transformer*

## Vì sao cần warmup

Đầu huấn luyện, trọng số ngẫu nhiên và **ước lượng thích nghi của Adam chưa ổn định** (v còn nhỏ nên bước quá lớn). Tăng LR dần tránh sụp đổ sớm; gần như **bắt buộc với Transformer** (Vaswani 2017; Liu et al. 2020 phân tích vì sao).

## Tìm LR (LR range test)

Cho LR tăng theo cấp số nhân qua một epoch, vẽ mất mát: chọn LR **ngay trước khi mất mát tăng vọt** (Smith, 2017; `lr_find` của fastai). Điểm khởi đầu thường dùng với Adam: `3e-4`.

## Cắt gradient (gradient clipping)

Khi gradient bùng nổ (RNN, huấn luyện LLM), **thu nhỏ vector gradient** nếu chuẩn vượt ngưỡng: `g ← g · max_norm/‖g‖`. **Giữ hướng**, chỉ giới hạn độ dài. Ngưỡng 1,0 rất phổ biến.

## Adam từng bước

`m` (trung bình động của gradient), `v` (trung bình động của gradient²), hiệu chỉnh lệch `m̂ = m/(1−β₁ᵗ)`, bước `w −= lr · m̂/(√v̂ + ε)`. Mỗi tham số có LR hiệu dụng riêng. `AdamW` tách rời weight decay đúng cách (Loshchilov & Hutter, 2019).

## Nguồn tham khảo

- Loshchilov & Hutter (2017). SGDR: stochastic gradient descent with warm restarts. *ICLR*.
- Smith, L. (2017). Cyclical learning rates for training neural networks. *WACV*.
- Kingma & Ba (2015). Adam. *ICLR*.
- Pascanu, Mikolov, Bengio (2013). On the difficulty of training RNNs. *ICML*.

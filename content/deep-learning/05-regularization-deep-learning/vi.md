# Chống quá khớp trong deep learning

Mạng nơ-ron có **hàng triệu tham số**, đủ sức **học thuộc cả tập huấn luyện**. Bài này giới thiệu các kỹ thuật **regularization** chuẩn của deep learning.

## Nguyên tắc chung

Thứ tự ưu tiên khi mô hình quá khớp:

1. **Thêm dữ liệu** hoặc **tăng cường dữ liệu** (data augmentation).
2. **Giảm dung lượng** mô hình (ít tầng/nơ-ron hơn).
3. Các kỹ thuật dưới đây.

## Weight decay (L2)

Thêm hình phạt cho trọng số lớn vào hàm mất mát (giống Ridge):

$$
L_{total} = L + \frac{\lambda}{2}\sum_{\ell}\|W_\ell\|_2^2,\qquad
\frac{\partial L_{total}}{\partial W} = \frac{\partial L}{\partial W}+\lambda W
$$

Mỗi bước cập nhật có thêm thành phần **co trọng số về 0**: $W\leftarrow W-\eta(\nabla L+\lambda W)$, nên gọi là **weight decay** (suy giảm trọng số). Trọng số nhỏ ⇒ hàm **mượt hơn** ⇒ ít bị nhiễu chi phối. Thường $\lambda\sim10^{-4}$ đến $10^{-2}$. Với Adam nên dùng **AdamW**.

## Dropout

Trong **lúc huấn luyện**, mỗi lần lan truyền **tắt ngẫu nhiên** một tỉ lệ $p$ nơ-ron (đặt đầu ra bằng 0):

```python
def dropout(a, p, rng):
    mask = (rng.random(a.shape) >= p) / (1 - p)     # chia (1-p) để giữ kỳ vọng
    return a * mask
```

Ý nghĩa:

- Mạng không thể dựa vào **một nơ-ron cụ thể** ⇒ buộc học đặc trưng **dư thừa, bền vững**.
- Giống huấn luyện **tập hợp (ensemble) rất nhiều mạng con** chia sẻ trọng số.

**Chia cho $(1-p)$** (inverted dropout) giữ **giá trị kỳ vọng** của kích hoạt không đổi, nên lúc **suy luận (test) không cần làm gì** (**tắt dropout** hoàn toàn). Quên chuyển sang chế độ eval là lỗi kinh điển.

Giá trị thường dùng: $p=0.1$-$0.5$.

## Dừng sớm (early stopping)

Theo dõi **validation loss**: khi nó **ngừng giảm** (hoặc bắt đầu tăng), **dừng lại** và **khôi phục trọng số tốt nhất**.

```text
 loss
  │ ╲        validation
  │  ╲      ╱‾‾‾‾‾  ← quá khớp bắt đầu
  │   ╲____╱
  │    ╲______________ train
  └─────────────────── epoch
         ↑ dừng ở đây
```

Rất rẻ và hiệu quả. Tham số `patience` (chờ bao nhiêu epoch không cải thiện).

## Chuẩn hoá theo lô (Batch Normalization)

Chuẩn hoá đầu vào của mỗi tầng theo **trung bình/độ lệch chuẩn của lô**, rồi học **co giãn và dịch** $\gamma,\beta$:

$$
\hat x = \frac{x-\mu_B}{\sqrt{\sigma_B^2+\epsilon}},\qquad y=\gamma\hat x+\beta
$$

Lợi ích: huấn luyện **ổn định và nhanh hơn**, cho phép **learning rate lớn**, giảm phụ thuộc khởi tạo, và có **tác dụng regularization nhẹ**. Khi suy luận dùng **trung bình/độ lệch chạy** (running statistics) đã tích luỹ. **Layer Normalization** (chuẩn hoá theo từng mẫu) là lựa chọn chuẩn cho Transformer.

## Tăng cường dữ liệu (data augmentation)

Tạo mẫu mới bằng biến đổi giữ nguyên nhãn:

- **Ảnh**: lật, xoay, cắt, đổi độ sáng, thêm nhiễu.
- **Văn bản**: thay từ đồng nghĩa, dịch ngược.
- **Âm thanh**: đổi tốc độ, thêm tiếng ồn.

Cách "thêm dữ liệu miễn phí", hiệu quả bậc nhất với ảnh.

## Các kỹ thuật khác

| Kỹ thuật | Ý tưởng |
|---|---|
| **Label smoothing** | Nhãn mềm (0.9 thay vì 1) để mô hình bớt tự tin thái quá |
| **Gradient clipping** | Cắt gradient để tránh bùng nổ |
| **Mixup / CutMix** | Trộn hai mẫu và nhãn |
| **Transfer learning** | Dùng mô hình **tiền huấn luyện**, chỉ tinh chỉnh một phần: hiệu quả khi ít dữ liệu |
| **Ensembling** | Trung bình nhiều mô hình |

## Quy trình thực tế

```text
1. Baseline đơn giản → có overfit không? (train ≪ val)
2. Có: thêm dữ liệu/augmentation → weight decay → dropout → giảm kích thước
3. Không (underfit): mạng lớn hơn, huấn luyện lâu hơn, LR phù hợp
4. Early stopping, theo dõi validation
```

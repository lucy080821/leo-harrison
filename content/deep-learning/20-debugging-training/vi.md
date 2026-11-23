# Gỡ lỗi huấn luyện: kiểm tra gradient và danh sách kiểm tra

Mạng nơ-ron có thể **chạy không lỗi mà vẫn sai**: không có exception, chỉ là học kém. Gỡ lỗi cần **quy trình có hệ thống** (xem "A Recipe for Training Neural Networks" của Karpathy).

## 1. Kiểm tra gradient (gradient checking)

Khi tự cài backprop, so gradient giải tích với **gradient số** bằng sai phân trung tâm:

`∂f/∂w ≈ (f(w+h) − f(w−h)) / 2h`, `h ≈ 1e-5`.

Sai số tương đối `‖a−n‖ / (‖a‖+‖n‖)` phải **< 1e-6** (float64). Chỉ dùng để *kiểm tra* (chậm), không dùng huấn luyện. Đó cũng là cách tự kiểm `autograd` ở bài 10.

![Công thức gỡ lỗi: kiểm tra gradient bằng sai phân và overfit một batch nhỏ](/lessons/deep-learning/20-debugging-training-fig-vi.svg)
*Công thức gỡ lỗi: kiểm tra gradient bằng sai phân và overfit một batch nhỏ*

## 2. Danh sách kiểm tra theo thứ tự

1. **Nhìn dữ liệu**: ảnh/nhãn có đúng, có bị lệch nhãn không? (Nhiều bug nằm ở đây.)
2. **Mất mát ban đầu** phải ≈ `ln(số lớp)` (hồi quy: ≈ phương sai nhãn). Sai nhiều ⇒ lỗi khởi tạo/nhãn.
3. **Overfit một batch nhỏ** (2–10 mẫu): mất mát phải về ≈ 0. Không được ⇒ bug trong mô hình/mất mát/gradient. **Làm trước mọi thứ khác.**
4. Kiểm tra **kích thước tensor** và **chiều softmax/mean**.
5. **Chia đúng tập** huấn luyện/validation; không rò rỉ.
6. Mới đến **LR, kiến trúc, regularization**.

## Các bug thường gặp

| Triệu chứng | Nguyên nhân hay gặp |
|---|---|
| Mất mát không giảm | LR sai (quá lớn/nhỏ), quên `zero_grad()`, nhãn lệch, quên bật huấn luyện |
| Mất mát = NaN | LR quá lớn, `log(0)`, chia 0, đầu vào chứa NaN |
| Train tốt, val tệ | quá khớp, rò rỉ khác biệt giữa train/val, quên `eval()` |
| Cả hai đều xấu | thiếu năng lực, ít epoch, dữ liệu/nhãn sai |
| Accuracy bằng tỷ lệ lớp đa số | mô hình đoán một lớp (mất cân bằng hoặc không học) |

## Công cụ

Ghi lại **đường cong mất mát/chỉ số** (TensorBoard, Weights & Biases), **chuẩn gradient theo tầng**, histogram kích hoạt, và **cố định hạt giống** để tái lập.

## Nguồn tham khảo

- Karpathy, A. (2019). A recipe for training neural networks (blog).
- Stanford CS231n, "Gradient checking" & "Babysitting the learning process".
- Goodfellow, Bengio, Courville. *Deep Learning*, mục 11 (Practical methodology).

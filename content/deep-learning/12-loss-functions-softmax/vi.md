# Hàm mất mát: softmax, entropy chéo và ổn định số học

Hàm mất mát là **thước đo duy nhất** mạng nhìn thấy khi học. Chọn sai hàm mất mát thì tối ưu hoá hoàn hảo vẫn cho kết quả sai.

## Phân loại: softmax + entropy chéo

**Softmax** biến vector điểm thô (logit) thành xác suất: `p_i = e^{z_i} / Σ_j e^{z_j}` (dương, tổng bằng 1).

**Entropy chéo**: `L = −log p_đúng`. Dự đoán đúng và tự tin (p→1) cho mất mát ≈ 0; **sai mà tự tin** (p→0) cho mất mát lớn vô hạn. Đây chính là *đối số cực đại hợp lý* của mô hình phân loại.

![Softmax biến điểm thô thành xác suất; entropy chéo phạt dự đoán sai tự tin](/lessons/deep-learning/12-loss-functions-softmax-fig-vi.svg)
*Softmax biến điểm thô thành xác suất; entropy chéo phạt dự đoán sai tự tin*

## Ổn định số học

`e^{1000}` tràn số. Trừ `max(z)` trước khi lũy thừa **không đổi kết quả** nhưng an toàn. Trong thực tế dùng hàm kết hợp (`log_softmax`, `CrossEntropyLoss` nhận *logit*) thay vì tự tính `log(softmax(...))`.

## Gradient gọn đáng ngạc nhiên

Với softmax + entropy chéo: `∂L/∂z = p − y_onehot` (chia cho N nếu trung bình batch). Đẹp và không bị bão hoà, là lý do cặp này được dùng khắp nơi.

## Chọn hàm mất mát theo bài toán

| Bài toán | Đầu ra | Mất mát |
|---|---|---|
| Phân loại nhị phân | sigmoid | entropy chéo nhị phân |
| Nhiều lớp (một nhãn) | softmax | entropy chéo |
| Nhiều nhãn cùng lúc | sigmoid mỗi nhãn | BCE từng nhãn |
| Hồi quy | tuyến tính | **MSE** (nhạy ngoại lai), **MAE**, **Huber** (cân bằng) |
| Mất cân bằng lớp | | entropy chéo có trọng số, focal loss |

## Mẹo

- **Label smoothing** (nhãn 0,9 thay 1) giảm tự tin thái quá.
- Mất mát ban đầu nên ≈ `log(số lớp)` với khởi tạo hợp lý (3 lớp ⇒ ≈ 1,10): dùng làm **kiểm tra sức khỏe**.
- Mất mát **không phải** chỉ số kinh doanh: vẫn đo accuracy/F1/AUC.

## Nguồn tham khảo

- Goodfellow, Bengio, Courville. *Deep Learning*, chương 6.2 và 3.
- Szegedy et al. (2016). Rethinking the Inception architecture (label smoothing). *CVPR*.
- Lin et al. (2017). Focal loss for dense object detection. *ICCV*.

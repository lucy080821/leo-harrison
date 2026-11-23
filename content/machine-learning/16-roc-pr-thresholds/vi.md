# ROC, Precision-Recall và chọn ngưỡng quyết định

Mô hình phân loại thực chất xuất ra **xác suất**. Nhãn là kết quả của một **ngưỡng** (mặc định 0,5). Ngưỡng 0,5 hiếm khi tối ưu cho bài toán thật.

## Đánh đổi theo ngưỡng

Hạ ngưỡng ⇒ bắt nhiều ca dương hơn (**recall tăng**) nhưng báo nhầm nhiều hơn (**precision giảm**). Đường cong cho thấy toàn bộ đánh đổi này.

![Đường ROC và PR: mỗi điểm là một ngưỡng quyết định](/lessons/machine-learning/16-roc-pr-thresholds-fig-vi.svg)
*Đường ROC và PR: mỗi điểm là một ngưỡng quyết định*

## Hai đường cong

| | Trục | Đọc |
|---|---|---|
| **ROC** | FPR (x) và TPR = recall (y) | AUC = xác suất mô hình xếp một ca dương **cao hơn** một ca âm ngẫu nhiên; 0,5 = đoán mò |
| **Precision-Recall** | recall (x), precision (y) | nên dùng khi **lớp dương hiếm**: ROC có thể trông đẹp giả vì FPR chia cho số âm rất lớn |

## Chọn ngưỡng theo nghiệp vụ

1. Xác định **chi phí** FN (bỏ sót) và FP (báo nhầm).
2. Hoặc đặt **ràng buộc**: "recall ≥ 98%", rồi chọn ngưỡng cho precision cao nhất thoả ràng buộc.
3. Chọn ngưỡng trên **tập validation**, báo cáo trên tập kiểm tra riêng.

## Lưu ý

- AUC không phụ thuộc ngưỡng nên **không** thay thế việc chọn ngưỡng.
- Mô hình xếp hạng tốt (AUC cao) vẫn có thể **xác suất sai lệch**; kiểm tra bằng đường hiệu chuẩn (`CalibratedClassifierCV`).
- Báo cáo khoảng tin cậy (bootstrap) cho AUC khi mẫu nhỏ.

## Nguồn tham khảo

- Fawcett, T. (2006). An introduction to ROC analysis. *Pattern Recognition Letters* 27(8).
- Davis & Goadrich (2006). The relationship between Precision-Recall and ROC curves. *ICML*.
- scikit-learn User Guide, "Tuning the decision threshold for class prediction".

# Dữ liệu mất cân bằng: vì sao accuracy đánh lừa

Gian lận thẻ (0,1%), bỏ dịch vụ (5%), bệnh hiếm (1%): lớp bạn quan tâm thường **rất hiếm**. Một mô hình luôn đoán "bình thường" đạt accuracy 95–99,9% nhưng **vô dụng**.

## Bước 1: luôn có baseline

`DummyClassifier(strategy="most_frequent")` cho biết accuracy "miễn phí". Mô hình thật phải thắng nó **trên chỉ số phù hợp**, không chỉ accuracy.

![Độ chính xác cao nhưng bỏ sót hầu hết lớp hiếm](/lessons/machine-learning/15-imbalanced-classes-fig-vi.svg)
*Độ chính xác cao nhưng bỏ sót hầu hết lớp hiếm*

## Chọn chỉ số theo chi phí sai lầm

| Chỉ số | Câu hỏi |
|---|---|
| **Recall** (độ nhạy) | Trong các ca dương thật, bắt được bao nhiêu? |
| **Precision** | Trong các ca báo dương, bao nhiêu đúng? |
| **F1 / Fβ** | cân bằng hai cái trên (β>1 ưu tiên recall) |
| **PR-AUC** | ổn định hơn ROC-AUC khi lớp dương hiếm |
| Chi phí kỳ vọng | `FN × chi phí bỏ sót + FP × chi phí báo nhầm` |

## Các cách xử lý

1. **`class_weight="balanced"`**: phạt lỗi lớp hiếm nặng hơn. Đơn giản, nên thử đầu tiên.
2. **Dời ngưỡng quyết định** (không nhất thiết 0,5): chọn theo chi phí (bài ROC/PR).
3. **Lấy mẫu lại**: giảm lớp đa số, tăng lớp hiếm (SMOTE trong `imbalanced-learn`). **Chỉ áp dụng trên tập huấn luyện**, bên trong Pipeline/CV.
4. Thu thêm dữ liệu lớp hiếm, hoặc xem như **phát hiện bất thường**.

## Quy tắc vàng

- Chia `stratify=y` để tập kiểm tra giữ đúng tỷ lệ.
- **Không** cân bằng lại tập kiểm tra: nó phải phản ánh thực tế.
- Xác suất sau khi đổi trọng số **không còn hiệu chuẩn**; hiệu chuẩn lại nếu cần dùng như xác suất.

## Nguồn tham khảo

- He & Garcia (2009). Learning from imbalanced data. *IEEE TKDE* 21(9).
- Saito & Rehmsmeier (2015). The precision-recall plot is more informative than the ROC plot on imbalanced datasets. *PLOS ONE*.
- scikit-learn User Guide, "Metrics"; imbalanced-learn documentation.

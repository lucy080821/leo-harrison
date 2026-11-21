# Đánh giá phân loại và cross-validation

"Mô hình đạt 99% accuracy" nghe tuyệt vời, nhưng có thể là **vô dụng**. Bài này dạy cách đo đúng.

## Cái bẫy của accuracy

Một bệnh hiếm gặp ở 1% dân số. Mô hình **luôn trả lời "khoẻ mạnh"** đạt accuracy 99% mà **không phát hiện được ca bệnh nào**. Với dữ liệu **mất cân bằng**, accuracy gây hiểu lầm.

## Ma trận nhầm lẫn (confusion matrix)

Với phân loại nhị phân (lớp "dương" là lớp quan tâm, ví dụ có bệnh):

| | Dự đoán **dương** | Dự đoán **âm** |
|---|---|---|
| Thật **dương** | **TP** (đúng dương) | **FN** (bỏ sót) |
| Thật **âm** | **FP** (báo động giả) | **TN** (đúng âm) |

```python
from sklearn.metrics import confusion_matrix
tn, fp, fn, tp = confusion_matrix(y_true, y_pred).ravel()
```

## Các chỉ số từ ma trận nhầm lẫn

$$
\text{Accuracy}=\frac{TP+TN}{TP+TN+FP+FN}
$$

$$
\text{Precision}=\frac{TP}{TP+FP},\qquad
\text{Recall}=\frac{TP}{TP+FN},\qquad
F_1=\frac{2\cdot P\cdot R}{P+R}
$$

| Chỉ số | Trả lời câu hỏi | Quan trọng khi |
|---|---|---|
| **Precision** (độ chính xác) | Trong các ca **dự đoán dương**, bao nhiêu **đúng**? | **Báo động giả đắt giá** (lọc spam: đừng chặn nhầm email thật) |
| **Recall** (độ phủ / độ nhạy) | Trong các ca **thật sự dương**, bắt được bao nhiêu? | **Bỏ sót đắt giá** (ung thư, gian lận) |
| **F1** | Trung bình điều hoà của hai chỉ số | Cần cân bằng, dữ liệu lệch |

Ví dụ trong bài: $TP=3,FP=1,FN=1,TN=3$ cho precision $=3/4$, recall $=3/4$, $F_1=0.75$.

**Đánh đổi precision-recall:** hạ ngưỡng quyết định làm recall tăng nhưng precision giảm, và ngược lại.

## ROC và AUC

Quét mọi ngưỡng, vẽ:

- **TPR** (= recall) theo **FPR** $=\dfrac{FP}{FP+TN}$.

**AUC** (diện tích dưới đường ROC) tóm tắt thành **một số**:

- $0.5$: đoán mò. $1.0$: phân tách hoàn hảo.
- Ý nghĩa: xác suất mô hình **xếp một mẫu dương cao hơn một mẫu âm** ngẫu nhiên.

```python
from sklearn.metrics import roc_auc_score
roc_auc_score(y_test, clf.predict_proba(X_test)[:, 1])
```

Với dữ liệu rất mất cân bằng, **Precision-Recall AUC** (`average_precision_score`) thông tin hơn ROC-AUC.

## Nhiều lớp

```python
from sklearn.metrics import classification_report
print(classification_report(y_test, pred))
```

Gộp theo **macro** (trung bình đều các lớp), **micro** (gộp mọi mẫu) hoặc **weighted** (theo số mẫu mỗi lớp).

## Cross-validation (kiểm định chéo)

Một lần chia train/test cho kết quả **phụ thuộc may rủi** vào cách chia. **K-fold cross-validation** đánh giá ổn định hơn:

```text
Fold 1: [TEST][train][train][train][train]
Fold 2: [train][TEST][train][train][train]
Fold 3: [train][train][TEST][train][train]
...         (mỗi mẫu được kiểm tra đúng 1 lần)
```

```python
from sklearn.model_selection import cross_val_score
scores = cross_val_score(model, X, y, cv=5)      # 5 điểm
scores.mean(), scores.std()                       # trung bình ± độ lệch
```

- Báo cáo **trung bình ± độ lệch chuẩn**; độ lệch lớn nghĩa là mô hình không ổn định.
- Phân loại mất cân bằng dùng **`StratifiedKFold`** (giữ tỉ lệ lớp trong mỗi fold). `cv=5` với phân loại đã tự stratify.
- Chọn chỉ số khác accuracy bằng `scoring="f1"`, `"roc_auc"`, `"recall"`...

## Chọn chỉ số theo bài toán

| Bài toán | Chỉ số nên dùng |
|---|---|
| Cân bằng, mọi lỗi như nhau | Accuracy |
| Bỏ sót nguy hiểm (chẩn đoán) | **Recall** |
| Báo động giả phiền toái (spam) | **Precision** |
| Mất cân bằng, cần cân đối | **F1**, PR-AUC |
| So sánh mô hình độc lập ngưỡng | ROC-AUC |

> Luôn bắt đầu bằng **đường cơ sở ngây thơ** (luôn đoán lớp phổ biến nhất) để biết mô hình của bạn thật sự hơn được bao nhiêu.

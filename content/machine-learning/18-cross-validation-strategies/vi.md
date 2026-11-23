# Chiến lược kiểm định chéo: Stratified, Group và theo thời gian

`cross_val_score` mặc định chia ngẫu nhiên. Với dữ liệu thật, **cách chia sai** làm điểm số đẹp giả rồi vỡ mộng khi triển khai. Quy tắc: **cách chia kiểm tra phải mô phỏng cách mô hình được dùng**.

## Chọn cách chia theo cấu trúc dữ liệu

| Tình huống | Cách chia | Lý do |
|---|---|---|
| Dữ liệu độc lập, đủ cân bằng | `KFold` | cơ bản |
| **Phân loại mất cân bằng** | `StratifiedKFold` | giữ tỷ lệ lớp mỗi fold |
| **Nhiều dòng cùng một đối tượng** (khách, bệnh nhân, thiết bị) | `GroupKFold` | một đối tượng không vừa ở train vừa ở test |
| **Chuỗi thời gian** | `TimeSeriesSplit` | huấn luyện bằng quá khứ, kiểm tra bằng tương lai |

![Mỗi kiểu chia dữ liệu phù hợp một cấu trúc dữ liệu khác nhau](/lessons/machine-learning/18-cross-validation-strategies-fig-vi.svg)
*Mỗi kiểu chia dữ liệu phù hợp một cấu trúc dữ liệu khác nhau*

## Vì sao chia sai gây rò rỉ

- **Cùng khách ở cả hai phía**: mô hình "nhớ" khách thay vì học quy luật, điểm cao giả. Khi gặp khách mới thì tệ.
- **Xáo trộn chuỗi thời gian**: mô hình thấy tương lai của chính điểm cần dự đoán.
- **Tiền xử lý toàn bộ dữ liệu** trước khi chia: dùng Pipeline để fit trong từng fold.

## Cách dùng

```python
from sklearn.model_selection import cross_val_score, StratifiedKFold
cv = StratifiedKFold(5, shuffle=True, random_state=0)
scores = cross_val_score(pipe, X, y, cv=cv, scoring="roc_auc")
print(scores.mean(), scores.std())
```

Báo cáo **trung bình ± độ lệch chuẩn**: độ lệch lớn nghĩa là mô hình hoặc kết luận không ổn định.

## Kiểm định chéo lồng (nested CV)

Vừa **chọn siêu tham số** vừa **ước lượng hiệu năng** trên cùng các fold làm điểm lạc quan. Dùng vòng trong để tune (`GridSearchCV`), vòng ngoài để đánh giá.

## Nguồn tham khảo

- scikit-learn User Guide, "Cross-validation: evaluating estimator performance".
- Cawley & Talbot (2010). On over-fitting in model selection. *JMLR* 11.
- Roberts et al. (2017). Cross-validation strategies for data with temporal, spatial, hierarchical structure. *Ecography* 40.

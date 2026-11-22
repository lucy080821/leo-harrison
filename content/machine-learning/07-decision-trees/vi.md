# Cây quyết định

**Cây quyết định** học một chuỗi **câu hỏi có/không** về đặc trưng, giống trò chơi "20 câu hỏi". Rất **dễ hiểu** và dùng được cho cả phân loại lẫn hồi quy.

```text
                [ petal length ≤ 2.45 ? ]
                  /                  \
           Có: setosa          [ petal width ≤ 1.75 ? ]
                                 /              \
                    [ ... versicolor ]      [ ... virginica ]
```

Mỗi **nút trong** là một phép kiểm tra đặc trưng, mỗi **lá** là một dự đoán.

## Làm sao chọn câu hỏi tốt nhất?

Ở mỗi nút, thuật toán **thử mọi đặc trưng và mọi ngưỡng**, chọn phép chia làm hai nhóm con **"thuần" nhất** (chứa chủ yếu một lớp). Cần một **thước đo độ lẫn tạp**.

### Gini impurity

$$
G = 1 - \sum_{c}p_c^2
$$

với $p_c$ là tỉ lệ lớp $c$ trong nút. $G=0$: nút **thuần** (một lớp). Hai lớp 50/50: $G=0.5$ (lẫn nhất).

### Entropy

$$
H = -\sum_c p_c\log_2 p_c
$$

(đã gặp ở bài lý thuyết thông tin). Entropy 0 khi thuần, 1 bit khi hai lớp 50/50.

### Độ lợi thông tin (information gain)

Chọn phép chia **giảm độ lẫn tạp nhiều nhất**:

$$
\text{Gain} = I(\text{cha}) - \sum_{k\in\{\text{trái},\text{phải}\}}\frac{N_k}{N}\,I(\text{con}_k)
$$

($I$ là Gini hoặc entropy.) Lặp lại **đệ quy** cho từng nhánh cho tới khi nút thuần hoặc đạt giới hạn.

```python
from sklearn.tree import DecisionTreeClassifier
tree = DecisionTreeClassifier(max_depth=3, random_state=0).fit(X_train, y_train)
```

![Cây quyết định: mỗi nút là một câu hỏi, lá là dự đoán](/lessons/machine-learning/07-decision-trees-fig-vi.svg)
*Cây quyết định: mỗi nút là một câu hỏi, lá là dự đoán*

## Cây quá sâu → quá khớp

Nếu không giới hạn, cây tiếp tục chia cho đến khi **mỗi lá chỉ còn một mẫu**: nhớ thuộc cả nhiễu, train 100% nhưng test tệ. Kiểm soát bằng **siêu tham số**:

| Tham số | Tác dụng |
|---|---|
| `max_depth` | Độ sâu tối đa |
| `min_samples_split` | Số mẫu tối thiểu để chia nút |
| `min_samples_leaf` | Số mẫu tối thiểu ở lá |
| `max_leaf_nodes` | Số lá tối đa |
| `ccp_alpha` | **Cắt tỉa** sau huấn luyện |

## Cây hồi quy

Lá dự đoán **trung bình** giá trị của các mẫu trong lá; chia để cực tiểu **MSE**. Hàm dự đoán là **hàm bậc thang**.

## Độ quan trọng đặc trưng

```python
tree.feature_importances_       # tổng độ giảm lẫn tạp mà mỗi đặc trưng đóng góp, tổng = 1
```

Cho biết **đặc trưng nào hữu ích** nhất (lưu ý: có thiên lệch với đặc trưng nhiều giá trị khác nhau).

## In cây ra chữ

```python
from sklearn.tree import export_text
print(export_text(tree, feature_names=feature_names))
```

## Điểm mạnh và yếu

| Mạnh | Yếu |
|---|---|
| **Dễ diễn giải** (có thể in thành quy tắc) | **Rất dễ quá khớp** |
| Không cần chuẩn hoá đặc trưng | **Không ổn định**: dữ liệu đổi chút, cây đổi nhiều |
| Xử lý được đặc trưng số lẫn phân loại | Ranh giới "bậc thang" vuông góc trục |
| Bắt được quan hệ **phi tuyến** và **tương tác** | Dự đoán không trơn |

Nhược điểm lớn nhất (phương sai cao) được **khắc phục bằng ensemble**: bài tiếp theo (Random Forest, Gradient Boosting).

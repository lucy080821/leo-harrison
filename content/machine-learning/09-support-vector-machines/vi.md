# Support Vector Machine

**SVM** là một trong những thuật toán phân loại kinh điển và mạnh mẽ nhất trước thời deep learning. Ý tưởng: tìm ranh giới phân tách **có lề an toàn rộng nhất**.

## Ý tưởng: lề cực đại

Có vô số đường thẳng tách hai lớp. SVM chọn đường **cách xa cả hai lớp nhất**:

```text
   ○  ○        ┆         ●  ●
 ○   ○     ┈┈┈┈┆┈┈┈┈     ●   ●        lề (margin)
   ○      ◄──── w ────►     ●
        ranh giới: w·x + b = 0
```

- **Support vector**: các điểm **nằm sát ranh giới** (trên lề). Chỉ chúng quyết định ranh giới, các điểm xa không ảnh hưởng.
- **Lề** (margin) có độ rộng $\dfrac{2}{\|\mathbf{w}\|}$. Lề rộng ⇒ tổng quát hoá tốt hơn.

Bài toán tối ưu (SVM lề cứng): $\min\ \tfrac12\|\mathbf{w}\|^2$ với ràng buộc $y_i(\mathbf{w}\cdot\mathbf{x}_i+b)\ge 1$.

## Lề mềm và tham số C

Dữ liệu thực **lẫn nhiễu**, không tách hoàn hảo. **Lề mềm** cho phép một số điểm vi phạm với một mức phạt:

$$
\min\ \tfrac12\|\mathbf{w}\|^2 + C\sum_i\xi_i
$$

| $C$ | Hành vi |
|---|---|
| **Lớn** | Phạt vi phạm nặng: lề **hẹp**, khớp train sát (nguy cơ **overfitting**) |
| **Nhỏ** | Chấp nhận vi phạm: lề **rộng**, mượt (nguy cơ **underfitting**) |

## Thủ thuật kernel: ranh giới phi tuyến

Dữ liệu "hai vầng trăng" **không** tách bằng đường thẳng. Ý tưởng: **chiếu dữ liệu lên không gian nhiều chiều hơn** nơi nó trở nên tách tuyến tính được. Điều thần kỳ: SVM chỉ cần **tích vô hướng** giữa các điểm, nên ta tính trực tiếp bằng **hàm kernel** $K(\mathbf{a},\mathbf{b})$ mà **không cần tạo ra** không gian đó (**kernel trick**).

| Kernel | Công thức | Dùng khi |
|---|---|---|
| **Tuyến tính** | $\mathbf{a}\cdot\mathbf{b}$ | Dữ liệu tách tuyến tính, nhiều chiều (văn bản) |
| **Đa thức** | $(\gamma\,\mathbf{a}\cdot\mathbf{b}+r)^d$ | Tương tác bậc cao |
| **RBF (Gauss)** | $\exp(-\gamma\|\mathbf{a}-\mathbf{b}\|^2)$ | **Mặc định cho phi tuyến** |

Kernel RBF đo "độ gần": điểm gần nhau cho giá trị gần 1, xa nhau gần 0.

```python
from sklearn.svm import SVC
SVC(kernel="rbf", C=1, gamma="scale")
```

### Tham số gamma (RBF)

$\gamma$ điều khiển **tầm ảnh hưởng của một điểm**:

- $\gamma$ **lớn**: ảnh hưởng hẹp → ranh giới **cực kỳ uốn lượn**, quanh từng điểm (**overfitting**).
- $\gamma$ **nhỏ**: ảnh hưởng rộng → ranh giới **mượt** (**underfitting**).

Thường tinh chỉnh cặp $(C,\gamma)$ bằng **GridSearchCV** (bài Pipeline).

## Thực hành: bắt buộc chuẩn hoá

SVM dựa trên khoảng cách/tích vô hướng nên **nhạy với thang đo**: luôn dùng `StandardScaler` (trong Pipeline).

## SVM cho xác suất và hồi quy

- Mặc định SVM trả **nhãn**, không phải xác suất. `SVC(probability=True)` ước lượng xác suất (chậm hơn).
- **SVR** (Support Vector Regression) cho bài toán hồi quy.

## Điểm mạnh và yếu

| Mạnh | Yếu |
|---|---|
| Hiệu quả trong **không gian nhiều chiều** | **Chậm** với dữ liệu lớn (huấn luyện $\approx O(n^2)$ đến $O(n^3)$) |
| Linh hoạt nhờ kernel | Nhạy với thang đo và siêu tham số |
| Tốt với **ít mẫu** | Khó diễn giải; không cho xác suất tự nhiên |

Ngày nay với dữ liệu bảng thường dùng ensemble cây, với dữ liệu phi cấu trúc dùng deep learning; nhưng SVM vẫn là lựa chọn tốt cho **dữ liệu nhỏ đến vừa, nhiều chiều** và là kiến thức nền quan trọng (khái niệm lề, kernel xuất hiện lại nhiều nơi).

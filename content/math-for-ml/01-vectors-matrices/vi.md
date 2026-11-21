# Vector và ma trận

Machine Learning, về bản chất, là **toán trên các con số được xếp thành vector và ma trận**. Một bức ảnh là ma trận điểm ảnh, một câu là vector số, một mô hình là tập hợp các ma trận trọng số. Hiểu đại số tuyến tính là hiểu "ngôn ngữ" của ML.

## Vector

Vector là một **dãy có thứ tự các số**: $\mathbf{x} = (x_1, x_2, \dots, x_n)$. Có hai cách nhìn:

- **Danh sách đặc trưng**: một căn nhà $= (\text{diện tích}, \text{số phòng}, \text{tuổi nhà})$.
- **Điểm / mũi tên trong không gian** $n$ chiều: có **độ dài** và **hướng**.

```python
import numpy as np
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
a + b          # [5 7 9]     cộng từng thành phần
2 * a          # [2 4 6]     nhân với một số (vô hướng)
```

## Tích vô hướng (dot product)

$$
\mathbf{a}\cdot\mathbf{b} = \sum_{i=1}^{n} a_i b_i = a_1b_1 + a_2b_2 + \dots + a_nb_n
$$

Ví dụ $(1,2,3)\cdot(4,5,6) = 4 + 10 + 18 = 32$. Tích vô hướng xuất hiện **khắp nơi**: một nơ-ron tính $\mathbf{w}\cdot\mathbf{x} + b$; hồi quy tuyến tính dự đoán bằng $\hat{y} = \mathbf{w}\cdot\mathbf{x} + b$.

Về hình học: $\mathbf{a}\cdot\mathbf{b} = \|\mathbf{a}\|\,\|\mathbf{b}\|\cos\theta$, trong đó $\theta$ là góc giữa hai vector. Hai vector **vuông góc** thì tích vô hướng bằng 0.

## Độ dài (chuẩn) của vector

| Chuẩn | Công thức | Ý nghĩa |
|---|---|---|
| **L2** (Euclid) | $\|\mathbf{x}\|_2 = \sqrt{\sum x_i^2}$ | Độ dài thông thường |
| **L1** (Manhattan) | $\|\mathbf{x}\|_1 = \sum \lvert x_i\rvert$ | Tổng độ lớn các thành phần |

Hai chuẩn này chính là nền của **regularization** L2 (Ridge) và L1 (Lasso) sẽ gặp ở khoá Machine Learning.

```python
np.linalg.norm(a)            # L2: sqrt(14) = 3.74
np.linalg.norm(a, ord=1)     # L1: 6
```

## Độ tương đồng cosine

Khi chỉ quan tâm **hướng** (không quan tâm độ lớn), dùng cosine:

$$
\cos\theta = \frac{\mathbf{a}\cdot\mathbf{b}}{\|\mathbf{a}\|\,\|\mathbf{b}\|}\in[-1, 1]
$$

Gần 1: cùng hướng (rất giống); 0: vuông góc (không liên quan); -1: ngược hướng. Đây là thước đo chuẩn để so sánh **embedding** của văn bản trong AI hiện đại.

## Ma trận và phép nhân

Ma trận là bảng số $m \times n$ ($m$ hàng, $n$ cột). Nhân $A$ ($m\times n$) với $B$ ($n\times p$) cho $C$ ($m\times p$):

$$
C_{ij} = \sum_{k=1}^{n} A_{ik}B_{kj}
$$

Mỗi phần tử $C_{ij}$ là **tích vô hướng của hàng $i$ của $A$ với cột $j$ của $B$**. Số **cột của A phải bằng số hàng của B**.

```python
A = np.array([[1, 2, 3], [4, 5, 6]])         # 2x3
B = np.array([[7, 8], [9, 10], [11, 12]])    # 3x2
A @ B       # 2x2: [[58, 64], [139, 154]]
A.T         # chuyển vị: đổi hàng thành cột
```

> Nhân ma trận **không giao hoán**: $AB \neq BA$ nói chung (thậm chí có thể không xác định kích thước).

## Vì sao quan trọng với ML?

Một lớp mạng nơ-ron xử lý cả lô dữ liệu bằng **một phép nhân ma trận**:

$$
Z = XW + \mathbf{b}
$$

với $X$ ($N$ mẫu × $d$ đặc trưng) và $W$ ($d \times h$). GPU được thiết kế để nhân ma trận cực nhanh, đó là lý do deep learning khả thi.

## Ma trận đặc biệt

| Ma trận | Ý nghĩa |
|---|---|
| Đơn vị $I$ | $AI = IA = A$ |
| Đường chéo | Chỉ có phần tử trên đường chéo khác 0 |
| Đối xứng | $A = A^T$ (ví dụ ma trận hiệp phương sai) |
| Nghịch đảo $A^{-1}$ | $AA^{-1} = I$ (chỉ khi $A$ vuông và khả nghịch) |

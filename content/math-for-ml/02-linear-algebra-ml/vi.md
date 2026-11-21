# Đại số tuyến tính cho ML

## Hệ phương trình tuyến tính

Rất nhiều bài toán ML quy về giải $A\mathbf{x} = \mathbf{b}$. Ví dụ hồi quy tuyến tính có **lời giải đóng** (normal equation):

$$
\mathbf{w} = (X^TX)^{-1}X^T\mathbf{y}
$$

```python
A = np.array([[2.0, 1.0], [1.0, 3.0]])
b = np.array([3.0, 5.0])
x = np.linalg.solve(A, b)        # [0.8, 1.4]
```

Dùng `solve` thay vì `inv(A) @ b`: **nhanh hơn và ổn định số học hơn**.

## Định thức và khả nghịch

Với ma trận $2\times2$: $\det\begin{pmatrix}a&b\\c&d\end{pmatrix} = ad - bc$.

- $\det(A) \neq 0$: $A$ **khả nghịch** (hệ có nghiệm duy nhất).
- $\det(A) = 0$: $A$ **suy biến** (các hàng/cột phụ thuộc tuyến tính), không có nghịch đảo.

Trong ML, hai đặc trưng **tương quan hoàn hảo** làm $X^TX$ suy biến, hồi quy tuyến tính thường gặp lỗi. Đây là lý do cần regularization.

## Trị riêng và vector riêng

Vector riêng $\mathbf{v}$ của $A$ là vector **chỉ bị co giãn** (không đổi hướng) khi nhân với $A$:

$$
A\mathbf{v} = \lambda\mathbf{v}
$$

$\lambda$ là **trị riêng** (mức co giãn). Ví dụ $A = \begin{pmatrix}2&1\\1&2\end{pmatrix}$ có trị riêng $\lambda = 3$ (vector $(1,1)$) và $\lambda = 1$ (vector $(1,-1)$).

```python
vals, vecs = np.linalg.eigh(S)    # eigh cho ma trận ĐỐI XỨNG (ổn định, vals tăng dần)
```

Với ma trận đối xứng: các vector riêng **vuông góc nhau** và trị riêng là số thực.

## Vì sao trị riêng quan trọng? PCA

**PCA** (bài sau trong khoá ML) tìm các hướng mà dữ liệu **biến thiên nhiều nhất**. Đó chính là **vector riêng của ma trận hiệp phương sai**, và trị riêng cho biết **lượng phương sai** theo hướng đó:

$$
\Sigma = \frac{1}{n-1}X_c^TX_c,\qquad \Sigma\mathbf{v}_k = \lambda_k\mathbf{v}_k
$$

Giữ lại các hướng có trị riêng lớn nhất để **giảm chiều** mà mất ít thông tin nhất.

## Phân rã SVD

Mọi ma trận $A$ đều phân rã được:

$$
A = U\,\Sigma\,V^T
$$

```python
U, s, Vt = np.linalg.svd(A)
```

- $U, V$: ma trận trực giao (các hướng).
- $\Sigma$: đường chéo các **giá trị kỳ dị** $s_1 \ge s_2 \ge \dots$ (mức quan trọng).

Giữ $k$ giá trị kỳ dị lớn nhất cho **xấp xỉ hạng thấp** tốt nhất, dùng để **nén ảnh**, giảm nhiễu và hệ gợi ý (recommender).

## Hạng (rank)

Hạng là số hàng (cột) **độc lập tuyến tính**: `np.linalg.matrix_rank(A)`. Ma trận hạng thấp nghĩa là dữ liệu thực ra nằm trong không gian ít chiều hơn số cột nhìn thấy.

## Tóm tắt

| Khái niệm | Dùng trong ML để... |
|---|---|
| Giải hệ, nghịch đảo | Lời giải đóng hồi quy tuyến tính |
| Định thức / hạng | Phát hiện đặc trưng thừa, đa cộng tuyến |
| Trị riêng/vector riêng | PCA, phân tích phổ |
| SVD | Nén, giảm chiều, hệ gợi ý |

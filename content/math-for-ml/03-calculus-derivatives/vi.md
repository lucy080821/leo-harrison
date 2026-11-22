# Giải tích: đạo hàm và gradient

Học một mô hình ML nghĩa là **tìm tham số làm cho sai số nhỏ nhất**. Công cụ để biết "nên chỉnh tham số theo hướng nào" là **đạo hàm**.

## Đạo hàm là độ dốc

Đạo hàm của $f$ tại $x$ đo **tốc độ thay đổi tức thời** của $f$ (độ dốc của tiếp tuyến):

$$
f'(x) = \lim_{h\to 0}\frac{f(x+h)-f(x)}{h}
$$

- $f'(x) > 0$: hàm đang **tăng** ở $x$.
- $f'(x) < 0$: hàm đang **giảm**.
- $f'(x) = 0$: điểm **dừng** (cực tiểu, cực đại hoặc điểm yên ngựa).

Máy tính xấp xỉ bằng **sai phân trung tâm** (chính xác hơn sai phân thường):

$$
f'(x)\approx\frac{f(x+h)-f(x-h)}{2h}
$$

![Gradient chỉ hướng tăng nhanh nhất trên đường đồng mức](/lessons/math-for-ml/03-calculus-derivatives-fig-vi.svg)
*Gradient chỉ hướng tăng nhanh nhất trên đường đồng mức*

## Các đạo hàm cần thuộc

| $f(x)$ | $f'(x)$ |
|---|---|
| $x^n$ | $nx^{n-1}$ |
| $e^x$ | $e^x$ |
| $\ln x$ | $1/x$ |
| $\sigma(x)=\dfrac{1}{1+e^{-x}}$ | $\sigma(x)\,(1-\sigma(x))$ |
| $\tanh x$ | $1-\tanh^2 x$ |
| $\max(0,x)$ (ReLU) | $1$ nếu $x>0$, $0$ nếu $x<0$ |

Quy tắc: $(f+g)'=f'+g'$, $(cf)'=cf'$, $(fg)'=f'g+fg'$.

## Quy tắc chuỗi (chain rule): cốt lõi của backpropagation

Khi hàm **lồng nhau** $y = f(g(x))$:

$$
\frac{dy}{dx} = f'(g(x))\cdot g'(x)
$$

Ví dụ $y = (3x+1)^2$: đặt $u = 3x+1$, thì $\dfrac{dy}{dx} = 2u \cdot 3 = 6(3x+1)$.

Mạng nơ-ron là chuỗi dài các hàm lồng nhau; **backpropagation chính là áp dụng quy tắc chuỗi từ cuối về đầu**. Đây là ý tưởng quan trọng nhất của deep learning.

## Hàm nhiều biến: đạo hàm riêng và gradient

Với $f(x, y)$, **đạo hàm riêng** $\dfrac{\partial f}{\partial x}$ là đạo hàm theo $x$ khi **coi $y$ là hằng số**.

Ví dụ $f(x,y) = x^2 + 3y^2$: $\dfrac{\partial f}{\partial x} = 2x$, $\dfrac{\partial f}{\partial y} = 6y$.

**Gradient** gom mọi đạo hàm riêng thành một vector:

$$
\nabla f = \left(\frac{\partial f}{\partial x_1},\;\dots,\;\frac{\partial f}{\partial x_n}\right)
$$

Tính chất then chốt: $\nabla f$ chỉ hướng **tăng nhanh nhất** của $f$, nên $-\nabla f$ là hướng **giảm nhanh nhất**. Đó là cơ sở của **gradient descent** (bài sau).

```python
def grad(x, y):
    return np.array([2 * x, 6 * y])   # tại (1, 2): [2, 12]
```

## Kiểm tra gradient bằng số (gradient checking)

Khi tự cài đặt đạo hàm, hãy **so với đạo hàm số** để bắt lỗi:

```python
def numeric_grad(f, x, h=1e-5):
    g = np.zeros_like(x, dtype=float)
    for i in range(len(x)):
        e = np.zeros_like(x, dtype=float); e[i] = h
        g[i] = (f(x + e) - f(x - e)) / (2 * h)
    return g
```

Kỹ thuật này sẽ cứu bạn khi tự viết backpropagation ở khoá Deep Learning.

## Ma trận Jacobian và Hessian (giới thiệu)

- **Jacobian**: ma trận đạo hàm riêng của một hàm vector theo vector.
- **Hessian**: ma trận đạo hàm bậc hai, cho biết **độ cong**. Dùng trong các phương pháp tối ưu bậc hai (Newton).

Phần lớn deep learning chỉ dùng **gradient bậc nhất** vì rẻ hơn rất nhiều.

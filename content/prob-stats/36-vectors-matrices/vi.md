# Vector và ma trận

## Vector

**Vector** là danh sách có thứ tự các số, vừa là một điểm, vừa là một *mũi tên* có hướng và độ dài. Trong dữ liệu, một vector là *một đối tượng được mô tả bằng nhiều đặc trưng*: một khách hàng (tuổi, thu nhập, số lần mua), một ảnh (hàng nghìn điểm ảnh), một từ (vector embedding).

Hai phép cơ bản: cộng vector và nhân với số vô hướng. **Độ dài (chuẩn)** `‖v‖ = √(v₁² + v₂² + …)`.

## Tích vô hướng và độ tương tự

`u · v = u₁v₁ + u₂v₂ + … = ‖u‖‖v‖ cos θ`

θ là góc giữa hai vector. Từ đó **độ tương tự cosine** = cos θ ∈ [−1, 1], đo hai vector "chỉ cùng hướng" đến mức nào, bất kể độ lớn. Hệ thống gợi ý phim và tìm kiếm ngữ nghĩa dùng đúng ý này.

![Ba vector người dùng: An và Bình cùng hướng, Chi khác hướng](/lessons/prob-stats/36-vectors-matrices-vec-vi.svg)
*Góc nhỏ giữa An và Bình ⇒ cosine cao (giống gu phim); Chi lệch hẳn.*

## Ma trận

**Ma trận** là bảng chữ nhật các số; mỗi hàng (hoặc cột) là một vector. Ma trận A cỡ m×n **biến đổi** vector n chiều thành vector m chiều: `y = A x`. Tích hai ma trận là **hợp** của hai phép biến đổi (và nói chung `AB ≠ BA`).

Hình học: ma trận có thể xoay, co giãn, phản chiếu, cắt xiên cả mặt phẳng.

![Một ma trận biến hình vuông đơn vị thành hình bình hành](/lessons/prob-stats/36-vectors-matrices-matrix-vi.svg)
*Ma trận [[2,1],[0,1]] kéo giãn và cắt xiên mặt phẳng.*

## Hệ phương trình tuyến tính

`2x + y = 5, x − y = 1` viết gọn là `A x = b`. Nếu A khả nghịch thì `x = A⁻¹ b`. Gauss–Jordan khử dần để giải; `numpy.linalg.solve` làm việc này. Ứng dụng: cân bằng mạng điện, tính dòng chảy giao thông, hồi quy bình phương tối thiểu.

> Gilbert Strang (MIT 18.06) gợi ý nhìn `A x` theo cột: nó là *tổ hợp tuyến tính của các cột của A* với hệ số là x. Cách nhìn này giải thích hầu hết đại số tuyến tính.

## Nguồn tham khảo

- Strang, G. *Introduction to Linear Algebra* (Wellesley-Cambridge Press); MIT OCW 18.06.
- Axler, S. *Linear Algebra Done Right*.
- 3Blue1Brown, *Essence of Linear Algebra* (video series).
- Harris et al. (2020). Array programming with NumPy. *Nature* 585.

# Trị riêng, vector riêng và PCA

## Hướng đặc biệt của một ma trận

Hầu hết vector bị ma trận A xoay hướng. Nhưng có những vector **chỉ bị co giãn**, không đổi hướng:

`A v = λ v`

**v** là **vector riêng (eigenvector)**, **λ** là **trị riêng (eigenvalue)** tương ứng ("eigen" trong tiếng Đức nghĩa là "riêng/đặc trưng"). Trị riêng cho biết mức co giãn dọc hướng đó.

![Lưới đơn vị và vector riêng (1,1), (1,−1) trước và sau phép biến đổi](/lessons/prob-stats/16-eigen-pca-eig-vi.svg)
*Hai vector riêng giữ nguyên hướng; vector theo (1,1) dài gấp 3.*

Với A = [[2,1],[1,2]]: trị riêng 3 (hướng (1,1)) và 1 (hướng (1,−1)). Ma trận kéo giãn gấp 3 theo đường chéo, giữ nguyên theo hướng vuông góc.

Ứng dụng: ổn định cơ học của cầu và nhà (tần số dao động riêng), Google PageRank (vector riêng chính của ma trận liên kết web), cơ học lượng tử.

## Phân tích thành phần chính (PCA)

Dữ liệu thực thường có **nhiều chiều dư thừa**. Chiều cao và cân nặng gắn chặt với nhau, nên một "trục kích thước cơ thể" gần như đủ mô tả cả hai. **PCA** (Karl Pearson, 1901; Harold Hotelling, 1933) làm điều này một cách có hệ thống:

1. Trừ trung bình từng cột (đưa dữ liệu về tâm).
2. Tính **ma trận hiệp phương sai** C.
3. Tìm các **vector riêng của C**: đó là **các thành phần chính**, các hướng dữ liệu biến thiên nhiều nhất.
4. Trị riêng tương ứng là **phương sai dọc hướng đó**; chiếu dữ liệu lên vài thành phần đầu để **giảm chiều**.

![Đám mây điểm chiều cao–cân nặng với hai thành phần chính](/lessons/prob-stats/16-eigen-pca-pca-vi.svg)
*PC1 là hướng biến thiên lớn nhất; PC2 vuông góc và nhỏ hơn nhiều.*

Ứng dụng: nén ảnh, trực quan hoá dữ liệu nhiều chiều xuống 2D, khử nhiễu, tiền xử lý cho Machine Learning.

> Lưu ý: PCA chỉ bắt được cấu trúc **tuyến tính**, và thành phần chính khó diễn giải trực tiếp.

## Nguồn tham khảo

- Strang, G. *Introduction to Linear Algebra*, chương 6 (Eigenvalues and eigenvectors); MIT OCW 18.06 và 18.065.
- Jolliffe, I. T. *Principal Component Analysis* (Springer, 2nd ed., 2002).
- Pearson, K. (1901). On lines and planes of closest fit to systems of points in space. *Phil. Mag.* 2(11).
- Hotelling, H. (1933). Analysis of a complex of statistical variables into principal components. *J. Educ. Psychol.* 24.
- Page, Brin, Motwani, Winograd (1999). The PageRank citation ranking. Stanford InfoLab.

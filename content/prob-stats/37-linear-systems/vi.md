# Hệ phương trình tuyến tính: khử Gauss, hạng và điều kiện

Rất nhiều bài toán thực tế quy về **Ax = b**: cân bằng lưu lượng, phối trộn nguyên liệu, mạng điện, hồi quy bình phương tối thiểu.

## Khử Gauss

Biến đổi **hàng** (đổi chỗ, nhân với số, cộng bội của hàng khác) đưa ma trận về dạng bậc thang rồi thế ngược. Chi phí O(n³). Phân tích **LU** (A = LU) lưu lại phép khử để giải nhanh nhiều vế phải b khác nhau. NumPy dùng cách này trong `np.linalg.solve`; **đừng tính A⁻¹ rồi nhân** (chậm và kém chính xác).

## Hạng và các trường hợp nghiệm

**Hạng** (rank) = số hàng (hoặc cột) độc lập tuyến tính. Với A cỡ n × n:

| Hạng | Kết quả |
|---|---|
| n (khả nghịch, det ≠ 0) | nghiệm **duy nhất** |
| < n và b nằm trong không gian cột | **vô số** nghiệm |
| < n và b ngoài không gian cột | **vô nghiệm** |

Gilbert Strang gợi ý nhìn `Ax` là *tổ hợp tuyến tính của các cột*; Ax = b có nghiệm khi b là tổ hợp của các cột.

![Ba trường hợp của hệ hai phương trình: cắt nhau, song song, trùng nhau](/lessons/prob-stats/37-linear-systems-linsys-vi.svg)
*Nghiệm duy nhất, vô nghiệm và vô số nghiệm tương ứng với vị trí tương đối của hai đường thẳng.*

Hình học (2 ẩn): mỗi phương trình là một đường thẳng; nghiệm là giao điểm. Hai đường cắt nhau (duy nhất), song song (vô nghiệm) hoặc trùng nhau (vô số).

## Số điều kiện (condition number)

Hệ **gần suy biến** cho nghiệm cực nhạy với sai số dữ liệu. `cond(A)` lớn (10⁸ trở lên với số thực 64 bit) báo rằng nghiệm có thể mất nhiều chữ số chính xác. Trong thống kê, đây chính là **đa cộng tuyến** (bài 24): các cột của X gần phụ thuộc nhau.

## Ứng dụng nghề nghiệp

Cân đối cung–cầu liên ngành (Leontief), bài toán phối trộn khẩu phần, tính toán mạng điện, định vị, và là lõi của hồi quy tuyến tính.

## Nguồn tham khảo

- Strang, G. *Introduction to Linear Algebra* (5th ed.), chương 2–3; MIT OCW 18.06.
- Trefethen, L. & Bau, D. *Numerical Linear Algebra* (SIAM).
- Golub, G. & Van Loan, C. *Matrix Computations*.

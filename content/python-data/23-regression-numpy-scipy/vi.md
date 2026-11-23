# Hồi quy tuyến tính: ước lượng, R² và phần dư

Hồi quy trả lời: *khi X đổi 1 đơn vị, Y đổi bao nhiêu (trung bình)?* Đây là công cụ chính của phân tích định lượng, và là nền của học máy.

## Mô hình và cách ước lượng

`ŷ = a + b·x`. **Bình phương tối thiểu (OLS)** chọn `a`, `b` để tổng bình phương phần dư `Σ(y − ŷ)²` nhỏ nhất. Với một biến: `b = cov(x,y)/var(x)`, `a = ȳ − b·x̄`.

![Đường hồi quy bình phương tối thiểu và phần dư](/lessons/python-data/23-regression-numpy-scipy-fig-vi.svg)
*Đường hồi quy bình phương tối thiểu và phần dư*

## Đọc kết quả

- **Hệ số góc `b`**: thay đổi trung bình của Y khi X tăng 1 (giữ nguyên các biến khác nếu là hồi quy bội).
- **R²**: phần phương sai của Y được mô hình giải thích (0 đến 1). R² cao **không** có nghĩa là quan hệ nhân quả.
- **Phần dư** `y − ŷ`: phải dao động quanh 0, không có mẫu hình, độ phân tán đều.

## Hồi quy bội bằng ma trận

`β = (XᵀX)⁻¹Xᵀy`, nhưng trong thực tế dùng `np.linalg.lstsq` (ổn định số học hơn nghịch đảo trực tiếp). Cột toàn 1 trong X đại diện hệ số chặn.

## Kiểm tra giả định (LINE)

1. **L**inearity: quan hệ gần tuyến tính (vẽ phần dư theo ŷ).
2. **I**ndependence: các quan sát độc lập.
3. **N**ormality của phần dư (cho khoảng tin cậy chính xác).
4. **E**qual variance: phương sai phần dư đều (không "hình phễu").

## Cạm bẫy

- **Ngoại suy** ngoài miền dữ liệu là nguy hiểm.
- **Đa cộng tuyến** (các biến X tương quan mạnh) làm hệ số bất ổn.
- **Tương quan ≠ nhân quả**; chỉ thí nghiệm có đối chứng mới kết luận nhân quả.
- R² luôn tăng khi thêm biến; dùng **R² hiệu chỉnh** hoặc kiểm tra trên tập kiểm tra.

## Nguồn tham khảo

- James, Witten, Hastie, Tibshirani. *An Introduction to Statistical Learning*, chương 3.
- SciPy documentation, `scipy.stats.linregress`.
- Khoá "Toán và Thống kê" của Learn With Leo, bài hồi quy.

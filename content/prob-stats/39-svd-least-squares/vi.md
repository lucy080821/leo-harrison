# SVD, xấp xỉ hạng thấp và bình phương tối thiểu

**Phân tích giá trị kỳ dị (SVD)** là một trong những công cụ mạnh nhất của đại số tuyến tính ứng dụng. Mọi ma trận A (không nhất thiết vuông) đều viết được:

`A = U Σ Vᵀ`

U và V có các cột **trực chuẩn**; Σ chéo với **giá trị kỳ dị** σ₁ ≥ σ₂ ≥ … ≥ 0. Hình học: A **xoay (Vᵀ), co giãn (Σ), rồi xoay (U)**.

## Xấp xỉ hạng thấp (Eckart–Young)

Giữ k giá trị kỳ dị lớn nhất: `A_k = Σᵢ₌₁ᵏ σᵢ uᵢ vᵢᵀ` là **xấp xỉ hạng k tốt nhất** theo chuẩn Frobenius, sai số = √(tổng bình phương σ bị bỏ). Dữ liệu thực thường có vài giá trị kỳ dị lớn và nhiều giá trị nhỏ: phần lớn thông tin nằm ở ít chiều.

![Giá trị kỳ dị của một ma trận và độ chính xác của xấp xỉ theo hạng](/lessons/prob-stats/39-svd-least-squares-svd-vi.svg)
*Vài giá trị kỳ dị đầu chiếm gần hết thông tin; giữ ít chiều đã tái tạo gần đúng ma trận.*

## Ứng dụng nghề nghiệp

- **Nén ảnh và dữ liệu**: lưu k·(m + n + 1) số thay cho m·n.
- **Hệ gợi ý**: ma trận người dùng × phim ≈ tích của "gu người dùng" và "đặc tính phim" (cuộc thi Netflix Prize dùng ý tưởng này).
- **PCA** (bài 38) tính qua SVD của dữ liệu đã trừ trung bình.
- **Giảm nhiễu, LSA** trong xử lý văn bản, **LoRA** trong tinh chỉnh mô hình lớn (cập nhật hạng thấp).

## Bình phương tối thiểu và giả nghịch đảo

Khi Ax = b vô nghiệm (nhiều phương trình hơn ẩn, như hồi quy), ta tìm x làm nhỏ ‖Ax − b‖²: nghiệm `x = A⁺b` với **giả nghịch đảo Moore–Penrose** `A⁺ = V Σ⁺ Uᵀ` (đảo các σ khác 0). Đây là cách `np.linalg.lstsq` và `np.linalg.pinv` ổn định về số học, tốt hơn phương trình chuẩn `(XᵀX)⁻¹Xᵀy` khi XᵀX gần suy biến (bài 37).

## Nguồn tham khảo

- Strang, G. *Linear Algebra and Learning from Data* (Wellesley-Cambridge, 2019); MIT OCW 18.065.
- Eckart, C. & Young, G. (1936). The approximation of one matrix by another of lower rank. *Psychometrika* 1.
- Koren, Bell, Volinsky (2009). Matrix factorization techniques for recommender systems. *Computer* 42(8).

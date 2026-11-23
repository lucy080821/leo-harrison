# Kiểm định chi-bình phương cho dữ liệu phân loại

Với dữ liệu **phân loại** (thiết bị, mua/không mua, vùng) ta so sánh **số đếm**, không phải trung bình.

## Ý tưởng

Đặt **số đếm quan sát** O và **số đếm kỳ vọng** E *nếu H₀ đúng*. Thống kê Karl Pearson (1900):

`χ² = Σ (O − E)² / E`

Càng lệch khỏi kỳ vọng thì χ² càng lớn. Dưới H₀, χ² xấp xỉ phân phối **chi-bình phương** với số bậc tự do tuỳ bài toán.

![Phân phối chi-bình phương 1 bậc tự do với vùng bác bỏ ở đuôi phải](/lessons/prob-stats/18-chi-square-chi-vi.svg)
*Giá trị χ² quan sát nằm càng xa về bên phải thì p-value (diện tích đuôi) càng nhỏ.*

## Hai dạng dùng nhiều nhất

1. **Độ phù hợp (goodness-of-fit)**: dữ liệu có theo một phân phối cho trước không? E = n·pᵢ; bậc tự do = (số loại − 1). Ví dụ: xúc xắc cân đối, tỷ lệ nhóm khách có khớp dân số không.
2. **Tính độc lập**: hai biến phân loại có liên quan không? Với bảng chéo, `E = (tổng hàng × tổng cột)/tổng`; bậc tự do = (số hàng − 1)(số cột − 1).

Ví dụ: thiết bị (di động/máy tính) và quyết định mua. Bảng [[30, 70], [45, 55]] cho χ² = 4,8 với 1 bậc tự do, p ≈ 0,028: có bằng chứng liên quan ở mức 5%.

## Điều kiện

Quan sát độc lập; mỗi ô có **E ≥ 5** (nếu không dùng kiểm định chính xác của Fisher). Giá trị p nhỏ chỉ cho biết **có liên quan**, không cho biết **mạnh đến đâu**: hãy báo thêm cỡ hiệu ứng (ví dụ Cramér's V hoặc chênh lệch tỷ lệ).

## Nguồn tham khảo

- Pearson, K. (1900). On the criterion that a given system of deviations… *Philosophical Magazine* 50.
- Agresti, A. *Categorical Data Analysis* (Wiley).
- Diez et al., *OpenIntro Statistics*, chương 6 (Inference for categorical data).

# Phân tích thử nghiệm A/B từ đầu đến cuối

A/B test là cách **duy nhất** gần như chắc chắn để kết luận nhân quả trong sản phẩm: chia ngẫu nhiên người dùng thành hai nhóm, chỉ thay **một** thứ, so kết quả.

## Quy trình chuẩn

1. **Giả thuyết và chỉ số chính** (ví dụ tỷ lệ chuyển đổi), **khai báo trước**.
2. **Tính cỡ mẫu** theo mức tăng nhỏ nhất đáng quan tâm, α và power.
3. Chạy đủ số mẫu và **đủ chu kỳ tuần**; **không dừng sớm** khi thấy p nhỏ.
4. **Kiểm tra chia nhóm** (SRM): tỷ lệ 50/50 có thật không?
5. Kiểm định, khoảng tin cậy, **cỡ hiệu ứng**, rồi quyết định.

![So sánh tỷ lệ chuyển đổi của hai nhóm kèm khoảng tin cậy](/lessons/python-data/26-ab-testing-analysis-fig-vi.svg)
*So sánh tỷ lệ chuyển đổi của hai nhóm kèm khoảng tin cậy*

## Kiểm định hai tỷ lệ

Dưới H₀ hai tỷ lệ bằng nhau, dùng tỷ lệ gộp `p̂` cho sai số chuẩn:

`z = (p̂_B − p̂_A) / √(p̂(1−p̂)(1/n_A + 1/n_B))`

Khoảng tin cậy cho hiệu dùng sai số **không gộp**. Báo cáo cả **lift tuyệt đối** (B − A) lẫn **tương đối** ((B − A)/A).

## Cỡ mẫu

`n = (z_{α/2} + z_β)² · [p₁(1−p₁) + p₂(1−p₂)] / (p₂ − p₁)²` cho mỗi nhóm. Phát hiện mức tăng càng nhỏ, cần mẫu càng lớn (tỷ lệ với 1/Δ²).

## Cạm bẫy

- **Nhìn trộm** (peeking) và dừng khi p < 0,05 làm tăng mạnh dương tính giả.
- **SRM**: lệch tỷ lệ chia nhóm báo hiệu lỗi kỹ thuật, kết quả không đáng tin.
- **Nhiều chỉ số/nhiều biến thể**: hiệu chỉnh so sánh bội.
- **Hiệu ứng mới lạ** (novelty): người dùng bị thu hút bởi cái mới rồi nguội đi.
- Mẫu nhỏ và **không có ý nghĩa** ≠ "không có tác động".

## Nguồn tham khảo

- Kohavi, Tang, Xu (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.
- Kohavi et al. (2009). Controlled experiments on the web. *Data Mining and Knowledge Discovery* 18.
- SciPy documentation, `scipy.stats.norm`, `chisquare`.

# Kiểm định thống kê trong Python với scipy.stats

Khoá "Toán và Thống kê" giải thích **vì sao** các kiểm định hoạt động. Bài này là phần **thực hành**: chọn kiểm định đúng và đọc kết quả bằng `scipy.stats`.

## Chọn kiểm định

| Câu hỏi | Dữ liệu | Hàm |
|---|---|---|
| Hai nhóm độc lập có trung bình khác nhau? | số, ~chuẩn | `ttest_ind(a, b, equal_var=False)` (Welch) |
| Cùng đối tượng đo hai lần? | số, ghép cặp | `ttest_rel(a, b)` |
| Như trên nhưng không chuẩn/có ngoại lai | số | `mannwhitneyu` / `wilcoxon` |
| Nhiều hơn hai nhóm? | số | `f_oneway` (ANOVA), `kruskal` |
| Hai biến phân loại liên quan? | đếm | `chi2_contingency(bảng_chéo)` |
| Tỷ lệ khác nhau? | nhị phân | z kiểm định hai tỷ lệ hoặc chi-bình phương |

![Kiểm định t và chi-bình phương trên dữ liệu thật](/lessons/python-data/22-hypothesis-tests-scipy-fig-vi.svg)
*Kiểm định t và chi-bình phương trên dữ liệu thật*

## Luôn báo cáo ba thứ

1. **Cỡ hiệu ứng**: hiệu trung bình, Cohen's d (`(m₁ − m₂)/s_gộp`), tỷ số odds.
2. **Khoảng tin cậy** của hiệu: cho biết độ chính xác và ý nghĩa thực tế.
3. **p-value**: một phần chứ không phải tất cả (khuyến nghị ASA 2016).

## Quy trình

1. Vẽ dữ liệu (hộp, histogram) và kiểm tra giả định.
2. Chọn kiểm định; **khai báo trước** (tránh p-hacking).
3. Chạy, đọc `statistic`, `pvalue`; tính khoảng tin cậy.
4. **So sánh bội** nếu chạy nhiều kiểm định (Bonferroni/BH).
5. Diễn giải bằng ngôn ngữ nghiệp vụ, kèm giới hạn.

## Cạm bẫy

- **Có ý nghĩa thống kê ≠ có ý nghĩa thực tế**: mẫu lớn làm khác biệt nhỏ cũng có p nhỏ.
- **Không bác bỏ H₀ ≠ chứng minh bằng nhau**: có thể thiếu power.
- `chi2_contingency` cần mỗi ô kỳ vọng ≥ 5; nếu không dùng kiểm định chính xác Fisher.

## Nguồn tham khảo

- SciPy documentation, "scipy.stats".
- Wasserstein & Lazar (2016). The ASA statement on p-values. *The American Statistician* 70(2).
- Khoá "Toán và Thống kê" của Learn With Leo (bài 15 đến 21).

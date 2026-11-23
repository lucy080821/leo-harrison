# Bootstrap, kiểm định hoán vị và phi tham số

Các kiểm định t và ANOVA cần **giả định** (xấp xỉ chuẩn, phương sai…). Khi mẫu nhỏ, lệch, có ngoại lai, hoặc thống kê "lạ" (trung vị, tỷ số), ta dùng các phương pháp **dựa trên mô phỏng** và **phi tham số**.

## Bootstrap (Bradley Efron, 1979)

Coi mẫu của bạn là hình ảnh tốt nhất của tổng thể. Lặp nhiều lần: **lấy mẫu lại có hoàn lại** (cùng cỡ n) rồi tính thống kê (trung vị, trung bình, hệ số…). Phân phối các giá trị đó xấp xỉ **độ dao động giữa các mẫu**:

- **Sai số chuẩn** = độ lệch chuẩn của các giá trị bootstrap.
- **Khoảng tin cậy phân vị**: lấy phân vị 2,5% và 97,5%.

![Phân phối bootstrap của trung vị với khoảng tin cậy 95%](/lessons/prob-stats/20-bootstrap-nonparametric-boot-vi.svg)
*Mỗi cột là tần suất của trung vị từ một mẫu lấy lại; hai vạch đứng là phân vị 2,5% và 97,5%.*

Cảnh báo: bootstrap không cứu được mẫu quá nhỏ hoặc quá lệch; nó *phản ánh* mẫu, không thêm thông tin.

## Kiểm định hoán vị

H₀: nhãn nhóm không liên quan. Nếu đúng, **xáo trộn nhãn** không đổi gì. Tính thống kê (hiệu trung bình) trên mọi cách xáo (hoặc nhiều lần ngẫu nhiên) → p-value là tỷ lệ cách xáo cho thống kê **cực đoan bằng hoặc hơn** quan sát. Với x = [1, 2, 3], y = [4, 5, 6]: chỉ 2/20 cách có hiệu lớn như vậy ⇒ p = 0,1.

## Kiểm định dựa trên hạng

**Mann–Whitney** (hai nhóm độc lập) dùng *thứ hạng* thay giá trị nên bền với ngoại lai: U là số cặp (x, y) có x > y. **Wilcoxon** cho dữ liệu ghép cặp, **Kruskal–Wallis** thay ANOVA.

## Nguồn tham khảo

- Efron, B. (1979). Bootstrap methods: another look at the jackknife. *Annals of Statistics* 7(1).
- Efron, B. & Hastie, T. *Computer Age Statistical Inference* (Cambridge, 2016).
- Hollander, Wolfe, Chicken. *Nonparametric Statistical Methods*.

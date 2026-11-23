# Bẫy thống kê: Simpson, nhân quả, thiên lệch

Thống kê dùng sai còn nguy hiểm hơn không dùng. Ba bẫy kinh điển:

## 1. Nghịch lý Simpson

Một xu hướng xuất hiện trong từng nhóm có thể **đảo ngược** khi gộp các nhóm lại. Ví dụ nổi tiếng là phân tích tuyển sinh sau đại học của Đại học California, Berkeley (Bickel, Hammel & O'Connell, 1975, *Science*): số liệu gộp cho thấy nam được nhận cao hơn nữ, nhưng khi tách theo khoa thì không còn bằng chứng thiên lệch như vậy, vì phụ nữ nộp nhiều hơn vào những khoa cạnh tranh cao hơn.

Số liệu trong bài này là **minh hoạ** do Lexi Learn dựng ra: điều trị A tốt hơn ở cả hai nhóm bệnh nhân, nhưng gộp lại B trông tốt hơn vì B được dùng chủ yếu cho ca nhẹ.

![Hai biểu đồ cột: tỷ lệ khỏi của A và B theo từng nhóm và khi gộp](/lessons/prob-stats/29-pitfalls-simpson-vi.svg)
*A cao hơn ở cả hai nhóm, nhưng B cao hơn khi gộp vì B chủ yếu điều trị ca nhẹ.*

**Bài học:** *biến thứ ba* (ở đây là độ nặng của bệnh) có thể thay đổi kết luận. Hãy hỏi dữ liệu được phân nhóm thế nào và vì sao.

## 2. Tương quan không phải nhân quả

Doanh số kem và số vụ đuối nước cùng tăng vào mùa hè, vì cả hai bị chi phối bởi **biến gây nhiễu (confounder)** là thời tiết nóng. Để khẳng định nhân quả cần **thí nghiệm ngẫu nhiên có đối chứng** (như thử nghiệm A/B hay thử nghiệm lâm sàng) hoặc các phương pháp suy luận nhân quả cẩn trọng (Pearl, 2009).

## 3. Thiên lệch chọn mẫu và thiên lệch sống sót

Abraham Wald trong Thế chiến II được hỏi nên bọc thép ở đâu trên máy bay quay về. Ông chỉ ra rằng các lỗ đạn trên máy bay *sống sót* cho thấy chỗ trúng đạn mà vẫn bay được; chỗ không có lỗ mới là chỗ chí mạng. Chỉ nhìn **người sống sót** làm ta kết luận sai. (Câu chuyện thường được kể lại, chi tiết lịch sử có thể được lược giản.)

## Nguồn tham khảo

- Bickel, P. J., Hammel, E. A., O'Connell, J. W. (1975). Sex bias in graduate admissions: data from Berkeley. *Science* 187(4175), 398–404.
- Pearl, J. (2009). *Causality* (2nd ed.). Cambridge University Press.
- Mangel, M. & Samaniego, F. J. (1984). Abraham Wald's work on aircraft survivability. *J. Amer. Statist. Assoc.* 79.
- Diez et al., *OpenIntro Statistics*, chương 1 (Data collection, observational vs experiment).

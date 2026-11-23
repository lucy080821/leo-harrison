# Thiết kế thực nghiệm và các cạm bẫy của A/B test

Hồi quy và các thống kê quan sát chỉ cho thấy **tương quan**. Muốn biết **nguyên nhân**, ta cần **thực nghiệm có đối chứng**: tự tay can thiệp và so sánh.

## Vì sao ngẫu nhiên hoá

Gán ngẫu nhiên đối tượng vào nhóm A/B làm hai nhóm **giống nhau về mọi mặt, cả những đặc điểm ta không đo được**, trung bình. Khi đó chênh lệch kết quả quy được cho can thiệp (loại bỏ nhiễu, bài 29). Nguyên tắc từ Fisher (1935) và thử nghiệm lâm sàng ngẫu nhiên.

![Quy trình thử nghiệm A/B: ngẫu nhiên hoá, can thiệp, đo kết quả, so sánh](/lessons/prob-stats/28-experiments-ab-ab-vi.svg)
*Ngẫu nhiên hoá làm hai nhóm giống nhau trước can thiệp; chỉ khác biệt về can thiệp mới giải thích kết quả.*

## Thiết kế một thử nghiệm tốt

1. **Giả thuyết và chỉ số chính** xác định trước.
2. **Đơn vị ngẫu nhiên** hợp lý (người dùng, không phải lượt xem).
3. **Cỡ mẫu và thời lượng** theo bài 17; chạy tròn các chu kỳ tuần.
4. **Không nhìn trộm và dừng sớm**; kiểm soát so sánh bội (bài 21).

## Các cạm bẫy thường gặp

- **SRM (sample ratio mismatch)**: tỷ lệ người dùng thực tế lệch so với thiết kế (50,5/49,5 trên 100.000 người đã cực kỳ bất thường). Báo hiệu lỗi phân nhóm hoặc ghi dữ liệu; **không tin kết quả** cho đến khi sửa. Kiểm tra bằng χ² (bài 18).
- **Hiệu ứng mới lạ / quen dần**: người dùng phản ứng với thứ mới rồi trở lại bình thường.
- **Can thiệp lẫn nhau (network effects)**: người dùng A ảnh hưởng người dùng B (mạng xã hội, thị trường hai phía).
- **Đa mục tiêu**: chọn chỉ số *sau khi* xem dữ liệu.
- **Báo cáo hiệu ứng**: luôn kèm **khoảng tin cậy của hiệu** và ý nghĩa kinh doanh, không chỉ "có ý nghĩa thống kê".

## Khi không thể thử nghiệm

Dùng phương pháp quan sát cẩn thận: hồi quy có kiểm soát nhiễu, ghép cặp theo điểm xu hướng, khác biệt trong khác biệt (DiD), hồi quy gián đoạn. Chúng cần giả định mạnh; hãy trình bày giả định rõ ràng.

## Nguồn tham khảo

- Kohavi, R., Tang, D., Xu, Y. (2020). *Trustworthy Online Controlled Experiments*. Cambridge University Press.
- Fisher, R. A. (1935). *The Design of Experiments*.
- Angrist, J. & Pischke, J.-S. *Mostly Harmless Econometrics* (Princeton).

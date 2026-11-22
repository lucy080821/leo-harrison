# Thiết kế một nghiên cứu ngữ âm nhỏ

Đây là bài kết nối với phần **phương pháp** của các giáo trình đại học (MIT 24.915 và UNC LING 520 đều có thiết kế thí nghiệm và thống kê). Mục tiêu: bạn có thể làm một nghiên cứu **rất nhỏ** nhưng **chặt chẽ**.

## 1. Câu hỏi nghiên cứu

Chọn một câu hỏi **cụ thể, đo được**, nhỏ đủ để trả lời. Ví dụ:

- VOT của /t/ đầu từ tiếng Anh ở một người học Việt **có khác** VOT của /d/ không?
- F1 của /ɪ/ và /iː/ ở một nhóm học viên **cách nhau bao nhiêu**?
- Độ dài nguyên âm trong *bat* và *bad* **khác nhau thế nào**?

![Quy trình một nghiên cứu ngữ âm nhỏ](/lessons/phonetics/40-designing-a-study-fig-vi.svg)
*Quy trình một nghiên cứu ngữ âm nhỏ*

## 2. Giả thuyết

Một dự đoán có thể **sai**. Ví dụ: "VOT của /t/ lớn hơn VOT của /d/ ít nhất 30 ms." Giả thuyết cho bạn biết **đo gì** và **so sánh gì**.

## 3. Người tham gia và đạo đức

- Số lượng **nhỏ nhưng ghi rõ** (ví dụ 5 người).
- Xin **đồng ý có hiểu biết**, giải thích mục đích, cho rút lui, bảo vệ danh tính.
- Ghi lại thông tin cần thiết (tuổi, giới, tiếng mẹ đẻ, vùng).

## 4. Từ thử và câu khung

- Chọn từ thử **cùng điều kiện** ngoài yếu tố cần so sánh (ví dụ *tie* và *die*, cùng nguyên âm).
- Đặt vào **câu khung** như "Say ___ again." để trọng âm và ngữ cảnh giống nhau.
- **Lặp lại** nhiều lần (ví dụ 5 đến 10 lần mỗi từ) và **xáo trộn** thứ tự.

## 5. Ghi âm

- Phòng **yên tĩnh**, micro khoảng 10 đến 15 cm, **không méo** (clipping).
- Tần số lấy mẫu **22 kHz hoặc cao hơn**, lưu file không nén (WAV).
- Ghi chú về thiết bị và điều kiện.

## 6. Chú thích và đo (annotation)

Trong Praat dùng **TextGrid** để đánh dấu các mốc (vệt nhả, bắt đầu nguyên âm, giữa nguyên âm). **Quy tắc đo phải được viết ra** trước (ví dụ: VOT từ vệt nhả đến chu kỳ rung đều đầu tiên) và áp dụng **nhất quán**. Nếu có thể, nhờ người thứ hai đo lại một phần để kiểm tra độ tin cậy.

## 7. Phân tích

Với số liệu nhỏ:

- Tính **trung bình**, **độ lệch chuẩn** và **khoảng giá trị**; vẽ **biểu đồ** (hộp hoặc điểm).
- Cẩn thận với **kiểm định thống kê** khi mẫu nhỏ; có thể chỉ báo cáo **mô tả** và nói rõ giới hạn.
- Nhìn **từng người** chứ không chỉ trung bình chung.

## 8. Báo cáo

Nêu rõ: câu hỏi, giả thuyết, người tham gia, từ thử, **cách đo** (có thể kèm hình phổ đồ), kết quả (kèm **đơn vị**), và **giới hạn**. Đừng kết luận quá mức từ vài người.

## Ví dụ: VOT của /t/ ở người học Việt

Một thiết kế mẫu (không nêu kết quả, để bạn tự đo):

| Yếu tố | Lựa chọn |
|---|---|
| Câu hỏi | VOT của /t/ đầu từ khác VOT của /d/ thế nào ở người học Việt? |
| Từ thử | *tie, tea, two, die, deep, do* |
| Câu khung | "Say ___ again." |
| Số lần lặp | 5 lần mỗi từ |
| Số đo | VOT (ms) bằng Praat |
| So sánh | trung bình VOT của /t/ và /d/ cho từng người |

Điều bạn có thể tự hỏi thêm: người học có VOT của /t/ gần với `/tʰ/` tiếng Việt hay với /t/ bật hơi tiếng Anh? Tiếng Việt có `/t/` không bật hơi và `/tʰ/` bật hơi (xem bài tiếng Việt), nên đây là một câu hỏi thú vị.

## Tài liệu tham khảo

- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- MIT OpenCourseWare 24.915 Linguistic Phonetics (2015): https://ocw.mit.edu/courses/24-915-linguistic-phonetics-fall-2015/
- Boersma, P. & Weenink, D. *Praat: doing phonetics by computer*: https://www.fon.hum.uva.nl/praat/
- Lisker, L. & Abramson, A. S. (1964). A cross-language study of voicing in initial stops: acoustical measurements. *Word* 20, 384-422.
- Cho, T. & Ladefoged, P. (1999). Variation and universals in VOT: evidence from 18 languages. *Journal of Phonetics* 27, 207-229.
- Abramson, A. S. & Whalen, D. H. (2017). Voice Onset Time (VOT) at 50: theoretical and practical issues in measuring voicing distinctions. *Journal of Phonetics* 63, 75-86.
- Boersma, P. & Weenink, D. Praat manual, TextGrids and annotation: https://www.fon.hum.uva.nl/praat/manual/Intro.html

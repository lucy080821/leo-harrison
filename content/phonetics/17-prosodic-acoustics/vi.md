# Âm học của siêu đoạn: F0, độ dài và cường độ

Trọng âm, ngữ điệu, nhịp và thanh điệu đều thể hiện qua ba đại lượng âm học: **F0**, **cường độ** và **độ dài**.

## Ba đại lượng và cảm nhận

| Đại lượng âm học | Cảm nhận |
|---|---|
| **F0** (tần số cơ bản) | **cao độ** (*pitch*) |
| **Cường độ** (biên độ, dB) | **độ to** (*loudness*) |
| **Độ dài** (ms) | **độ dài** (*length*) |

Chú ý: đây là các đại lượng **đo được**, còn "cảm nhận" là phản ứng của người nghe và không tương ứng tuyến tính (xem module 4).

## F0 của giọng nói

F0 trung bình **khác nhau giữa các nhóm người nói**: nam thường thấp hơn nữ, trẻ em cao hơn. Ví dụ F0 khi nói của nam trưởng thành thường quanh **100 đến 120 Hz** và của nữ quanh **190 đến 220 Hz** (đây là giá trị **xấp xỉ**; số liệu chính xác theo nhóm tuổi xem Titze 1989 và Baken và Orlikoff 2000). Một tổng hợp thường trích khác ghi trung bình khoảng 106 Hz (nam) và 193 Hz (nữ) khi kéo dài nguyên âm /a/, cho thấy số đo phụ thuộc vào **nhiệm vụ nói**.

## Nửa cung: đo cao độ theo cách tai nghe

Tai nghe cao độ theo tỉ lệ (tần số gấp đôi là một quãng tám), nên khi so sánh các dải cao độ, ta đổi sang **nửa cung** (*semitone*):

**ST = 12 · log₂(f₂ / f₁)**

| Từ | Sang | Chênh lệch |
|---|---|---|
| 100 Hz | 200 Hz | **12 ST** (một quãng tám) |
| 100 Hz | 150 Hz | khoảng **7 ST** |
| 200 Hz | 300 Hz | khoảng **7 ST** |

Cùng tăng **50 Hz** nhưng 100 → 150 Hz là khoảng **7 ST**, còn 200 → 250 Hz chỉ khoảng **3,9 ST**: giống nhau về Hz, khác nhau về **cảm nhận**. Ngược lại 100 → 150 và 200 → 300 (cùng tỉ lệ 1,5) đều khoảng 7 ST. Dùng nửa cung giúp so sánh giọng nam và nữ công bằng hơn.

## Trọng âm trong tiếng Anh

Không có dấu hiệu duy nhất. Âm tiết nhấn thường có sự phối hợp của:

- **F0** cao hơn hoặc có chuyển động cao độ (nhất là khi từ mang trọng tâm câu).
- **Độ dài** lớn hơn.
- **Cường độ** lớn hơn.
- **Chất lượng nguyên âm** rõ ràng thay vì rút gọn về `/ə/`.

Trong số đó, độ dài và chất lượng nguyên âm thường được xem là rất ổn định, còn F0 phụ thuộc vào việc từ có mang trọng âm câu hay không.

## Cạm bẫy khi theo dõi F0

- **Lỗi quãng tám**: thuật toán chọn F0 gấp đôi hoặc một nửa. Hay gặp khi giọng két hoặc tín hiệu yếu.
- **Giọng két**: rung không đều, thuật toán có thể bỏ sót.
- **Đoạn vô thanh**: không có F0, đường cao độ bị đứt (chỉ là bình thường).
- **Dải tìm kiếm**: đặt khoảng tìm F0 (sàn và trần) **phù hợp giọng** người nói; quá rộng dễ sai.

## Thử với công cụ

Đường xanh dưới phổ đồ ở bài trước là F0 tính bằng **tự tương quan**. Hãy nói câu hỏi *Really?* và câu trần thuật *Really.* để thấy đường F0 lên ở cuối câu hỏi và xuống ở cuối câu trần thuật.

{{widget:spectrogram}}

## Tài liệu tham khảo

- Titze, I. R. (1989). Physiologic and acoustic differences between male and female voices. *Journal of the Acoustical Society of America* 85, 1699-1707.
- Baken, R. J. & Orlikoff, R. F. *Clinical Measurement of Speech and Voice* (2nd ed.). Singular, 2000.
- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Roach, P. *English Phonetics and Phonology: A Practical Course* (4th ed.). Cambridge University Press, 2009.
- Cruttenden, A. *Gimson's Pronunciation of English* (8th ed.). Routledge, 2014.

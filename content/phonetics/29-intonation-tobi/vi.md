# Ngữ điệu và hệ ký hiệu ToBI

## Ngữ điệu là gì?

**Ngữ điệu** (*intonation*) là sự biến thiên **F0** trên các đơn vị lớn hơn từ. Nó mang nhiều chức năng:

- **Ngữ pháp**: phân biệt câu hỏi và câu trần thuật (*You're coming?* với *You're coming.*).
- **Thông tin / trọng tâm**: nhấn vào từ quan trọng nhất của câu.
- **Thái độ / cảm xúc**: ngạc nhiên, nghi ngờ, chắc chắn.
- **Phân đoạn diễn ngôn**: ngắt câu thành các cụm, báo hiệu khi nào kết thúc hay còn tiếp.

## Khác với thanh điệu

Trong tiếng Việt, cao độ **gắn với từng âm tiết** và đổi nghĩa từ (*ma, má, mà...*). Trong tiếng Anh, cao độ **không đổi nghĩa của từ** mà **bổ sung ý nghĩa cho cả câu**. Nhiều ngôn ngữ có **cả hai** (thanh điệu ở mức từ và ngữ điệu ở mức câu): tiếng Việt cũng có ngữ điệu, nằm chồng lên thanh điệu.

## Trường phái Anh: đầu, nhân, đuôi

Mô tả truyền thống (Halliday, Crystal, O'Connor và Arnold, Roach) chia một **cụm ngữ điệu** thành:

- **Đầu** (*head*): từ âm tiết nhấn đầu tiên đến trước nhân.
- **Nhân** (*nucleus*): âm tiết nhấn cuối cùng, nơi có **chuyển động cao độ chính**.
- **Đuôi** (*tail*): phần còn lại sau nhân.

Nhân mang các **giọng** (*tones*): **xuống** (*fall*), **lên** (*rise*), **xuống-lên** (*fall-rise*), **lên-xuống** (*rise-fall*). Ví dụ: *Where do you live?* thường có nhân xuống ở *live*, còn *Do you live in Hanoi?* thường có nhân lên ở *Hanoi*.

## Mô hình tự đoạn - nhịp điệu và ToBI

Hướng nghiên cứu hiện đại (*autosegmental-metrical*, bắt đầu từ Pierrehumbert) coi đường F0 là **chuỗi các mục tiêu cao (H) và thấp (L)** gắn với các vị trí trong câu, và **nội suy** giữa chúng. **ToBI** (*Tones and Break Indices*) là bộ quy ước ghi nhãn theo mô hình này, ban đầu cho tiếng Anh Mỹ (Beckman và Pierrehumbert).


![Pitch contours with ToBI labels](/phonetics/tobi-contours.svg)
*Hình 5.1. Đường F0 mô phỏng và nhãn ToBI cho ba câu (sơ đồ minh hoạ).*

### Các nhãn chính

| Nhãn | Loại | Ý nghĩa |
|---|---|---|
| **H\*** | trọng âm cao độ | đỉnh cao gắn với âm tiết nhấn |
| **L\*** | trọng âm cao độ | đáy thấp gắn với âm tiết nhấn |
| **L+H\*** | trọng âm cao độ | tăng lên đạt đỉnh ở âm tiết nhấn |
| **L\*+H** | trọng âm cao độ | đáy ở âm tiết nhấn rồi tăng |
| **H-**, **L-** | giọng cụm (*phrase accent*) | từ trọng âm cuối đến biên cụm trung gian |
| **H%**, **L%** | giọng biên (*boundary tone*) | cao hoặc thấp ở biên cụm ngữ điệu |

Chuỗi đầy đủ ví dụ: *You live in Hanoi.* là **H\* L-L%** (đỉnh ở *Ha-*, rồi hạ xuống thấp và kết thúc thấp). Câu hỏi *Do you live in Hanoi?* thường là **L\* H-H%** (đáy ở *Ha-*, rồi lên cao tới cuối).

### Chỉ số ngắt (break indices)

ToBI cũng ghi mức "ngắt" giữa từ:

| Chỉ số | Ý nghĩa |
|---|---|
| 0 | gắn kết hoàn toàn (clitic) |
| 1 | ranh giới từ bình thường |
| 2 | ranh giới không có hiệu ứng ngữ điệu |
| 3 | cụm trung gian (có H- hoặc L-) |
| 4 | cụm ngữ điệu đầy đủ (có H% hoặc L%) |

## Các biến thể và giới hạn

ToBI đã được mở rộng cho nhiều ngôn ngữ và giọng: **J-ToBI** (tiếng Nhật), **ToDI** (tiếng Hà Lan), **IViE** (tiếng Anh vùng Anh). Mỗi hệ thống phải được xây dựng riêng cho ngôn ngữ đó, vì **ngữ điệu mang tính ngôn ngữ riêng**: cùng một đường cao độ có thể có ý nghĩa khác nhau giữa các ngôn ngữ và giữa các giọng.

## Thử nghiệm

Hãy ghi âm các câu trong hình bằng công cụ phổ đồ và so với đường F0 mẫu: bạn có thấy **đỉnh H\*** ở âm tiết nhấn không?

{{widget:spectrogram}}

## Tài liệu tham khảo

- Roach, P. *English Phonetics and Phonology: A Practical Course* (4th ed.). Cambridge University Press, 2009.
- Cruttenden, A. *Gimson's Pronunciation of English* (8th ed.). Routledge, 2014.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Pierrehumbert, J. B. (1980). *The Phonology and Phonetics of English Intonation*. PhD thesis, MIT.
- Beckman, M. E. & Pierrehumbert, J. B. (1986). Intonational structure in Japanese and English. *Phonology Yearbook* 3, 255-309.

Đọc thêm trực tuyến:
- [ToBI](https://en.wikipedia.org/wiki/ToBI)
- [Intonation (linguistics)](https://en.wikipedia.org/wiki/Intonation_(linguistics))

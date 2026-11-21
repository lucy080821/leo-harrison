# Mô hình nguồn - bộ lọc và formant

## Ý tưởng chính

Lời nói có thể coi là hai phần **tách rời**:

- **Nguồn** (*source*): tạo ra âm thô, thường là sự rung của dây thanh hoặc tiếng xát.
- **Bộ lọc** (*filter*): đường dẫn âm phía trên thanh quản, **tạo hình** cho phổ của nguồn.

Ý tưởng này do Chiba và Kajiyama (1942) nêu rõ cho nguyên âm và được **Gunnar Fant** hệ thống hoá trong *Acoustic Theory of Speech Production* (1960). Đây là một **xấp xỉ**, nhưng cực kỳ hữu ích. Nó tương ứng với sự phân biệt giữa **phát thanh** (nguồn) và **cấu âm** (bộ lọc) mà ta đã học ở module 2.


![Source-filter model](/phonetics/source-filter.svg)
*Hình 3.3. Mô hình nguồn-lọc: họa âm của nguồn (trái), bộ lọc của đường dẫn âm (giữa) và kết quả (phải).*

## Nguồn

- **Nguồn hữu thanh**: dây thanh rung tạo chuỗi xung khí. Phổ của nó gồm **họa âm** ở F0, 2F0, 3F0... có năng lượng **giảm dần** theo tần số, xấp xỉ **−12 dB mỗi quãng tám** (độ dốc phổ).
- **Nguồn ồn**: hơi qua khe hẹp tạo nhiễu (như `/s/`, `/ʃ/`), phổ liên tục không có họa âm.
- **F0** quyết định **cao độ**, không quyết định âm là nguyên âm nào.

## Bộ lọc: formant

Khoang miệng-họng là một **ống cộng hưởng**. Nó **khuếch đại** các họa âm gần **tần số cộng hưởng** của nó và làm yếu các họa âm khác. Mỗi đỉnh cộng hưởng gọi là một **formant** (**F1, F2, F3**... tính từ thấp lên cao). **Formant là đỉnh phổ rộng do cộng hưởng của đường dẫn âm.** Hình dạng đường dẫn âm (vị trí lưỡi, môi) quyết định tần số các formant, vì vậy mỗi nguyên âm có "chữ ký" formant riêng.

## Ví dụ tính số: ống đơn giản

Coi âm /ə/ như một **ống đồng đều** đóng ở thanh môn và mở ở môi, dài **L = 17,5 cm**, vận tốc âm **c ≈ 35 000 cm/s**. Các cộng hưởng là:

**Fₙ = (2n − 1) · c / (4L)**

| n | Công thức | Kết quả |
|---|---|---|
| 1 | c/(4L) = 35000/70 | **500 Hz** |
| 2 | 3·c/(4L) | **1500 Hz** |
| 3 | 5·c/(4L) | **2500 Hz** |

Đó chính là xấp xỉ F1, F2, F3 của một nguyên âm trung tính. Khi thay đổi hình dạng ống (hạ lưỡi, tròn môi), các giá trị này dịch chuyển.

## Hai điều hệ quả

1. **F0 và formant độc lập**: bạn có thể nói cùng nguyên âm [a] ở nhiều cao độ khác nhau, các formant gần như giữ nguyên, chỉ có mật độ họa âm thay đổi.
2. **Chiều dài đường dẫn âm**: người có đường dẫn âm ngắn hơn (như phụ nữ, trẻ em) có formant **cao hơn**, nên cùng một nguyên âm nhưng số đo khác nhau giữa các nhóm người nói (xem bài sau).

## Công cụ thử nghiệm

Công cụ dưới đây là **bộ tổng hợp nguyên âm** dùng đúng mô hình này: nguồn là chuỗi họa âm, bộ lọc là ba formant. **Kéo điểm** trên biểu đồ F1-F2 (hoặc thanh trượt) và nghe nguyên âm thay đổi, trong khi biểu đồ bên phải cho thấy họa âm của nguồn bị đường bao của bộ lọc tạo hình. Bấm **▶ Play** để nghe (nhớ giữ âm lượng vừa phải).

{{widget:vowel-lab}}

Hãy thử: bấm lần lượt các ký hiệu `i`, `ɑ`, `u` và nghe khác biệt; rồi giữ nguyên F1 và F2 và kéo F0 lên xuống để thấy cao độ đổi mà nguyên âm không đổi.

## Tài liệu tham khảo

- Fant, G. *Acoustic Theory of Speech Production*. Mouton, 1960 (2nd ed. 1970).
- Stevens, K. N. *Acoustic Phonetics*. MIT Press, 1999.
- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Titze, I. R. (1989). Physiologic and acoustic differences between male and female voices. *Journal of the Acoustical Society of America* 85, 1699-1707.
- Baken, R. J. & Orlikoff, R. F. *Clinical Measurement of Speech and Voice* (2nd ed.). Singular, 2000.

Đọc thêm trực tuyến:
- [Formant](https://en.wikipedia.org/wiki/Formant)
- [Source-filter model](https://en.wikipedia.org/wiki/Source%E2%80%93filter_model)

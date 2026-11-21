# Phổ và phổ đồ

## Từ dạng sóng đến phổ

Dạng sóng cho biết áp suất theo **thời gian**, nhưng khó thấy **tần số** nào có năng lượng. **Phổ** (*spectrum*) cho biết ngược lại: tại một **khoảnh khắc**, năng lượng phân bố thế nào theo tần số. Công cụ toán học là **biến đổi Fourier** (trong máy tính là FFT).

## Phổ đồ

**Phổ đồ** (*spectrogram*) ghép nhiều phổ liên tiếp:

- Trục ngang: **thời gian**.
- Trục dọc: **tần số** (thường 0 đến 5000 Hz cho lời nói).
- Độ tối hoặc màu: **năng lượng** tại thời điểm và tần số đó (đậm hơn là mạnh hơn).

Phổ đồ cho phép **nhìn thấy** lời nói: nguyên âm hiện thành các dải ngang, tiếng xát thành vùng "mờ" ở tần số cao, đoạn im lặng của âm tắc thành khoảng trắng.

## Phổ rộng và phổ hẹp

Phổ đồ được tính bằng **cửa sổ** thời gian trượt trên tín hiệu. Độ dài cửa sổ tạo ra một **đánh đổi** không thể tránh:

- **Cửa sổ ngắn** (khoảng **5 ms**): thời gian chính xác, tần số kém chính xác. Cho **phổ đồ rộng** (*wideband*), băng thông khoảng **260 Hz**. Ta thấy các **formant** là dải đậm, và các **xung thanh môn** là sọc dọc.
- **Cửa sổ dài** (khoảng **30 ms**): tần số chính xác, thời gian kém chính xác. Cho **phổ đồ hẹp** (*narrowband*), băng thông khoảng **43 Hz**. Ta thấy từng **họa âm** của F0 là các vạch ngang, và đường đi của F0 qua độ cong của chúng.

Các giá trị trên là mặc định của phần mềm **Praat** (khoảng nhìn 0 đến 5000 Hz, dải động 50 dB).


![Broadband and narrowband spectrograms](/phonetics/broad-vs-narrow.png)
*Hình 3.4. Cùng một nguyên âm có F0 hạ dần: phổ đồ rộng (5 ms, trái) thấy formant; phổ đồ hẹp (30 ms, phải) thấy từng họa âm.*

## Cách đọc nhanh

| Thấy gì | Ý nghĩa |
|---|---|
| Dải ngang đậm (phổ rộng) | formant của nguyên âm hoặc âm gần nguyên âm |
| Sọc dọc đều đặn (phổ rộng) | các xung thanh môn: âm **hữu thanh** |
| Vạch ngang xếp chồng (phổ hẹp) | họa âm; khoảng cách giữa vạch = F0 |
| Vùng "xám nhiễu" ở trên 3000 Hz | tiếng xát như `/s/` |
| Khoảng trắng rồi vệt đậm ngắn | âm tắc: đóng rồi nhả (tiếng nổ) |
| Thanh đậm thấp, sát đáy | rung thanh trong lúc đóng (ví dụ `/b/`, âm mũi) |

## Công cụ thử nghiệm: phổ đồ trực tiếp

Công cụ dưới đây vẽ phổ đồ **trực tiếp từ micro** hoặc từ **file âm thanh** bạn chọn (kể cả file ghi âm giọng mẫu). Chọn **wideband** hoặc **narrowband** để so sánh. Đường xanh bên dưới là **F0**. Âm thanh **không rời khỏi trình duyệt**.

{{widget:spectrogram}}

Gợi ý:
1. Nói kéo dài *aaaa* rồi *eeee*, *oooo* ở phổ rộng và để ý các dải formant dịch chuyển.
2. Chuyển sang phổ hẹp và nói *aaaa* với cao độ lên xuống để thấy các vạch họa âm cong theo F0.
3. Nói *sssss* rồi *zzzzz*: `/z/` có thêm các sọc dọc (do dây thanh rung) trên nền nhiễu.

## Tài liệu tham khảo

- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Stevens, K. N. *Acoustic Phonetics*. MIT Press, 1999.
- Praat manual, spectrogram settings: https://www.fon.hum.uva.nl/praat/manual/Intro_3_2__Configuring_the_spectrogram.html

Đọc thêm trực tuyến:
- [Spectrogram](https://en.wikipedia.org/wiki/Spectrogram)
- [Praat: viewing a spectrogram](https://www.fon.hum.uva.nl/praat/manual/Intro_3_1__Viewing_a_spectrogram.html)

# Sóng âm: tần số, biên độ và phổ

Module này chuyển từ **cách tạo âm** sang **âm thanh nhận được**. Ta cần vài khái niệm vật lý, và ta sẽ giữ chúng ở mức đủ hiểu với ví dụ số.

## Âm thanh là gì?

Âm thanh là **dao động áp suất** lan truyền trong không khí. Micro đo áp suất theo thời gian và cho ta **dạng sóng** (*waveform*): trục ngang là thời gian, trục dọc là áp suất (biên độ).

## Sóng sin: hai thông số


![Sine waves](/phonetics/sine-freq-amp.svg)
*Hình 3.2. Tần số và biên độ của sóng sin.*

- **Tần số** (*frequency*, đơn vị **Hz** = số chu kỳ mỗi giây): ta nghe là **cao độ** (*pitch*).
- **Chu kỳ** (*period*) T là thời gian của một chu kỳ: **T = 1/f**. Sóng 100 Hz có chu kỳ 0,01 s = 10 ms.
- **Biên độ** (*amplitude*): độ lớn của dao động, ta nghe là **độ to** (*loudness*).

## Sóng tuần hoàn và không tuần hoàn


![Periodic and aperiodic waves](/phonetics/wave-types.svg)
*Hình 3.1. Sóng tuần hoàn (trên) và không tuần hoàn (dưới).*

- **Tuần hoàn** (*periodic*): mẫu hình lặp đi lặp lại. Nguyên âm và phụ âm hữu thanh có tính tuần hoàn vì dây thanh rung đều.
- **Không tuần hoàn** (*aperiodic*): không lặp, như tiếng ồn của `/s/` hay tiếng nổ của `/t/`.

## Sóng phức hợp và họa âm

Một sóng tuần hoàn phức hợp có thể coi là **tổng của nhiều sóng sin** có tần số là **bội số nguyên** của tần số cơ bản (ý tưởng của **Fourier**). Với F0 = 120 Hz, các **họa âm** (*harmonics*) là 120, 240, 360, 480 Hz và cứ thế. Biểu diễn năng lượng theo tần số gọi là **phổ** (*spectrum*).

## Thang đề-xi-ben (dB)

Tai nghe rất rộng, nên ta dùng thang **logarit**. Mức cường độ tính bằng **dB**:

- Dựa trên biên độ áp suất: **dB = 20·log10(A/A0)**.
- Biên độ gấp đôi tương ứng khoảng **+6 dB**. Gấp 10 lần tương ứng **+20 dB**.

dB là **tỉ lệ** so với một mức quy chiếu, nên luôn cần nói quy chiếu là gì (ví dụ dB SPL cho áp suất âm).

## Âm thanh số

Máy tính lưu âm thanh bằng cách **lấy mẫu** áp suất nhiều lần mỗi giây. **Tần số lấy mẫu** càng cao càng ghi được tần số cao: tần số cao nhất ghi được bằng **một nửa** tần số lấy mẫu (**tần số Nyquist**). Ví dụ lấy mẫu 16 kHz ghi được đến 8 kHz, và 44,1 kHz ghi được đến khoảng 22 kHz. Lời nói chứa nhiều năng lượng trong khoảng vài trăm Hz đến vài kHz; để phân tích nên ghi ở 22 kHz trở lên và **tránh bị méo** (*clipping*) khi ghi quá to.

## Thử ngay

Trong bài **Phổ đồ** tiếp theo, bạn sẽ nhìn thấy các họa âm này trên màn hình bằng phổ đồ hẹp.

## Tài liệu tham khảo

- Johnson, K. *Acoustic and Auditory Phonetics* (3rd ed.). Wiley-Blackwell, 2012.
- Ladefoged, P. & Johnson, K. *A Course in Phonetics* (7th ed.). Cengage, 2015.
- Stevens, K. N. *Acoustic Phonetics*. MIT Press, 1999.
- MIT OpenCourseWare 24.915 Linguistic Phonetics (2015): https://ocw.mit.edu/courses/24-915-linguistic-phonetics-fall-2015/

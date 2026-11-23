# Xác suất có điều kiện và định lý Bayes

## Xác suất có điều kiện

**P(A | B)** là xác suất của A *khi đã biết B xảy ra*:

`P(A | B) = P(A ∩ B) / P(B)`, với P(B) > 0.

Biết thêm thông tin thì "vũ trụ" thu hẹp lại thành B. Blitzstein gọi đây là ý tưởng trung tâm: **mọi xác suất đều là có điều kiện** theo kiến thức hiện có.

## Độc lập

A và B **độc lập** nếu biết B không đổi niềm tin về A: P(A ∩ B) = P(A)·P(B). Hai lần tung đồng xu độc lập; hai ngày mưa liên tiếp thì thường không.

## Định lý Bayes

Từ định nghĩa suy ra (Thomas Bayes, công bố sau khi mất năm 1763; Laplace phát triển):

`P(H | D) = P(D | H) · P(H) / P(D)`

trong đó P(D) tính bằng **xác suất toàn phần**: P(D) = P(D | H)P(H) + P(D | không H)P(không H).

Gọi tên: **tiên nghiệm** P(H) → nhìn dữ liệu D → **hậu nghiệm** P(H | D).

## Ví dụ: xét nghiệm bệnh hiếm

Bệnh có tỷ lệ 1%. Xét nghiệm đúng 90% với người bệnh và dương tính giả 9%. Nếu bạn dương tính, xác suất bị bệnh chỉ ≈ **9,2%**, không phải 90%. Lý do: trong 1.000 người, ~10 người bệnh (9 dương tính), còn 990 người khoẻ (~89 dương tính giả). Gigerenzer và Hoffrage (1995) cho thấy cách đếm bằng **tần số tự nhiên** như thế này giúp cả bác sĩ hiểu đúng hơn so với dùng phần trăm.

![1.000 người: 10 người bệnh (9 dương tính) và 990 khoẻ (89 dương tính giả)](/lessons/prob-stats/04-conditional-bayes-bayes-vi.svg)
*Trong 98 người dương tính chỉ có 9 người thực sự bệnh, tức khoảng 9%.*

> Số liệu ở trên là minh hoạ, không phải của một xét nghiệm cụ thể.

## Ứng dụng: lọc thư rác

Bộ lọc **Naive Bayes** áp dụng chính công thức này cho từng từ trong thư; đề xuất cho thư rác do Paul Graham (2002) phổ biến.

## Nguồn tham khảo

- Blitzstein & Hwang, *Introduction to Probability*, chương 2 (Conditional probability).
- Gigerenzer, G. & Hoffrage, U. (1995). How to improve Bayesian reasoning without instruction: frequency formats. *Psychological Review* 102(4).
- Bayes, T. (1763). An Essay towards solving a Problem in the Doctrine of Chances. *Phil. Trans. R. Soc.* 53.
- MIT OCW 18.05 (Introduction to Probability and Statistics): Bayesian updating.

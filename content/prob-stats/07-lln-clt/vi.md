# Luật số lớn và định lý giới hạn trung tâm

## Luật số lớn (LLN)

Jacob Bernoulli chứng minh phiên bản đầu tiên trong *Ars Conjectandi* (công bố 1713): khi số lần thử n tăng, **trung bình mẫu x̄ₙ hội tụ về kỳ vọng μ**. Tung đồng xu càng nhiều, tỷ lệ ngửa càng gần 0,5.

![Tỷ lệ ngửa khi tung đồng xu: dao động mạnh lúc đầu rồi tiến về 0,5](/lessons/prob-stats/07-lln-clt-lln-vi.svg)
*Trục ngang (thang log) là số lần tung; càng nhiều lần thì tỷ lệ càng sát 0,5.*

> Luật số lớn **không** nói rằng "sau chuỗi sấp thì ngửa sắp tới" (ngộ nhận của con bạc, *gambler's fallacy*). Mỗi lần tung vẫn độc lập; tỷ lệ ổn định vì số lần lớn *làm loãng* sai lệch ban đầu.

## Định lý giới hạn trung tâm (CLT)

Laplace (1810) và các nhà toán học sau đó chứng minh: nếu X₁, …, Xₙ độc lập, cùng phân phối với kỳ vọng μ và độ lệch chuẩn σ hữu hạn, thì với n đủ lớn

`x̄ₙ ≈ N(μ, σ²/n)`

**bất kể phân phối gốc của X là gì.** Độ lệch chuẩn của trung bình, gọi là **sai số chuẩn (standard error)**, là **σ/√n**: muốn chính xác gấp đôi cần gấp **bốn** lần dữ liệu.

![Phân phối trung bình mẫu của xúc xắc khi n = 1, 2, 30](/lessons/prob-stats/07-lln-clt-clt-vi.svg)
*Phân phối gốc là đều, nhưng trung bình của 30 lần tung gần như hình chuông.*

## Ý nghĩa thực tế

- Giải thích vì sao sai số đo, điểm thi tổng hợp... thường có hình chuông: chúng là *tổng của nhiều tác động nhỏ*.
- Là cơ sở của **khoảng tin cậy** và **kiểm định giả thuyết** (hai bài sau).
- Với phân phối rất lệch hoặc n nhỏ, cần n lớn hơn nhiều để xấp xỉ tốt; "n ≥ 30" chỉ là quy tắc ngón tay cái.

## Nguồn tham khảo

- Blitzstein & Hwang, *Introduction to Probability*, chương 10 (Inequalities and limit theorems).
- Bernoulli, J. (1713). *Ars Conjectandi*.
- Diez et al., *OpenIntro Statistics*, mục 4.1 (Variability in estimates) và Central Limit Theorem.
- MIT OCW 18.05, bài về LLN và CLT.

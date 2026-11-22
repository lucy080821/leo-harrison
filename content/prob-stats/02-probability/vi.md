# Xác suất: không gian mẫu và các tiên đề

## Ngôn ngữ của sự bất định

Xác suất là ngôn ngữ toán học cho sự bất định. Harvard Stat 110 (Blitzstein) mô tả nó là công cụ để hiểu thống kê, khoa học, rủi ro và tính ngẫu nhiên. Ba khái niệm nền:

- **Phép thử ngẫu nhiên**: quá trình có kết quả không chắc chắn (tung xúc xắc).
- **Không gian mẫu Ω**: tập mọi kết quả có thể. Hai xúc xắc: Ω có 6 × 6 = 36 kết quả.
- **Biến cố A**: một tập con của Ω. "Tổng bằng 7" gồm 6 kết quả: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1).

## Các tiên đề Kolmogorov (1933)

Andrey Kolmogorov đặt xác suất trên nền lý thuyết độ đo. Với không gian mẫu hữu hạn, ba tiên đề là:

1. P(A) ≥ 0 với mọi biến cố A.
2. P(Ω) = 1.
3. Nếu A và B **không giao nhau** thì P(A ∪ B) = P(A) + P(B).

Từ đó suy ra: P(không A) = 1 − P(A) và, với biến cố bất kỳ, **công thức cộng** P(A ∪ B) = P(A) + P(B) − P(A ∩ B).

Khi các kết quả **đồng khả năng**: P(A) = |A| / |Ω|. Vậy P(tổng = 7) = 6/36 = 1/6.

![Lưới 6×6 các kết quả của hai xúc xắc; ô tô màu là tổng bằng 7](/lessons/prob-stats/02-probability-dice-vi.svg)
*Mỗi ô là một kết quả đồng khả năng (1/36). Đường chéo tô màu có 6 ô nên P = 6/36.*

## Hai cách hiểu xác suất

- **Tần suất**: P là giới hạn của tần suất tương đối khi lặp lại vô số lần.
- **Bayes (độ tin)**: P đo mức độ tin vào một mệnh đề, cập nhật khi có dữ liệu (bài sau).

Cả hai cùng dùng chung các tiên đề.

## Mô phỏng Monte Carlo

Khi khó tính chính xác, ta **mô phỏng**: lặp thí nghiệm hàng trăm nghìn lần bằng máy và lấy tần suất. Phương pháp Monte Carlo do Ulam, von Neumann và Metropolis phát triển vào thập niên 1940 ở Los Alamos. Ví dụ thực tế: ước lượng xác suất một dự án trễ hạn khi mỗi công việc có thời gian ngẫu nhiên.

## Nguồn tham khảo

- Blitzstein, J. & Hwang, J. *Introduction to Probability* (CRC Press), chương 1; Harvard Stat 110.
- Kolmogorov, A. N. (1933). *Grundbegriffe der Wahrscheinlichkeitsrechnung*.
- Metropolis, N. & Ulam, S. (1949). The Monte Carlo Method. *J. Amer. Statist. Assoc.* 44.

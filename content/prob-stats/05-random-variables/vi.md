# Biến ngẫu nhiên, kỳ vọng và phương sai

## Biến ngẫu nhiên

**Biến ngẫu nhiên (random variable) X** là một hàm gán mỗi kết quả của phép thử một con số. Tung hai xúc xắc, X = tổng hai mặt. Với biến **rời rạc**, **hàm khối xác suất (PMF)** cho P(X = x) cho mỗi giá trị.

## Kỳ vọng

**Kỳ vọng (expectation)** là trung bình có trọng số theo xác suất:

`E[X] = Σ x · P(X = x)`

Ví dụ xúc xắc: E[X] = (1+2+3+4+5+6)/6 = **3,5**: giá trị trung bình dài hạn, không nhất thiết là giá trị có thể gặp.

**Tính tuyến tính của kỳ vọng:** E[aX + bY] = aE[X] + bE[Y], **luôn đúng, kể cả khi X, Y phụ thuộc nhau**. Blitzstein xếp đây là một trong những công cụ mạnh nhất của xác suất.

## Phương sai

**Phương sai** đo độ phân tán quanh kỳ vọng: `Var(X) = E[(X − E[X])²] = E[X²] − (E[X])²`. **Độ lệch chuẩn** là √Var. Với X độc lập: Var(X + Y) = Var(X) + Var(Y).

Xúc xắc: Var = 35/12 ≈ 2,92.

![Cột PMF của tổng hai xúc xắc, đỉnh ở 7](/lessons/prob-stats/05-random-variables-pmf-vi.svg)
*Tổng 7 có xác suất cao nhất (6/36); kỳ vọng E = 7 nằm ở tâm đối xứng.*

## Ví dụ thực tế: giá trị kỳ vọng của một quyết định

- **Bảo hiểm**: công ty bảo hiểm tính phí dựa trên E[tổn thất] cộng chi phí và lợi nhuận. Người mua chấp nhận *lỗ kỳ vọng* để giảm *phương sai* (rủi ro).
- **Xổ số**: nhà tổ chức thiết kế sao cho E[tiền thưởng] nhỏ hơn giá vé, nên chơi lâu dài có lãi kỳ vọng âm.

Daniel Bernoulli (1738) lưu ý rằng con người không chỉ nhìn kỳ vọng mà còn nhìn *độ thoả dụng*, mở đường cho lý thuyết quyết định.

## Nguồn tham khảo

- Blitzstein & Hwang, *Introduction to Probability*, chương 4 (Expectation) và 3 (Random variables).
- Ross, S. *A First Course in Probability*.
- Bernoulli, D. (1738). Specimen theoriae novae de mensura sortis.

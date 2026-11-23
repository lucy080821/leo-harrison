# Phân tích A/B test bằng SQL

Dữ liệu thử nghiệm thường nằm sẵn trong kho dữ liệu, nên nhiều bước phân tích A/B làm trực tiếp bằng SQL. Bài này nối **thống kê (kiểm định hai tỷ lệ)** với **kỹ năng SQL**.

## Bước 1: tổng hợp theo nhóm

```sql
SELECT grp, COUNT(*) AS n, SUM(converted) AS conv,
       1.0 * SUM(converted) / COUNT(*) AS rate
FROM assignments GROUP BY grp;
```

(Viết `1.0 *` để phép chia ra số thực.)

## Bước 2: hiệu và sai số chuẩn

Gọi pA, pB là tỷ lệ; nA, nB là cỡ nhóm.

- Hiệu: `d = pB − pA`.
- Sai số chuẩn (không gộp, cho khoảng tin cậy): `SE = sqrt(pA(1 − pA)/nA + pB(1 − pB)/nB)`.
- Khoảng tin cậy 95%: `d ± 1,96·SE`.
- Điểm z kiểm định (dùng tỷ lệ gộp p): `z = d / sqrt(p(1 − p)(1/nA + 1/nB))`; |z| > 1,96 ⇒ p < 0,05.

![Kiểm định A/B ngay trong SQL](/lessons/sql/29-ab-test-sql-fig-vi.svg)
*Kiểm định A/B ngay trong SQL*

## Việc nên làm trong SQL, việc nên làm ngoài SQL

- **SQL**: gán nhóm, loại bản ghi bất thường, tính số người/đơn vị theo nhóm, kiểm tra **SRM** (tỷ lệ nhóm đúng thiết kế không).
- **Python/R**: p-value chính xác, khoảng tin cậy bootstrap, hiệu chỉnh so sánh bội, vẽ biểu đồ.

## Kiểm tra trước khi tin kết quả

1. **Phân nhóm ngẫu nhiên đúng?** So đặc điểm hai nhóm (quốc gia, kênh) trước thử nghiệm.
2. **SRM**: số người hai nhóm khớp tỷ lệ thiết kế (kiểm định χ²).
3. **Đơn vị phân tích**: người dùng, không phải lượt xem.
4. **Thời gian chạy**: tròn tuần, đủ cỡ mẫu (bài về power).
5. **Một chỉ số chính**, khai báo trước.

## Nguồn tham khảo

- Kohavi, R., Tang, D., Xu, Y. *Trustworthy Online Controlled Experiments* (2020).
- Diez et al. *OpenIntro Statistics*, chương 6.
- Khoá "Toán và Thống kê" của Learn With Leo: các bài về kiểm định, power và thực nghiệm A/B.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

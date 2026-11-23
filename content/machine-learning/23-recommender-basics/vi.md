# Hệ gợi ý cơ bản: tương đồng cosine và lọc cộng tác

"Người mua A cũng mua B": gợi ý sản phẩm, phim, bài hát tạo ra phần lớn doanh thu/thời gian xem ở Amazon, Netflix, Spotify. Hạt nhân là **lọc cộng tác (collaborative filtering)**: học từ hành vi của nhiều người.

## Dữ liệu: ma trận người dùng × sản phẩm

Hàng là người dùng, cột là sản phẩm; ô là **tương tác** (mua = 1, hoặc điểm đánh giá, số lần xem). Ma trận thường **rất thưa** (mỗi người chỉ tương tác với vài mục).

![Tương đồng cosine giữa các sản phẩm dựa trên người mua chung](/lessons/machine-learning/23-recommender-basics-fig-vi.svg)
*Tương đồng cosine giữa các sản phẩm dựa trên người mua chung*

## Tương đồng cosine

Hai sản phẩm giống nhau nếu **cùng những người dùng** tương tác với chúng:

`cos(a, b) = a·b / (‖a‖ ‖b‖)`, nằm trong [0, 1] với dữ liệu không âm. Dùng góc thay vì khoảng cách nên **không bị ảnh hưởng bởi độ phổ biến**.

## Hai hướng

| Hướng | Ý tưởng | Đặc điểm |
|---|---|---|
| **Dựa trên sản phẩm** | gợi ý món giống món bạn đã dùng | ổn định, dễ giải thích, nhanh khi dùng |
| **Dựa trên người dùng** | tìm người giống bạn, lấy món họ thích | nhạy khi sở thích thay đổi |
| **Phân rã ma trận** (SVD, ALS) | học vector ẩn cho người dùng và món | mạnh với dữ liệu thưa, mở rộng tốt |
| **Dựa trên nội dung** | dùng thuộc tính của món | giải quyết cold-start |

## Vấn đề thực tế

- **Cold start**: người dùng/sản phẩm mới chưa có lịch sử ⇒ dùng nội dung, độ phổ biến, hỏi sở thích.
- **Thiên lệch độ phổ biến**: gợi ý toàn hàng bán chạy; cần thêm đa dạng và khám phá.
- **Phản hồi ngầm** (xem, bấm) thay cho đánh giá sao: không có "không thích" rõ ràng.

## Đánh giá

Ẩn một phần tương tác rồi đo mô hình có gợi ý lại được không: **precision@k, recall@k, NDCG, MAP**. Chia **theo thời gian** như dự báo. Cuối cùng quyết định bằng **A/B test** trên chỉ số kinh doanh.

## Nguồn tham khảo

- Koren, Bell, Volinsky (2009). Matrix factorization techniques for recommender systems. *IEEE Computer* 42(8).
- Sarwar et al. (2001). Item-based collaborative filtering recommendation algorithms. *WWW*.
- Aggarwal, C. *Recommender Systems: The Textbook* (Springer).

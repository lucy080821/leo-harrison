# Hàm cửa sổ (2): xếp hạng, top-N mỗi nhóm, khử trùng và phân vị

Bài 11 giới thiệu hàm cửa sổ. Đây là các **mẫu dùng hằng ngày** của người phân tích.

## Họ hàm xếp hạng

| Hàm | Hành vi khi bằng điểm (lương 2300, 2300, 2100) |
|---|---|
| `ROW_NUMBER()` | luôn khác nhau: 1, 2, 3 (thứ tự trùng được phá ngẫu nhiên) |
| `RANK()` | trùng hạng, **nhảy số**: 1, 1, 3 |
| `DENSE_RANK()` | trùng hạng, **không nhảy**: 1, 1, 2 |
| `NTILE(n)` | chia thành n nhóm gần bằng nhau (phân vị, ví dụ tứ phân vị) |
| `PERCENT_RANK()` | vị trí tương đối từ 0 đến 1 |

## Mẫu top-N mỗi nhóm

Không dùng `LIMIT` được cho từng nhóm. Cách chuẩn: đánh số trong truy vấn con rồi lọc.

```sql
SELECT * FROM (
  SELECT *, ROW_NUMBER() OVER (PARTITION BY department_id ORDER BY salary DESC) AS rn
  FROM employees
) WHERE rn <= 2;
```

(Phải lọc ở truy vấn ngoài vì `WHERE` chạy **trước** hàm cửa sổ.)

![ROW_NUMBER lấy top-N mỗi nhóm; NTILE chia nhóm phân vị](/lessons/sql/21-window-ranking-fig-vi.svg)
*ROW_NUMBER lấy top-N mỗi nhóm; NTILE chia nhóm phân vị*

## Khử trùng lặp

Giữ **một** bản ghi mới nhất cho mỗi khách: `ROW_NUMBER() OVER (PARTITION BY email ORDER BY updated_at DESC)` rồi giữ `rn = 1`. Đây là cách làm sạch dữ liệu rất phổ biến.

## Phân vị và phân khúc

`NTILE(4)` chia khách theo doanh thu thành 4 nhóm để phân khúc (bài RFM). Nếu số dòng không chia hết, các nhóm đầu có thêm một dòng.

## Nguồn tham khảo

- SQLite documentation, "Window Functions", sqlite.org.
- Beaulieu, A. *Learning SQL* (3rd ed.), chương 16 (Analytic Functions).
- Winand, M. *SQL Performance Explained*: phần window functions.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

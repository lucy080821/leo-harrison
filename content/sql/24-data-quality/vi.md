# Kiểm tra chất lượng dữ liệu bằng SQL

Câu nói cũ trong nghề: *garbage in, garbage out*. Mọi phân tích phải bắt đầu bằng **kiểm tra dữ liệu**, và SQL làm việc này rất tốt.

## Sáu kiểm tra nên chạy trước mọi báo cáo

1. **Số dòng và khoảng thời gian**: `COUNT(*)`, `MIN/MAX(ngay)`: đủ dữ liệu chưa, có ngày tương lai không?
2. **NULL**: `SUM(CASE WHEN cot IS NULL THEN 1 ELSE 0 END)`: cột nào thiếu bao nhiêu?
3. **Trùng lặp**: `GROUP BY khoa HAVING COUNT(*) > 1`: khoá "duy nhất" có thật duy nhất không?
4. **Bản ghi mồ côi** (khoá ngoại không khớp): `LEFT JOIN … WHERE b.id IS NULL`.
5. **Ngoài phạm vi / phi lý**: số âm, tuổi 300, ngày mua trước ngày đăng ký.
6. **Nhất quán giữa các nguồn**: hai bảng đáng lẽ khớp nhau thì tổng có khớp không (đối chiếu số đơn mua và sự kiện mua).

![Kiểm tra chất lượng dữ liệu: trùng, thiếu, ngoài phạm vi](/lessons/sql/24-data-quality-fig-vi.svg)
*Kiểm tra chất lượng dữ liệu: trùng, thiếu, ngoài phạm vi*

## Công cụ NULL

- `COALESCE(a, b, 0)`: giá trị đầu tiên không NULL (điền mặc định).
- `NULLIF(a, b)`: trả `NULL` nếu a = b. Mẹo chia an toàn: `x / NULLIF(y, 0)`.
- Nhớ: `NULL = NULL` không phải TRUE; dùng `IS NULL`.

## Thực hành nghề nghiệp

- Viết các kiểm tra thành **truy vấn đếm lỗi** (kết quả mong đợi bằng 0) và chạy lại mỗi lần nạp dữ liệu mới.
- **Đừng âm thầm xoá** dữ liệu xấu: ghi lại số lượng và lý do loại, báo cho chủ dữ liệu.
- Ràng buộc trong CSDL (`NOT NULL`, `UNIQUE`, `CHECK`, khoá ngoại) ngăn lỗi từ đầu (bài thiết kế bảng).

## Nguồn tham khảo

- Redman, T. *Data Driven: Profiting from Your Most Important Business Asset*.
- DAMA International. *DAMA-DMBOK: Data Management Body of Knowledge* (các chiều chất lượng dữ liệu).
- SQLite documentation, "Core Functions: coalesce, nullif", sqlite.org.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

# Giao dịch và tính chất ACID

Chuyển tiền giữa hai tài khoản gồm hai bước: trừ bên gửi, cộng bên nhận. Nếu hệ thống sập **giữa hai bước**, tiền "biến mất". **Giao dịch (transaction)** gói nhiều lệnh thành **một đơn vị công việc không chia cắt**.

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;      -- hoặc ROLLBACK; để huỷ mọi thay đổi từ BEGIN
```

## ACID

Thuật ngữ do Härder và Reuter (1983) đặt:

| Chữ | Nghĩa |
|---|---|
| **A**tomicity (nguyên tử) | tất cả hoặc không gì cả |
| **C**onsistency (nhất quán) | giao dịch đưa CSDL từ trạng thái hợp lệ sang hợp lệ (ràng buộc luôn đúng) |
| **I**solation (cô lập) | các giao dịch chạy đồng thời **không thấy nhau ở giữa chừng** |
| **D**urability (bền vững) | đã `COMMIT` thì không mất dù sập nguồn |

![Giao dịch: tất cả hoặc không gì cả](/lessons/sql/32-transactions-acid-fig-vi.svg)
*Giao dịch: tất cả hoặc không gì cả*

## Cô lập và các sự cố khi đồng thời

Không cô lập đủ có thể gặp: **đọc bẩn** (đọc dữ liệu chưa commit), **đọc không lặp lại**, **đọc bóng ma** (phantom). SQL định nghĩa các mức: `READ UNCOMMITTED`, `READ COMMITTED`, `REPEATABLE READ`, `SERIALIZABLE`. Mức càng cao càng an toàn, càng chậm; phần lớn hệ thống mặc định `READ COMMITTED` hoặc `REPEATABLE READ`.

## SAVEPOINT

Điểm lưu bên trong giao dịch: `SAVEPOINT a; … ROLLBACK TO a;` để huỷ một phần.

## Thực hành nghề nghiệp

- Gói **mọi thao tác ghi liên quan** vào một giao dịch; giữ giao dịch **ngắn** (không đợi người dùng giữa chừng).
- **Khoá và deadlock**: hai giao dịch chờ nhau; thiết kế truy cập theo cùng thứ tự.
- Nhiều CSDL phân tích tối ưu cho đọc nên giao dịch ghi hạn chế: hiểu hệ thống bạn dùng.

## Nguồn tham khảo

- Härder, T. & Reuter, A. (1983). Principles of transaction-oriented database recovery. *ACM Computing Surveys* 15(4).
- Gray, J. & Reuter, A. *Transaction Processing: Concepts and Techniques*.
- SQLite documentation, "Transaction", "Isolation in SQLite", sqlite.org.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

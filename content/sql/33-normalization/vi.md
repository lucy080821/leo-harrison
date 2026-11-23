# Chuẩn hoá cơ sở dữ liệu: 1NF, 2NF, 3NF

Bảng phẳng "tên khách, thành phố, sản phẩm" lặp thông tin khách ở mỗi dòng gây ba **dị thường**:

- **Cập nhật**: đổi thành phố của một khách phải sửa nhiều dòng; sót một dòng là dữ liệu mâu thuẫn.
- **Chèn**: không thể ghi một khách mới nếu chưa có đơn.
- **Xoá**: xoá đơn cuối cùng cũng làm mất luôn thông tin khách.

**Chuẩn hoá** (Edgar Codd, 1970–1972) là quy trình tách bảng để **mỗi sự thật chỉ lưu một lần**.

## Phụ thuộc hàm

`A → B` nghĩa là giá trị A xác định duy nhất B (ví dụ `customer_id → city`). Chuẩn hoá dựa trên phân tích các phụ thuộc này.

## Ba dạng chuẩn đầu

1. **1NF**: mỗi ô chỉ **một giá trị nguyên tố** (không lưu danh sách "a,b,c" trong một ô), mỗi dòng xác định được bằng khoá.
2. **2NF**: 1NF **và** mọi cột không khoá phụ thuộc **toàn bộ khoá** (không chỉ một phần của khoá phức hợp).
3. **3NF**: 2NF **và** không có **phụ thuộc bắc cầu** (cột không khoá không được phụ thuộc cột không khoá khác). Ví dụ `order → customer_id → city` thì `city` thuộc bảng khách.

Câu nhớ: *mọi cột không khoá phải phụ thuộc vào khoá, toàn bộ khoá, và không gì ngoài khoá* (Bill Kent).

![Chuẩn hoá từ dạng 1NF đến 3NF](/lessons/sql/33-normalization-fig-vi.svg)
*Chuẩn hoá từ dạng 1NF đến 3NF*

## Khi nào phi chuẩn hoá

Chuẩn hoá giảm dư thừa và lỗi, nhưng cần nhiều **JOIN**. Với kho dữ liệu phân tích (bài về lược đồ sao) ta **chủ ý phi chuẩn hoá** để đọc nhanh. Quy tắc: **hệ thống giao dịch (OLTP) thì chuẩn hoá; hệ thống phân tích (OLAP) thường phi chuẩn hoá có kiểm soát.**

## Nguồn tham khảo

- Codd, E. F. (1972). Further normalization of the data base relational model.
- Kent, W. (1983). A simple guide to five normal forms in relational database theory. *CACM* 26(2).
- Date, C. J. *An Introduction to Database Systems*.

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

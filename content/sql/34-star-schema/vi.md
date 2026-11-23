# Lược đồ sao và kho dữ liệu phân tích

Hệ thống bán hàng (OLTP) được **chuẩn hoá** để ghi nhanh và đúng. Nhưng báo cáo "doanh thu theo tháng × loại sản phẩm × vùng" qua chục bảng nối rất chậm và khó viết. **Kho dữ liệu (data warehouse)** tổ chức lại dữ liệu cho **phân tích**.

## Lược đồ sao (star schema)

Ralph Kimball (1996) phổ biến cách tổ chức:

- **Bảng sự kiện (fact)** ở giữa: mỗi dòng là **một sự kiện đo được** (một dòng hàng bán), chứa **số đo** (số lượng, doanh thu) và **khoá ngoại** tới các chiều.
- **Bảng chiều (dimension)** xung quanh: mô tả **ngữ cảnh** (ngày, sản phẩm, khách hàng, cửa hàng), nhiều cột mô tả, **phi chuẩn hoá** có chủ ý.

![Bảng sự kiện ở giữa, bảng chiều xung quanh](/lessons/sql/34-star-schema-fig-vi.svg)
*Bảng sự kiện ở giữa, bảng chiều xung quanh*

## Hạt (grain)

**Hạt** là "một dòng của bảng fact đại diện cho cái gì" (một dòng đơn hàng? một đơn?). **Chọn và ghi rõ hạt trước tiên**; mọi số đo và chiều phải khớp hạt. Trộn hạt gây đếm trùng.

## Truy vấn mẫu

Mọi báo cáo có dạng: **nối fact với vài chiều, lọc, nhóm theo thuộc tính chiều, cộng số đo**. Bảng chiều ngày (`dim_date`: năm, quý, tháng, thứ, ngày lễ) giúp nhóm theo thời gian không cần hàm ngày.

## Chiều thay đổi chậm (SCD)

Khách chuyển thành phố thì doanh thu quá khứ thuộc thành phố nào? **SCD loại 1**: ghi đè (mất lịch sử). **Loại 2**: thêm dòng mới với ngày hiệu lực (giữ lịch sử). Quyết định theo nhu cầu phân tích.

## Công cụ hiện đại

dbt (biến đổi dữ liệu bằng SQL), BigQuery, Snowflake, Redshift; mô hình **ELT** (nạp dữ liệu thô rồi biến đổi bằng SQL trong kho).

## Nguồn tham khảo

- Kimball, R. & Ross, M. *The Data Warehouse Toolkit* (3rd ed., Wiley).
- Inmon, W. H. *Building the Data Warehouse*.
- dbt Labs documentation, "How we structure our dbt projects".

> **Dữ liệu:** bài này dùng bộ dữ liệu mẫu có sẵn trong trình soạn thảo (SQLite chạy ngay trong trình duyệt). Cú pháp ở đây theo SQLite; phần khác biệt với PostgreSQL, MySQL, BigQuery được nêu trong bài về các phương ngữ.

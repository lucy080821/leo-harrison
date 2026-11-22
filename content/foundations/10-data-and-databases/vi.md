# Dữ liệu và cơ sở dữ liệu

## Dữ liệu dạng bảng

Phần lớn dữ liệu thực tế là **bảng**: mỗi **hàng** là một bản ghi (một người, một đơn hàng), mỗi **cột** là một thuộc tính (tên, thành phố). Hadley Wickham (2014) gọi một bảng gọn gàng là **tidy data** với ba quy tắc:

1. Mỗi **biến** là một cột.
2. Mỗi **quan sát** là một hàng.
3. Mỗi **loại đơn vị quan sát** là một bảng.

Dữ liệu sạch theo quy tắc này dễ lọc, gom nhóm và vẽ biểu đồ hơn.

![Hai bảng liên kết bằng khoá chính và khoá ngoại](/lessons/foundations/10-data-and-databases-tables-vi.svg)
*orders.customer_id tham chiếu customers.id, nên tên khách chỉ lưu một lần.*

## Mô hình quan hệ

Năm 1970, Edgar F. Codd (IBM) đề xuất **mô hình quan hệ** trong bài *A Relational Model of Data for Large Shared Data Banks*: dữ liệu là các **quan hệ** (bảng) liên kết bằng *giá trị*, không phải bằng con trỏ vật lý. Nhờ đó người dùng chỉ nói **muốn gì**, hệ quản trị CSDL lo **làm thế nào**.

Hai khái niệm trung tâm:

- **Khoá chính (primary key)**: cột (hoặc nhóm cột) định danh duy nhất mỗi hàng, ví dụ `id`.
- **Khoá ngoại (foreign key)**: cột tham chiếu tới khoá chính của bảng khác, tạo mối liên kết (ví dụ `orders.customer_id → customers.id`).

## SQL: ngôn ngữ khai báo

**SQL** là ngôn ngữ *khai báo (declarative)*: bạn mô tả kết quả mong muốn, không viết vòng lặp:

```sql
SELECT city, COUNT(*) FROM people GROUP BY city;
```

Ba phép cốt lõi của đại số quan hệ: **chọn (selection)** lọc hàng, **chiếu (projection)** chọn cột, **kết (join)** ghép hai bảng theo khoá.

## Vì sao tách bảng?

Lưu tên khách hàng lặp ở mọi đơn hàng sẽ gây **dư thừa** và **bất nhất** khi sửa. **Chuẩn hoá (normalization)** tách dữ liệu thành các bảng nhỏ liên kết bằng khoá để mỗi sự thật chỉ lưu một lần. Bạn sẽ thực hành trong khoá SQL.

## Nguồn tham khảo

- Codd, E. F. (1970). A Relational Model of Data for Large Shared Data Banks. *CACM* 13(6).
- Wickham, H. (2014). Tidy Data. *Journal of Statistical Software* 59(10).
- Date, C. J. *An Introduction to Database Systems*.
- ISO/IEC 9075 (chuẩn SQL).

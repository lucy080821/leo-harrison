# Đầu ra có cấu trúc: JSON schema, kiểm tra và thử lại

Chương trình cần dữ liệu **có cấu trúc**, không phải văn bản tự do. Nhưng LLM là mô hình xác suất: sẽ có lúc nó trả JSON hỏng, thiếu trường, sai kiểu, hay bọc thêm lời dẫn. **Không bao giờ tin đầu ra mô hình mà không kiểm tra.**

## Các cách lấy đầu ra có cấu trúc

| Cách | Mức tin cậy | Ghi chú |
|---|---|---|
| Chỉ dẫn trong prompt ("trả về JSON") | thấp | hay lệch |
| **Chế độ JSON / structured outputs** của API | cao | ràng buộc theo schema khi giải mã |
| **Function/tool calling** | cao | mô hình điền tham số theo schema của hàm |
| Giải mã có ràng buộc (grammar, thư viện Outlines) | rất cao | mô hình mã nguồn mở |

![Luôn kiểm tra đầu ra của mô hình trước khi dùng](/lessons/modern-ai/11-structured-output-validation-fig-vi.svg)
*Luôn kiểm tra đầu ra của mô hình trước khi dùng*

## Lớp phòng thủ nhiều tầng

1. **Schema rõ ràng** (kiểu, bắt buộc/tuỳ chọn, enum, khoảng giá trị).
2. **Phân tích tha thứ**: bóc JSON khỏi ```` ```json ```` hoặc lời dẫn.
3. **Kiểm tra** bằng thư viện (Pydantic, `jsonschema`) và **quy tắc nghiệp vụ** (tổng tiền khớp, ngày hợp lệ).
4. **Thử lại có phản hồi**: gửi lại thông báo lỗi cho mô hình ("trường `age` phải là số nguyên"), tối đa 2–3 lần.
5. **Phương án dự phòng**: hàng đợi duyệt tay hoặc giá trị mặc định an toàn.

## Function calling

Bạn khai báo hàm bằng schema (tên, mô tả, tham số). Mô hình **không chạy hàm**; nó trả **yêu cầu gọi** `{name, arguments}`. Chương trình của bạn **kiểm tra rồi mới thực thi**, trả kết quả lại cho mô hình. Đây là nền của **agent** (bài 6).

## An toàn

- Đầu ra mô hình là **dữ liệu không đáng tin**: không `eval()`, không ghép trực tiếp vào SQL/shell (chống chèn mã). Dùng truy vấn tham số hoá.
- Giới hạn **quyền** của công cụ (đọc-chỉ, danh sách cho phép).
- Ghi **log** yêu cầu/đáp ứng để điều tra.

## Nguồn tham khảo

- JSON Schema specification (json-schema.org).
- Pydantic documentation; OpenAI/Anthropic tài liệu về structured outputs và tool use.
- OWASP Top 10 for LLM Applications (Insecure Output Handling).

# Log có cấu trúc và quan sát: mức log, request id và chỉ số

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Khi dịch vụ chạy lúc 3 giờ sáng và có lỗi, thứ duy nhất bạn có là **log, chỉ số và vết**. Hệ thống không quan sát được thì không thể vận hành đáng tin.

## Log có cấu trúc

Thay vì `console.log("User 42 failed login from 1.2.3.4")` (văn bản tự do, khó lọc), ghi **một JSON mỗi dòng**:

```json
{"level":"warn","msg":"login failed","userId":42,"ip":"1.2.3.4","requestId":"r-1","service":"api"}
```

Công cụ (Loki, Elasticsearch, Datadog, CloudWatch) lọc/tổng hợp theo trường: *"có bao nhiêu `login failed` theo `ip` trong 5 phút?"*. Thư viện: **pino** (nhanh nhất), winston.

![Ba trụ cột quan sát: log, chỉ số, vết](/lessons/nodejs/21-logging-observability-fig-vi.svg)
*Ba trụ cột quan sát: log, chỉ số, vết*

## Mức log

| Mức | Dùng cho |
|---|---|
| `error` | thao tác **thất bại**, cần xem xét |
| `warn` | bất thường nhưng đã xử lý (thử lại, dùng dự phòng) |
| `info` | sự kiện nghiệp vụ quan trọng (khởi động, đăng nhập, đơn hàng) |
| `debug` | chi tiết khi gỡ lỗi (tắt ở sản xuất) |

Đặt mức qua biến môi trường để đổi **không cần triển khai lại**.



## Ngữ cảnh: child logger và request id

Tạo **logger con** mang sẵn `requestId`, `userId` cho từng yêu cầu: mọi dòng trong yêu cầu đó tự có ngữ cảnh, cho phép **lần theo một yêu cầu** xuyên suốt nhiều dịch vụ.

## Đừng log điều nhạy cảm

Mật khẩu, token, số thẻ, dữ liệu cá nhân (PII) **không bao giờ** vào log (log hay bị sao chép sang nhiều hệ thống, giữ lâu). Dùng **che (redact)** theo danh sách khoá (`pino` có sẵn `redact`). Tuân thủ quy định (GDPR, Nghị định 13/2023/NĐ-CP về bảo vệ dữ liệu cá nhân).

## Ba trụ cột quan sát

| Trụ cột | Trả lời | Công cụ |
|---|---|---|
| **Log** | chuyện gì đã xảy ra? | pino, ELK/Loki |
| **Chỉ số (metrics)** | hệ thống đang thế nào, xu hướng? | Prometheus + Grafana |
| **Vết (traces)** | yêu cầu chậm ở đâu qua các dịch vụ? | **OpenTelemetry**, Jaeger |

## Chỉ số: nhìn theo phân vị, không theo trung bình

Trung bình **che giấu** đuôi chậm. Theo dõi **p50, p95, p99**: nếu p99 = 3 giây, cứ 100 người có 1 người chờ 3 giây. Bốn "tín hiệu vàng" (Google SRE): **độ trễ, lưu lượng, lỗi, độ bão hoà**.

## Cảnh báo (alerting)

Cảnh báo theo **triệu chứng người dùng thấy** (tỷ lệ lỗi 5xx, độ trễ p99), không theo từng chỉ số CPU. Mỗi cảnh báo phải **hành động được**, kèm hướng dẫn xử lý (runbook), kẻo gây **mệt mỏi vì cảnh báo**.

## Nguồn tham khảo

- pino documentation; OpenTelemetry documentation.
- Google SRE Book: "Monitoring Distributed Systems" (Four Golden Signals).
- OWASP: Logging Cheat Sheet.

# Web hoạt động thế nào

## Mô hình client–server

Web là hệ thống **khách–chủ (client–server)**: **client** (trình duyệt) gửi **yêu cầu (request)**, **server** (máy chủ) trả **phản hồi (response)**. Hai bên giao tiếp theo một **giao thức** chung là **HTTP**.

## Một lượt truy cập, từng bước

1. Bạn gõ một **URL**, ví dụ `https://example.com/learning`.
2. Trình duyệt tra **DNS** để đổi tên miền thành địa chỉ IP.
3. Mở kết nối (thường được mã hoá bằng **TLS**, thành HTTPS).
4. Gửi request: `GET /learning HTTP/1.1` kèm các **header**.
5. Server trả response: mã trạng thái (`200 OK`, `404 Not Found`…), header và **thân (body)**, thường là HTML.
6. Trình duyệt đọc HTML, tải thêm CSS, JavaScript, ảnh, rồi hiển thị.

RFC 9110 (*HTTP Semantics*, 2022) quy định ý nghĩa của **phương thức** (`GET` lấy tài nguyên, `POST` gửi dữ liệu để xử lý, `PUT`, `DELETE`…) và **mã trạng thái** theo nhóm: 1xx thông tin, 2xx thành công, 3xx chuyển hướng, 4xx lỗi phía client, 5xx lỗi phía server.

## Ba ngôn ngữ của trình duyệt

Theo hướng dẫn MDN, ba công nghệ web tiêu chuẩn có ba vai trò khác nhau:

| Công nghệ | Vai trò |
|---|---|
| **HTML** | cấu trúc và nội dung |
| **CSS** | trình bày, bố cục |
| **JavaScript** | hành vi, tương tác |

## REST và API

Roy Fielding (luận án tiến sĩ, 2000, chương 5) mô tả phong cách kiến trúc **REST** rút ra từ chính kiến trúc của Web: tài nguyên được định danh bằng URL, thao tác qua một **giao diện thống nhất** (các phương thức HTTP), mỗi request tự mô tả đầy đủ (**phi trạng thái**, *stateless*). Một **API** theo phong cách này trả dữ liệu (thường là **JSON**) thay vì trang HTML, để ứng dụng khác dùng.

## Nguồn tham khảo

- Fielding, R., Nottingham, M., Reschke, J. (2022). *RFC 9110: HTTP Semantics*; *RFC 9112: HTTP/1.1*. IETF.
- Fielding, R. T. (2000). *Architectural Styles and the Design of Network-based Software Architectures*, chương 5. UC Irvine.
- MDN Web Docs, *Learn web development: Getting started* và *How the web works*.
- Berners-Lee et al. (1994). The World-Wide Web. *CACM* 37(8).

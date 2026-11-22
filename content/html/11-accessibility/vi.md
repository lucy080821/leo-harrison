# Truy cập (Accessibility) cơ bản

**Accessibility (a11y)** là làm cho web dùng được với **mọi người**: người khiếm thị dùng trình đọc màn hình, người chỉ dùng bàn phím, người mắt kém, người khiếm thính... Đây cũng là yêu cầu pháp lý ở nhiều nơi, và làm tốt a11y thường làm SEO tốt hơn.

## 1. Dùng đúng thẻ

Thẻ ngữ nghĩa đã mang sẵn khả năng truy cập:

- Nút bấm → `<button>` (có sẵn phím Tab, Enter, Space). **Đừng** dùng `<div onclick>`.
- Liên kết → `<a href>`.
- Tiêu đề → `<h1>`...`<h6>`, không dùng chữ to để giả tiêu đề.

![HTML ngữ nghĩa trở thành cây trợ năng cho trình đọc màn hình](/lessons/html/11-accessibility-fig-vi.svg)
*HTML ngữ nghĩa trở thành cây trợ năng cho trình đọc màn hình*

## 2. Văn bản thay thế cho ảnh

```html
<img src="chart.png" alt="Biểu đồ doanh thu tăng 20% so với năm ngoái" />
<img src="trangtri.svg" alt="" />   <!-- ảnh trang trí: alt rỗng -->
```

Mô tả **ý nghĩa** của ảnh chứ không phải "hình ảnh của...".

## 3. Nhãn cho ô nhập

Mọi `<input>` cần `<label>` (xem bài Biểu mẫu). Chỉ có `placeholder` là chưa đủ.

## 4. Thứ tự tiêu đề

Không nhảy cấp: `h1` → `h2` → `h3`, không đi thẳng từ `h1` đến `h4`. Người dùng trình đọc màn hình hay duyệt trang bằng danh sách tiêu đề.

## 5. ARIA khi cần

**ARIA** là thuộc tính bổ sung ý nghĩa khi thẻ HTML thường không đủ:

```html
<button type="button" aria-label="Đóng">×</button>   <!-- nút chỉ có biểu tượng -->
<nav aria-label="Menu chính">...</nav>               <!-- phân biệt nhiều <nav> -->
<div role="alert">Lưu thành công!</div>              <!-- đọc ngay khi xuất hiện -->
```

> Quy tắc số 1 của ARIA: **nếu có thẻ HTML đúng nghĩa thì dùng thẻ đó**, đừng thêm ARIA. ARIA sai còn tệ hơn không có.

## 6. Bàn phím, màu và ngôn ngữ

- Mọi thứ phải thao tác được bằng **bàn phím** (Tab, Enter) và nhìn rõ vòng focus.
- Độ tương phản chữ/nền tối thiểu **4.5:1** (chữ thường).
- Không dùng **chỉ màu sắc** để truyền thông tin (thêm chữ hoặc biểu tượng).
- Khai báo `<html lang="vi">`.
- Liên kết "Bỏ qua đến nội dung chính" ở đầu trang giúp người dùng bàn phím tránh lặp menu.

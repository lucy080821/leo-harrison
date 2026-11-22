# Cấu trúc dữ liệu

## Kiểu dữ liệu trừu tượng

Liskov và Zilles (1974) giới thiệu **kiểu dữ liệu trừu tượng (abstract data type, ADT)**: một kiểu được định nghĩa bằng *các thao tác* của nó, không phải cách lưu bên trong. Cùng một ADT có thể được cài đặt bằng nhiều **cấu trúc dữ liệu** khác nhau.

![Ngăn xếp (vào sau ra trước) và hàng đợi (vào trước ra trước)](/lessons/foundations/06-data-structures-stackq-vi.svg)
*Cùng là dãy phần tử nhưng khác quy tắc lấy ra.*

## Các cấu trúc cơ bản trong Python

| Cấu trúc | Đặc điểm | Dùng khi |
|---|---|---|
| `list` | dãy có thứ tự, khả biến | cần thứ tự, truy cập theo chỉ số |
| `tuple` | dãy có thứ tự, bất biến | nhóm cố định các giá trị |
| `dict` | ánh xạ khoá → giá trị | tra cứu theo tên/mã |
| `set` | tập hợp không trùng | kiểm tra thuộc về, loại trùng |

## Ngăn xếp và hàng đợi

- **Ngăn xếp (stack)**: vào sau, ra trước (LIFO). Ví dụ: nút Undo, ngăn xếp lời gọi hàm.
- **Hàng đợi (queue)**: vào trước, ra trước (FIFO). Ví dụ: hàng chờ in.

## Bảng băm (hash table)

`dict` và `set` của Python dựa trên **bảng băm**: dùng một **hàm băm** biến khoá thành chỉ số để tìm gần như tức thì, trung bình thời gian **O(1)** (hằng số), thay vì duyệt cả danh sách (O(n)). Vì vậy khoá của `dict` phải **băm được**, nghĩa là bất biến (số, chuỗi, tuple).

## Chọn cấu trúc là chọn hiệu năng

Câu hỏi "`x in danh_sach`" mất O(n); "`x in tap_hop`" trung bình O(1). Với dữ liệu lớn, chênh lệch rất đáng kể. Niklaus Wirth (1976) tóm tắt: *Algorithms + Data Structures = Programs*.

## Nguồn tham khảo

- Liskov, B. & Zilles, S. (1974). Programming with abstract data types. *ACM SIGPLAN Notices* 9(4).
- Wirth, N. (1976). *Algorithms + Data Structures = Programs*. Prentice-Hall.
- Python Software Foundation. *The Python Tutorial*, §5 "Data Structures", và tài liệu `collections.deque`.
- ACM/IEEE-CS/AAAI (2023). *Computer Science Curricula 2023*, lĩnh vực SDF (Software Development Fundamentals) và AL.

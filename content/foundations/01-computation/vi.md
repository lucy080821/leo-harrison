# Tính toán, thuật toán và chương trình

## Khái niệm

**Tính toán (computation)** là việc biến đổi thông tin theo những quy tắc xác định. **Thuật toán (algorithm)** là một dãy hữu hạn các bước rõ ràng để giải một lớp bài toán. Theo Knuth (*The Art of Computer Programming*, tập 1), một thuật toán có năm tính chất: **hữu hạn** (kết thúc sau số bước hữu hạn), **xác định** (mỗi bước được nêu chính xác, không mơ hồ), **có đầu vào**, **có đầu ra**, và **khả thi** (mỗi bước đủ đơn giản để thực hiện được).

**Chương trình (program)** là thuật toán được viết bằng một **ngôn ngữ lập trình** để máy thực thi.

> Hiểu đơn giản: công thức nấu ăn là thuật toán; cuốn sổ công thức viết bằng tiếng Việt là "chương trình" mà người đọc (máy) làm theo.

## Máy tính thực sự làm gì?

Năm 1936, Alan Turing mô tả một máy trừu tượng (nay gọi là **máy Turing**) và chứng minh nó có thể thực hiện bất kỳ phép tính nào mà một người làm theo quy tắc cơ học có thể làm. Luận đề Church–Turing phát biểu: mọi hàm "tính được một cách hiệu quả" đều tính được bằng máy Turing. Đây là **luận đề**, không phải định lý, vì "hiệu quả" là một khái niệm trực giác.

Mọi máy tính hiện đại, từ điện thoại đến siêu máy tính, đều làm cùng một việc cơ bản: **nhận đầu vào → xử lý theo chương trình → trả đầu ra**.

## Các tầng ngôn ngữ

| Tầng | Ví dụ | Ai đọc được |
|---|---|---|
| Mã máy | dãy bit `10110000 01100001` | CPU |
| Hợp ngữ | `MOV AL, 61h` | người, qua trình dịch |
| Ngôn ngữ bậc cao | Python, JavaScript | người |

Ngôn ngữ bậc cao được chuyển thành mã máy bằng **trình biên dịch (compiler)** (dịch toàn bộ trước khi chạy) hoặc **trình thông dịch (interpreter)** (đọc và thực thi từng phần khi chạy). Python và JavaScript thường được thông dịch (thực tế các bản cài đặt hiện đại pha trộn cả hai kỹ thuật).

## Hai thành phần của một ngôn ngữ

- **Cú pháp (syntax)**: quy tắc viết đúng hình thức. Sai cú pháp thì máy từ chối chạy.
- **Ngữ nghĩa (semantics)**: chương trình *có nghĩa gì* khi chạy. Đúng cú pháp vẫn có thể sai ngữ nghĩa (chạy được nhưng cho kết quả sai).

## Thử ngay

Hàm `average` bên phải nhận một danh sách (đầu vào), cộng dồn (xử lý) và trả về trung bình (đầu ra). Hãy đổi danh sách và chạy lại.

## Nguồn tham khảo

- Knuth, D. E. *The Art of Computer Programming, Vol. 1* (mục 1.1 "Algorithms").
- Turing, A. M. (1936). On Computable Numbers, with an Application to the Entscheidungsproblem. *Proc. London Math. Soc.* s2-42.
- MIT 6.0001 *Introduction to Computer Science and Programming in Python* (OCW), bài 1 "What is Computation?".
- Harvard CS50, tuần 0 (chương trình giảng dạy mở).

# Kiểm thử, gỡ lỗi và kỹ nghệ phần mềm

## Ba loại lỗi

1. **Lỗi cú pháp (syntax error)**: sai hình thức, máy từ chối chạy.
2. **Lỗi thời gian chạy (runtime error / exception)**: chạy rồi mới gặp sự cố, ví dụ chia cho 0, chỉ số ngoài danh sách.
3. **Lỗi ngữ nghĩa/lô-gic (logic error)**: chạy bình thường nhưng kết quả sai. Đây là loại khó nhất vì không có thông báo lỗi.

Từ "bug" được gắn với sự cố máy tính Harvard Mark II năm 1947 (một con bướm đêm thật kẹt trong rơ-le), nhưng cách dùng "bug" cho lỗi kỹ thuật còn có từ trước đó.

## Kiểm thử

Dijkstra viết: *kiểm thử chỉ cho thấy sự hiện diện của lỗi, không chứng minh sự vắng mặt của chúng*. Dù vậy, kiểm thử là công cụ thực tế quan trọng nhất.

- **Assert**: khẳng định một điều phải đúng; sai thì chương trình dừng ngay.
- **Kiểm thử đơn vị (unit test)**: kiểm tra từng hàm nhỏ với đầu vào cụ thể.
- Nên thử **trường hợp biên**: danh sách rỗng, số 0, số âm, giá trị lớn nhất.

## Gỡ lỗi có hệ thống

Theo Andreas Zeller (*Why Programs Fail*) và các giáo trình, quy trình khoa học:

1. **Tái hiện** lỗi ổn định.
2. **Đặt giả thuyết** về nguyên nhân.
3. **Thử nghiệm** (in giá trị, dùng trình gỡ lỗi) để kiểm chứng.
4. **Sửa** rồi viết kiểm thử để lỗi không quay lại.

Mẹo thực tế: thu hẹp phạm vi (chia đôi mã), đọc kỹ thông báo lỗi, giải thích code cho "con vịt cao su".

## Kỹ nghệ phần mềm

CS2023 xếp **Software Engineering** thành một lĩnh vực riêng: ngoài viết đúng, ta cần code **dễ đọc**, có **kiểm thử**, có **kiểm soát phiên bản** (Git) và làm việc nhóm.

## Nguồn tham khảo

- Zeller, A. *Why Programs Fail: A Guide to Systematic Debugging*. Morgan Kaufmann.
- Dijkstra, E. W. (1970). *Notes on Structured Programming* (EWD249).
- McConnell, S. *Code Complete* (2nd ed.).
- ACM/IEEE-CS/AAAI (2023). *CS2023*, lĩnh vực SE (Software Engineering).
- Python docs: `assert` statement, module `unittest`.

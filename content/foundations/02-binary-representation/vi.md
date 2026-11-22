# Nhị phân và biểu diễn dữ liệu

## Bit và byte

Máy tính lưu mọi thứ bằng các linh kiện có hai trạng thái ổn định. Ta ghi hai trạng thái đó là `0` và `1`. Một **bit** (*binary digit*) là một chữ số nhị phân; một **byte** là nhóm 8 bit, biểu diễn được 2⁸ = 256 giá trị (0–255). Thuật ngữ *bit* do Claude Shannon dùng trong bài báo năm 1948 về lý thuyết thông tin.

## Hệ nhị phân (cơ số 2)

Hệ thập phân dùng 10 chữ số, mỗi vị trí có giá trị là luỹ thừa của **10**. Hệ nhị phân dùng 2 chữ số, mỗi vị trí là luỹ thừa của **2**:

`1101₂ = 1·2³ + 1·2² + 0·2¹ + 1·2⁰ = 8 + 4 + 0 + 1 = 13`

Tổng quát, với n bit không dấu ta biểu diễn được 2ⁿ giá trị, từ 0 đến 2ⁿ − 1. Với 8 bit, giá trị lớn nhất là `11111111₂ = 255`.

## Biểu diễn văn bản

Chữ cái cũng chỉ là số, theo một **bảng mã**:

- **ASCII** (1963, 7 bit, 128 ký tự): `A = 65`, `a = 97`, `0` = 48.
- **Unicode**: bảng mã chung gán cho mỗi ký tự trên thế giới một **điểm mã** (code point), ví dụ `é` là U+00E9. Unicode không nói ký tự lưu thành byte thế nào; việc đó do **bảng mã hoá** quyết định.
- **UTF-8**: cách mã hoá Unicode thành 1–4 byte, tương thích ngược với ASCII (ký tự ASCII chỉ dùng 1 byte). Chữ có dấu tiếng Việt thường dùng 2 hoặc 3 byte.

> Điều này giải thích vì sao một văn bản tiếng Việt và một văn bản tiếng Anh cùng số ký tự có thể có dung lượng khác nhau.

## Số thực và giới hạn

Số nguyên có thể chính xác, nhưng số thực được lưu theo chuẩn dấu phẩy động **IEEE 754** nên đa phần chỉ là xấp xỉ. Ví dụ `0.1 + 0.2` trong Python cho `0.30000000000000004`, vì 0.1 không có biểu diễn nhị phân hữu hạn (giống 1/3 không có biểu diễn thập phân hữu hạn).

## Nguồn tham khảo

- Shannon, C. E. (1948). A Mathematical Theory of Communication. *Bell System Technical Journal* 27.
- Harvard CS50, tuần 0: nhị phân, ASCII, Unicode.
- Unicode Consortium. *The Unicode Standard* và RFC 3629 (UTF-8).
- IEEE 754-2019. *Standard for Floating-Point Arithmetic*.
- Goldberg, D. (1991). What Every Computer Scientist Should Know About Floating-Point Arithmetic. *ACM Computing Surveys* 23(1).

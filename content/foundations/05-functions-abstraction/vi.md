# Hàm, trừu tượng hoá và phạm vi

## Vì sao cần hàm?

Hàm là công cụ chính của **trừu tượng hoá (abstraction)**: đặt tên cho một đoạn xử lý để dùng mà không cần nhớ chi tiết bên trong. Hai ý quan trọng (theo sách *Structure and Interpretation of Computer Programs*, Abelson & Sussman):

- **Phân rã (decomposition)**: chia bài toán lớn thành các bài toán con.
- **Trừu tượng (abstraction)**: che giấu chi tiết; người dùng hàm chỉ cần biết *nó làm gì* (hợp đồng), không cần biết *làm thế nào*.

![Ngăn xếp lời gọi của factorial(3)](/lessons/foundations/05-functions-abstraction-stack-vi.svg)
*Mỗi lần gọi thêm một khung lên đỉnh; khi trả về thì khung bị gỡ.*

## Thuật ngữ

- **Tham số (parameter)**: tên trong định nghĩa hàm (`w`, `h`).
- **Đối số (argument)**: giá trị truyền vào khi gọi (`3`, `4`).
- **Giá trị trả về**: kết quả đưa ra bằng `return`. Hàm không `return` thì trả `None`.

## Phạm vi (scope)

Phạm vi quyết định tên nào nhìn thấy được ở đâu. Python dùng quy tắc **LEGB**: Local → Enclosing → Global → Built-in. Biến gán trong hàm là **cục bộ**: nó chỉ tồn tại trong lần gọi đó và không ảnh hưởng tên cùng chữ ở ngoài. Tài liệu Python gọi đây là *naming and binding*.

## Ngăn xếp lời gọi (call stack)

Mỗi lần gọi hàm, máy tạo một **khung (frame)** chứa biến cục bộ và vị trí quay về. Khung được xếp chồng lên nhau và gỡ ra khi hàm trả về. Đây là cơ sở để hiểu *đệ quy* ở bài sau.

## Hàm là giá trị hạng nhất

Trong Python, hàm cũng là đối tượng: gán cho biến, truyền làm đối số, hoặc trả về từ hàm khác. Đây là nền tảng của lập trình hàm.

## Nguồn tham khảo

- Abelson, H. & Sussman, G. J. *Structure and Interpretation of Computer Programs* (MIT Press), chương 1.
- Python Software Foundation. *The Python Language Reference*, §4 "Execution model".
- MIT 6.0001, bài 4 "Decomposition, Abstraction, and Functions".

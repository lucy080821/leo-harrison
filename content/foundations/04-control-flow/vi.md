# Biểu thức, điều kiện và vòng lặp

## Biểu thức và câu lệnh

- **Biểu thức (expression)** *có giá trị*: `3 + 4`, `x > 3`, `len("abc")`.
- **Câu lệnh (statement)** *làm một việc*: `x = 5`, `print(x)`, `if ...`, `for ...`.

## Logic Boolean

George Boole (1854) xây dựng đại số của hai giá trị chân lý. Ba phép cơ bản là `and`, `or`, `not`, và chúng được định nghĩa bằng **bảng chân trị**:

| A | B | A and B | A or B |
|---|---|---|---|
| T | T | T | T |
| T | F | F | T |
| F | T | F | T |
| F | F | F | F |

Python **đánh giá tắt (short-circuit)**: `A and B` không tính B nếu A đã sai.

## Ba cấu trúc điều khiển

Năm 1966, Böhm và Jacopini chứng minh (**định lý chương trình có cấu trúc**) rằng mọi thuật toán tính được đều có thể biểu diễn chỉ bằng ba cấu trúc:

1. **Tuần tự**: làm bước 1 rồi bước 2.
2. **Rẽ nhánh**: `if / elif / else`.
3. **Lặp**: `for`, `while`.

Dijkstra (1968) trong thư "Go To Statement Considered Harmful" lập luận nên dùng các cấu trúc này thay cho nhảy tự do `goto`.

## Bất biến vòng lặp (loop invariant)

Khi viết vòng lặp, hãy hỏi: *điều gì luôn đúng sau mỗi lượt?* Ví dụ cộng 1..n: sau lượt thứ i, `total` bằng 1+2+…+i. Nếu bất biến đúng lúc bắt đầu, được giữ qua mỗi lượt, và khi dừng ta có kết quả mong muốn, vòng lặp đúng. Đây là công cụ cơ bản để chứng minh tính đúng đắn của chương trình (Hoare, 1969; Floyd, 1967).

## Nguồn tham khảo

- Boole, G. (1854). *An Investigation of the Laws of Thought*.
- Böhm, C. & Jacopini, G. (1966). Flow diagrams, Turing machines and languages with only two formation rules. *CACM* 9(5).
- Dijkstra, E. W. (1968). Go To Statement Considered Harmful. *CACM* 11(3).
- Hoare, C. A. R. (1969). An axiomatic basis for computer programming. *CACM* 12(10).
- MIT 6.0001, bài 2 và bài 3.

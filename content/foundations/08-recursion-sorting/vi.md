# Đệ quy và sắp xếp

## Đệ quy

**Đệ quy (recursion)** là khi một hàm tự gọi chính nó để giải một bài toán nhỏ hơn cùng dạng. Mọi hàm đệ quy cần hai phần:

1. **Trường hợp cơ sở (base case)**: đủ nhỏ để trả lời thẳng, giúp việc gọi dừng lại.
2. **Bước đệ quy (recursive step)**: đưa bài toán về một bài toán *nhỏ hơn* rồi gọi lại.

Ví dụ giai thừa: n! = n · (n−1)!, với 0! = 1. Thiếu trường hợp cơ sở, hàm gọi mãi cho đến khi **ngăn xếp lời gọi** tràn (Python báo `RecursionError`).

> Cách nghĩ: tin rằng lời gọi nhỏ hơn đã đúng (giả thiết quy nạp), rồi chỉ cần chứng minh bước hiện tại đúng. Đây chính là **quy nạp toán học** chuyển thành code.

![Cây chia và trộn của sắp xếp trộn trên [5, 2, 9, 1]](/lessons/foundations/08-recursion-sorting-msort-vi.svg)
*Chia đôi đệ quy đến khi còn 1 phần tử, rồi trộn ngược lên.*

## Sắp xếp

Sắp xếp là bài toán kinh điển để so sánh thuật toán:

- **Sắp xếp chọn (selection sort)**: mỗi lượt chọn phần tử nhỏ nhất của phần còn lại, đặt vào đúng chỗ. Độ phức tạp **O(n²)**.
- **Sắp xếp trộn (merge sort)** (John von Neumann, 1945): chia đôi, sắp xếp từng nửa đệ quy, rồi **trộn** hai nửa đã sắp. Độ phức tạp **O(n log n)**, là ví dụ điển hình của chiến lược **chia để trị (divide and conquer)**.

Với dữ liệu lớn, O(n log n) nhanh hơn rất nhiều: n = 1.000.000, n² là 10¹² nhưng n log₂ n chỉ cỡ 2·10⁷.

## Cảnh báo về hiệu năng đệ quy

`fib(n) = fib(n−1) + fib(n−2)` viết đệ quy trực tiếp tính lặp lại rất nhiều bài toán con (thời gian mũ). Giải pháp là **ghi nhớ (memoization)** hoặc **quy hoạch động**; ta sẽ gặp lại khi học thuật toán nâng cao.

## Nguồn tham khảo

- Abelson & Sussman, *SICP*, mục 1.2 (xử lý đệ quy và lặp).
- Cormen et al., *Introduction to Algorithms*, chương 2 (merge sort) và chương 4 (chia để trị).
- Knuth, *TAOCP* Vol. 3 "Sorting and Searching".
- Harvard CS50, tuần 3 (sắp xếp, đệ quy); MIT 6.0001, bài "Recursion" và "Searching and Sorting".

# Thuật toán và độ phức tạp

## Đánh giá một thuật toán

Một thuật toán *đúng* thôi chưa đủ; ta còn hỏi nó **tốn bao nhiêu tài nguyên** (thời gian, bộ nhớ) khi dữ liệu lớn dần. **Phân tích thuật toán** (Knuth) đếm số bước theo cỡ đầu vào n, bỏ qua hằng số phụ thuộc máy.

![Đường tăng của các lớp độ phức tạp thường gặp](/lessons/foundations/07-algorithms-complexity-bigo-vi.svg)
*n lớn dần thì O(n²) tăng vọt, O(log n) gần như phẳng.*

## Ký hiệu Big-O

**O(f(n))** là *cận trên tiệm cận*: thời gian tăng không nhanh hơn f(n) (nhân một hằng số) khi n đủ lớn. Các lớp thường gặp, từ nhanh đến chậm:

| Lớp | Tên | Ví dụ |
|---|---|---|
| O(1) | hằng số | truy cập `a[i]`, tra `dict` |
| O(log n) | logarit | tìm kiếm nhị phân |
| O(n) | tuyến tính | tìm kiếm tuyến tính |
| O(n log n) | | sắp xếp trộn (merge sort) |
| O(n²) | bình phương | sắp xếp chọn, hai vòng lặp lồng nhau |
| O(2ⁿ) | mũ | thử mọi tập con |

## Ví dụ: tìm trong danh bạ

CS50 minh hoạ bằng cuốn danh bạ điện thoại: dò từng trang là **tuyến tính** (O(n)); mở giữa rồi bỏ một nửa là **nhị phân** (O(log n)). Với 1.000.000 phần tử, tuyến tính tới ~1.000.000 bước, nhị phân khoảng 20 bước (log₂ 10⁶ ≈ 20). Điều kiện: dữ liệu phải **đã sắp xếp**.

## Đừng nhầm

- Big-O mô tả cách chi phí *tăng*, không phải thời gian tuyệt đối. Với n nhỏ, thuật toán O(n²) đơn giản có thể nhanh hơn.
- Thường nói về **trường hợp xấu nhất**; có thể phân tích thêm trường hợp trung bình.

## Nguồn tham khảo

- Cormen, Leiserson, Rivest, Stein. *Introduction to Algorithms* (CLRS), chương 2–3.
- Knuth, D. E. *The Art of Computer Programming*, Vol. 1 §1.2.
- Harvard CS50, tuần 0 (thuật toán, Big-O) và tuần 3.
- MIT 6.0001, bài "Searching and Sorting" và "Algorithmic Complexity".
- ACM/IEEE-CS/AAAI (2023). *CS2023*, lĩnh vực AL (Algorithmic Foundations).

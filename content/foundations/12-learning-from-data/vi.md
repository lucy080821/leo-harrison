# Học từ dữ liệu: ý tưởng nền của Machine Learning

## Hai cách tạo chương trình

- **Lập trình truyền thống**: con người viết **quy tắc** → máy nhận quy tắc + dữ liệu → ra đáp án.
- **Học máy (machine learning)**: con người đưa **dữ liệu + đáp án** → máy **tìm ra quy tắc** (gọi là **mô hình**) → dùng quy tắc đó cho dữ liệu mới.

Tom Mitchell (*Machine Learning*, 1997) định nghĩa: một chương trình *học* từ kinh nghiệm E đối với một lớp nhiệm vụ T và thước đo hiệu năng P, nếu hiệu năng của nó trên T, đo bằng P, **cải thiện** nhờ kinh nghiệm E.

> Ví dụ lọc thư rác: T là phân loại thư; E là hàng nghìn thư đã gắn nhãn; P là tỷ lệ phân loại đúng.

![So sánh lập trình truyền thống với học máy](/lessons/foundations/12-learning-from-data-ml-vi.svg)
*Học máy đảo chiều: đưa dữ liệu và đáp án để máy tìm ra quy tắc.*

## Các thành phần

1. **Dữ liệu**: các cặp (đầu vào x, đầu ra mong muốn y).
2. **Mô hình**: một hàm có **tham số** cần học, ví dụ ŷ = w·x.
3. **Hàm mất mát (loss)**: đo mô hình sai bao nhiêu, ví dụ **sai số bình phương trung bình (MSE)**: (1/n) Σ (ŷ − y)².
4. **Thuật toán tối ưu**: chỉnh tham số để giảm mất mát, phổ biến nhất là **gradient descent**: w ← w − η · ∂L/∂w, với η là tốc độ học.

Vòng lặp: dự đoán → đo sai số → chỉnh tham số → lặp lại.

## Phân loại cơ bản

- **Học có giám sát** (supervised): có nhãn y (hồi quy, phân loại).
- **Học không giám sát** (unsupervised): không nhãn (gom cụm).
- **Học tăng cường** (reinforcement): học qua phần thưởng khi tương tác.

## Khái quát hoá và quá khớp

Mục tiêu không phải thuộc lòng dữ liệu huấn luyện mà **khái quát hoá** sang dữ liệu chưa thấy. Mô hình quá phức tạp có thể **quá khớp (overfitting)**: tốt trên dữ liệu học, kém trên dữ liệu mới. Vì vậy ta chia dữ liệu thành tập huấn luyện và tập kiểm tra.

## Đi tiếp

Các khoá **Toán cho ML**, **Machine Learning**, **Deep Learning** tiếp tục từ ý tưởng này. Backpropagation (Rumelhart, Hinton, Williams, 1986) và Transformer (Vaswani và cs., 2017) là hai mốc quan trọng của hướng học sâu.

## Nguồn tham khảo

- Mitchell, T. M. (1997). *Machine Learning*. McGraw-Hill.
- Hastie, Tibshirani, Friedman. *The Elements of Statistical Learning*.
- Rumelhart, Hinton, Williams (1986). Learning representations by back-propagating errors. *Nature* 323, 533–536.
- Vaswani et al. (2017). Attention Is All You Need. *NeurIPS*.
- Goodfellow, Bengio, Courville. *Deep Learning* (MIT Press).

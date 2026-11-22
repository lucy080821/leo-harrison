# Giới hạn và đạo hàm

## Vấn đề: tốc độ tại một khoảnh khắc

Xe đi 100 km trong 2 giờ có tốc độ **trung bình** 50 km/h. Nhưng đồng hồ tốc độ hiện **tức thời** tại từng giây. Làm sao định nghĩa tốc độ tại *một* thời điểm khi khoảng thời gian bằng 0? Newton và Leibniz (thế kỷ 17) tìm ra phép tính vi phân để trả lời.

## Giới hạn

**Giới hạn** `lim_{h→0} g(h) = L` nghĩa là g(h) có thể gần L tuỳ ý khi h đủ gần 0 (mà không cần h = 0). Định nghĩa chặt chẽ bằng ε–δ do Cauchy và Weierstrass hoàn thiện ở thế kỷ 19.

## Đạo hàm

**Đạo hàm** của f tại x là giới hạn của *độ dốc đường cát tuyến*:

`f′(x) = lim_{h→0} [f(x + h) − f(x)] / h`

Về hình học, là **độ dốc của tiếp tuyến**; về vật lý, là **tốc độ thay đổi tức thời**. Nếu s(t) là quãng đường thì s′(t) là vận tốc.

![Đường cong y = x² với cát tuyến thu dần về tiếp tuyến tại x = 3](/lessons/prob-stats/12-derivatives-tangent-vi.svg)
*Khi h → 0, độ dốc cát tuyến tiến tới độ dốc tiếp tuyến = f′(3) = 6.*

## Các quy tắc cần nhớ

| Hàm | Đạo hàm |
|---|---|
| hằng số c | 0 |
| xⁿ | n·xⁿ⁻¹ |
| eˣ | eˣ |
| ln x | 1/x |
| sin x, cos x | cos x, −sin x |
| f + g | f′ + g′ |
| c·f | c·f′ |
| f·g | f′g + fg′ (quy tắc tích) |
| f(g(x)) | f′(g(x))·g′(x) (quy tắc chuỗi) |

Ví dụ: s(t) = t² thì s′(t) = 2t; tại t = 3, vận tốc = 6 m/s, đúng với số liệu máy tính tiến dần tới 6 khi h → 0.

## Ví dụ thực tế

- **Kinh tế**: *chi phí biên* là đạo hàm của tổng chi phí theo sản lượng.
- **Y học**: tốc độ thuốc được đào thải khỏi máu là đạo hàm của nồng độ theo thời gian.
- **Machine Learning**: đạo hàm cho biết nên chỉnh tham số theo hướng nào để giảm sai số (bài sau).

## Nguồn tham khảo

- Stewart, J. *Calculus* (Cengage), chương 2 (Limits and derivatives).
- MIT OCW 18.01 *Single Variable Calculus* (Jerison), bài về đạo hàm và quy tắc chuỗi.
- Khan Academy, *Differential Calculus*.
- Strang, G. *Calculus* (MIT OpenCourseWare).

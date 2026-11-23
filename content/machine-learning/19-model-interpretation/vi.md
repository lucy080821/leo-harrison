# Giải thích mô hình: permutation importance và partial dependence

Sếp, bác sĩ, cơ quan quản lý hỏi: *"Vì sao mô hình quyết định vậy?"* Mô hình hộp đen mạnh nhưng **không giải thích được** là rào cản triển khai (và đôi khi là yêu cầu pháp lý).

## Các mức giải thích

| Cấp | Câu hỏi | Công cụ |
|---|---|---|
| **Toàn cục** | Đặc trưng nào quan trọng nhất? | hệ số, importance của cây, **permutation importance** |
| **Toàn cục** | Đặc trưng ảnh hưởng *thế nào*? | **partial dependence (PDP)**, ICE |
| **Cục bộ** | Vì sao dự đoán *ca này* như vậy? | SHAP, LIME |

![Permutation importance: xáo một đặc trưng và đo hiệu năng giảm bao nhiêu](/lessons/machine-learning/19-model-interpretation-fig-vi.svg)
*Permutation importance: xáo một đặc trưng và đo hiệu năng giảm bao nhiêu*

## Permutation importance

1. Đo điểm gốc trên **tập kiểm tra**.
2. **Xáo trộn một cột** (cắt liên hệ với nhãn), đo điểm lại.
3. Điểm **giảm bao nhiêu** = tầm quan trọng của cột đó. Lặp nhiều lần để có độ lệch.

Ưu điểm: dùng được cho **mọi mô hình**, đo hiệu năng thật chứ không phải cấu trúc nội bộ. Importance dựa trên cây thiên lệch về đặc trưng liên tục/nhiều giá trị và tính trên tập huấn luyện.

## Partial dependence

Thay đổi một đặc trưng trên lưới, giữ nguyên các đặc trưng khác (lấy trung bình), vẽ dự đoán trung bình. Cho thấy hình dạng ảnh hưởng: tuyến tính, bão hoà, có ngưỡng. `PartialDependenceDisplay.from_estimator`.

## Giới hạn quan trọng

- **Đặc trưng tương quan**: xáo trộn một cột tạo ra điểm dữ liệu phi thực tế, importance bị chia/chiếm lẫn nhau.
- **Importance ≠ nhân quả**: đặc trưng quan trọng với *dự đoán* chưa chắc là nguyên nhân.
- Giải thích có thể **bất ổn** với mô hình/mẫu khác: kiểm tra qua nhiều lần chạy.
- Nếu cần giải thích tuyệt đối, **mô hình đơn giản** (hồi quy, cây nông) thường là lựa chọn tốt (Rudin, 2019).

## Nguồn tham khảo

- Breiman, L. (2001). Random forests. *Machine Learning* 45.
- Molnar, C. *Interpretable Machine Learning* (miễn phí online).
- Rudin, C. (2019). Stop explaining black box models for high stakes decisions. *Nature Machine Intelligence* 1.
- scikit-learn User Guide, "Inspection".

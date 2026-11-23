# Học chuyển giao: đặc trưng đóng băng và tinh chỉnh

Huấn luyện mạng sâu từ đầu cần **hàng triệu ảnh** và nhiều GPU. Phần lớn dự án thực tế không có thế. **Học chuyển giao** tái sử dụng mô hình đã huấn luyện sẵn trên tập lớn (ImageNet, kho văn bản khổng lồ) cho bài toán của bạn với **ít dữ liệu**.

## Vì sao hiệu quả

Các tầng đầu học đặc trưng **chung** (cạnh, kết cấu, cú pháp), chỉ các tầng cuối học đặc trưng **riêng của tác vụ**. Đặc trưng chung dùng lại được hầu như ở mọi nơi (Yosinski et al., 2014).

![Đóng băng phần trích đặc trưng và chỉ huấn luyện đầu phân loại mới](/lessons/deep-learning/19-transfer-learning-fig-vi.svg)
*Đóng băng phần trích đặc trưng và chỉ huấn luyện đầu phân loại mới*

## Hai chiến lược

| Chiến lược | Làm gì | Khi nào |
|---|---|---|
| **Trích đặc trưng / linear probe** | **đóng băng** mạng gốc, chỉ huấn luyện đầu phân loại mới | dữ liệu **rất ít**, tác vụ giống nguồn |
| **Tinh chỉnh (fine-tune)** | mở khoá một phần/toàn bộ tầng, huấn luyện với **LR nhỏ** | dữ liệu vừa, tác vụ hơi khác nguồn |

Tiết kiệm tính toán: linear probe chỉ huấn luyện vài trăm đến vài nghìn tham số.

## Công thức thực hành

1. Chọn mô hình tiền huấn luyện phù hợp (ResNet/EfficientNet/ViT cho ảnh; BERT/LLM cho văn bản).
2. Thay đầu phân loại cuối bằng đầu mới đúng số lớp.
3. **Đóng băng** thân, huấn luyện đầu vài epoch.
4. **Mở khoá** dần, hạ LR (ví dụ `1e-5` cho thân, `1e-3` cho đầu: **LR phân biệt theo tầng**).
5. **Tăng cường dữ liệu**, dừng sớm, giữ BatchNorm ở chế độ phù hợp.

## Cạm bẫy

- **Chuẩn hoá đầu vào** phải đúng như mô hình gốc (mean/std ImageNet).
- Lệch miền lớn (ảnh y khoa vs ảnh đời thường) thì cần tinh chỉnh sâu hơn.
- **LR quá lớn** khi tinh chỉnh sẽ *quên thảm khốc* (catastrophic forgetting) đặc trưng tốt.
- Kiểm tra **giấy phép** mô hình và dữ liệu tiền huấn luyện.

## Với LLM

Cùng nguyên lý: tinh chỉnh toàn phần tốn kém nên dùng **PEFT/LoRA** (chỉ huấn luyện ma trận hạng thấp bổ sung), hoặc không tinh chỉnh mà dùng prompt/RAG. Xem khoá "AI hiện đại".

## Nguồn tham khảo

- Yosinski, Clune, Bengio, Lipson (2014). How transferable are features in deep neural networks? *NeurIPS*.
- Howard & Ruder (2018). Universal language model fine-tuning (ULMFiT). *ACL*.
- Hu et al. (2022). LoRA: low-rank adaptation of large language models. *ICLR*.

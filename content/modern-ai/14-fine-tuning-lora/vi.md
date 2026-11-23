# Tinh chỉnh mô hình: SFT, LoRA và khi nào nên dùng

**Trước khi tinh chỉnh**, hãy tự hỏi: có thực sự cần không? Phần lớn vấn đề giải quyết được bằng prompt tốt hoặc RAG, rẻ và dễ lặp hơn nhiều.

## Prompt, RAG hay tinh chỉnh?

| Nhu cầu | Giải pháp đầu tiên |
|---|---|
| Hướng dẫn, định dạng, vai trò | **prompt** (+ ví dụ few-shot) |
| Kiến thức riêng, thay đổi, cần trích nguồn | **RAG** |
| **Phong cách/giọng văn**, tác vụ hẹp lặp lại, tuân thủ định dạng khó | **tinh chỉnh** |
| Giảm chi phí/độ trễ (dùng mô hình nhỏ làm việc của mô hình lớn) | tinh chỉnh/chưng cất |
| Dạy kiến thức mới | RAG, **không phải** tinh chỉnh (tinh chỉnh kém ghi nhớ sự kiện) |

![LoRA thêm ma trận hạng thấp thay vì cập nhật toàn bộ trọng số](/lessons/modern-ai/14-fine-tuning-lora-fig-vi.svg)
*LoRA thêm ma trận hạng thấp thay vì cập nhật toàn bộ trọng số*

## SFT: tinh chỉnh có giám sát

Huấn luyện tiếp mô hình trên cặp **(chỉ dẫn, phản hồi mong muốn)** bằng cùng mục tiêu dự đoán token kế tiếp. **Chất lượng dữ liệu quan trọng hơn số lượng**: vài trăm đến vài nghìn ví dụ sạch thường đủ (Zhou et al., 2023, LIMA).

## LoRA: tinh chỉnh tiết kiệm tham số

Tinh chỉnh toàn bộ hàng tỷ tham số tốn GPU và bộ nhớ. **LoRA** (Hu et al., 2022) **đóng băng** `W` và học cập nhật hạng thấp:

`W' = W + (α/r) · B · A`, với `A ∈ ℝ^{r×d_in}`, `B ∈ ℝ^{d_out×r}`, `r ≪ d`.

- Chỉ **~0,1–1%** tham số cần huấn luyện; bộ chỉnh (adapter) vài chục MB, **dễ hoán đổi** theo tác vụ.
- `B` khởi tạo 0 nên bắt đầu **đúng bằng mô hình gốc**.
- **QLoRA** kết hợp mô hình gốc lượng tử hoá 4-bit để tinh chỉnh mô hình lớn trên một GPU.
- Chọn `r` (4–64) và các ma trận áp dụng (thường `q_proj`, `v_proj`).

## Quy trình

1. Xây **bộ eval** trước (bài 10) để biết có cải thiện không.
2. Thu thập và **làm sạch dữ liệu**; tách tập kiểm tra.
3. Thử prompt/RAG làm **baseline**.
4. Tinh chỉnh, so sánh với baseline trên eval; kiểm tra **quên kiến thức chung**.

## Rủi ro

- **Quên thảm khốc**: giảm năng lực chung nếu quá tay.
- Dữ liệu có **thiên lệch/thông tin nhạy cảm** sẽ bị mô hình học và có thể tái hiện.
- **Chi phí duy trì**: mỗi lần mô hình gốc nâng cấp phải tinh chỉnh lại.

## Nguồn tham khảo

- Hu et al. (2022). LoRA: low-rank adaptation of large language models. *ICLR*.
- Dettmers et al. (2023). QLoRA: efficient finetuning of quantized LLMs. *NeurIPS*.
- Zhou et al. (2023). LIMA: less is more for alignment. *NeurIPS*.
- Ouyang et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS*.

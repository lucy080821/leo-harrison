# Căn chỉnh mô hình: RLHF, mô hình thưởng Bradley–Terry và DPO

Mô hình ngôn ngữ tiền huấn luyện chỉ biết *dự đoán token kế tiếp*; nó không biết thế nào là câu trả lời **hữu ích, trung thực, vô hại**. **Căn chỉnh (alignment)** dạy điều đó bằng **sở thích của con người**.

## Quy trình RLHF cổ điển

1. **SFT**: tinh chỉnh trên ví dụ trả lời tốt.
2. **Thu thập sở thích**: với cùng một câu hỏi, mô hình sinh 2+ đáp án, người chọn đáp án tốt hơn.
3. **Mô hình thưởng**: học dự đoán điểm `r(x, y)` từ các cặp ưa thích.
4. **Tối ưu bằng RL** (PPO): cập nhật mô hình để **tăng thưởng**, kèm phạt **KL** để không lệch quá xa mô hình SFT.

![Mô hình thưởng học xếp hạng từ cặp ưa thích của con người](/lessons/modern-ai/15-rlhf-preference-fig-vi.svg)
*Mô hình thưởng học xếp hạng từ cặp ưa thích của con người*

## Mô hình Bradley–Terry

Xác suất người chọn A hơn B: `P(A ≻ B) = σ(r_A − r_B)`. Huấn luyện bằng cực đại hợp lý: `L = −log σ(r_chosen − r_rejected)`. Chỉ **hiệu số** điểm quan trọng; mô hình học *xếp hạng*, không phải điểm tuyệt đối.

## Vì sao cần phạt KL

Tối đa hoá thưởng thuần tuý dẫn đến **reward hacking**: mô hình khai thác kẽ hở của mô hình thưởng (ví dụ câu trả lời dài, nịnh nọt) thay vì thật sự tốt hơn. Phạt KL giữ mô hình gần bản SFT.

## DPO: bỏ qua mô hình thưởng và RL

**Direct Preference Optimization** (Rafailov et al., 2023) chứng minh có thể tối ưu trực tiếp trên cặp ưa thích bằng một mất mát phân loại đơn giản, tương đương RLHF với ràng buộc KL nhưng **ổn định và rẻ hơn**. Nhiều biến thể: IPO, KTO, ORPO. **RLAIF/Constitutional AI** dùng AI (theo một bộ nguyên tắc) tạo nhãn ưa thích thay một phần con người (Bai et al., 2022).

## Hạn chế

- **Nhãn con người nhiễu, không nhất quán, thiên lệch** văn hoá/nhóm người gán nhãn.
- Mô hình **nịnh** (sycophancy): chiều theo ý người dùng thay vì nói đúng.
- Căn chỉnh **không đảm bảo an toàn tuyệt đối**; cần thêm kiểm thử đối kháng (red teaming) và giám sát khi triển khai.

## Nguồn tham khảo

- Christiano et al. (2017). Deep reinforcement learning from human preferences. *NeurIPS*.
- Ouyang et al. (2022). Training language models to follow instructions with human feedback. *NeurIPS*.
- Rafailov et al. (2023). Direct preference optimization. *NeurIPS*.
- Bai et al. (2022). Constitutional AI: harmlessness from AI feedback. *arXiv:2212.08073*.

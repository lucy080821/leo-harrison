# Đánh giá LLM: exact match, F1, pass@k và LLM-as-judge

*"Không đo được thì không cải thiện được."* Ứng dụng LLM thường dừng ở "demo trông ổn". Sản phẩm thật cần **bộ đánh giá (eval)** để biết thay đổi prompt/mô hình là **tốt lên hay tệ đi**.

## Vì sao đánh giá LLM khó

Đầu ra là **văn bản tự do**, nhiều cách diễn đạt đúng; mô hình **không tất định**; và dễ **bị đo thiên lệch** bởi vài ví dụ đẹp.

![Bộ đánh giá nhỏ nhưng có hệ thống tốt hơn cảm giác](/lessons/modern-ai/10-llm-evaluation-fig-vi.svg)
*Bộ đánh giá nhỏ nhưng có hệ thống tốt hơn cảm giác*

## Các nhóm chỉ số

| Loại | Chỉ số | Dùng cho |
|---|---|---|
| **So khớp** | Exact Match, F1 mức token | hỏi đáp có đáp án ngắn, trích xuất |
| **Thực thi** | **pass@k**, kiểm thử đơn vị | sinh mã, SQL |
| **Tham chiếu** | ROUGE, BLEU, BERTScore | tóm tắt/dịch (tương quan yếu với chất lượng) |
| **Giám khảo LLM** | điểm theo tiêu chí, so sánh cặp | đầu ra mở |
| **Người đánh giá** | xếp hạng, tỷ lệ thắng | chuẩn vàng, tốn kém |
| **Nghiệp vụ** | tỷ lệ giải quyết, thời gian | đo lường cuối cùng |

## pass@k

Sinh `n` lời giải, `c` đúng (qua test). Xác suất **ít nhất một** trong `k` mẫu đúng: `1 − C(n−c, k)/C(n, k)` (Chen et al., 2021, HumanEval). Cho biết lợi ích của việc thử nhiều lần.

## LLM-as-judge: tiện nhưng có thiên lệch

Dùng một LLM mạnh chấm theo **rubric rõ ràng**. Các thiên lệch đã biết (Zheng et al., 2023): **thiên lệch vị trí** (thích đáp án đứng trước), **thiên lệch độ dài** (thích câu dài), **thiên lệch tự ưu ái** (thích kiểu viết của chính nó). Cách giảm: hoán đổi thứ tự, rubric chi tiết, **hiệu chuẩn bằng nhãn người** trên một mẫu.

## Quy trình xây eval

1. Thu **30–200 ca thật**, gồm cả ca khó và ca lỗi từng gặp.
2. Viết **tiêu chí đạt/trượt** cụ thể trước khi chạy.
3. Chạy tự động mỗi khi đổi prompt/mô hình/RAG (như **kiểm thử hồi quy**).
4. Báo cáo **theo nhóm** (chủ đề, độ khó), không chỉ trung bình.
5. Bổ sung ca mới từ **lỗi thật trong sản xuất**.

## Lưu ý

- Đừng **tối ưu quá mức** trên bộ eval (overfit vào nó); giữ tập kiểm tra riêng.
- Đo cả **chi phí và độ trễ**, không chỉ chất lượng.
- **Ô nhiễm dữ liệu**: benchmark công khai có thể đã nằm trong dữ liệu huấn luyện.

## Nguồn tham khảo

- Chen et al. (2021). Evaluating large language models trained on code (HumanEval, pass@k). *arXiv:2107.03374*.
- Zheng et al. (2023). Judging LLM-as-a-judge with MT-Bench and Chatbot Arena. *NeurIPS*.
- Liang et al. (2022). Holistic evaluation of language models (HELM). *arXiv:2211.09110*.

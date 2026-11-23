# Suy luận hiệu quả: KV-cache, lượng tử hoá và bộ nhớ GPU

Huấn luyện chỉ làm một lần; **suy luận (inference)** diễn ra hàng tỷ lần và chiếm phần lớn chi phí vận hành. Hiểu nút thắt giúp bạn **chọn phần cứng, mô hình và cấu hình** hợp lý.

## Vì sao sinh token chậm

Mô hình sinh **một token mỗi lượt**, mỗi token cần chạy qua cả mạng. Nếu tính lại attention cho toàn bộ ngữ cảnh mỗi lượt thì lãng phí khổng lồ.

## KV-cache

Trong attention, **K và V của các token cũ không đổi**. Lưu chúng lại (**KV-cache**), mỗi lượt chỉ tính K, V cho token mới. Đổi lấy bộ nhớ: mỗi token, mỗi tầng lưu `2 × heads × head_dim` số.

`bộ nhớ cache ≈ 2 × tầng × heads × head_dim × độ_dài × batch × byte`

![Bộ nhớ KV-cache tăng tuyến tính theo độ dài ngữ cảnh](/lessons/modern-ai/13-kv-cache-inference-fig-vi.svg)
*Bộ nhớ KV-cache tăng tuyến tính theo độ dài ngữ cảnh*

Ngữ cảnh dài và batch lớn khiến **KV-cache vượt cả trọng số mô hình**. Giải pháp: **Multi-Query/Grouped-Query Attention** (chia sẻ K, V giữa các đầu), PagedAttention (vLLM), cache nén/cửa sổ.

## Bộ nhớ trọng số và lượng tử hoá

`bộ nhớ ≈ số tham số × byte mỗi tham số`. Mô hình 7B: fp16 ≈ 14 GB, int8 ≈ 7 GB, int4 ≈ 3,5 GB.

**Lượng tử hoá**: lưu trọng số bằng số nguyên: `q = round(w / scale)`, `scale = max|w| / 127` (int8). Giảm bộ nhớ và băng thông, thường **mất rất ít chất lượng** ở int8, đáng kể hơn ở int4 (GPTQ, AWQ, bitsandbytes, GGUF).

## Hai giai đoạn của suy luận

| Giai đoạn | Đặc điểm | Nút thắt |
|---|---|---|
| **Prefill** (xử lý prompt) | song song nhiều token | tính toán (compute-bound) |
| **Decode** (sinh từng token) | tuần tự, mỗi lượt 1 token | **băng thông bộ nhớ** (đọc trọng số + cache) |

## Tăng thông lượng

- **Batching liên tục** (continuous batching): gộp nhiều yêu cầu để dùng hết GPU.
- **Giải mã suy đoán** (speculative decoding): mô hình nhỏ nháp, mô hình lớn xác nhận.
- **Chưng cất** (distillation) ra mô hình nhỏ hơn.

## Chọn cách triển khai

API đám mây (không phải quản hạ tầng) vs tự lưu trữ (kiểm soát dữ liệu, chi phí thấp ở quy mô lớn, nhưng cần đội vận hành). Tính **chi phí cho mỗi triệu token** ở cả hai trước khi quyết định.

## Nguồn tham khảo

- Pope et al. (2023). Efficiently scaling Transformer inference. *MLSys*.
- Kwon et al. (2023). Efficient memory management for LLM serving with PagedAttention. *SOSP*.
- Dettmers et al. (2022). LLM.int8(). *NeurIPS*.
- Leviathan et al. (2023). Fast inference from Transformers via speculative decoding. *ICML*.

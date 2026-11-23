# Token, cửa sổ ngữ cảnh và tính chi phí

LLM không đọc chữ mà đọc **token** (mảnh từ). Token quyết định **chi phí**, **độ trễ** và **giới hạn** của ứng dụng.

## Token là gì

Bộ tách từ (BPE, bài 3) cắt văn bản thành mảnh: tiếng Anh ≈ **4 ký tự hoặc 0,75 từ mỗi token**. **Tiếng Việt, mã nguồn, ký tự hiếm tốn nhiều token hơn** cho cùng nội dung. Muốn số chính xác, dùng bộ đếm token chính thức của nhà cung cấp.

![Chi phí phụ thuộc số token vào và ra, nhân với đơn giá](/lessons/modern-ai/12-tokens-context-cost-fig-vi.svg)
*Chi phí phụ thuộc số token vào và ra, nhân với đơn giá*

## Cửa sổ ngữ cảnh

Tổng **token vào + ra** không được vượt cửa sổ ngữ cảnh. Ngân sách điển hình:

`cửa sổ = prompt hệ thống + lịch sử hội thoại + tài liệu truy xuất + câu hỏi + chỗ để câu trả lời`

Cửa sổ lớn không có nghĩa là nên nhồi đầy: chi phí tăng, độ trễ tăng, và mô hình có thể **bỏ sót thông tin ở giữa** (Liu et al., 2023).

## Tính chi phí

`chi phí = token_vào × giá_vào + token_ra × giá_ra` (giá theo triệu token). **Token ra thường đắt hơn vài lần** token vào. Nhân với số lượt gọi để ước tính ngân sách tháng, và đo cả lúc cao điểm.

## Cách giảm chi phí và độ trễ

| Kỹ thuật | Tác dụng |
|---|---|
| **Prompt caching** | phần đầu prompt cố định được đệm, rẻ và nhanh hơn nhiều |
| Rút gọn ngữ cảnh | chỉ truy xuất top-k đoạn cần, tóm tắt lịch sử |
| **Chọn mô hình theo độ khó** | mô hình nhỏ cho tác vụ dễ, lớn cho tác vụ khó (định tuyến) |
| Giới hạn `max_tokens`, yêu cầu ngắn gọn | giảm token ra |
| **Xử lý theo lô (batch)** | giá thấp hơn nếu không cần trả ngay |
| Lưu đệm câu trả lời | câu hỏi lặp lại không gọi lại mô hình |

## Độ trễ

Thời gian ≈ **xử lý prompt** (song song, nhanh) + **sinh từng token** (tuần tự, chậm). Đo **thời gian đến token đầu tiên** và dùng **streaming** để người dùng thấy chữ ngay.

## Lưu ý

Đơn giá thay đổi thường xuyên: **luôn xem bảng giá hiện hành** của nhà cung cấp; các con số trong bài chỉ để minh hoạ.

## Nguồn tham khảo

- Sennrich, Haddow, Birch (2016). Neural machine translation of rare words with subword units. *ACL*.
- Liu et al. (2023). Lost in the middle. *TACL*.
- Tài liệu bảng giá, đếm token và prompt caching của nhà cung cấp mô hình.

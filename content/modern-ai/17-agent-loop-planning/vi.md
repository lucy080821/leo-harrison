# Xây vòng lặp agent: lập kế hoạch, bộ nhớ và giới hạn

Bài 6 giới thiệu agent và tool use. Ở đây là **khung điều khiển** đưa agent từ demo đến sản phẩm: vòng lặp, bộ nhớ, lỗi và giới hạn.

## Vòng lặp cốt lõi (ReAct)

```
lặp:
    mô hình nhìn (mục tiêu + lịch sử quan sát)
    → quyết định: gọi công cụ X(args) HOẶC trả lời cuối
    nếu gọi công cụ: chạy, thêm KẾT QUẢ vào lịch sử, quay lại
    nếu trả lời cuối: dừng
```

**ReAct** (Yao et al., 2023) xen kẽ *suy luận* và *hành động*: mô hình viết "suy nghĩ" ngắn trước mỗi lần gọi công cụ, rồi quan sát kết quả.

![Vòng lặp agent: suy nghĩ, hành động, quan sát, có giới hạn bước và ngân sách](/lessons/modern-ai/17-agent-loop-planning-fig-vi.svg)
*Vòng lặp agent: suy nghĩ, hành động, quan sát, có giới hạn bước và ngân sách*

## Các thành phần cần có

| Thành phần | Vai trò |
|---|---|
| **Bộ công cụ** | hàm có schema rõ, kiểm tra tham số, quyền tối thiểu |
| **Bộ nhớ làm việc** | lịch sử hành động/quan sát; tóm tắt khi quá dài |
| **Bộ nhớ dài hạn** | lưu sự kiện bền vững (CSDL vector/khoá-giá trị) |
| **Lập kế hoạch** | chia mục tiêu lớn thành bước nhỏ; có thể sửa kế hoạch khi thất bại |
| **Giới hạn** | số bước tối đa, ngân sách token/tiền, thời gian |

## Xử lý lỗi công cụ

Công cụ sẽ lỗi (sai tham số, hết hạn, mạng). **Đừng làm sập agent**: bắt ngoại lệ và trả lỗi **như một quan sát**, để mô hình tự sửa (đổi tham số, thử công cụ khác). Giới hạn số lần thử lại để tránh lặp vô hạn.

## Điều kiện dừng

- Mô hình trả câu trả lời cuối.
- **Quá số bước / ngân sách** (bắt buộc: agent có thể lặp vô tận và tốn tiền).
- Phát hiện **vòng lặp** (cùng hành động lặp lại).
- Cần **người duyệt** cho hành động rủi ro.

## Khi nào *không* dùng agent

Nếu quy trình **cố định và biết trước** (A rồi B rồi C), dùng **chuỗi lệnh cố định (workflow)**: rẻ, nhanh, dễ kiểm thử. Dùng agent khi **số bước và công cụ cần thiết không biết trước** (Anthropic, "Building effective agents"). Bắt đầu đơn giản, chỉ thêm độ phức tạp khi eval chứng minh cần thiết.

## Đánh giá agent

Đo **tỷ lệ hoàn thành tác vụ**, số bước, chi phí, và **chất lượng quỹ đạo** (có dùng đúng công cụ không). Lưu toàn bộ vết (trace) để gỡ lỗi. Kết hợp bài 10 và 16.

## Nguồn tham khảo

- Yao et al. (2023). ReAct: synergizing reasoning and acting in language models. *ICLR*.
- Anthropic (2024). Building effective agents (hướng dẫn kỹ thuật).
- Schick et al. (2023). Toolformer. *NeurIPS*.

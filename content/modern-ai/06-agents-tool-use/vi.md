# Agent AI và gọi công cụ (tool use)

Một LLM thuần chỉ **sinh văn bản**. Một **agent** là hệ thống dùng LLM làm "bộ não" để **tự quyết định hành động**, **dùng công cụ** (tìm kiếm, chạy mã, gọi API, đọc file) và **lặp lại** cho đến khi hoàn thành mục tiêu.

## Từ chatbot đến agent

| Chatbot | Agent |
|---|---|
| Hỏi một lần, đáp một lần | **Nhiều bước** tự động |
| Chỉ dùng kiến thức trong mô hình | **Gọi công cụ** để lấy dữ liệu và hành động |
| Không tác động thế giới | Có thể **gửi email, sửa code, đặt lịch** |

## Gọi công cụ (function calling)

Bạn **mô tả các công cụ** (tên, mô tả, tham số) cho mô hình. Khi cần, mô hình **không tự tính** mà trả về một **lời gọi có cấu trúc** (thường JSON); **chương trình của bạn** thực thi và đưa kết quả lại cho mô hình.

```json
{"tool": "add", "args": {"a": 2, "b": 3}}
```

```python
TOOLS = {"add": add, "multiply": multiply}

def run_tool(call_json):
    call = json.loads(call_json)
    return TOOLS[call["tool"]](**call["args"])
```

**Mô hình không chạy công cụ**: nó chỉ **đề xuất**. Mã của bạn làm việc thật và quyết định có cho phép hay không (an toàn!).

Mô tả công cụ rất quan trọng, mô hình chọn công cụ dựa trên đó:

```json
{
  "name": "get_weather",
  "description": "Lấy thời tiết hiện tại của một thành phố",
  "parameters": {"city": {"type": "string"}}
}
```

## Vòng lặp agent

```text
         ┌────────────────────────────────────────┐
         ▼                                        │
  Mục tiêu ─▶ LLM suy nghĩ ─▶ hành động? ──Có──▶ chạy công cụ ─▶ quan sát (kết quả)
                               │
                              Không
                               ▼
                         Trả lời cuối cùng
```

```python
history = []
while True:
    action = llm(history)              # 1. mô hình quyết định
    if action["type"] == "final":      # 2. xong?
        print(action["answer"]); break
    result = run_tool(action["call"])  # 3. thực thi công cụ
    history.append(result)             # 4. đưa quan sát lại cho mô hình
```

Kiểu **ReAct** (Reason + Act): mô hình luân phiên **suy luận** ("tôi cần biết giá hiện tại") và **hành động** (gọi công cụ), mỗi **quan sát** làm cơ sở cho bước tiếp theo.

## Các thành phần của một agent

| Thành phần | Vai trò |
|---|---|
| **LLM** | Lập kế hoạch, ra quyết định |
| **Công cụ** | Tìm kiếm, tính toán, mã, API, cơ sở dữ liệu |
| **Bộ nhớ** | Lịch sử hội thoại, ghi chú dài hạn (thường dùng vector DB/RAG) |
| **Lập kế hoạch** | Chia mục tiêu lớn thành bước nhỏ |
| **Bộ điều khiển** | Vòng lặp, giới hạn số bước, xử lý lỗi |

## Ví dụ: agent làm toán

Câu hỏi "3 × 4 rồi cộng 2". LLM:

1. Lượt 1: gọi `multiply(3, 4)` → quan sát 12.
2. Lượt 2: gọi `add(12, 2)` → quan sát 14.
3. Lượt 3: trả lời "Tổng là 14".

Vì sao không để LLM tự tính? LLM **tính nhẩm không đáng tin** với phép toán lớn; công cụ cho kết quả **chính xác**. Đây là mẫu chung: **LLM lo lập luận, công cụ lo độ chính xác và hành động**.

## Rủi ro và nguyên tắc an toàn

| Rủi ro | Biện pháp |
|---|---|
| **Hành động không thể đảo ngược** (xoá dữ liệu, chi tiền) | **Xác nhận của con người** trước hành động nhạy cảm |
| **Prompt injection** qua nội dung công cụ trả về (trang web chứa lệnh ẩn) | Coi kết quả công cụ là **dữ liệu**, không phải chỉ dẫn; quyền tối thiểu |
| **Vòng lặp vô hạn**, chi phí tăng | Giới hạn số bước và ngân sách |
| **Quyền quá rộng** | **Nguyên tắc đặc quyền tối thiểu** cho mỗi công cụ |
| **Sai âm thầm** | Ghi log mọi bước, cho phép xem lại |

## Khi nào dùng agent?

Agent mạnh nhưng **khó dự đoán, đắt, chậm**. Nếu bài toán giải được bằng **một lời gọi LLM** hoặc **một quy trình cố định** (workflow: bước nào cũng biết trước), hãy dùng cách đơn giản đó. Chỉ dùng agent khi **số bước và công cụ cần dùng không biết trước**.

## Đa agent

Nhiều agent chuyên biệt (người lập kế hoạch, người viết mã, người kiểm tra) phối hợp. Linh hoạt nhưng thêm phức tạp và chi phí.

## Giao thức công cụ chuẩn

Các chuẩn như **MCP** (Model Context Protocol) cho phép một công cụ viết một lần dùng được với nhiều ứng dụng AI, giống "cổng USB" cho công cụ của mô hình.

## Bạn vừa tự cài đặt gì?

Hai phần cốt lõi mọi khung agent đều có: **bộ thực thi công cụ** (`run_tool`) và **vòng lặp quan sát-hành động**. Các khung như LangChain, các SDK agent chỉ bọc thêm quản lý bộ nhớ, thử lại và giám sát.

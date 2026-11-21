# Dự án: Trò chơi trắc nghiệm

Dự án cuối của khoá JavaScript: một **trò chơi trắc nghiệm** có câu hỏi, các lựa chọn và tính điểm. Bài này tập trung vào tư duy **dữ liệu → giao diện** thay vì viết cứng HTML.

## Ý tưởng cốt lõi: tách dữ liệu và giao diện

Thay vì gõ từng câu hỏi vào HTML, bạn **mô tả câu hỏi bằng dữ liệu**:

```javascript
const questions = [
  { text: "2 + 2 = ?", choices: ["3", "4", "5"], answer: "4" },
  { text: "Thủ đô của Việt Nam?", choices: ["Hà Nội", "Huế", "Đà Nẵng"], answer: "Hà Nội" },
];
```

Rồi viết **một hàm** biến dữ liệu thành giao diện. Thêm câu hỏi mới chỉ là thêm một phần tử vào mảng.

## Trạng thái (state)

Chương trình cần **nhớ** vài thứ:

| Biến | Ý nghĩa |
|---|---|
| `current` | Đang ở câu thứ mấy |
| `score` | Điểm hiện tại |

Mỗi khi trạng thái đổi, bạn **cập nhật giao diện** tương ứng. Đây là mô hình `state → render` mà React, Vue... làm tự động.

## Các bước

1. **`showQuestion()`**: đọc `questions[current]`, ghi `text` vào `#question`, dựng các nút lựa chọn.
2. **Bấm lựa chọn**: dùng ủy quyền sự kiện trên `#choices`. So sánh `btn.textContent` với `answer`.
3. **Cập nhật điểm** nếu đúng; tăng `current`; gọi lại `showQuestion()`.
4. **Quay vòng** bằng phép chia dư: `current = (current + 1) % questions.length`.

## Gợi ý mở rộng

- Khi hết câu hỏi, hiện **màn hình kết quả**: "Bạn đúng 2/2" và nút "Chơi lại".
- Hiện **đúng/sai** bằng class `.correct`/`.wrong` (đã có CSS) rồi chờ 800ms bằng `setTimeout` mới sang câu kế.
- **Xáo trộn** thứ tự câu hỏi và đáp án (thuật toán Fisher-Yates với `Math.random`).
- **Đếm ngược thời gian** mỗi câu bằng `setInterval`.
- Lưu **điểm cao nhất** vào `localStorage`.
- Lấy câu hỏi từ API thật bằng `fetch` (xem bài async/await).

## Chúc mừng!

Bạn đã đi qua toàn bộ nền tảng JavaScript: biến, điều kiện, vòng lặp, hàm, mảng, đối tượng, DOM, sự kiện, bất đồng bộ, lớp, JSON, regex. Bước tiếp theo là **Node.js** (JavaScript phía server) và **React/Next.js** (xây ứng dụng web hiện đại).

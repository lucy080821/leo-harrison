# AI có trách nhiệm: công bằng, đánh giá và triển khai

Một mô hình đạt độ chính xác cao trong phòng thí nghiệm có thể **gây hại** khi triển khai thật: phân biệt đối xử, bị lạm dụng, hỏng âm thầm. Bài cuối của lộ trình nói về những gì **biến mô hình thành sản phẩm đáng tin**.

## Thiên lệch (bias) đến từ đâu?

| Nguồn | Ví dụ |
|---|---|
| **Dữ liệu lịch sử** | Dữ liệu tuyển dụng quá khứ thiên vị nam ⇒ mô hình học theo |
| **Dữ liệu thiếu đại diện** | Nhận dạng khuôn mặt huấn luyện chủ yếu trên một nhóm da ⇒ sai nhiều ở nhóm khác |
| **Nhãn thiên lệch** | Người gán nhãn mang định kiến |
| **Đặc trưng đại diện** (proxy) | Mã bưu điện thay cho chủng tộc |
| **Vòng phản hồi** | Dự đoán ảnh hưởng dữ liệu tương lai (cảnh sát tới nơi có nhiều ca, thấy nhiều ca hơn) |
| **Thiết kế mục tiêu** | Tối ưu "lượt bấm" ⇒ nội dung giật gân |

**Bỏ cột nhạy cảm không đủ** vì các đặc trưng khác vẫn mã hoá nó (proxy).

## Đo công bằng

Hai chỉ số phổ biến, tính theo **nhóm** (ví dụ giới tính, độ tuổi):

### Ngang bằng nhân khẩu học (demographic parity)

**Tỉ lệ được dự đoán dương** nên giống nhau giữa các nhóm:

$$
P(\hat y=1\mid A)=P(\hat y=1\mid B)
$$

Chênh lệch: $\lvert P(\hat y=1\mid A)-P(\hat y=1\mid B)\rvert$. Ví dụ nhóm A được duyệt vay 60%, nhóm B 20% ⇒ chênh lệch 0.4.

### Cơ hội bằng nhau (equal opportunity)

Trong những người **thật sự xứng đáng** (nhãn dương), **tỉ lệ được nhận diện đúng (TPR)** nên giống nhau:

$$
\text{TPR}_A=\text{TPR}_B,\qquad \text{TPR}=\frac{TP}{TP+FN}
$$

Ví dụ $\text{TPR}_A=2/3$, $\text{TPR}_B=1/3$ ⇒ nhóm B xứng đáng bị **bỏ sót nhiều gấp đôi**.

```python
def tpr(mask):
    return y_pred[mask & (y_true == 1)].mean()
```

Còn có **equalized odds** (cả TPR và FPR bằng nhau), **calibration** (xác suất dự đoán đáng tin như nhau ở mọi nhóm)...

### Không có định nghĩa "công bằng" duy nhất

Các tiêu chí này **thường mâu thuẫn nhau** (không thể thoả mãn đồng thời trừ trường hợp đặc biệt). Chọn tiêu chí là **quyết định giá trị**, không chỉ kỹ thuật: cần bàn với người chịu ảnh hưởng, chuyên gia pháp lý và đạo đức.

## Giảm thiên lệch

| Giai đoạn | Cách |
|---|---|
| **Trước huấn luyện** | Thu thập dữ liệu đại diện hơn, cân bằng/trọng số lại |
| **Trong huấn luyện** | Thêm ràng buộc công bằng vào mất mát |
| **Sau huấn luyện** | Chỉnh **ngưỡng quyết định riêng cho từng nhóm** |

Luôn **đo trên từng nhóm**, đừng chỉ nhìn điểm trung bình toàn cục: accuracy 95% có thể che giấu 70% ở một nhóm nhỏ.

## Đánh giá đúng và minh bạch

- **Tách tập test đại diện** cho môi trường thật.
- Báo cáo **khoảng tin cậy**, không chỉ một con số.
- Kiểm tra **trường hợp biên** và **ví dụ đối kháng**.
- **Tài liệu hoá** mô hình: **model card** (mục đích, dữ liệu, giới hạn, hiệu năng theo nhóm), **datasheet** cho dữ liệu.
- **Giải thích được** khi hậu quả lớn: hệ số, SHAP, LIME.

## Triển khai và giám sát (MLOps)

Mô hình **không "xong" khi triển khai**; thế giới thay đổi:

| Hiện tượng | Ý nghĩa | Cách phát hiện |
|---|---|---|
| **Trôi dữ liệu** (data drift) | Phân phối **đầu vào** đổi | So phân phối đầu vào hiện tại với lúc huấn luyện (PSI, KS test) |
| **Trôi khái niệm** (concept drift) | Quan hệ đầu vào → nhãn đổi | Theo dõi **chất lượng** khi có nhãn mới |
| **Suy giảm hiệu năng** | Điểm giảm dần | Chỉ số theo thời gian, cảnh báo |

```python
# Phát hiện trôi đơn giản: lệch trung bình theo độ lệch chuẩn lúc huấn luyện
z = abs(new_data.mean() - train_mean) / train_std
alert = z > 0.5
```

Thực hành tốt: **phiên bản hoá** dữ liệu/mô hình, **CI/CD** cho ML, **triển khai từng phần** (canary, A/B), **ghi log** dự đoán, có **kế hoạch quay lui**, và **con người trong vòng lặp** cho quyết định rủi ro cao.

## An toàn và quyền riêng tư

| Chủ đề | Lưu ý |
|---|---|
| **Quyền riêng tư** | Giảm thiểu dữ liệu cá nhân; ẩn danh; **mô hình có thể ghi nhớ** dữ liệu huấn luyện |
| **Bảo mật** | Tấn công đối kháng, đầu độc dữ liệu, **prompt injection** |
| **Lạm dụng** | Đánh giá rủi ro dual-use, giới hạn truy cập |
| **Tác động môi trường** | Huấn luyện/suy luận quy mô lớn tốn năng lượng |
| **Bản quyền** | Nguồn gốc và giấy phép dữ liệu |

### Riêng với LLM

- **Ảo giác**: cần kiểm chứng (RAG, trích dẫn, công cụ).
- **Nội dung có hại**: lọc đầu vào/ra, **đội đỏ** (red-teaming).
- **Lộ thông tin nhạy cảm** trong prompt hoặc dữ liệu truy xuất.
- Minh bạch với người dùng rằng họ đang tương tác với AI.

## Khung tư duy trước khi xây

1. **Có nên dùng AI?** Quy tắc đơn giản có đủ không?
2. **Ai bị ảnh hưởng** và hậu quả khi mô hình **sai** (sai theo hướng nào tệ hơn)?
3. Có **người xem xét** và đường **khiếu nại/sửa lỗi** không?
4. Đã đo trên **mọi nhóm** liên quan chưa?
5. Sẽ **giám sát** ra sao sau khi ra mắt?

## Chúc mừng, bạn đã hoàn thành lộ trình AI!

Từ **toán nền tảng** đến **machine learning**, **deep learning** tự cài đặt, và **AI hiện đại** (NLP, embedding, LLM, RAG, agent, học tăng cường), bạn có bức tranh trọn vẹn. Lời khuyên tiếp theo: **làm dự án thật** trên dữ liệu bạn quan tâm, đọc bài báo gốc (Transformer, ResNet, Adam...), và luôn đặt câu hỏi "**mô hình này sai ở đâu và ai chịu hậu quả?**".

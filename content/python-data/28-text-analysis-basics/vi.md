# Phân tích văn bản cơ bản: tần suất từ và cảm xúc theo từ điển

Đánh giá khách hàng, email hỗ trợ, bình luận mạng xã hội: phần lớn dữ liệu doanh nghiệp là **văn bản**. Trước khi dùng mô hình NLP phức tạp, hãy nắm các kỹ thuật nền tảng.

## Quy trình tiền xử lý

1. **Chuẩn hoá**: chữ thường, bỏ ký tự thừa.
2. **Tách từ (tokenise)**: `re.findall(r"[a-z']+", text)`.
3. **Bỏ stop word**: từ rất phổ biến, ít thông tin (the, is, and…).
4. Có thể thêm **stemming/lemmatisation** (rút về gốc), **n-gram** (cụm 2–3 từ).

![Đếm từ khoá và so sánh đánh giá tích cực với tiêu cực](/lessons/python-data/28-text-analysis-basics-fig-vi.svg)
*Đếm từ khoá và so sánh đánh giá tích cực với tiêu cực*

## Tần suất từ

`collections.Counter` đếm rất nhanh; `most_common(k)` lấy top. So **từ khoá theo nhóm** (đánh giá thấp so với cao) cho thấy ngay *khách phàn nàn điều gì*: giao hàng chậm, pin yếu, hỗ trợ kém. Đó là thông tin hành động được.

## Cảm xúc theo từ điển (lexicon)

Gán điểm cho từ (tốt +1, tệ −1) rồi cộng theo văn bản. Đơn giản, **giải thích được**, nhưng bỏ sót phủ định ("not good"), mỉa mai, ngữ cảnh. Công cụ có sẵn: VADER, TextBlob. Với độ chính xác cao hơn: mô hình học máy hoặc mô hình ngôn ngữ.

## Kiểm tra bằng nhãn có sẵn

Có cột `rating` nên đối chiếu: điểm cảm xúc trung bình của nhóm 1–2 sao phải thấp hơn nhóm 4–5 sao. Nếu không, từ điển hoặc cách xử lý sai.

## Lưu ý

- Văn bản tiếng Việt cần tách từ riêng (ví dụ **underthesea**, **pyvi**) vì từ gồm nhiều âm tiết.
- Thống kê từ trên **mẫu nhỏ** dễ bị ảnh hưởng bởi vài đánh giá dài.
- Luôn **đọc mẫu ngẫu nhiên** văn bản thật, đừng chỉ tin vào số.

## Nguồn tham khảo

- Jurafsky & Martin. *Speech and Language Processing* (3rd ed. draft, miễn phí).
- Hutto & Gilbert (2014). VADER. *ICWSM*.
- Python documentation, `re`, `collections.Counter`.

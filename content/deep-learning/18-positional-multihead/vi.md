# Mã hoá vị trí và chú ý đa đầu (multi-head attention)

Bài trước cho thấy attention so khớp mọi cặp token. Còn hai mảnh ghép để có Transformer hoàn chỉnh: **vị trí** và **nhiều đầu**.

## Attention không biết thứ tự

`softmax(QKᵀ/√d)V` là phép toán trên **tập hợp**: hoán vị các token chỉ hoán vị đầu ra. "Chó cắn người" và "người cắn chó" sẽ như nhau! Cần **chèn thông tin vị trí** vào đầu vào.

## Mã hoá vị trí sin/cos

`PE(pos, 2i) = sin(pos / 10000^{2i/d})`, `PE(pos, 2i+1) = cos(...)`. Mỗi vị trí một vector duy nhất, cộng vào embedding. Ưu điểm: không cần học, **ngoại suy** lên chuỗi dài hơn, và dịch vị trí tương ứng phép quay tuyến tính (dễ học **vị trí tương đối**).

![Đầu chú ý nhìn các phần khác nhau của chuỗi; mã hoá vị trí cho biết thứ tự](/lessons/deep-learning/18-positional-multihead-fig-vi.svg)
*Đầu chú ý nhìn các phần khác nhau của chuỗi; mã hoá vị trí cho biết thứ tự*

Các biến thể hiện đại: **embedding vị trí học được** (BERT, GPT-2), **RoPE** (quay vector Q/K, dùng trong LLaMA), **ALiBi** (phạt theo khoảng cách).

## Chú ý đa đầu

Một đầu attention chỉ học một kiểu quan hệ. **Chia `d` thành `h` đầu** (mỗi đầu `d/h` chiều), chạy attention **song song**, nối kết quả rồi chiếu tuyến tính. Đầu khác nhau chuyên về: cú pháp, đồng tham chiếu, vị trí gần, từ khoá hiếm… Chi phí tính toán gần như không đổi.

| Tensor | Kích thước |
|---|---|
| đầu vào x | `(n, d)` |
| mỗi đầu Q, K, V | `(n, d/h)` |
| điểm attention | `(h, n, n)` (**bậc hai theo độ dài**) |
| đầu ra sau nối | `(n, d)` |

## Mặt nạ nhân quả

Mô hình sinh văn bản (GPT) không được nhìn token **tương lai** khi huấn luyện. Đặt điểm tại vị trí tương lai bằng `−∞` trước softmax (tam giác trên) ⇒ trọng số bằng 0. Mô hình hai chiều (BERT) không dùng mặt nạ này.

## Chi phí bậc hai

Ma trận `n × n` làm bộ nhớ/thời gian tăng theo `n²`, là nút thắt cho ngữ cảnh dài. Giải pháp: FlashAttention (tính theo khối, tiết kiệm bộ nhớ), attention thưa/cửa sổ, KV-cache khi suy luận.

## Nguồn tham khảo

- Vaswani et al. (2017). Attention is all you need. *NeurIPS*.
- Su et al. (2021). RoFormer: rotary position embedding. *arXiv:2104.09864*.
- Dao et al. (2022). FlashAttention. *NeurIPS*.
- Alammar, J. "The Illustrated Transformer".

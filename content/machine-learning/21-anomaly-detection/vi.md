# Phát hiện bất thường: Isolation Forest và giới hạn

Gian lận, lỗi thiết bị, xâm nhập mạng, giao dịch kỳ lạ: ta cần tìm điểm **khác thường** khi gần như **không có nhãn** (hoặc có rất ít).

## Ý tưởng của Isolation Forest

Chia ngẫu nhiên: chọn một đặc trưng, chọn ngưỡng ngẫu nhiên, lặp lại. Điểm **bất thường nằm xa, thưa** nên bị **cô lập sau vài lần chia** (đường đi ngắn); điểm bình thường chen chúc cần nhiều lần chia. **Điểm bất thường = độ dài đường đi trung bình ngắn** qua nhiều cây.

![Isolation Forest cô lập điểm bất thường chỉ bằng vài lần chia](/lessons/machine-learning/21-anomaly-detection-fig-vi.svg)
*Isolation Forest cô lập điểm bất thường chỉ bằng vài lần chia*

## Tham số quan trọng

- `contamination`: tỷ lệ bất thường kỳ vọng (quyết định ngưỡng của `predict`). Không biết thì dùng `score_samples` và tự chọn ngưỡng theo năng lực điều tra (ví dụ top 0,5%).
- `n_estimators`, `max_samples`: nhiều cây hơn cho điểm ổn định hơn.

## Các phương pháp khác

| Phương pháp | Ý tưởng | Phù hợp |
|---|---|---|
| Thống kê (z-score, IQR) | vượt ngưỡng một biến | đơn giản, một chiều |
| **Isolation Forest** | cô lập bằng chia ngẫu nhiên | nhiều chiều, nhanh |
| **LOF** | mật độ cục bộ thấp hơn hàng xóm | cụm có mật độ khác nhau |
| One-class SVM | biên bao dữ liệu bình thường | dữ liệu sạch để học |
| Autoencoder | lỗi tái tạo lớn | dữ liệu rất lớn, phức tạp |

## Đánh giá khi ít nhãn

- Có ít nhãn: dùng **precision@k** (trong k ca cao nhất, bao nhiêu thật sự đáng ngờ) và PR-AUC.
- Không nhãn: **chuyên gia duyệt mẫu** các ca cao nhất; ghi lại để có nhãn cho lần sau.

## Giới hạn

- "Bất thường" không có nghĩa là "xấu": có thể là khách VIP hoặc sự kiện hợp lệ.
- Nhạy với **thang đo** và đặc trưng không liên quan.
- Mẫu hành vi **thay đổi theo thời gian** (concept drift): huấn luyện lại định kỳ.

## Nguồn tham khảo

- Liu, Ting, Zhou (2008). Isolation Forest. *IEEE ICDM*.
- Breunig et al. (2000). LOF: identifying density-based local outliers. *SIGMOD*.
- scikit-learn User Guide, "Novelty and Outlier Detection".

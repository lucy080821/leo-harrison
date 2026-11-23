# Phân loại văn bản với TF-IDF và hồi quy logistic

Lọc thư rác, phân loại ticket hỗ trợ, đọc cảm xúc đánh giá: **phân loại văn bản** là một trong những ứng dụng ML phổ biến nhất. Bí quyết: biến văn bản thành **vector số**.

## Túi từ và TF-IDF

- **Túi từ (bag of words)**: mỗi từ một cột, giá trị = số lần xuất hiện. Mất thứ tự từ nhưng hiệu quả đáng ngạc nhiên.
- **TF-IDF** = *tần suất từ trong văn bản* × *log(nghịch đảo số văn bản chứa từ)*. Từ **phổ biến ở mọi nơi** (the, is) bị hạ trọng số; từ **đặc trưng cho văn bản** được nâng lên.

![TF-IDF biến văn bản thành vector để mô hình học](/lessons/machine-learning/22-text-classification-fig-vi.svg)
*TF-IDF biến văn bản thành vector để mô hình học*

## Pipeline văn bản

```python
clf = make_pipeline(TfidfVectorizer(ngram_range=(1, 2), min_df=2),
                    LogisticRegression(max_iter=1000))
clf.fit(X_train_text, y_train)
```

| Tham số | Tác dụng |
|---|---|
| `ngram_range=(1,2)` | thêm cụm 2 từ ("not good", "fast delivery") |
| `min_df=2` | bỏ từ xuất hiện quá ít |
| `stop_words`, `lowercase` | tiền xử lý |
| `sublinear_tf=True` | giảm ảnh hưởng của từ lặp lại nhiều |

Pipeline đảm bảo **từ vựng học chỉ từ tập huấn luyện** (không rò rỉ).

## Diễn giải

Hệ số hồi quy logistic cho biết **từ nào đẩy về lớp nào**: sắp xếp `coef_` để xem. Dùng để kiểm tra mô hình học điều hợp lý, không phải "mẹo dữ liệu" (một mã khuyến mãi xuất hiện chỉ trong lớp dương chẳng hạn).

## Giới hạn

- **Mất ngữ cảnh**: "not good" cần n-gram; mỉa mai gần như không bắt được.
- **Mất cân bằng lớp, mẫu nhỏ**: dùng `class_weight`, CV phân tầng.
- Tiếng Việt cần tách từ trước (underthesea, pyvi).
- Khi cần hiểu ngữ nghĩa sâu: embedding và mô hình ngôn ngữ (xem khoá Deep Learning và AI hiện đại).

## Nguồn tham khảo

- Salton & Buckley (1988). Term-weighting approaches in automatic text retrieval. *Information Processing & Management* 24(5).
- scikit-learn, "Working With Text Data" (tutorial).
- Manning, Raghavan, Schütze. *Introduction to Information Retrieval*.

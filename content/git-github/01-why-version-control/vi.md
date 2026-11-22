# Vì sao cần kiểm soát phiên bản

## Vấn đề

Ai cũng từng có `luanvan_final.docx`, `luanvan_final_v2.docx`, `luanvan_final_that_su.docx`. Với code còn tệ hơn: sửa một chỗ làm hỏng chỗ khác, nhiều người sửa cùng file, và không ai nhớ *ai đã đổi gì, khi nào, vì sao*.

**Hệ thống kiểm soát phiên bản (version control system, VCS)** ghi lại lịch sử thay đổi để bạn có thể: xem ai đổi gì, quay về trạng thái cũ, thử nghiệm trên nhánh riêng, và gộp công sức của nhiều người.

## Các thế hệ VCS

- **Cục bộ**: lưu các bản vá trên một máy (RCS).
- **Tập trung**: một máy chủ giữ lịch sử, mọi người lấy bản về làm việc (CVS, Subversion).
- **Phân tán**: *mỗi người có toàn bộ lịch sử* trên máy mình (Git, Mercurial). Làm việc offline được, và không có một điểm hỏng duy nhất.

Git do **Linus Torvalds** tạo ra năm 2005 để quản lý nhân Linux. Theo sách *Pro Git*, điểm khác biệt cốt lõi của Git là nó nghĩ dữ liệu như **chuỗi các ảnh chụp (snapshot)** của toàn bộ dự án, không phải danh sách các thay đổi từng file.

![Chuỗi commit: mỗi commit trỏ về commit cha](/lessons/git-github/01-why-version-control-chain-vi.svg)
*Mỗi ô là một ảnh chụp; mũi tên trỏ về commit trước nó.*

## Khái niệm cần nhớ

- **Repository (kho)**: thư mục dự án cùng toàn bộ lịch sử (thư mục ẩn `.git`).
- **Commit**: một ảnh chụp có tên (mã băm), tác giả, thông điệp, và *con trỏ tới commit cha*.
- **Mã băm (hash)**: định danh duy nhất của commit, tính từ nội dung (Git hiện dùng SHA-1; SHA-256 đang được hỗ trợ dần). Vì mã phụ thuộc cả commit cha nên **sửa lịch sử cũ sẽ đổi mọi mã phía sau**.
- **Git và GitHub khác nhau**: Git là *công cụ* chạy trên máy bạn; GitHub là *dịch vụ web* lưu kho Git và thêm công cụ cộng tác (pull request, issue...).

> **Trình mô phỏng:** khung code bên phải chạy một *bản Git thu nhỏ* ngay trong trình duyệt. Lệnh và kết quả giống Git thật ở những phần cốt lõi, nhưng được đơn giản hoá (mã băm ngắn 7 ký tự, không có mạng thật). Hãy gõ lệnh tương tự trên máy thật để luyện tay.

## Nguồn tham khảo

- Chacon, S. & Straub, B. *Pro Git* (2nd ed.), chương 1 "Getting Started": About Version Control; What is Git?, git-scm.com/book.
- Git documentation, git-scm.com/docs.
- GitHub Docs, "About Git" và "About GitHub and Git", docs.github.com.

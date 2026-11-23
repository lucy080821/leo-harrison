# process, đối số dòng lệnh và cấu hình

> **Lưu ý:** trong trình duyệt không có Node thật, nên Lexi Learn chạy một bản **mô phỏng** (fs trong bộ nhớ, `http`/`express` thu nhỏ, kiểm thử bằng `app.inject`). Code bạn viết giống hệt khi chạy trên Node thật; phần cuối mỗi bài chỉ ra cách chạy ngoài máy.

Một chương trình Node thực tế không chỉ là mã: nó nhận **đối số**, đọc **cấu hình**, trả **mã thoát**, và phản ứng với **tín hiệu** của hệ điều hành. Đối tượng toàn cục `process` là cửa ngõ.

## Thông tin có sẵn

| API | Cho biết |
|---|---|
| `process.argv` | `['node', 'script.js', ...đối số]` |
| `process.env` | biến môi trường (chuỗi) |
| `process.cwd()` | thư mục làm việc hiện tại |
| `process.platform`, `process.version` | hệ điều hành, phiên bản Node |
| `process.exitCode` | mã thoát khi kết thúc |

Node 20+ có sẵn `util.parseArgs` để phân tích đối số kiểu `--out=dist --minify`. Với CLI lớn dùng **commander**, **yargs**, hoặc **citty**.



![Cấu hình theo lớp: lớp trên ghi đè lớp dưới](/lessons/nodejs/12-process-cli-config-fig-vi.svg)
*Cấu hình theo lớp: lớp trên ghi đè lớp dưới*

## Cấu hình theo lớp

Thứ tự ưu tiên điển hình (cao xuống thấp): **đối số dòng lệnh > biến môi trường > tệp cấu hình > mặc định trong mã**. Mỗi lớp **ghi đè** lớp dưới, nhờ vậy cùng một mã chạy được ở máy bạn, CI và sản xuất.

Quy tắc theo **The Twelve-Factor App**: *cấu hình tách khỏi mã*, lưu trong **môi trường**. **Không** commit bí mật vào git.

Mọi giá trị trong `process.env` là **chuỗi**: `process.env.PORT` là `"3000"`, phải ép kiểu và **kiểm tra** (bài 18 của khoá Next.js, ý tưởng giống nhau):

```js
const port = Number(process.env.PORT ?? 3000)
if (!Number.isInteger(port)) throw new Error('PORT không hợp lệ')
```

## Mã thoát

Quy ước Unix: **0 = thành công**, khác 0 = lỗi. Công cụ khác (CI, shell `&&`) dựa vào đó để biết lệnh thành công không.

```js
process.exitCode = 1   // ưu tiên: để Node kết thúc êm
process.exit(1)        // dừng NGAY, có thể mất log chưa ghi
```

## Tín hiệu và tắt êm (graceful shutdown)

Khi triển khai (Docker, Kubernetes, systemd), hệ thống gửi **SIGTERM** để yêu cầu dừng. Bạn nên **bắt tín hiệu**, ngừng nhận yêu cầu mới, chờ yêu cầu đang chạy xong, đóng kết nối CSDL, rồi thoát:

```js
process.on('SIGTERM', async () => {
  server.close()           // ngừng nhận kết nối mới
  await db.end()           // đóng CSDL
  process.exit(0)
})
```

## Lỗi toàn cục

`process.on('uncaughtException')` và `unhandledRejection` là **lưới an toàn cuối**: ghi log lỗi rồi **thoát** (trạng thái có thể đã hỏng) để trình giám sát khởi động lại. Từ Node 15, `unhandledRejection` mặc định làm tiến trình **thoát**.

## Nguồn tham khảo

- Node.js docs: `process`, `util.parseArgs`.
- The Twelve-Factor App: III. Config.
- POSIX: exit status; signal(7).

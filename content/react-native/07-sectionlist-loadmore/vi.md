# SectionList và tải thêm dữ liệu

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Nhiều danh sách tự nhiên có **nhóm**: danh bạ theo chữ cái, đơn hàng theo ngày, cài đặt theo mục. **SectionList** là FlatList có **tiêu đề nhóm** và vẫn **ảo hoá**.

## Cấu trúc dữ liệu

```js
const sections = [
  { title: "Hôm nay",    data: [{ id: 1, ... }, { id: 2, ... }] },
  { title: "Hôm qua",    data: [{ id: 3, ... }] },
]
<SectionList
  sections={sections}
  keyExtractor={(item) => item.id}
  renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
  renderItem={({ item }) => <Row item={item} />}
  stickySectionHeadersEnabled
/>
```

`stickySectionHeadersEnabled` ghim tiêu đề nhóm khi cuộn (mặc định bật trên iOS).

![Danh sách có nhóm; tải thêm thì nối vào cuối và chặn gọi lặp](/lessons/react-native/07-sectionlist-loadmore-fig-vi.svg)
*Danh sách có nhóm; tải thêm thì nối vào cuối và chặn gọi lặp*

## Chuẩn bị dữ liệu

API thường trả **danh sách phẳng**. Tự **gom nhóm** trước khi đưa vào (và `useMemo` để không gom lại mỗi lần render):

```js
const sections = useMemo(() => groupByDay(orders), [orders])
```

## Tải thêm (phân trang vô hạn)

Mẫu chuẩn: giữ `items`, `page` (hoặc `cursor`), `loading`, `hasMore`:

```js
const loadMore = async () => {
  if (loading || !hasMore) return        // CHẶN tải lặp
  setLoading(true)
  const res = await api.getPage(cursor)
  setItems((prev) => [...prev, ...res.items])   // NỐI, không thay thế
  setCursor(res.nextCursor); setHasMore(!!res.nextCursor)
  setLoading(false)
}
<FlatList onEndReached={loadMore} onEndReachedThreshold={0.5} />
```

Hai điểm hay sai:

1. **Quên chặn khi đang tải** ⇒ gọi nhiều lần, **dữ liệu trùng**. Dùng `useRef` nếu cần chặn ngay lập tức (state cập nhật bất đồng bộ).
2. **Ghi đè** thay vì nối ⇒ danh sách bị nhảy về đầu.

## Khử trùng lặp

Nếu dữ liệu có thể trùng giữa các trang (mục mới chèn đầu), **khử trùng theo id** khi nối.

## Trải nghiệm

- Hiện **vòng quay ở chân danh sách** khi tải.
- Hiển thị **lỗi tải thêm** với nút "Thử lại", không chặn nội dung đã có.
- Giữ **vị trí cuộn** khi nối thêm (FlatList làm sẵn khi nối cuối).

## Nguồn tham khảo

- React Native docs: `SectionList`, `FlatList` (`onEndReached`).
- Bài "Dự án blog API" của khoá Next.js (phân trang con trỏ).

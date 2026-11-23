# FlatList chuyên sâu: key, trạng thái rỗng, ngăn cách và hiệu năng

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Danh sách là **thành phần quan trọng nhất** của ứng dụng di động: nguồn cấp, tin nhắn, sản phẩm. Dùng `.map()` trong `ScrollView` vẽ **mọi** phần tử cùng lúc: 1.000 dòng sẽ ngốn bộ nhớ và giật. **FlatList** vẽ **ảo hoá**: chỉ dựng các dòng đang (và sắp) hiện trên màn hình, tái chế phần còn lại.

## Các prop thiết yếu

| Prop | Vai trò |
|---|---|
| `data` | mảng dữ liệu |
| `renderItem` | hàm vẽ một dòng `({ item, index })` |
| `keyExtractor` | khoá **ổn định, duy nhất** (id, không dùng index nếu danh sách đổi) |
| `ItemSeparatorComponent` | đường kẻ **giữa** các dòng (không có ở đầu/cuối) |
| `ListEmptyComponent` | giao diện **trạng thái rỗng** |
| `ListHeaderComponent` / `ListFooterComponent` | tiêu đề/chân (vòng quay tải thêm) |

**Trạng thái rỗng** là một phần của thiết kế: "Chưa có đơn hàng" kèm lời kêu gọi hành động tốt hơn màn hình trắng.

![FlatList chỉ dựng các dòng đang hiện và tái chế phần còn lại](/lessons/react-native/06-flatlist-in-depth-fig-vi.svg)
*FlatList chỉ dựng các dòng đang hiện và tái chế phần còn lại*

## Hiệu năng

1. **`keyExtractor` ổn định**; `renderItem` nên là **component bọc `React.memo`** (xem lại bài hiệu năng khoá React).
2. **Đừng tạo hàm/đối tượng mới trong `renderItem`** nếu tránh được; dùng `useCallback`.
3. **`getItemLayout`** khi **chiều cao dòng cố định**: React Native khỏi đo, cuộn nhảy tới vị trí tức thì.
4. Điều chỉnh vùng dựng: `initialNumToRender`, `windowSize`, `maxToRenderPerBatch`, `removeClippedSubviews`.
5. Ảnh: kích thước phù hợp, có bộ nhớ đệm (`expo-image`); tránh decode ảnh khổng lồ.
6. Danh sách rất lớn/phức tạp: thay bằng **FlashList** (Shopify), tái chế view nhanh hơn.

## Tải thêm (phân trang vô hạn)

`onEndReached` + `onEndReachedThreshold` gọi khi người dùng cuộn gần cuối; kết hợp trạng thái `loading` để **tránh gọi lặp**, và `ListFooterComponent={<ActivityIndicator />}`. Phân trang bằng **con trỏ** (bài API) cho nguồn cấp.

## Làm mới kéo xuống

`refreshing` + `onRefresh` bật **pull-to-refresh** trên thiết bị thật.

## Lưu ý

- Đừng lồng `FlatList` dọc trong `ScrollView` dọc (mất ảo hoá, cảnh báo).
- Khi dữ liệu đổi, **tạo mảng mới** (bất biến) để `FlatList` nhận ra; dùng `extraData` nếu giao diện phụ thuộc state ngoài `data`.

## Nguồn tham khảo

- React Native docs: `FlatList`, "Optimizing FlatList Configuration".
- Shopify FlashList documentation.

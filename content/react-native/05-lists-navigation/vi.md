# Danh sách với FlatList và điều hướng

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

## FlatList — danh sách hiệu quả

Trên điện thoại, danh sách có thể có hàng nghìn dòng. `FlatList` chỉ vẽ những dòng **đang nhìn thấy** nên rất mượt:

```jsx
<FlatList
  data={items}                       // mảng dữ liệu
  keyExtractor={(item) => item.id}   // khóa duy nhất (chuỗi)
  renderItem={({ item }) => <Row item={item} />}
  ListEmptyComponent={<Text>Chưa có gì</Text>}
/>
```

Đừng dùng `.map()` trong `ScrollView` cho danh sách dài — nó vẽ **tất cả** cùng lúc. `ScrollView` chỉ hợp với nội dung ngắn, cố định.

![FlatList chỉ vẽ phần tử đang nhìn thấy; stack navigation xếp màn hình](/lessons/react-native/05-lists-navigation-fig-vi.svg)
*FlatList chỉ vẽ phần tử đang nhìn thấy; stack navigation xếp màn hình*

## Điều hướng giữa màn hình

App thật có nhiều màn hình. Thư viện chuẩn là **React Navigation** (hoặc **Expo Router** theo cấu trúc thư mục giống Next.js):

```jsx
const Stack = createNativeStackNavigator();

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
</NavigationContainer>

// trong màn hình
navigation.navigate("Detail", { id: 5 });
```

Về bản chất nó chỉ là **state "đang ở màn nào"** cộng hiệu ứng chuyển cảnh và nút Back của hệ điều hành — đúng như bài tập bên phải.

## Bước tiếp theo

- Gọi API bằng `fetch` (giống web) và hiển thị bằng `FlatList`.
- Lưu dữ liệu cục bộ với `AsyncStorage`.
- Xuất bản lên App Store / Google Play bằng **EAS Build** của Expo.

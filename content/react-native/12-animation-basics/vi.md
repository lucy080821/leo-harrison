# Hoạt ảnh: Animated, timing và interpolate

> **Lưu ý:** bên phải chạy bằng **react-native-web** — cùng component và API với React Native thật nhưng hiển thị trong trình duyệt. Muốn chạy trên điện thoại, dùng **Expo** (hướng dẫn cuối mỗi bài).

Hoạt ảnh tốt không chỉ để đẹp: nó **giải thích điều đang xảy ra** (phần tử đến từ đâu, đi đâu), cho **phản hồi** tức thì cho thao tác chạm, và làm giao diện **tự nhiên**.

## Ý tưởng cốt lõi

Thay đổi giá trị theo thời gian, **không qua lại giữa React render**. Mỗi khung hình, giá trị cập nhật và **giao diện nhận ngay**, không gọi `setState` 60 lần/giây.

```js
const opacity = useRef(new Animated.Value(0)).current

Animated.timing(opacity, { toValue: 1, duration: 300, useNativeDriver: true }).start()

<Animated.View style={{ opacity }} />
```

| Hàm | Dùng cho |
|---|---|
| `Animated.timing` | chuyển đổi theo thời gian + đường cong (`Easing`) |
| `Animated.spring` | **lò xo** vật lý: tự nhiên, nảy |
| `Animated.decay` | trôi theo đà (sau khi thả vuốt) |
| `Animated.sequence/parallel/stagger` | **kết hợp** nhiều hoạt ảnh |
| `value.interpolate` | **ánh xạ** một giá trị sang nhiều thuộc tính |

![Một Animated.Value điều khiển nhiều thuộc tính qua interpolate](/lessons/react-native/12-animation-basics-fig-vi.svg)
*Một Animated.Value điều khiển nhiều thuộc tính qua interpolate*

## interpolate: một giá trị, nhiều thuộc tính

```js
const width  = v.interpolate({ inputRange: [0, 1], outputRange: [50, 200] })
const rotate = v.interpolate({ inputRange: [0, 1], outputRange: ["0deg", "180deg"] })
const color  = v.interpolate({ inputRange: [0, 1], outputRange: ["#fff", "#0ea5e9"] })
```

Một Animated.Value chạy 0 → 1 điều khiển cả chiều rộng, góc xoay, màu cùng lúc, đồng bộ hoàn hảo.

## Luồng native và 60 fps

Mặc định hoạt ảnh tính trên luồng **JavaScript**: nếu JS bận (render nặng), hoạt ảnh **giật**. Với **`useNativeDriver: true`**, mô tả hoạt ảnh được gửi sang **luồng giao diện native** và chạy độc lập với JS: **mượt 60 fps** kể cả khi JS bận. Giới hạn: chỉ thuộc tính **không ảnh hưởng bố cục** (`opacity`, `transform`); **không** dùng được cho `width`, `height`, `backgroundColor`.

Với hoạt ảnh phức tạp theo cử chỉ (kéo thả, cuộn kèm hiệu ứng), dùng **react-native-reanimated** + **react-native-gesture-handler**: chạy toàn bộ logic trên luồng giao diện (worklets).

## Nguyên tắc thiết kế

1. **Mục đích**: mỗi hoạt ảnh trả lời câu hỏi ("cái này từ đâu ra?"), không trang trí thừa.
2. **Ngắn**: 150-300 ms cho chuyển nhỏ; đường cong **ease-out** cho phần tử vào.
3. Ưu tiên **`opacity` và `transform`** (rẻ nhất).
4. **Tôn trọng trợ năng**: `AccessibilityInfo.isReduceMotionEnabled()`, giảm/bỏ chuyển động cho người nhạy cảm (rối loạn tiền đình).
5. **Dọn dẹp**: dừng hoạt ảnh khi component bị gỡ (`animation.stop()`).

## Đo hiệu năng

Bật **Perf Monitor** (menu nhà phát triển) để xem FPS của luồng JS và UI. Hoạt ảnh phải giữ **UI thread ≈ 60 fps**.

## Nguồn tham khảo

- React Native docs: `Animated`, "Animations", `AccessibilityInfo`.
- React Native Reanimated và Gesture Handler documentation.
- Material Design: Motion; Apple HIG: Motion.

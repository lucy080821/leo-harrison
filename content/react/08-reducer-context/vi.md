# useReducer và Context

## useReducer

Khi state có nhiều trường hoặc nhiều cách thay đổi, gom logic vào một **reducer**: hàm `(state, action) → state mới`.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: "add", price: 25 });
```

Ưu điểm: mọi thay đổi nằm một chỗ, dễ đọc, dễ kiểm thử. Reducer phải **thuần** — không sửa `state` tại chỗ, luôn trả về đối tượng mới.

## Context — tránh truyền props qua nhiều tầng

Truyền props qua 5 tầng component chỉ để tới một nút ở đáy gọi là *prop drilling*. Context cho phép "phát sóng" dữ liệu:

```jsx
const ThemeContext = createContext("light");

<ThemeContext.Provider value="dark">
  <Page />                     {/* mọi con cháu đều đọc được */}
</ThemeContext.Provider>

const theme = useContext(ThemeContext);
```

Context hợp với dữ liệu **toàn cục ít đổi**: theme, ngôn ngữ, người dùng đăng nhập. Kết hợp `useReducer` + Context là cách quản lý state toàn app mà không cần thư viện ngoài.

# Flexbox (1): trục chính và trục phụ

**Flexbox** là hệ thống bố cục **một chiều** (một hàng hoặc một cột), rất hợp để xếp thanh menu, thẻ, nút, căn giữa...

## Bật flex

```css
.row { display: flex; }
```

`.row` trở thành **flex container**; các con trực tiếp của nó trở thành **flex item** và tự xếp thành hàng ngang.

## Hai trục

```text
flex-direction: row (mặc định)

   trục chính (main axis)  ───────────────▶
   ┌────┐ ┌────┐ ┌────┐        ▲
   │ A  │ │ B  │ │ C  │        │ trục phụ (cross axis)
   └────┘ └────┘ └────┘        ▼
```

- **Trục chính:** hướng các item xếp nối tiếp nhau. Với `row` là ngang, với `column` là dọc.
- **Trục phụ:** vuông góc với trục chính.

## Các thuộc tính trên container

| Thuộc tính | Tác dụng | Giá trị hay dùng |
|---|---|---|
| `flex-direction` | Hướng trục chính | `row`, `row-reverse`, `column`, `column-reverse` |
| `justify-content` | Căn **theo trục chính** | `flex-start`, `center`, `flex-end`, `space-between`, `space-around`, `space-evenly` |
| `align-items` | Căn **theo trục phụ** | `stretch` (mặc định), `flex-start`, `center`, `flex-end`, `baseline` |

> Nhớ: `justify-` = trục chính, `align-` = trục phụ. Khi đổi sang `flex-direction: column`, hai trục **hoán đổi** vai trò.

## Hai mẫu dùng liên tục

**Căn giữa hoàn hảo:**

```css
.box {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}
```

**Thanh điều hướng:** logo bên trái, menu bên phải:

```css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```

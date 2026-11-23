# SectionList and loading more data

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

Many lists are naturally **grouped**: contacts by letter, orders by date, settings by section. **SectionList** is a FlatList with **section headers** that still **virtualises**.

## Data shape

```js
const sections = [
  { title: "Today",     data: [{ id: 1, ... }, { id: 2, ... }] },
  { title: "Yesterday", data: [{ id: 3, ... }] },
]
<SectionList
  sections={sections}
  keyExtractor={(item) => item.id}
  renderSectionHeader={({ section }) => <Text>{section.title}</Text>}
  renderItem={({ item }) => <Row item={item} />}
  stickySectionHeadersEnabled
/>
```

`stickySectionHeadersEnabled` pins section headers while scrolling (default on iOS).

![A grouped list; loading more appends and guards against repeated calls](/lessons/react-native/07-sectionlist-loadmore-fig-en.svg)
*A grouped list; loading more appends and guards against repeated calls*

## Preparing data

APIs usually return a **flat list**. **Group** it yourself before passing it in (and `useMemo` so it isn't regrouped every render):

```js
const sections = useMemo(() => groupByDay(orders), [orders])
```

## Loading more (infinite pagination)

The standard pattern: keep `items`, `page` (or `cursor`), `loading`, `hasMore`:

```js
const loadMore = async () => {
  if (loading || !hasMore) return        // BLOCK repeated loads
  setLoading(true)
  const res = await api.getPage(cursor)
  setItems((prev) => [...prev, ...res.items])   // APPEND, don't replace
  setCursor(res.nextCursor); setHasMore(!!res.nextCursor)
  setLoading(false)
}
<FlatList onEndReached={loadMore} onEndReachedThreshold={0.5} />
```

Two common mistakes:

1. **Not guarding while loading** ⇒ multiple calls, **duplicate data**. Use a `useRef` if you need an instant guard (state updates are asynchronous).
2. **Replacing** instead of appending ⇒ the list jumps back to the top.

## De-duplication

If data can repeat across pages (new items inserted at the top), **de-duplicate by id** when appending.

## Experience

- Show a **spinner in the list footer** while loading.
- Show a **load-more error** with a "Retry" button, without hiding existing content.
- Keep the **scroll position** when appending (FlatList does this when appending at the end).

## References

- React Native docs: `SectionList`, `FlatList` (`onEndReached`).
- The "Project: blog API" lesson in the Next.js course (cursor pagination).

# FlatList in depth: keys, empty state, separators and performance

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

Lists are the **most important component** of mobile apps: feeds, messages, products. Using `.map()` inside a `ScrollView` renders **every** item at once: 1,000 rows eat memory and jank. **FlatList** **virtualises**: it builds only the rows on (and near) the screen and recycles the rest.

## Essential props

| Prop | Role |
|---|---|
| `data` | the data array |
| `renderItem` | draws one row `({ item, index })` |
| `keyExtractor` | a **stable, unique** key (id, not index if the list changes) |
| `ItemSeparatorComponent` | a line **between** rows (not at the start/end) |
| `ListEmptyComponent` | the **empty-state** UI |
| `ListHeaderComponent` / `ListFooterComponent` | header/footer (a load-more spinner) |

The **empty state** is part of the design: "No orders yet" with a call to action beats a blank screen.

![FlatList builds only the visible rows and recycles the rest](/lessons/react-native/06-flatlist-in-depth-fig-en.svg)
*FlatList builds only the visible rows and recycles the rest*

## Performance

1. **A stable `keyExtractor`**; `renderItem` should be a **`React.memo`-wrapped component** (see the performance lesson in the React course).
2. **Avoid creating new functions/objects inside `renderItem`** where possible; use `useCallback`.
3. **`getItemLayout`** when **row height is fixed**: React Native skips measuring and scrolling jumps instantly.
4. Tune the render window: `initialNumToRender`, `windowSize`, `maxToRenderPerBatch`, `removeClippedSubviews`.
5. Images: appropriate sizes, cached (`expo-image`); avoid decoding huge images.
6. Very large/complex lists: switch to **FlashList** (Shopify), which recycles views faster.

## Loading more (infinite pagination)

`onEndReached` + `onEndReachedThreshold` fire as the user nears the end; combine with a `loading` state to **avoid repeated calls**, and `ListFooterComponent={<ActivityIndicator />}`. Use **cursor** pagination (the API lessons) for feeds.

## Pull to refresh

`refreshing` + `onRefresh` enable **pull-to-refresh** on real devices.

## Notes

- Don't nest a vertical `FlatList` in a vertical `ScrollView` (loses virtualisation, warns).
- When data changes, **create a new array** (immutability) so `FlatList` notices; use `extraData` if the UI depends on state outside `data`.

## References

- React Native docs: `FlatList`, "Optimizing FlatList Configuration".
- Shopify FlashList documentation.

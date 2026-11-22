# Lists with FlatList and navigation

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

## FlatList — efficient lists

On a phone a list can hold thousands of rows. `FlatList` only renders the rows **currently visible**, so it stays smooth:

```jsx
<FlatList
  data={items}                       // the data array
  keyExtractor={(item) => item.id}   // unique key (string)
  renderItem={({ item }) => <Row item={item} />}
  ListEmptyComponent={<Text>Nothing yet</Text>}
/>
```

Don't `.map()` a long list inside a `ScrollView` — that renders **everything** at once. `ScrollView` is for short, fixed content.

![FlatList renders only visible rows; stack navigation stacks screens](/lessons/react-native/05-lists-navigation-fig-en.svg)
*FlatList renders only visible rows; stack navigation stacks screens*

## Navigating between screens

Real apps have many screens. The standard library is **React Navigation** (or **Expo Router**, with Next.js-style folder routing):

```jsx
const Stack = createNativeStackNavigator();

<NavigationContainer>
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Detail" component={DetailScreen} />
  </Stack.Navigator>
</NavigationContainer>

// inside a screen
navigation.navigate("Detail", { id: 5 });
```

At heart it is just **state for "which screen are we on"** plus transition animations and the OS Back button — exactly the exercise on the right.

## Next steps

- Call APIs with `fetch` (same as the web) and display them with `FlatList`.
- Store data locally with `AsyncStorage`.
- Publish to the App Store / Google Play with Expo's **EAS Build**.

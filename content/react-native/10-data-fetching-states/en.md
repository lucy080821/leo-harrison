# Fetching data in mobile apps: loading, errors, empty and retry

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

On a phone the network is **unreliable**: elevators, tunnels, weak signal, Wi-Fi switching to 4G. A good app **handles every state proactively**, not just the happy network case.

## The four states of a data screen

| State | UI |
|---|---|
| **Loading** | an `ActivityIndicator` or a **skeleton** shaped like the content |
| **Error** | a clear message + a **Retry** button (don't show a raw "Network request failed") |
| **Empty** | "Nothing yet" + a call to action |
| **Data** | the content |

Combine them in **one state** `{ status, data, error }` (avoiding impossible states like loading and error together); the `useEffect` + `ignore` flag pattern prevents out-of-order results, as in the React course's data-fetching lesson.

![The four states of a data screen](/lessons/react-native/10-data-fetching-states-fig-en.svg)
*The four states of a data screen*

## Mobile realities

- **Flaky networks**: set a **timeout** (`AbortController`), **retry with backoff**, and keep **stale data** on screen when a refresh fails.
- **Offline**: monitor connectivity (`@react-native-community/netinfo`), show an **"Offline" banner**, queue writes to send later.
- **Caching**: on the next open, show old data instantly then **refresh in the background** (stale-while-revalidate).
- **Battery and mobile data**: limit repeated calls, batch requests, respect data-saver modes.
- **Pull-to-refresh** (`refreshing` + `onRefresh`) is a gesture users expect.

## Don't hand-write it all: TanStack Query

**TanStack Query** (available for React Native too) gives you loading/error states, **caching**, retries, refetch on app focus, request de-duplication, infinite pagination (`useInfiniteQuery`), and **optimistic updates**. Wire `focusManager`/`onlineManager` to `AppState` and NetInfo.

```js
const { data, isPending, error, refetch } = useQuery({ queryKey: ['users'], queryFn: getUsers })
```

## Security

- Call **HTTPS** (iOS ATS and Android block plain HTTP by default).
- **Never embed secret keys** in the app: anyone can **unpack** the install package. Real keys live on **your server**; the app calls that server.
- Store tokens in a **secure store** (Keychain/Keystore: `expo-secure-store`), not plain `AsyncStorage`.

## References

- React Native docs: "Networking"; Expo docs: `expo-secure-store`.
- TanStack Query documentation (React Native guide).
- OWASP MASVS: Network communication; Storage.

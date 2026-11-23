# Local storage: AsyncStorage, secure stores and syncing

> **Note:** the right side runs on **react-native-web** — the same components and API as real React Native, rendered in the browser. To run on a phone, use **Expo** (steps at the end of the lessons).

Mobile apps are **closed and reopened constantly**, and often run **offline**. You need to store data **on the device**: settings, sign-in, drafts, caches.

## Choose a store by data type

| Store | Data | Notes |
|---|---|---|
| **AsyncStorage** (`@react-native-async-storage/async-storage`) | small settings, flags, light caches | **string** key-value, async, **unencrypted** |
| **MMKV** | very fast key-value (synchronous) | for frequently read data |
| **SecureStore / Keychain / Keystore** (`expo-secure-store`) | **tokens, keys, secrets** | OS hardware-backed encryption; small capacity |
| **SQLite** (`expo-sqlite`), WatermelonDB, Realm | **structured, large** data, queries, offline | Learn With Leo's SQL course applies directly |
| **File system** (`expo-file-system`) | images, downloads | manage disk usage |

**Security rule:** secrets (login tokens, private API keys) **never** go into plain AsyncStorage: on a rooted/jailbroken device or via backups it can be read. Use a secure store.

![Pick the store by data type; secrets go in a secure store](/lessons/react-native/13-local-storage-fig-en.svg)
*Pick the store by data type; secrets go in a secure store*

## The async API and string-only storage

```js
await AsyncStorage.setItem('prefs', JSON.stringify({ theme: 'dark' }))
const raw = await AsyncStorage.getItem('prefs')
const prefs = raw ? JSON.parse(raw) : defaultPrefs
```

Because it's **asynchronous**, the first render has no data yet: use a `ready` flag (splash screen/spinner) to avoid flashing default values. The `useStoredState` hook wraps this pattern (see the lesson).

## Corrupt data and version changes

- **`JSON.parse` can throw** (corrupt data, partial write): always `try/catch` and fall back to defaults.
- The app **updates** but on-device data is in the **old format**: store a **version number** (`v`) and write a **migration function** `migrate(data)` upgrading step by step. Without it, existing users will **crash the app** after an update.

## Syncing with the server

Local is a **copy**, the server is the **source of truth**:

1. Write locally immediately (instant feedback, **optimistic update**).
2. Queue operations and send when online.
3. Handle **conflicts** (two devices edit): "last write wins" (simple) or field-level merge; use **timestamps/versions**.

Helpers: TanStack Query persister, WatermelonDB sync, PowerSync, Realm Device Sync.

## Privacy

Personal data stored on the device is still personal data: **store only what's needed**, **delete on sign-out**, comply with regulations (GDPR, Vietnam's Decree 13/2023/ND-CP), and be careful about the OS's automatic **cloud backups**.

## References

- React Native docs: "AsyncStorage" (community); Expo docs: `expo-secure-store`, `expo-sqlite`.
- OWASP MASVS-STORAGE.
- MMKV (github.com/mrousavy/react-native-mmkv).

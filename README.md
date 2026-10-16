# `@codexporer.io/expo-app-snackbar`

A lightweight, theme-aware global snackbar/toast notification overlay for React Native and Expo applications, dismissable through an "✕" button or auto-dismiss timer. Backed by `react-sweet-state` and `@codexporer.io/expo-link-stores`.

---

## Peer Dependencies

All of the following peer dependencies must be installed in the consuming project:
- `react`: `*`
- `react-native`: `*`
- `react-sweet-state`: `*`
- `@codexporer.io/expo-link-stores`: `*`
- `@codexporer.io/expo-app-theme`: `*`
- `react-native-safe-area-context`: `*`

---

## Installation

```bash
yarn add @codexporer.io/expo-app-snackbar
```

---

## Quick Start

### 1. Mount `AppSnackbar` at the Root Layout

Mount `<AppSnackbar />` once near the root of your application inside `SafeAreaProvider` (typically alongside your screens so it floats on top of the UI):

```tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppThemeProvider } from '@codexporer.io/expo-app-theme';
import { AppSnackbar } from '@codexporer.io/expo-app-snackbar';
import { NavigationRoot } from './NavigationRoot';

export function App() {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        <NavigationRoot />
        <AppSnackbar />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
```

### 2. Trigger Snackbars from Any Component

```tsx
import React from 'react';
import { Button, View } from 'react-native';
import {
  useAppSnackbarActions,
  APP_SNACKBAR_POSITION,
  APP_SNACKBAR_DURATION
} from '@codexporer.io/expo-app-snackbar';

export function MyScreen() {
  const [, { show: showSnackbar }] = useAppSnackbarActions();

  const handleSave = () => {
    showSnackbar({
      message: 'Photo successfully saved to your library!',
      position: APP_SNACKBAR_POSITION.top,
      duration: APP_SNACKBAR_DURATION.short
    });
  };

  return (
    <View>
      <Button title="Save Photo" onPress={handleSave} />
    </View>
  );
}
```

---

## Features

- **Root Singleton**: Mount once at the root; dispatch from anywhere with `useAppSnackbarActions()`.
- **Early Dismissal**: Users can dismiss the notification immediately via the "✕" touchable button (`hitSlop: 12`).
- **Theme Integration**: Automatically extracts colors (`surfaceSecondary`, `border`, `text`, `placeholder`, `shadow`) from `useAppTheme()`.
- **Smooth Animations**: Animated fade (`250ms` in / `200ms` out) and slide transitions (`16px` offset) with native driver.
- **Auto-Dismiss**: Clears automatically after `duration` (defaults to `APP_SNACKBAR_DURATION.medium` / 3000ms).

---

## API Reference

### Component

#### `<AppSnackbar />`
Renders the animated snackbar overlay. Renders `null` when `isVisible` is `false`.

### `show(options: ShowSnackbarOptions)`

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `message` | `string` | *Required* | Message text displayed in the snackbar (supports up to 4 lines) |
| `position` | `'top' \| 'bottom'` | `'bottom'` | Screen edge positioning (`APP_SNACKBAR_POSITION.top` or `APP_SNACKBAR_POSITION.bottom`) |
| `duration` | `number` | `3000` | Auto-dismiss duration in milliseconds (defaults to `APP_SNACKBAR_DURATION.medium`) |

### Constants

- **`APP_SNACKBAR_POSITION`**:
  - `top: 'top'`
  - `bottom: 'bottom'`
- **`APP_SNACKBAR_DURATION`**:
  - `short: 2000`
  - `medium: 3000`
  - `long: 5000`

### Hooks

- **`useAppSnackbarActions()`**: Returns `[null, { show, hide }]`. Does not subscribe to state changes, preventing unnecessary component re-renders.
- **`useAppSnackbar()`**: Returns `[state, { show, hide }]` where `state` has shape `{ isVisible: boolean, message: string, position: 'top' | 'bottom', duration?: number }`.

### Exported Types

- `AppSnackbarPosition`: `'top' | 'bottom'`
- `AppSnackbarDuration`: `2000 | 3000 | 5000`
- `AppSnackbarState`: `{ isVisible: boolean; message: string; duration?: number; position: AppSnackbarPosition; [key: string]: unknown }`
- `ShowSnackbarOptions`: `{ message: string; duration?: number; position?: AppSnackbarPosition }`

---

## License

MIT

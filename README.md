# `@codexporer.io/expo-app-snackbar`

A lightweight, theme-aware snackbar notification component for React Native and Expo applications, dismissable through an "X" button.

## Installation & Peer Dependencies

```bash
yarn add @codexporer.io/expo-app-snackbar
```

Peer dependencies:
- `react` (`*`)
- `react-native` (`*`)
- `react-sweet-state` (`*`)
- `@codexporer.io/expo-link-stores` (`*`)
- `@codexporer.io/expo-app-theme` (`*`)
- `react-native-safe-area-context` (`*`)

## Quick Start

### 1. Place `AppSnackbar` at the root of your application

Place `<AppSnackbar />` at the root inside your `<AppThemeProvider>` (typically at the end of the root children so it floats on top of all other components):

```tsx
import React from 'react';
import { AppSnackbar } from '@codexporer.io/expo-app-snackbar';
import { AppThemeProvider } from '@photo-glide-frontend/app-theme';
import { AppScreensContainer } from './AppScreensContainer';

export function App() {
  return (
    <AppThemeProvider>
      <AppScreensContainer />
      <AppSnackbar />
    </AppThemeProvider>
  );
}
```

### 2. Trigger snackbars from anywhere in your app

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

## Features

- **Root Singleton**: Mount once at the root; dispatch from anywhere with a hook.
- **Early Dismissal**: Users can dismiss the snackbar immediately before timeout via the "✕" button.
- **Theme Integration**: All colors (background, borders, text, close icon, shadows) are dynamically derived from `useAppTheme()`.
- **Smooth Animations**: Animated fade and slide transitions on mount and dismissal.

## API Reference

### `show(options)` Options

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `message` | `string` | `''` | Message to display inside the snackbar |
| `position` | `'top' \| 'bottom'` | `'bottom'` | Position on screen |
| `duration` | `number` | `3000` | Auto-dismiss duration in milliseconds |

### Constants

- **`APP_SNACKBAR_POSITION`**:
  - `top: 'top'`
  - `bottom: 'bottom'`
- **`APP_SNACKBAR_DURATION`**:
  - `short: 2000`
  - `medium: 3000`
  - `long: 5000`

## License

MIT

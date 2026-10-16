---
name: expo-app-snackbar
description: Instructions and guidelines for using @codexporer.io/expo-app-snackbar (Expo App Snackbar) in React Native and Expo applications.
---

# `@codexporer.io/expo-app-snackbar` Skill

## Overview
`@codexporer.io/expo-app-snackbar` provides a global toast/snackbar notification overlay with slide/fade animations, automatic auto-dismiss timer, an immediate dismiss ("✕") action button, and full `@codexporer.io/expo-app-theme` integration. Backed by `react-sweet-state` and `@codexporer.io/expo-link-stores`.

---

## When to Use
- Confirming background actions (e.g., "Project changes have been saved", "Photo copied to clipboard").
- Displaying transient informational feedback that should not block the user interface.

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

## Installation & Setup

```bash
yarn add @codexporer.io/expo-app-snackbar
```

### Required Setup
Mount `<AppSnackbar />` once inside your root layout inside `<AppThemeProvider>` and `<SafeAreaProvider>`:

```tsx
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppThemeProvider } from '@codexporer.io/expo-app-theme';
import { AppSnackbar } from '@codexporer.io/expo-app-snackbar';

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <SafeAreaProvider>
      <AppThemeProvider>
        {children}
        <AppSnackbar />
      </AppThemeProvider>
    </SafeAreaProvider>
  );
}
```

---

## Usage Example

```tsx
import React from 'react';
import { Button } from 'react-native';
import {
  useAppSnackbarActions,
  APP_SNACKBAR_POSITION,
  APP_SNACKBAR_DURATION
} from '@codexporer.io/expo-app-snackbar';

export function SaveProjectButton() {
  const [, { show }] = useAppSnackbarActions();

  const handleSave = async () => {
    await saveProjectData();
    show({
      message: 'Project changes have been saved',
      position: APP_SNACKBAR_POSITION.bottom,
      duration: APP_SNACKBAR_DURATION.short
    });
  };

  return <Button title="Save" onPress={handleSave} />;
}
```

---

## API Reference

### Component

#### `<AppSnackbar />`
Renders the animated toast notification. Renders `null` when `isVisible` is `false`.

### `show(options: ShowSnackbarOptions)` Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `message` | `string` | *Required* | Text displayed in snackbar notification (up to 4 lines) |
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
- `useAppSnackbarActions()`: Returns `[null, { show, hide }]` (does not subscribe to store state updates, avoiding re-renders).
- `useAppSnackbar()`: Returns `[state, { show, hide }]` where `state` has shape `{ isVisible: boolean, message: string, position: 'top' | 'bottom', duration?: number }`.

### Exported Types
- `AppSnackbarPosition`: `'top' | 'bottom'`
- `AppSnackbarDuration`: `2000 | 3000 | 5000`
- `AppSnackbarState`: `{ isVisible: boolean; message: string; duration?: number; position: AppSnackbarPosition; [key: string]: unknown }`
- `ShowSnackbarOptions`: `{ message: string; duration?: number; position?: AppSnackbarPosition }`

---

## Critical Rules & Guidelines
1. **Mount Inside Theme Provider**: Mount `<AppSnackbar />` once near the root layout inside `<AppThemeProvider>` (and `<SafeAreaProvider>`) so multiple screens share the same singleton overlay and colors automatically resolve from `useAppTheme()`.
2. **Dispatch Without Re-renders**: Always use `const [, { show, hide }] = useAppSnackbarActions();` to dispatch notifications without subscribing to state updates.
3. **Standard Durations**: Prefer using `APP_SNACKBAR_DURATION.short` (2000), `.medium` (3000), or `.long` (5000).
4. **Theme Derivation**: Colors (surface, borders, text, close icon, shadows) automatically sync with `useAppTheme()`. `<AppSnackbar />` must be a descendant of `<AppThemeProvider>`.

---
name: expo-app-snackbar
description: Instructions and guidelines for using @codexporer.io/expo-app-snackbar (Expo App Snackbar) in React Native and Expo applications.
---

# `@codexporer.io/expo-app-snackbar` Skill

## Overview
`@codexporer.io/expo-app-snackbar` provides a global toast/snackbar notification overlay with slide/fade animations, automatic auto-dismiss timer, an immediate dismiss ("✕") action button, and full `@codexporer.io/expo-app-theme` integration.

---

## When to Use
- Confirming background actions (e.g., "Project changes have been saved", "Photo copied to clipboard").
- Displaying transient informational feedback that should not block the user interface.

---

## Required Setup
Mount `<AppSnackbar />` once inside your root layout:

```tsx
import React from 'react';
import { ThemeProvider, defaultThemeConfig } from '@codexporer.io/expo-app-theme';
import { AppSnackbar } from '@codexporer.io/expo-app-snackbar';

export function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider themeConfig={defaultThemeConfig}>
      {children}
      <AppSnackbar />
    </ThemeProvider>
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

### `show(options)` Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `message` | `string` | `''` | Text displayed in snackbar notification |
| `position` | `'top' \| 'bottom'` | `'bottom'` | Screen edge positioning |
| `duration` | `number` | `3000` | Auto-dismiss duration in milliseconds |

### Constants

- **`APP_SNACKBAR_POSITION`**:
  - `top: 'top'`
  - `bottom: 'bottom'`
- **`APP_SNACKBAR_DURATION`**:
  - `short: 2000`
  - `medium: 3000`
  - `long: 5000`

### Hooks
- `useAppSnackbarActions()`: Returns `[state, { show, hide }]`.
- `useAppSnackbar()`: Returns `[{ isVisible, message, position, duration }]`.

---

## Critical Rules & Guidelines
1. **Mount Once**: Mount `<AppSnackbar />` at root so multiple screens share the same singleton overlay.
2. **Standard Durations**: Use `APP_SNACKBAR_DURATION` constants.
3. **Theme Derivation**: Colors (background, borders, text, close icon) automatically sync with `useAppTheme()`.

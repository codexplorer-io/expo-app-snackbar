# AGENTS.md — `@codexporer.io/expo-app-snackbar`

## Package Overview
Global singleton snackbar notification system powered by `react-sweet-state`, `@codexporer.io/expo-portal`, and `@codexporer.io/expo-app-theme`.

## Key Exports
- `AppSnackbar`: Root component displaying the animated toast overlay.
- `useAppSnackbarActions()`: Hook returning `[, { show, hide }]`.
- `useAppSnackbar()`: Hook returning state `[{ isVisible, message, position, duration }]`.
- `APP_SNACKBAR_POSITION`: Constants `{ top: 'top', bottom: 'bottom' }`.
- `APP_SNACKBAR_DURATION`: Constants `{ short: 2000, medium: 3000, long: 5000 }`.

## Critical Guidelines for AI Agents
- **Root Mounting**: Mount `<AppSnackbar />` once inside `ThemeProvider` at the root layout.
- **Destructure Actions**: Use `const [, { show: showSnackbar, hide: hideSnackbar }] = useAppSnackbarActions();`.
- **Use Duration Constants**: Prefer `APP_SNACKBAR_DURATION.short` (2s) or `APP_SNACKBAR_DURATION.medium` (3s) instead of hardcoding raw millisecond numbers.
- **Dynamic Theming**: The snackbar automatically derives colors and shadows from `useAppTheme()`. Do not pass color props manually.

# AGENTS.md — `@codexporer.io/expo-app-snackbar`

## Package Overview
Global singleton snackbar notification system powered by `react-sweet-state`, `@codexporer.io/expo-link-stores`, `@codexporer.io/expo-app-theme`, and `react-native-safe-area-context`.

## Peer Dependencies
All of the following are required peer dependencies:
- `react`: `*`
- `react-native`: `*`
- `react-sweet-state`: `*`
- `@codexporer.io/expo-link-stores`: `*`
- `@codexporer.io/expo-app-theme`: `*`
- `react-native-safe-area-context`: `*`

## Key Exports
- `AppSnackbar`: Root component rendering the animated toast overlay (renders `null` when hidden).
- `useAppSnackbarActions()`: Hook returning `[null, { show, hide }]` with `selector: null` (no re-renders on state changes).
- `useAppSnackbar()`: Hook returning `[state, { show, hide }]` where state contains `{ isVisible, message, position, duration }`.
- `APP_SNACKBAR_POSITION`: Constants `{ top: 'top', bottom: 'bottom' }`.
- `APP_SNACKBAR_DURATION`: Constants `{ short: 2000, medium: 3000, long: 5000 }`.
- Types: `AppSnackbarPosition`, `AppSnackbarDuration`, `AppSnackbarState`, `ShowSnackbarOptions`.

## Critical Guidelines for AI Agents
- **Root Mounting & Theming**: Mount `<AppSnackbar />` once near the root layout inside `<AppThemeProvider>` (and `<SafeAreaProvider>`) so that `useAppTheme()` can apply the active theme and safe area insets are properly calculated. `<AppSnackbar />` MUST be a descendant of `<AppThemeProvider>`.
- **Dispatching Actions**: Always use `const [, { show, hide }] = useAppSnackbarActions();`. Do NOT use `useAppSnackbar()` if you only need to trigger snackbars, to prevent unwanted re-renders.
- **Default Values**: If `duration` is omitted in `show({ message })`, it defaults to `APP_SNACKBAR_DURATION.medium` (3000ms). If `position` is omitted, it defaults to `APP_SNACKBAR_POSITION.bottom`.
- **Use Duration Constants**: Prefer using `APP_SNACKBAR_DURATION.short` (2000), `.medium` (3000), or `.long` (5000) instead of hardcoding numbers.
- **Dynamic Theming**: The snackbar automatically derives colors and shadows from `useAppTheme()` (`surfaceSecondary`, `border`, `text`, `placeholder`, `shadow`).
- **Store Linking**: The store is named `'AppSnackbar'` and integrates `linkInitialState`, `linkActions`, and `linkSelector` from `@codexporer.io/expo-link-stores` for cross-store linking.

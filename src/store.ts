import {
    createStore,
    createHook
} from 'react-sweet-state';
import {
    initialState as linkInitialState,
    actions as linkActions,
    selector as linkSelector
} from '@codexporer.io/expo-link-stores';

export const APP_SNACKBAR_POSITION = {
    top: 'top',
    bottom: 'bottom'
} as const;

export type AppSnackbarPosition = typeof APP_SNACKBAR_POSITION[keyof typeof APP_SNACKBAR_POSITION];

export const APP_SNACKBAR_DURATION = {
    short: 2000,
    medium: 3000,
    long: 5000
} as const;

export type AppSnackbarDuration = typeof APP_SNACKBAR_DURATION[keyof typeof APP_SNACKBAR_DURATION];

export interface AppSnackbarState {
    isVisible: boolean;
    message: string;
    duration?: number;
    position: AppSnackbarPosition;
    [key: string]: unknown;
}

export interface ShowSnackbarOptions {
    message: string;
    duration?: number;
    position?: AppSnackbarPosition;
}

const initialState: AppSnackbarState = {
    ...linkInitialState,
    isVisible: false,
    message: '',
    duration: undefined,
    position: APP_SNACKBAR_POSITION.bottom
};

const Store = createStore({
    initialState,
    actions: {
        ...linkActions,
        show: ({
            message,
            duration,
            position = APP_SNACKBAR_POSITION.bottom
        }: ShowSnackbarOptions) => ({
            setState
        }: {
            setState: (partial: Partial<AppSnackbarState>) => void;
        }) => setState({
            isVisible: true,
            message,
            duration,
            position
        }),
        hide: () => ({
            setState
        }: {
            setState: (partial: Partial<AppSnackbarState>) => void;
        }) => setState({ isVisible: false })
    },
    name: 'AppSnackbar'
});

export const useAppSnackbar = createHook(Store, {
    selector: (state: AppSnackbarState) => linkSelector(state)
});

export const useAppSnackbarActions = createHook(Store, {
    selector: null
});

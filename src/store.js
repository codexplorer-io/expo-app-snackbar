import {
    createStore,
    createHook
} from 'react-sweet-state';

export const APP_SNACKBAR_POSITION = {
    top: 'top',
    bottom: 'bottom'
};

export const APP_SNACKBAR_DURATION = {
    short: 2000,
    medium: 3000
};

const Store = createStore({
    initialState: {
        isVisible: false,
        message: '',
        duration: undefined,
        position: APP_SNACKBAR_POSITION.bottom
    },
    actions: {
        show: ({
            message,
            duration,
            position
        }) => ({
            setState
        }) => setState({
            isVisible: true,
            message,
            duration,
            position
        }),
        hide: () => ({ setState }) => setState({ isVisible: false })
    },
    name: 'AppSnackbar'
});

export const useAppSnackbar = createHook(Store);

export const useAppSnackbarActions = createHook(Store, { selector: null });

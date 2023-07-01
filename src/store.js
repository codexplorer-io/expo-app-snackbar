import {
    createStore,
    createHook
} from 'react-sweet-state';
import {
    initialState,
    actions,
    selector
} from '@codexporer.io/expo-link-stores';

export const APP_SNACKBAR_POSITION = {
    top: 'top',
    bottom: 'bottom'
};

export const APP_SNACKBAR_DURATION = {
    short: 2000,
    medium: 3000,
    long: 5000
};

const Store = createStore({
    initialState: {
        ...initialState,
        isVisible: false,
        message: '',
        duration: undefined,
        position: APP_SNACKBAR_POSITION.bottom
    },
    actions: {
        ...actions,
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

export const useAppSnackbar = createHook(Store, { selector: state => selector(state) });

export const useAppSnackbarActions = createHook(Store, { selector: null });

import React from 'react';
import { Snackbar } from 'react-native-paper';
import styled from 'styled-components/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSnackbar, APP_SNACKBAR_POSITION } from './store';

const SnackbarRoot = styled(SafeAreaView)`
    position: absolute;
    width: 100%;
    ${({ position }) => position === APP_SNACKBAR_POSITION.top ? 'top: 120px;' : 'bottom: 50px'};
`;

export const AppSnackbar = () => {
    const [snackbar, { hide: hideSnackbar }] = useAppSnackbar();

    return (
        <SnackbarRoot
            pointerEvents='box-none'
            position={snackbar.position}
        >
            <Snackbar
                onDismiss={hideSnackbar}
                visible={snackbar.isVisible}
                duration={snackbar.duration}
            >
                {snackbar.message}
            </Snackbar>
        </SnackbarRoot>
    );
};

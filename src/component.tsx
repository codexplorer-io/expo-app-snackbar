import React, { useEffect, useRef } from 'react';
import {
    Animated,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppTheme } from '@codexporer.io/expo-app-theme';
import {
    useAppSnackbar,
    APP_SNACKBAR_POSITION,
    APP_SNACKBAR_DURATION
} from './store';

export const AppSnackbar: React.FC = () => {
    const [snackbar, { hide: hideSnackbar }] = useAppSnackbar();
    const theme = useAppTheme();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (!snackbar.isVisible) {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start();
            return undefined;
        }

        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 250,
            useNativeDriver: true
        }).start();

        const timeout = setTimeout(() => {
            hideSnackbar();
        }, snackbar.duration ?? APP_SNACKBAR_DURATION.medium);

        return () => {
            clearTimeout(timeout);
        };
    }, [snackbar.isVisible, snackbar.duration, hideSnackbar, fadeAnim]);

    if (!snackbar.isVisible) {
        return null;
    }

    const isTop = snackbar.position === APP_SNACKBAR_POSITION.top;

    return (
        <SafeAreaView
            style={[
                styles.root,
                isTop ? styles.positionTop : styles.positionBottom
            ]}
            pointerEvents="box-none"
        >
            <Animated.View
                style={[
                    styles.snackbar,
                    {
                        backgroundColor: theme.surfaceSecondary,
                        borderColor: theme.border,
                        shadowColor: theme.shadow,
                        opacity: fadeAnim,
                        transform: [
                            {
                                translateY: fadeAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [isTop ? -16 : 16, 0]
                                })
                            }
                        ]
                    }
                ]}
            >
                <Text
                    style={[
                        styles.message,
                        { color: theme.text }
                    ]}
                    numberOfLines={4}
                >
                    {snackbar.message}
                </Text>
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={hideSnackbar}
                    hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                    accessibilityRole="button"
                    accessibilityLabel="Dismiss snackbar"
                >
                    <Text style={[styles.closeIcon, { color: theme.placeholder }]}>
                        ✕
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    root: {
        position: 'absolute',
        width: '100%',
        alignItems: 'center',
        zIndex: 9999
    },
    positionTop: {
        top: 120
    },
    positionBottom: {
        bottom: 50
    },
    snackbar: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 16,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        maxWidth: 560,
        width: '90%',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 4,
        elevation: 6
    },
    message: {
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        marginRight: 12
    },
    closeButton: {
        padding: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    closeIcon: {
        fontSize: 16,
        fontWeight: 'bold',
        lineHeight: 18
    }
});

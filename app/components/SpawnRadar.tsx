import { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, shadows, spacing } from '../theme/theme';

interface SpawnRadarProps {
    isSearching?: boolean;
    spawnActive?: boolean;
    rarityLevel?: 'common' | 'rare' | 'epic' | 'legendary';
}

export default function SpawnRadar({
    isSearching = true,
    spawnActive = false,
    rarityLevel = 'common'
}: SpawnRadarProps) {
    const pulseAnim = useRef(new Animated.Value(0)).current;
    const ring1 = useRef(new Animated.Value(0)).current;
    const ring2 = useRef(new Animated.Value(0)).current;
    const ring3 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (isSearching) {
            // Pulse animation for center
            Animated.loop(
                Animated.sequence([
                    Animated.timing(pulseAnim, {
                        toValue: 1,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0,
                        duration: 1500,
                        easing: Easing.inOut(Easing.ease),
                        useNativeDriver: true,
                    }),
                ])
            ).start();

            // Radar rings animation
            const animateRing = (ring: Animated.Value, delay: number) => {
                return Animated.loop(
                    Animated.sequence([
                        Animated.delay(delay),
                        Animated.timing(ring, {
                            toValue: 1,
                            duration: 2000,
                            easing: Easing.out(Easing.ease),
                            useNativeDriver: true,
                        }),
                        Animated.timing(ring, {
                            toValue: 0,
                            duration: 0,
                            useNativeDriver: true,
                        }),
                    ])
                );
            };

            animateRing(ring1, 0).start();
            animateRing(ring2, 700).start();
            animateRing(ring3, 1400).start();
        }
    }, [isSearching]);

    const getRarityColor = () => {
        return colors.rarity[rarityLevel];
    };

    const centerScale = pulseAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.1],
    });

    const createRingStyle = (ringAnim: Animated.Value) => ({
        transform: [
            {
                scale: ringAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.3, 1.5],
                }),
            },
        ],
        opacity: ringAnim.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0.8, 0.4, 0],
        }),
    });

    return (
        <View style={styles.container}>
            {/* Radar rings */}
            <Animated.View style={[styles.radarRing, createRingStyle(ring1)]} />
            <Animated.View style={[styles.radarRing, createRingStyle(ring2)]} />
            <Animated.View style={[styles.radarRing, createRingStyle(ring3)]} />

            {/* Center orb */}
            <Animated.View
                style={[
                    styles.centerOrb,
                    { transform: [{ scale: centerScale }] },
                    spawnActive && { backgroundColor: getRarityColor() },
                ]}
            >
                <View style={[styles.innerOrb, spawnActive && { backgroundColor: getRarityColor() }]}>
                    {spawnActive ? (
                        <Text style={styles.orbText}>!</Text>
                    ) : (
                        <View style={styles.scanLines}>
                            <View style={styles.scanLine} />
                            <View style={styles.scanLine} />
                        </View>
                    )}
                </View>
            </Animated.View>

            {/* Status text */}
            <View style={styles.statusBadge}>
                <Text style={[styles.statusText, spawnActive && { color: getRarityColor() }]}>
                    {spawnActive ? `${rarityLevel.toUpperCase()} SPAWN!` : 'SEARCHING...'}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 220,
        height: 220,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radarRing: {
        position: 'absolute',
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.accent.cyan,
        opacity: 0.5,
    },
    centerOrb: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.background.secondary,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.accent.cyan,
        ...shadows.glow.cyan,
    },
    innerOrb: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: colors.accent.cyan,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.8,
    },
    orbText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: colors.background.primary,
    },
    scanLines: {
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scanLine: {
        width: 16,
        height: 2,
        backgroundColor: colors.background.primary,
        marginVertical: 2,
        borderRadius: 1,
    },
    statusBadge: {
        position: 'absolute',
        top: -10,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        backgroundColor: colors.background.glass,
        borderRadius: borderRadius.round,
        borderWidth: 1,
        borderColor: colors.accent.cyan,
    },
    statusText: {
        color: colors.accent.cyan,
        fontSize: 12,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

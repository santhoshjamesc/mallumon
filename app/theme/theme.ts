// Mallumon Gaming Theme
// Dark mode gaming aesthetic with neon accents

export const colors = {
    // Primary backgrounds
    background: {
        primary: '#0d0d1a',
        secondary: '#1a1a2e',
        card: 'rgba(26, 26, 46, 0.8)',
        glass: 'rgba(26, 26, 46, 0.6)',
    },

    // Accent colors
    accent: {
        cyan: '#00d9ff',
        purple: '#9d4edd',
        pink: '#ff6b9d',
        gold: '#ffd700',
    },

    // Rarity colors
    rarity: {
        common: '#9ca3af',      // Gray
        rare: '#3b82f6',        // Blue
        epic: '#9d4edd',        // Purple
        legendary: '#ffd700',   // Gold
    },

    // Text colors
    text: {
        primary: '#ffffff',
        secondary: '#a0aec0',
        muted: '#64748b',
    },

    // Weather boost colors
    weather: {
        sunny: '#f59e0b',
        rainy: '#3b82f6',
        cloudy: '#94a3b8',
        foggy: '#6b7280',
        snowy: '#e0f2fe',
        stormy: '#7c3aed',
    },

    // Status colors
    status: {
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444',
    },
};

export const gradients = {
    primary: ['#0d0d1a', '#1a1a2e', '#16213e'],
    accent: ['#00d9ff', '#9d4edd'],
    gold: ['#ffd700', '#f59e0b'],
    radar: ['rgba(0, 217, 255, 0.3)', 'rgba(0, 217, 255, 0.05)', 'transparent'],
};

export const shadows = {
    glow: {
        cyan: {
            shadowColor: '#00d9ff',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 10,
            elevation: 10,
        },
        purple: {
            shadowColor: '#9d4edd',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 10,
            elevation: 10,
        },
        gold: {
            shadowColor: '#ffd700',
            shadowOffset: { width: 0, height: 0 },
            shadowOpacity: 0.6,
            shadowRadius: 12,
            elevation: 12,
        },
    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 5,
    },
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
};

export const borderRadius = {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
};

export const typography = {
    title: {
        fontSize: 28,
        fontWeight: 'bold' as const,
        color: colors.text.primary,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '600' as const,
        color: colors.text.primary,
    },
    body: {
        fontSize: 16,
        fontWeight: 'normal' as const,
        color: colors.text.secondary,
    },
    caption: {
        fontSize: 12,
        fontWeight: 'normal' as const,
        color: colors.text.muted,
    },
    gaming: {
        fontSize: 14,
        fontWeight: 'bold' as const,
        letterSpacing: 1,
        textTransform: 'uppercase' as const,
    },
};

export default {
    colors,
    gradients,
    shadows,
    spacing,
    borderRadius,
    typography,
};

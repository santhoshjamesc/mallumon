import { StyleSheet, Text, View } from 'react-native';
import { borderRadius, colors, shadows, spacing } from '../theme/theme';

interface StickerCardProps {
    name: string;
    rarity: 'common' | 'rare' | 'epic' | 'legendary';
    emoji?: string;
    size?: 'small' | 'medium' | 'large';
}

const rarityStars: Record<string, string> = {
    common: '⭐',
    rare: '⭐⭐',
    epic: '⭐⭐⭐',
    legendary: '⭐⭐⭐⭐',
};

export default function StickerCard({
    name,
    rarity,
    emoji = '🎭',
    size = 'medium'
}: StickerCardProps) {
    const getSizeStyles = () => {
        switch (size) {
            case 'small':
                return { card: styles.cardSmall, emoji: styles.emojiSmall, name: styles.nameSmall };
            case 'large':
                return { card: styles.cardLarge, emoji: styles.emojiLarge, name: styles.nameLarge };
            default:
                return { card: styles.cardMedium, emoji: styles.emojiMedium, name: styles.nameMedium };
        }
    };

    const sizeStyles = getSizeStyles();
    const rarityColor = colors.rarity[rarity];

    return (
        <View style={[styles.card, sizeStyles.card, { borderColor: rarityColor }]}>
            <View style={[styles.glowBorder, { backgroundColor: rarityColor }]} />
            <View style={styles.content}>
                <Text style={[styles.emoji, sizeStyles.emoji]}>{emoji}</Text>
                <Text style={[styles.name, sizeStyles.name]} numberOfLines={1}>{name}</Text>
                <Text style={[styles.rarity, { color: rarityColor }]}>{rarityStars[rarity]}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.lg,
        borderWidth: 2,
        overflow: 'hidden',
        ...shadows.card,
    },
    cardSmall: {
        width: 70,
        height: 90,
    },
    cardMedium: {
        width: 100,
        height: 130,
    },
    cardLarge: {
        width: 140,
        height: 180,
    },
    glowBorder: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        opacity: 0.8,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: spacing.sm,
    },
    emoji: {
        marginBottom: spacing.xs,
    },
    emojiSmall: {
        fontSize: 24,
    },
    emojiMedium: {
        fontSize: 36,
    },
    emojiLarge: {
        fontSize: 48,
    },
    name: {
        color: colors.text.primary,
        fontWeight: '600',
        textAlign: 'center',
    },
    nameSmall: {
        fontSize: 10,
    },
    nameMedium: {
        fontSize: 12,
    },
    nameLarge: {
        fontSize: 16,
    },
    rarity: {
        marginTop: spacing.xs,
        fontSize: 10,
    },
});

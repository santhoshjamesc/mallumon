import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

interface CollectionStatsProps {
    collected: number;
    total: number;
    rare: number;
    legendary: number;
}

export default function CollectionStats({ collected, total, rare, legendary }: CollectionStatsProps) {
    const progress = (collected / total) * 100;

    return (
        <View style={styles.container}>
            {/* Main Progress */}
            <View style={styles.mainStats}>
                <Text style={styles.collectedText}>
                    {collected}<Text style={styles.totalText}>/{total}</Text>
                </Text>
                <Text style={styles.label}>Collected</Text>

                {/* Progress Bar */}
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: `${progress}%` }]} />
                </View>
            </View>

            {/* Rarity Breakdown */}
            <View style={styles.rarityContainer}>
                {/* Rare */}
                <View style={styles.rarityItem}>
                    <View style={[styles.rarityIcon, { backgroundColor: '#5B21B6' }]}>
                        <MaterialIcons name="star" size={20} color="#FBBF24" />
                    </View>
                    <Text style={styles.rarityCount}>{rare}</Text>
                    <Text style={styles.rarityLabel}>Rare</Text>
                </View>

                {/* Legendary */}
                <View style={styles.rarityItem}>
                    <View style={[styles.rarityIcon, { backgroundColor: '#7C3AED' }]}>
                        <FontAwesome5 name="crown" size={16} color="#F59E0B" />
                    </View>
                    <Text style={styles.rarityCount}>{legendary}</Text>
                    <Text style={styles.rarityLabel}>Legendary</Text>
                </View>

                {/* Common */}
                <View style={styles.rarityItem}>
                    <View style={[styles.rarityIcon, { backgroundColor: '#4C1D95' }]}>
                        <MaterialIcons name="catching-pokemon" size={20} color="#A78BFA" />
                    </View>
                    <Text style={styles.rarityCount}>{collected - rare - legendary}</Text>
                    <Text style={styles.rarityLabel}>Common</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2D1B4E',
        borderRadius: 20,
        padding: 20,
        marginHorizontal: 16,
        marginTop: 50,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#5B21B6',
    },
    mainStats: {
        alignItems: 'center',
        marginBottom: 20,
    },
    collectedText: {
        color: '#E9D5FF',
        fontSize: 48,
        fontWeight: '800',
    },
    totalText: {
        color: '#8B5CF6',
        fontSize: 24,
        fontWeight: '400',
    },
    label: {
        color: '#A78BFA',
        fontSize: 14,
        fontWeight: '600',
        marginTop: 4,
        textTransform: 'uppercase',
        letterSpacing: 2,
    },
    progressBar: {
        width: '100%',
        height: 8,
        backgroundColor: '#4C1D95',
        borderRadius: 4,
        marginTop: 16,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        backgroundColor: '#8B5CF6',
        borderRadius: 4,
    },
    rarityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    rarityItem: {
        alignItems: 'center',
    },
    rarityIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    rarityCount: {
        color: '#E9D5FF',
        fontSize: 20,
        fontWeight: '700',
    },
    rarityLabel: {
        color: '#A78BFA',
        fontSize: 12,
        fontWeight: '500',
        marginTop: 2,
    },
});

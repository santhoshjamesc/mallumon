import { FlatList, StyleSheet, Text, View } from 'react-native';
import NavBar from '../components/NavBar';
import StickerCard from '../components/StickerCard';
import TopBar from '../components/TopBar';
import { useCollection } from '../context/CollectionContext';
import { borderRadius, colors, spacing } from '../theme/theme';

interface CollectionScreenProps {
    onTabChange?: (tab: string) => void;
}

export default function CollectionScreen({ onTabChange }: CollectionScreenProps) {
    const { stickers, totalCaught } = useCollection();

    const renderEmptyState = () => (
        <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📭</Text>
            <Text style={styles.emptyTitle}>No Stickers Yet!</Text>
            <Text style={styles.emptyText}>
                Go to the Home screen and catch some stickers to start your collection.
            </Text>
        </View>
    );

    const getRarityCount = (rarity: string) => {
        return stickers.filter(s => s.rarity === rarity).length;
    };

    return (
        <View style={styles.container}>
            <TopBar />

            <View style={styles.content}>
                {/* Stats Header */}
                <View style={styles.statsHeader}>
                    <Text style={styles.title}>My Collection</Text>
                    <Text style={styles.totalCount}>{totalCaught} Stickers</Text>
                </View>

                {/* Rarity Breakdown */}
                <View style={styles.rarityRow}>
                    <View style={[styles.rarityBadge, { borderColor: colors.rarity.common }]}>
                        <Text style={styles.rarityCount}>{getRarityCount('common')}</Text>
                        <Text style={[styles.rarityLabel, { color: colors.rarity.common }]}>Common</Text>
                    </View>
                    <View style={[styles.rarityBadge, { borderColor: colors.rarity.rare }]}>
                        <Text style={styles.rarityCount}>{getRarityCount('rare')}</Text>
                        <Text style={[styles.rarityLabel, { color: colors.rarity.rare }]}>Rare</Text>
                    </View>
                    <View style={[styles.rarityBadge, { borderColor: colors.rarity.epic }]}>
                        <Text style={styles.rarityCount}>{getRarityCount('epic')}</Text>
                        <Text style={[styles.rarityLabel, { color: colors.rarity.epic }]}>Epic</Text>
                    </View>
                    <View style={[styles.rarityBadge, { borderColor: colors.rarity.legendary }]}>
                        <Text style={styles.rarityCount}>{getRarityCount('legendary')}</Text>
                        <Text style={[styles.rarityLabel, { color: colors.rarity.legendary }]}>Legend</Text>
                    </View>
                </View>

                {/* Sticker Grid */}
                {stickers.length === 0 ? (
                    renderEmptyState()
                ) : (
                    <FlatList
                        data={stickers}
                        keyExtractor={(item) => item.id}
                        numColumns={3}
                        contentContainerStyle={styles.grid}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View style={styles.gridItem}>
                                <StickerCard
                                    name={item.name}
                                    rarity={item.rarity}
                                    emoji={item.emoji}
                                    size="medium"
                                />
                            </View>
                        )}
                    />
                )}
            </View>

            <NavBar activeTab="collection" onTabChange={onTabChange} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.primary,
    },
    content: {
        flex: 1,
        padding: spacing.md,
    },
    statsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    totalCount: {
        fontSize: 16,
        color: colors.accent.cyan,
        fontWeight: '600',
    },
    rarityRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: spacing.lg,
    },
    rarityBadge: {
        alignItems: 'center',
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        backgroundColor: colors.background.card,
        borderRadius: borderRadius.md,
        borderWidth: 1,
        minWidth: 70,
    },
    rarityCount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.text.primary,
    },
    rarityLabel: {
        fontSize: 10,
        fontWeight: '600',
        marginTop: 2,
    },
    grid: {
        paddingBottom: spacing.xxl,
    },
    gridItem: {
        flex: 1,
        alignItems: 'center',
        marginBottom: spacing.md,
        maxWidth: '33.33%',
    },
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
    },
    emptyEmoji: {
        fontSize: 64,
        marginBottom: spacing.md,
    },
    emptyTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.text.primary,
        marginBottom: spacing.sm,
    },
    emptyText: {
        fontSize: 14,
        color: colors.text.muted,
        textAlign: 'center',
        lineHeight: 20,
    },
});

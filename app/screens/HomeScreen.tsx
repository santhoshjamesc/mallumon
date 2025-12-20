import { useEffect, useRef, useState } from "react";
import { Animated, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import NavBar from "../components/NavBar";
import SpawnRadar from "../components/SpawnRadar";
import StickerCard from "../components/StickerCard";
import TopBar from "../components/TopBar";
import { getRandomSticker, useCollection } from '../context/CollectionContext';
import { borderRadius, colors, shadows, spacing } from '../theme/theme';

interface HomeScreenProps {
  onTabChange?: (tab: string) => void;
}

export default function HomeScreen({ onTabChange }: HomeScreenProps) {
  const { stickers, addSticker, totalCaught, streak } = useCollection();
  const [spawnActive, setSpawnActive] = useState(false);
  const [currentRarity, setCurrentRarity] = useState<'common' | 'rare' | 'epic' | 'legendary'>('common');
  const [currentSticker, setCurrentSticker] = useState<{ name: string; emoji: string; rarity: 'common' | 'rare' | 'epic' | 'legendary' } | null>(null);
  const totalStickers = 100;

  const catchButtonScale = useRef(new Animated.Value(1)).current;
  const catchButtonGlow = useRef(new Animated.Value(0)).current;

  // Get recent catches (last 3)
  const recentCatches = stickers.slice(0, 3);

  // Simulate random spawns
  useEffect(() => {
    const spawnInterval = setInterval(() => {
      const shouldSpawn = Math.random() > 0.7;
      if (shouldSpawn && !spawnActive) {
        const rarities: Array<'common' | 'rare' | 'epic' | 'legendary'> = ['common', 'rare', 'epic', 'legendary'];
        const weights = [0.6, 0.25, 0.12, 0.03];
        let random = Math.random();
        let selectedRarity: 'common' | 'rare' | 'epic' | 'legendary' = 'common';

        for (let i = 0; i < weights.length; i++) {
          random -= weights[i];
          if (random <= 0) {
            selectedRarity = rarities[i];
            break;
          }
        }

        const sticker = getRandomSticker(selectedRarity);
        setCurrentRarity(selectedRarity);
        setCurrentSticker(sticker);
        setSpawnActive(true);

        // Animate catch button
        Animated.loop(
          Animated.sequence([
            Animated.timing(catchButtonGlow, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(catchButtonGlow, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
          { iterations: 10 }
        ).start();

        // Auto-reset after 10 seconds
        setTimeout(() => {
          setSpawnActive(false);
          setCurrentSticker(null);
          catchButtonGlow.setValue(0);
        }, 10000);
      }
    }, 5000);

    return () => clearInterval(spawnInterval);
  }, [spawnActive]);

  const handleCatch = () => {
    Animated.sequence([
      Animated.timing(catchButtonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.spring(catchButtonScale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();

    if (spawnActive && currentSticker) {
      // Add sticker to collection
      addSticker({
        name: currentSticker.name,
        emoji: currentSticker.emoji,
        rarity: currentSticker.rarity,
        weather: 'sunny',
      });
      setSpawnActive(false);
      setCurrentSticker(null);
      catchButtonGlow.setValue(0);
    }
  };

  const progressPercent = Math.min((totalCaught / totalStickers) * 100, 100);

  return (
    <View style={styles.container}>
      <TopBar />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Spawn Radar Section */}
        <View style={styles.radarSection}>
          <SpawnRadar
            isSearching={true}
            spawnActive={spawnActive}
            rarityLevel={currentRarity}
          />
        </View>

        {/* Current Spawn Preview */}
        {spawnActive && currentSticker && (
          <View style={styles.spawnPreview}>
            <Text style={styles.spawnPreviewEmoji}>{currentSticker.emoji}</Text>
            <Text style={styles.spawnPreviewName}>{currentSticker.name}</Text>
          </View>
        )}

        {/* Catch Button */}
        <Animated.View style={[
          styles.catchButtonContainer,
          { transform: [{ scale: catchButtonScale }] }
        ]}>
          <TouchableOpacity
            style={[
              styles.catchButton,
              spawnActive && styles.catchButtonActive
            ]}
            onPress={handleCatch}
            activeOpacity={0.8}
          >
            <Text style={styles.catchButtonText}>
              {spawnActive ? '⚡ CATCH!' : '🔍 SEARCH'}
            </Text>
          </TouchableOpacity>
        </Animated.View>

        {/* Spawn Conditions Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Spawn Conditions</Text>
          <View style={styles.conditionRow}>
            <View style={styles.conditionItem}>
              <Text style={styles.conditionIcon}>☀️</Text>
              <View>
                <Text style={styles.conditionLabel}>Weather Boost</Text>
                <Text style={styles.conditionValue}>Fire +30%</Text>
              </View>
            </View>
            <View style={styles.conditionItem}>
              <Text style={styles.conditionIcon}>🌙</Text>
              <View>
                <Text style={styles.conditionLabel}>Time Bonus</Text>
                <Text style={styles.conditionValue}>Afternoon Active</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Collection Progress Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Collection Progress</Text>
            <Text style={styles.collectionCount}>{totalCaught}/{totalStickers}</Text>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
          </View>
          <View style={styles.streakRow}>
            <Text style={styles.streakIcon}>🔥</Text>
            <Text style={styles.streakText}>Streak: {streak} days</Text>
          </View>
        </View>

        {/* Recent Catches */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Recent Catches</Text>
          <View style={styles.recentCatches}>
            {recentCatches.length > 0 ? (
              recentCatches.map((sticker, index) => (
                <StickerCard
                  key={sticker.id || index}
                  name={sticker.name}
                  rarity={sticker.rarity}
                  emoji={sticker.emoji}
                  size="small"
                />
              ))
            ) : (
              <Text style={styles.noRecentText}>Catch stickers to see them here!</Text>
            )}
          </View>
        </View>
      </ScrollView>

      <NavBar activeTab="home" onTabChange={onTabChange} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: spacing.xxl,
  },
  radarSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: spacing.lg,
  },
  spawnPreview: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  spawnPreviewEmoji: {
    fontSize: 48,
    marginBottom: spacing.xs,
  },
  spawnPreviewName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.accent.cyan,
  },
  catchButtonContainer: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  catchButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.round,
    borderWidth: 2,
    borderColor: colors.accent.cyan,
  },
  catchButtonActive: {
    backgroundColor: colors.accent.cyan,
    ...shadows.glow.cyan,
  },
  catchButtonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  card: {
    backgroundColor: colors.background.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(0, 217, 255, 0.15)',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  cardTitle: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: spacing.sm,
  },
  collectionCount: {
    color: colors.accent.cyan,
    fontSize: 16,
    fontWeight: 'bold',
  },
  conditionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  conditionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  conditionIcon: {
    fontSize: 28,
  },
  conditionLabel: {
    color: colors.text.muted,
    fontSize: 12,
  },
  conditionValue: {
    color: colors.accent.cyan,
    fontSize: 14,
    fontWeight: '600',
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.round,
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.accent.cyan,
    borderRadius: borderRadius.round,
  },
  streakRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  streakIcon: {
    fontSize: 16,
  },
  streakText: {
    color: colors.weather.sunny,
    fontSize: 14,
    fontWeight: '600',
  },
  recentCatches: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.sm,
  },
  noRecentText: {
    color: colors.text.muted,
    fontSize: 14,
    textAlign: 'center',
    flex: 1,
  },
});

import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import CollectionStats from './components/CollectionStats';

// Mock sticker data - in real app, this would come from storage/context
const MOCK_STICKERS = {
  total: 102,
  collected: 27,
  rare: 8,
  legendary: 3,
};

export default function Collection() {
  const shimmer = useRef(new Animated.Value(0)).current;
  const { width } = useWindowDimensions();

  // Start shimmer animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmer, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmer, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [shimmer]);

  const opacity = shimmer.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1],
  });

  const cards = Array.from({ length: MOCK_STICKERS.total });
  const cardWidth = (width - 64) / 3; // 3 columns with padding

  // Mock: first N cards are "collected"
  const getCardStyle = (index: number) => {
    if (index < MOCK_STICKERS.legendary) {
      return styles.cardLegendary;
    } else if (index < MOCK_STICKERS.legendary + MOCK_STICKERS.rare) {
      return styles.cardRare;
    } else if (index < MOCK_STICKERS.collected) {
      return styles.cardCommon;
    }
    return styles.cardUncollected;
  };

  const getCardLabel = (index: number) => {
    if (index < MOCK_STICKERS.legendary) return '★★★';
    if (index < MOCK_STICKERS.legendary + MOCK_STICKERS.rare) return '★★';
    if (index < MOCK_STICKERS.collected) return '★';
    return '?';
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Stats Header */}
        <CollectionStats
          collected={MOCK_STICKERS.collected}
          total={MOCK_STICKERS.total}
          rare={MOCK_STICKERS.rare}
          legendary={MOCK_STICKERS.legendary}
        />

        {/* Section Title */}
        <Text style={styles.sectionTitle}>Your Stickers</Text>

        {/* Sticker Grid */}
        <View style={styles.grid}>
          {cards.map((_, i) => (
            <Animated.View
              key={i}
              style={[
                styles.card,
                { width: cardWidth },
                getCardStyle(i),
                i >= MOCK_STICKERS.collected && { opacity },
              ]}
            >
              <Text style={styles.cardText}>{getCardLabel(i)}</Text>
              <Text style={styles.cardNumber}>#{String(i + 1).padStart(3, '0')}</Text>
            </Animated.View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A3C',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  sectionTitle: {
    color: '#E9D5FF',
    fontSize: 18,
    fontWeight: '700',
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    justifyContent: 'flex-start',
  },
  card: {
    aspectRatio: 1,
    borderRadius: 16,
    marginHorizontal: 4,
    marginVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardUncollected: {
    backgroundColor: '#2D1B4E',
    borderWidth: 2,
    borderColor: '#4C1D95',
    borderStyle: 'dashed',
  },
  cardCommon: {
    backgroundColor: '#4C1D95',
    borderWidth: 2,
    borderColor: '#7C3AED',
  },
  cardRare: {
    backgroundColor: '#5B21B6',
    borderWidth: 2,
    borderColor: '#FBBF24',
  },
  cardLegendary: {
    backgroundColor: '#7C3AED',
    borderWidth: 2,
    borderColor: '#F59E0B',
    shadowColor: '#F59E0B',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
  },
  cardText: {
    color: '#E9D5FF',
    fontSize: 18,
    fontWeight: '700',
  },
  cardNumber: {
    color: '#A78BFA',
    fontSize: 10,
    fontWeight: '600',
    marginTop: 4,
  },
});

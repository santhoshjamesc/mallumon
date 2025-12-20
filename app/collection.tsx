import { useEffect, useRef } from 'react';
import { Animated, ScrollView, StyleSheet, useWindowDimensions, View } from 'react-native';

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

  const cards = Array.from({ length: 102 });
  const cardWidth = (width - 80) / 3; // spacing adjustment

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.grid}>
        {cards.map((_, i) => (
          <Animated.View
            key={i}
            style={[
              styles.card,
              { width: cardWidth, opacity },
            ]}
          />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A3C',
    paddingVertical: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  card: {
    aspectRatio: 1, // keeps them square
    backgroundColor: '#3A0CA3',
    borderRadius: 16,
    marginVertical: 10,
  },
});

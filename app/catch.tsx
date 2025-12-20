import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Catch() {
  const [searching, setSearching] = useState(false);
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (searching) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 1000,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
  }, [searching, pulseAnim]);

  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5],
  });

  const opacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.6, 0],
  });

  return (
    <View style={styles.container}>
      {searching ? (
        <>
          <View style={styles.scannerContainer}>
            <Animated.View
              style={[
                styles.pulseCircle,
                {
                  transform: [{ scale }],
                  opacity,
                },
              ]}
            />
            <View style={styles.centerDot} />
          </View>
          <Text style={styles.text}>Searching for nearby connections...</Text>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => setSearching(true)} style={styles.searchButton}>
            <Ionicons name="search" size={60} color="#E0AAFF" />
          </TouchableOpacity>
          <Text style={styles.text}>Tap to start searching</Text>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A3C',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scannerContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#9D4EDD',
  },
  centerDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#C77DFF',
  },
  text: {
    color: '#E0AAFF',
    fontSize: 16,
    marginTop: 30,
  },
  searchButton: {
    backgroundColor: '#5A189A',
    padding: 30,
    borderRadius: 100,
  },
});

import { useRouter } from 'expo-router';
import { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';

export default function Splash() {
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const riseAnim = useRef(new Animated.Value(50)).current; // start below
  const router = useRouter();

  useEffect(() => {
    // cartoon rise + bounce animation
    Animated.spring(riseAnim, {
      toValue: 0,
      friction: 3,
      tension: 80,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start(() => router.replace('/home'));
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <Animated.Text
        style={[
          styles.title,
          {
            transform: [{ translateY: riseAnim }],
          },
        ]}
      >
        Mallumon
      </Animated.Text>

      <View style={styles.bottomTextWrapper}>
        <Text style={styles.subtitle}>Powered by Zorqent</Text>
      </View>
    </Animated.View>
  );
}

const { height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6A0DAD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 48,
    fontWeight: '900',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'System',
  },
  bottomTextWrapper: {
    position: 'absolute',
    bottom: height * 0.08, // ~8% from bottom
    alignItems: 'center',
  },
  subtitle: {
    color: '#E0CFFF',
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

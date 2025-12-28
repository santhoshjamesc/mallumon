import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

export default function Home() {
  const router = useRouter();
  const floatAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;

  const [currentTime, setCurrentTime] = useState(new Date());
  const [locationName, setLocationName] = useState('Locating...');
  const [locationStatus, setLocationStatus] = useState('GPS Active');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationName('Permission Denied');
        return;
      }

      try {
        let location = await Location.getCurrentPositionAsync({});
        let address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        });

        if (address && address.length > 0) {
          setLocationName(address[0].city || address[0].name || 'Unknown');
          setLocationStatus(address[0].region || address[0].country || 'GPS Active');
        } else {
          setLocationName('Unknown Loc');
        }
      } catch (error) {
        setLocationName('Error');
      }
    })();
  }, []);

  // Floating animation for logo
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [floatAnim]);

  // Glow pulse animation
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [glowAnim]);

  const floatTranslate = floatAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -10],
  });

  const glowOpacity = glowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.8],
  });

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <View style={styles.container}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Animated.View
            style={[
              styles.logoContainer,
              { transform: [{ translateY: floatTranslate }] },
            ]}
          >
            <Animated.View style={[styles.glow, { opacity: glowOpacity }]} />
            <View style={styles.logoInner}>
              <MaterialIcons name="catching-pokemon" size={48} color="#E9D5FF" />
            </View>
          </Animated.View>
          <Text style={styles.title}>Mallumon</Text>
          <Text style={styles.subtitle}>Catch 'em all in the real world</Text>
        </View>

        {/* Quick Stats */}
        {/* <View style={styles.statsRow}>
        <View style={styles.statCard}>
          <MaterialIcons name="collections" size={24} color="#8B5CF6" />
          <Text style={styles.statNumber}>27</Text>
          <Text style={styles.statLabel}>Collected</Text>
        </View>
        <View style={styles.statCard}>
          <MaterialIcons name="star" size={24} color="#FBBF24" />
          <Text style={styles.statNumber}>8</Text>
          <Text style={styles.statLabel}>Rare</Text>
        </View>
        <View style={styles.statCard}>
          <FontAwesome5 name="crown" size={20} color="#F59E0B" />
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Legendary</Text>
        </View>
      </View> */}

        {/* Action Cards
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/catch')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#7C3AED', '#5B21B6']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Ionicons name="search" size={32} color="#E9D5FF" />
            <Text style={styles.actionTitle}>Hunt Stickers</Text>
            <Text style={styles.actionDesc}>Find nearby spawns</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => router.push('/collection')}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={['#8B5CF6', '#6D28D9']}
            style={styles.actionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <MaterialIcons name="collections-bookmark" size={32} color="#E9D5FF" />
            <Text style={styles.actionTitle}>My Collection</Text>
            <Text style={styles.actionDesc}>View all stickers</Text>
          </LinearGradient>
        </TouchableOpacity> */}
        {/* </View> */}

        {/* Info Cards */}
        <View style={styles.infoRow}>
          <View style={styles.infoCard}>
            <Ionicons name="location" size={20} color="#8B5CF6" />
            <Text style={styles.infoText} numberOfLines={1}>{locationName}</Text>
          </View>
          <View style={styles.infoCard}>
            <Ionicons name="time" size={20} color="#8B5CF6" />
            <Text style={styles.infoText} numberOfLines={1}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          <View style={styles.infoCard}>
            <MaterialIcons name="my-location" size={20} color="#8B5CF6" />
            <Text style={styles.infoText} numberOfLines={1}>{locationStatus}</Text>
          </View>
        </View>

        {/* Daily Tip */}
        <View style={styles.tipCard}>
          <View style={styles.tipHeader}>
            <Ionicons name="bulb" size={20} color="#FBBF24" />
            <Text style={styles.tipTitle}>Daily Tip</Text>
          </View>
          <Text style={styles.tipText}>
            Rare stickers spawn more frequently during sunset hours! 🌅
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A3C',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  safeAreaViewContainer: {
    flex: 1,
    backgroundColor: '#1A0A3C',
    paddingHorizontal: 16,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  glow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#8B5CF6',
  },
  logoInner: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#4C1D95',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#7C3AED',
  },
  title: {
    color: '#E9D5FF',
    fontSize: 36,
    fontWeight: '800',
    letterSpacing: 1,
  },
  subtitle: {
    color: '#A78BFA',
    fontSize: 14,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#2D1B4E',
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#4C1D95',
  },
  statNumber: {
    color: '#E9D5FF',
    fontSize: 24,
    fontWeight: '800',
    marginTop: 8,
  },
  statLabel: {
    color: '#A78BFA',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 20,
    overflow: 'hidden',
  },
  actionGradient: {
    padding: 20,
    alignItems: 'center',
    minHeight: 120,
    justifyContent: 'center',
  },
  actionTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginTop: 8,
  },
  actionDesc: {
    color: '#E9D5FF',
    fontSize: 12,
    marginTop: 2,
    opacity: 0.8,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  infoCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2D1B4E',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  infoText: {
    color: '#E9D5FF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
    textAlign: 'center',
  },
  tipCard: {
    backgroundColor: '#2D1B4E',
    borderRadius: 16,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FBBF24',
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    color: '#FBBF24',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 8,
  },
  tipText: {
    color: '#E9D5FF',
    fontSize: 13,
    lineHeight: 18,
  },
});

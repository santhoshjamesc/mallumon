import { MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BottomNav() {
  const router = useRouter();
  const path = usePathname();

  const tabs = [
    { name: 'Home', icon: 'home', route: '/home' },
    { name: 'Catch', icon: 'catching-pokemon', route: '/catch' },
    { name: 'Collection', icon: 'collections', route: '/collection' },
  ];

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => router.replace(tab.route)}
          style={styles.tab}
        >
          <MaterialIcons
            name={tab.icon as any}
            size={24}
            color={path === tab.route ? '#FFD700' : 'white'}
          />
          <Text
            style={[
              styles.text,
              path === tab.route && { color: '#FFD700' },
            ]}
          >
            {tab.name}
          </Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4B0082',
    paddingVertical: 10,
  },
  safeAreaViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#4B0082',
    // paddingVerti,
  },
  tab: { alignItems: 'center' },
  text: { color: 'white', fontSize: 12, marginTop: 2 },
});

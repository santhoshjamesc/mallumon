import { MaterialIcons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
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
    <SafeAreaView edges={['bottom', 'left', 'right']} style={styles.safeAreaViewContainer}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.name}
          onPress={() => router.replace(tab.route)}
          style={styles.tab}
          activeOpacity={0.7}
        >
          <MaterialIcons
            name={tab.icon as any}
            size={26}
            color={path === tab.route ? '#FBBF24' : '#A78BFA'}
          />
          <Text
            style={[
              styles.text,
              path === tab.route && { color: '#FBBF24', fontWeight: 'bold' },
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
  safeAreaViewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2D1B4E',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#4C1D95',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  tab: {
    alignItems: 'center',
    paddingHorizontal: 20,
    minWidth: 80,
    paddingBottom: 4,
  },
  text: {
    color: '#A78BFA',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '500',
  },
});

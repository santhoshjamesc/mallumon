import { Slot, usePathname } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import BottomNav from './components/BottomNav';

export default function Layout() {
  const pathname = usePathname();

  // hide navbar only on splash
  // Only hide nav on splash screen (root route)
  const hideNav = pathname === '/';

  return (
    <View style={styles.container}>
      <Slot />
      {!hideNav && <BottomNav />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A0A3C',
  },
});

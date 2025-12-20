import { StyleSheet, Text, View } from 'react-native';
import LocationWeather from './components/LocationWeather';

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Mallumon</Text>
      <LocationWeather />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#1A0A3C',
    alignItems: 'center',
  },
  header: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

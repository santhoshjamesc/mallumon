import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface Location {
  lat: number;
  lon: number;
}

export default function LocationWeather() {
  const [location, setLocation] = useState<Location>({ lat: 0, lon: 0 });
  const [time, setTime] = useState<string>(new Date().toLocaleTimeString());
  const [weather, setWeather] = useState<string>('Loading...');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({
            lat: pos.coords.latitude,
            lon: pos.coords.longitude,
          }),
        (err) => console.warn(err.message)
      );
    }

    const timer = setInterval(
      () => setTime(new Date().toLocaleTimeString()),
      1000
    );

    if (location.lat && location.lon) {
      fetch(
        `https://api.weatherapi.com/v1/current.json?key=YOUR_API_KEY&q=${location.lat},${location.lon}`
      )
        .then((res) => res.json())
        .then((data) => setWeather(data.current?.condition?.text || 'N/A'))
        .catch(() => setWeather('N/A'));
    }

    return () => clearInterval(timer);
  }, [location.lat, location.lon]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Lat: {location.lat.toFixed(2)} | Lon: {location.lon.toFixed(2)}
      </Text>
      <Text style={styles.text}>Time: {time}</Text>
      <Text style={styles.text}>Weather: {weather}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  text: { color: 'white', fontSize: 16, marginBottom: 5 },
});

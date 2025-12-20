import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { borderRadius, colors, spacing } from '../theme/theme';

interface WeatherBoost {
  type: string;
  boost: number;
}

const weatherBoosts: Record<string, WeatherBoost> = {
  sunny: { type: 'Fire', boost: 30 },
  rainy: { type: 'Water', boost: 30 },
  cloudy: { type: 'Ghost', boost: 20 },
  foggy: { type: 'Mystic', boost: 25 },
  snowy: { type: 'Ice', boost: 35 },
  stormy: { type: 'Electric', boost: 40 },
};

export default function TopBar() {
  const [time, setTime] = useState<string>("");
  const [weather] = useState<string>("sunny");
  const [temp] = useState<number>(28);
  const [location] = useState<string>("Kochi");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const currentBoost = weatherBoosts[weather];
  const weatherEmoji = weather === 'sunny' ? '☀️' : weather === 'rainy' ? '🌧️' : '☁️';

  return (
    <View style={styles.topBar}>
      {/* Location */}
      <View style={styles.infoBlock}>
        <Text style={styles.emoji}>📍</Text>
        <Text style={styles.infoText}>{location}</Text>
      </View>

      {/* Weather with boost */}
      <View style={[styles.infoBlock, styles.weatherBlock]}>
        <Text style={styles.emoji}>{weatherEmoji}</Text>
        <View style={styles.weatherInfo}>
          <Text style={styles.infoText}>{temp}°C</Text>
          <Text style={styles.boostText}>{currentBoost.type} +{currentBoost.boost}%</Text>
        </View>
      </View>

      {/* Time */}
      <View style={styles.infoBlock}>
        <Text style={styles.timeText}>{time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background.glass,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 217, 255, 0.2)',
  },
  infoBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  weatherBlock: {
    backgroundColor: colors.background.card,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.round,
    borderWidth: 1,
    borderColor: colors.weather.sunny,
  },
  weatherInfo: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 16,
  },
  infoText: {
    color: colors.text.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  boostText: {
    color: colors.weather.sunny,
    fontSize: 10,
    fontWeight: 'bold',
  },
  timeText: {
    color: colors.accent.cyan,
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});

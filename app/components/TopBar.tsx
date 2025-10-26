import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TopBar() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.topBar}>
      <Text style={styles.topText}>{time}</Text>
      <Text style={styles.topText}>☀ 28°C</Text>
      <Text style={styles.topText}>📍 Kochi, IN</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#000",
  },
  topText: {
    color: "white",
    fontSize: 16,
  },
});

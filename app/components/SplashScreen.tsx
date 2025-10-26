import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

interface SplashScreenProps {
  onFinish?: () => void; // callback after 2 seconds
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onFinish) onFinish(); // notify parent to hide splash
    }, 2000); // 2 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MALLUMON</Text>
      <Text style={styles.subtitle}>powered by zorqent</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontSize: 36,
    fontWeight: "bold",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
  subtitle: {
    color: "white",
    fontSize: 14,
    marginTop: 8,
    opacity: 0.7,
  },
});

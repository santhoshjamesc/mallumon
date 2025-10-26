import React from "react";
import { View, Text, StyleSheet } from "react-native";
import TopBar from "../components/TopBar";
import NavBar from "../components/NavBar";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TopBar />
      <View style={styles.content}>
        <Text style={styles.contentText}>This is the Home Screen</Text>
      </View>
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  contentText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

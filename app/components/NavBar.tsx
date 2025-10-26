import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NavBar() {
  return (
    <View style={styles.navBar}>
      <Text style={styles.navItem}>🏠 Home</Text>
      <Text style={styles.navItem}>👤 Catch</Text>
      <Text style={styles.navItem}>⚙️ Collections</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#222",
    backgroundColor: "#000",
  },
  navItem: {
    color: "white",
    fontSize: 16,
  },
});

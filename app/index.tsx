import React, { useState } from "react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <SafeAreaView style={{ flex: 1 }}>
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <HomeScreen />
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

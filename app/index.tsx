import { useState } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import SplashScreen from "./components/SplashScreen";
import { CollectionProvider } from "./context/CollectionContext";
import CollectionScreen from "./screens/CollectionScreen";
import HomeScreen from "./screens/HomeScreen";

const DARK_BG = "#0d0d1a";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'collection':
        return <CollectionScreen onTabChange={handleTabChange} />;
      case 'hunt':
        // Hunt screen uses the same HomeScreen for now
        return <HomeScreen onTabChange={handleTabChange} />;
      case 'home':
      default:
        return <HomeScreen onTabChange={handleTabChange} />;
    }
  };

  return (
    <SafeAreaProvider>
      <CollectionProvider>
        <View style={{ flex: 1, backgroundColor: DARK_BG }}>
          <StatusBar barStyle="light-content" backgroundColor={DARK_BG} />
          <SafeAreaView style={{ flex: 1, backgroundColor: DARK_BG }}>
            {showSplash ? (
              <SplashScreen onFinish={() => setShowSplash(false)} />
            ) : (
              renderScreen()
            )}
          </SafeAreaView>
        </View>
      </CollectionProvider>
    </SafeAreaProvider>
  );
}

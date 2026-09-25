import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import HomeScreen from "./src/screens/HomeScreen";
import FavoritesScreen from "./src/screens/FavoritesScreen";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { CartProvider } from "./src/context/CartContext";
import Counter from "./src/components/Counter/Counter";
import Products from "./src/components/Products/Products";

type Screen = "home" | "favorites";

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home");

  return (
   <View style={styles.container}>
    <Counter />
    <Products />
    <StatusBar style="auto" />
  </View>
  //   <SafeAreaProvider>
  //     <FavoritesProvider>
  //       <CartProvider>
  //         <View style={styles.container}>
  //           {currentScreen === "home" ? (
  //             <HomeScreen
  //               onNavigateToFavorites={() => setCurrentScreen("favorites")}
  //             />
  //           ) : (
  //             <FavoritesScreen onGoBack={() => setCurrentScreen("home")} />
  //           )}
  //           <StatusBar style="auto" />
  //         </View>
  //       </CartProvider>
  //     </FavoritesProvider>
  //   </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
    // backgroundColor:
    //   Platform.OS === "web"
    //     ? "yellow"
    //     : Platform.OS === "ios"
    //       ? "gray"
    //       : "green",
    justifyContent: "center",
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  flatListContainer: {
    flexGrow: 0,
    marginVertical: 20,
  },
  listContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "black",
  },
  item: {
    marginHorizontal: 10,
  },
});

import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import HomeScreen from "./src/screens/HomeScreen";
import { FavoritesProvider } from "./src/context/FavoritesContext";
import { CartProvider } from "./src/context/CartContext";

export default function App() {
  return (
    <FavoritesProvider>
      <CartProvider>
        <View style={styles.container}>
          <HomeScreen />
          {/* <CategoryScreen /> */}
          <StatusBar style="auto" />
        </View>
      </CartProvider>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fdfdfd",
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

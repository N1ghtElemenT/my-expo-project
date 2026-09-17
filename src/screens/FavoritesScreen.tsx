import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  ActivityIndicator,
  StatusBar,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { Product, Theme } from "../types/home";
import { ProductCard, FavoritesBanner } from "../components/home";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

interface FavoritesScreenProps {
  onGoBack: () => void;
}

export default function FavoritesScreen({ onGoBack }: FavoritesScreenProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { width } = useWindowDimensions();

  const numColumns = width > 500 ? 3 : 2;
  const cardGap = 12;
  const cardWidth = (width - 32 - cardGap * (numColumns - 1)) / numColumns;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE_URL}/products`);
      if (!res.ok) throw new Error("Не вдалося завантажити дані");

      const data = await res.json();
      setProducts(data);
    } catch (err: any) {
      console.error(err);
      setError("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  const favoriteProducts = useMemo(() => {
    return products.filter((product) => favorites.has(product.id));
  }, [products, favorites]);

  const theme: Theme = {
    bg: isDarkMode ? "#121212" : "#FFFFFF",
    cardBg: isDarkMode ? "#1E1E1E" : "#FAFAFA",
    textPrimary: isDarkMode ? "#FFFFFF" : "#212121",
    textSecondary: isDarkMode ? "#A0A0A0" : "#757575",
    inputBg: isDarkMode ? "#2C2C2C" : "#F5F5F5",
    border: isDarkMode ? "#2C2C2C" : "#F0F0F0",
    bannerBg: isDarkMode ? "#1B382B" : "#E8F5E9",
    bannerTitle: isDarkMode ? "#A5D6A7" : "#1B5E20",
    bannerSubtitle: isDarkMode ? "#81C784" : "#4CAF50",
  };

  if (loading) {
    return (
      <SafeAreaView
        style={[styles.centerContainer, { backgroundColor: theme.bg }]}
      >
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
          Завантаження обраних товарів...
        </Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={[styles.centerContainer, { backgroundColor: theme.bg }]}
      >
        <Ionicons name="alert-circle-outline" size={48} color="#D32F2F" />
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchProducts}>
          <Text style={styles.retryText}>Спробувати знову</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.bg }]}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.bg}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
            <Ionicons
              name="arrow-back"
              size={24}
              color={theme.textPrimary}
            />
          </TouchableOpacity>
          <View style={styles.headerTitleContainer}>
            <Text style={[styles.headerTitle, { color: theme.textPrimary }]}>
              Обране ❤️
            </Text>
            <Text
              style={[styles.headerSubtitle, { color: theme.textSecondary }]}
            >
              Товари, які ви зберегли
            </Text>
          </View>
          <View style={styles.headerActions}>
            <View style={styles.themeToggleContainer}>
              <Ionicons
                name={isDarkMode ? "moon" : "sunny"}
                size={20}
                color={isDarkMode ? "#FFD54F" : "#FFA000"}
              />
              <Switch
                value={isDarkMode}
                onValueChange={setIsDarkMode}
                trackColor={{ false: "#E0E0E0", true: "#2E7D32" }}
                thumbColor={isDarkMode ? "#FFFFFF" : "#F4F3F4"}
              />
            </View>
            <TouchableOpacity
              style={[styles.settingsButton, { backgroundColor: theme.inputBg }]}
            >
              <Ionicons
                name="settings-outline"
                size={22}
                color={theme.textPrimary}
              />
            </TouchableOpacity>
          </View>
        </View>

        {favoriteProducts.length > 0 ? (
          <>
            <FavoritesBanner
              theme={theme}
              favoritesCount={favoriteProducts.length}
            />

            <View style={styles.productsGrid}>
              {favoriteProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  theme={theme}
                  isFavorite={favorites.has(product.id)}
                  onToggleFavorite={toggleFavorite}
                  onAddToCart={addToCart}
                  style={{ width: cardWidth }}
                />
              ))}
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons
              name="heart-outline"
              size={64}
              color={theme.textSecondary}
            />
            <Text style={[styles.emptyTitle, { color: theme.textPrimary }]}>
              У вас поки немає обраних товарів
            </Text>
            <Text style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
              Натисніть на серце товару, щоб додати його сюди
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 32,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
  },
  headerTitleContainer: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  headerSubtitle: {
    fontSize: 13,
    marginTop: 2,
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  themeToggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  settingsButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 12,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 64,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 16,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    marginTop: 12,
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
  },
  retryButton: {
    marginTop: 16,
    backgroundColor: "#2E7D32",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

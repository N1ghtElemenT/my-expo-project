import React, { useEffect, useState, useMemo } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import { useCart } from "../context/CartContext";
import { Category, Product, Theme } from "../types/home";
import {
  Header,
  SearchBar,
  PromoBanner,
  CategoryList,
  SortBar,
  ProductList,
} from "../components/home";
import { CartModal } from "../components/cart";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

interface HomeScreenProps {
  onNavigateToFavorites: () => void;
}

export default function HomeScreen({ onNavigateToFavorites }: HomeScreenProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("default");
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);
  const { favorites, toggleFavorite } = useFavorites();
  const { cart, cartCount, addToCart, removeFromCart, updateQuantity } = useCart();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [categoriesRes, productsRes] = await Promise.all([
        fetch(`${API_BASE_URL}/categories`),
        fetch(`${API_BASE_URL}/products`),
      ]);

      if (!categoriesRes.ok || !productsRes.ok) {
        throw new Error("Не вдалося завантажити дані");
      }

      const categoriesData = await categoriesRes.json();
      const productsData = await productsRes.json();

      setCategories(categoriesData);
      setProducts(productsData);
    } catch (err: any) {
      console.error(err);
      setError("Помилка підключення до сервера");
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    const result = products.filter((product) => {
      const matchesCategory = selectedCategoryId
        ? String(product.categoryId) === String(selectedCategoryId)
        : true;

      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

      return matchesCategory && matchesSearch;
    });

    switch (sortBy) {
      case "price_asc":
        return [...result].sort((a, b) => a.price - b.price);
      case "price_desc":
        return [...result].sort((a, b) => b.price - a.price);
      case "name_asc":
        return [...result].sort((a, b) =>
          a.title.localeCompare(b.title, "uk"),
        );
      case "name_desc":
        return [...result].sort((a, b) =>
          b.title.localeCompare(a.title, "uk"),
        );
      default:
        return result;
    }
  }, [products, selectedCategoryId, searchQuery, sortBy]);

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
          Завантаження даних...
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
        <TouchableOpacity style={styles.retryButton} onPress={fetchData}>
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
        <Header
          theme={theme}
          isDarkMode={isDarkMode}
          onToggleDarkMode={setIsDarkMode}
          cartItemsCount={cartCount}
          onCartPress={() => setIsCartVisible(true)}
          onFavoritesPress={onNavigateToFavorites}
        />

        <SearchBar
          theme={theme}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onClear={() => setSearchQuery("")}
        />

        <PromoBanner theme={theme} />

        <CategoryList
          theme={theme}
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          isDarkMode={isDarkMode}
          onSelectCategory={setSelectedCategoryId}
        />

        <SortBar
          theme={theme}
          sortBy={sortBy}
          isDarkMode={isDarkMode}
          onSortChange={setSortBy}
        />

        <ProductList
          products={filteredProducts}
          theme={theme}
          selectedCategoryId={selectedCategoryId}
          categories={categories}
          favorites={favorites}
          onToggleFavorite={toggleFavorite}
          onAddToCart={addToCart}
        />
      </ScrollView>

      <CartModal
        visible={isCartVisible}
        onClose={() => setIsCartVisible(false)}
        cartItems={cart}
        products={products}
        theme={theme}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
      />
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

import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product, Theme } from "../../types/home";
import ProductCard from "./ProductCard";

interface ProductListProps {
  products: Product[];
  theme: Theme;
  selectedCategoryId: string | null;
  categories: { id: string; name: string }[];
  favorites: Set<string>;
  onToggleFavorite: (id: string) => void;
  onAddToCart: (id: string) => void;
}

export default function ProductList({
  products,
  theme,
  selectedCategoryId,
  categories,
  favorites,
  onToggleFavorite,
  onAddToCart,
}: ProductListProps) {
  const categoryName = selectedCategoryId
    ? categories.find((c) => String(c.id) === String(selectedCategoryId))?.name ||
      "Товари"
    : "Популярні товари";

  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          {categoryName}
        </Text>
        <Text style={[styles.countText, { color: theme.textSecondary }]}>
          ({products.length})
        </Text>
      </View>

      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="basket-outline"
            size={48}
            color={theme.textSecondary}
          />
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Товарів у цій категорії поки немає
          </Text>
        </View>
      ) : (
        <View style={styles.productsGrid}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              theme={theme}
              isFavorite={favorites.has(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
            />
          ))}
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  countText: {
    fontSize: 14,
    marginLeft: 6,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
  },
  emptyText: {
    marginTop: 8,
    fontSize: 14,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: 16,
  },
});

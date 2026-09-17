import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product, Theme } from "../../types/home";

interface CartItemProps {
  product: Product;
  quantity: number;
  theme: Theme;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  isTablet: boolean;
}

export default function CartItem({
  product,
  quantity,
  theme,
  onUpdateQuantity,
  onRemove,
  isTablet,
}: CartItemProps) {
  if (isTablet) {
    return (
      <View
        style={[
          styles.tabletCard,
          { backgroundColor: theme.cardBg, borderColor: theme.border },
        ]}
      >
        <View style={styles.tabletImageContainer}>
          <Image
            source={{ uri: product.image }}
            style={styles.tabletImage}
            resizeMode="contain"
          />
          <TouchableOpacity
            style={styles.tabletFavButton}
            onPress={() => onRemove(product.id)}
          >
            <Ionicons name="close" size={16} color="#E53935" />
          </TouchableOpacity>
        </View>

        <View style={styles.tabletContent}>
          <Text
            style={[styles.tabletName, { color: theme.textPrimary }]}
            numberOfLines={2}
          >
            {product.title}
          </Text>
          <Text style={[styles.tabletPrice, { color: theme.textSecondary }]}>
            {product.price} грн/{product.unit}
          </Text>

          <View style={styles.tabletQuantityRow}>
            <TouchableOpacity
              style={[
                styles.tabletQuantityButton,
                { backgroundColor: theme.inputBg, borderColor: theme.border },
              ]}
              onPress={() => onUpdateQuantity(product.id, quantity - 1)}
            >
              <Ionicons name="remove" size={14} color={theme.textPrimary} />
            </TouchableOpacity>

            <Text
              style={[styles.tabletQuantityText, { color: theme.textPrimary }]}
            >
              {quantity}
            </Text>

            <TouchableOpacity
              style={[styles.tabletQuantityButton, { backgroundColor: "#2E7D32" }]}
              onPress={() => onUpdateQuantity(product.id, quantity + 1)}
            >
              <Ionicons name="add" size={14} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.tabletSubtotal, { color: theme.textPrimary }]}>
            Всього: {product.price * quantity}.00 грн
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { borderBottomColor: theme.border }]}>
      <Image
        source={{ uri: product.image }}
        style={styles.image}
        resizeMode="contain"
      />

      <View style={styles.content}>
        <View style={styles.topRow}>
          <View style={styles.info}>
            <Text
              style={[styles.name, { color: theme.textPrimary }]}
              numberOfLines={1}
            >
              {product.title}
            </Text>
            <Text style={[styles.price, { color: theme.textSecondary }]}>
              {product.price} грн/{product.unit}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => onRemove(product.id)}
          >
            <Ionicons name="close" size={18} color="#E53935" />
          </TouchableOpacity>
        </View>

        <View style={styles.bottomRow}>
          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={[
                styles.quantityButton,
                { backgroundColor: theme.inputBg, borderColor: theme.border },
              ]}
              onPress={() => onUpdateQuantity(product.id, quantity - 1)}
            >
              <Ionicons name="remove" size={16} color={theme.textPrimary} />
            </TouchableOpacity>

            <Text style={[styles.quantityText, { color: theme.textPrimary }]}>
              {quantity}
            </Text>

            <TouchableOpacity
              style={[styles.quantityButton, { backgroundColor: "#2E7D32" }]}
              onPress={() => onUpdateQuantity(product.id, quantity + 1)}
            >
              <Ionicons name="add" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <Text style={[styles.totalPrice, { color: theme.textPrimary }]}>
            {product.price * quantity} грн
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 12,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  info: {
    flex: 1,
    marginRight: 8,
  },
  name: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 2,
  },
  price: {
    fontSize: 13,
  },
  deleteButton: {
    padding: 4,
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityText: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 15,
    fontWeight: "bold",
  },
  tabletCard: {
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
  },
  tabletImageContainer: {
    position: "relative",
  },
  tabletImage: {
    width: "100%",
    height: 140,
    backgroundColor: "#F5F5F5",
  },
  tabletFavButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  tabletContent: {
    padding: 12,
  },
  tabletName: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 4,
  },
  tabletPrice: {
    fontSize: 13,
    marginBottom: 10,
  },
  tabletQuantityRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  tabletQuantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  tabletQuantityText: {
    fontSize: 16,
    fontWeight: "bold",
    minWidth: 20,
    textAlign: "center",
  },
  tabletSubtotal: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

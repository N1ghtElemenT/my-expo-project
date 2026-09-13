import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product, Theme } from "../../types/home";
import { CartItem as CartItemType } from "../../types/home";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

interface CartModalProps {
  visible: boolean;
  onClose: () => void;
  cartItems: CartItemType[];
  products: Product[];
  theme: Theme;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export default function CartModal({
  visible,
  onClose,
  cartItems,
  products,
  theme,
  onUpdateQuantity,
  onRemove,
}: CartModalProps) {
  const getProduct = (productId: string) =>
    products.find((p) => p.id === productId);

  const cartWithProducts = cartItems
    .map((item) => ({
      ...item,
      product: getProduct(item.productId),
    }))
    .filter((item) => item.product);

  const total = cartWithProducts.reduce(
    (sum, item) => sum + (item.product!.price * item.quantity),
    0,
  );

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity activeOpacity={1} style={[styles.sheet, { backgroundColor: theme.bg }]}>
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Кошик ({itemCount})
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>

          {cartWithProducts.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Ionicons
                name="cart-outline"
                size={64}
                color={theme.textSecondary}
              />
              <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
                Ваш кошик порожній
              </Text>
            </View>
          ) : (
            <>
              <ScrollView
                style={styles.list}
                showsVerticalScrollIndicator={false}
              >
                {cartWithProducts.map((item) => (
                  <CartItem
                    key={item.productId}
                    product={item.product!}
                    quantity={item.quantity}
                    theme={theme}
                    onUpdateQuantity={onUpdateQuantity}
                    onRemove={onRemove}
                  />
                ))}
              </ScrollView>

              <CartSummary
                total={total}
                itemCount={itemCount}
                theme={theme}
              />
            </>
          )}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },
  sheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 32,
    maxHeight: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  closeButton: {
    padding: 4,
  },
  list: {
    flexGrow: 0,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 12,
  },
});

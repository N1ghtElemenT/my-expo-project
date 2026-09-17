import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Product, Theme, CartItem as CartItemType } from "../../types/home";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const TABLET_BREAKPOINT = 768;

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
  const { width } = useWindowDimensions();
  const isTablet = width >= TABLET_BREAKPOINT;

  const getProduct = (productId: string) =>
    products.find((p) => p.id === productId);

  const cartWithProducts = cartItems
    .map((item) => ({
      ...item,
      product: getProduct(item.productId),
    }))
    .filter((item) => item.product);

  const total = cartWithProducts.reduce(
    (sum, item) => sum + item.product!.price * item.quantity,
    0,
  );

  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const numColumns = isTablet ? (width >= 900 ? 3 : 2) : 1;

  const cartContent = (
    <>
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
      ) : isTablet ? (
        <View style={styles.tabletLayout}>
          <View style={styles.tabletItemsSection}>
            <Text
              style={[styles.tabletSectionTitle, { color: theme.textPrimary }]}
            >
              Товари у кошику ({itemCount})
            </Text>
            <ScrollView
              style={styles.tabletItemsScroll}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.tabletItemsGrid}>
                {cartWithProducts.map((item) => (
                  <View
                    key={item.productId}
                    style={[
                      styles.tabletCardWrapper,
                      {
                        width: `${100 / numColumns - 1}%`,
                        marginLeft: "0.5%",
                        marginRight: "0.5%",
                      },
                    ]}
                  >
                    <CartItem
                      product={item.product!}
                      quantity={item.quantity}
                      theme={theme}
                      onUpdateQuantity={onUpdateQuantity}
                      onRemove={onRemove}
                      isTablet={isTablet}
                    />
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>

          <View
            style={[
              styles.tabletSummarySection,
              { borderLeftColor: theme.border },
            ]}
          >
            <CartSummary
              total={total}
              itemCount={itemCount}
              theme={theme}
              isTablet={isTablet}
            />
          </View>
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
                isTablet={false}
              />
            ))}
          </ScrollView>

          <CartSummary
            total={total}
            itemCount={itemCount}
            theme={theme}
            isTablet={false}
          />
        </>
      )}
    </>
  );

  if (isTablet) {
    return (
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}
        presentationStyle="fullScreen"
      >
        <View style={[styles.tabletContainer, { backgroundColor: theme.bg }]}>
          <View
            style={[
              styles.tabletHeader,
              { borderBottomColor: theme.border },
            ]}
          >
            <TouchableOpacity onPress={onClose} style={styles.backButton}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={theme.textPrimary}
              />
            </TouchableOpacity>
            <Text
              style={[styles.tabletTitle, { color: theme.textPrimary }]}
            >
              Огляд кошика
            </Text>
            <View style={styles.tabletHeaderRight}>
              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons
                  name="notifications-outline"
                  size={22}
                  color={theme.textPrimary}
                />
              </TouchableOpacity>
            </View>
          </View>

          {cartContent}
        </View>
      </Modal>
    );
  }

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
        <TouchableOpacity
          activeOpacity={1}
          style={[styles.sheet, { backgroundColor: theme.bg }]}
        >
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.textPrimary }]}>
              Кошик ({itemCount})
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color={theme.textPrimary} />
            </TouchableOpacity>
          </View>

          {cartContent}
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
  tabletContainer: {
    flex: 1,
  },
  tabletHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  tabletTitle: {
    fontSize: 22,
    fontWeight: "bold",
    flex: 1,
  },
  tabletHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  tabletLayout: {
    flex: 1,
    flexDirection: "row",
  },
  tabletItemsSection: {
    flex: 0.6,
    padding: 24,
  },
  tabletSectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
  },
  tabletItemsScroll: {
    flex: 1,
  },
  tabletItemsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tabletCardWrapper: {
    marginBottom: 16,
  },
  tabletSummarySection: {
    flex: 0.4,
    borderLeftWidth: 1,
    padding: 32,
  },
});

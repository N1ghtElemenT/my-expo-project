import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../types/home";

interface CartSummaryProps {
  total: number;
  itemCount: number;
  theme: Theme;
  isTablet: boolean;
}

export default function CartSummary({
  total,
  itemCount,
  theme,
  isTablet,
}: CartSummaryProps) {
  const deliveryThreshold = 300;
  const isDeliveryFree = total >= deliveryThreshold;
  const deliveryText = isDeliveryFree
    ? "Безкоштовна"
    : `Безкоштовна (від ${deliveryThreshold} грн)`;
  const finalTotal = isDeliveryFree ? total : total;

  if (isTablet) {
    return (
      <View style={styles.tabletContainer}>
        <Text style={[styles.tabletTitle, { color: theme.textPrimary }]}>
          Підсумок
        </Text>

        <View style={styles.tabletRow}>
          <Text style={[styles.tabletLabel, { color: theme.textSecondary }]}>
            Сума товарів:
          </Text>
          <Text style={[styles.tabletValue, { color: theme.textPrimary }]}>
            {total}.00 грн
          </Text>
        </View>

        <View style={styles.tabletRow}>
          <Text style={[styles.tabletLabel, { color: theme.textSecondary }]}>
            Доставка:
          </Text>
          <Text
            style={[
              styles.tabletDeliveryValue,
              { color: isDeliveryFree ? "#2E7D32" : theme.textPrimary },
            ]}
          >
            {deliveryText}
          </Text>
        </View>

        <View
          style={[styles.tabletDivider, { borderTopColor: theme.border }]}
        />

        <View style={styles.tabletRow}>
          <Text style={[styles.tabletTotalLabel, { color: theme.textPrimary }]}>
            Всього:
          </Text>
          <Text style={[styles.tabletTotalValue, { color: theme.textPrimary }]}>
            {finalTotal}.00 грн
          </Text>
        </View>

        <View
          style={[
            styles.tabletAddressBlock,
            { backgroundColor: theme.inputBg, borderColor: theme.border },
          ]}
        >
          <View style={styles.tabletAddressHeader}>
            <Text
              style={[styles.tabletAddressLabel, { color: theme.textPrimary }]}
            >
              Адреса доставки:
            </Text>
            <TouchableOpacity>
              <Ionicons
                name="create-outline"
                size={18}
                color="#2E7D32"
              />
            </TouchableOpacity>
          </View>
          <Text
            style={[styles.tabletAddressText, { color: theme.textSecondary }]}
          >
            вул. Хрещатик, 22, м. Київ, 01001
          </Text>
        </View>

        <TouchableOpacity style={styles.tabletCheckoutButton} disabled>
          <Ionicons name="card-outline" size={20} color="#FFFFFF" />
          <Text style={styles.tabletCheckoutText}>
            Оплатити замовлення
          </Text>
        </TouchableOpacity>

        <Text style={[styles.comingSoon, { color: theme.textSecondary }]}>
          Оплата буде доступна незабаром
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { borderTopColor: theme.border }]}>
      <View style={styles.summaryRow}>
        <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
          Товарів: {itemCount}
        </Text>
        <View style={styles.totalContainer}>
          <Text style={[styles.totalLabel, { color: theme.textSecondary }]}>
            Разом:
          </Text>
          <Text style={[styles.totalAmount, { color: theme.textPrimary }]}>
            {total} грн
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.payButton} disabled>
        <Ionicons name="card-outline" size={20} color="#FFFFFF" />
        <Text style={styles.payButtonText}>Оплатити замовлення</Text>
      </TouchableOpacity>

      <Text style={[styles.comingSoon, { color: theme.textSecondary }]}>
        Оплата буде доступна незабаром
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    paddingTop: 16,
    paddingBottom: 8,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  summaryLabel: {
    fontSize: 14,
  },
  totalContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  totalLabel: {
    fontSize: 14,
  },
  totalAmount: {
    fontSize: 20,
    fontWeight: "bold",
  },
  payButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BDBDBD",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  payButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  comingSoon: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
  tabletContainer: {
    flex: 1,
  },
  tabletTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  tabletRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  tabletLabel: {
    fontSize: 14,
  },
  tabletValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabletDeliveryValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  tabletDivider: {
    borderTopWidth: 1,
    marginVertical: 16,
  },
  tabletTotalLabel: {
    fontSize: 16,
    fontWeight: "bold",
  },
  tabletTotalValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  tabletAddressBlock: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginTop: 16,
    marginBottom: 20,
  },
  tabletAddressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  tabletAddressLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
  tabletAddressText: {
    fontSize: 13,
    lineHeight: 18,
  },
  tabletCheckoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BDBDBD",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  tabletCheckoutText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

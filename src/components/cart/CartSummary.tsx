import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../types/home";

interface CartSummaryProps {
  total: number;
  itemCount: number;
  theme: Theme;
}

export default function CartSummary({ total, itemCount, theme }: CartSummaryProps) {
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
});

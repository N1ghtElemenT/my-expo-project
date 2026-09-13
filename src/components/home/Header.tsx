import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Switch } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../types/home";

interface HeaderProps {
  theme: Theme;
  isDarkMode: boolean;
  onToggleDarkMode: (val: boolean) => void;
  cartItemsCount: number;
  onCartPress: () => void;
}

export default function Header({
  theme,
  isDarkMode,
  onToggleDarkMode,
  cartItemsCount,
  onCartPress,
}: HeaderProps) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={[styles.greetingTitle, { color: theme.textPrimary }]}>
          Привіт, Нікіта 👋
        </Text>
        <Text style={[styles.greetingSubtitle, { color: theme.textSecondary }]}>
          Раді бачити тебе знову!
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
            onValueChange={onToggleDarkMode}
            trackColor={{ false: "#E0E0E0", true: "#2E7D32" }}
            thumbColor={isDarkMode ? "#FFFFFF" : "#F4F3F4"}
          />
        </View>
        <TouchableOpacity
          style={[styles.cartButton, { backgroundColor: theme.inputBg }]}
          onPress={onCartPress}
        >
          <Ionicons
            name="cart-outline"
            size={22}
            color={theme.textPrimary}
          />
          {cartItemsCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>
                {cartItemsCount > 99 ? "99+" : cartItemsCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.notificationButton, { backgroundColor: theme.inputBg }]}
        >
          <Ionicons
            name="notifications-outline"
            size={22}
            color={theme.textPrimary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
    marginBottom: 16,
  },
  greetingTitle: {
    fontSize: 20,
    fontWeight: "bold",
  },
  greetingSubtitle: {
    fontSize: 14,
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
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "#E53935",
    borderRadius: 10,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "bold",
  },
});

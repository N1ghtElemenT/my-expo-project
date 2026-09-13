import React from "react";
import { StyleSheet, Text, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../types/home";

interface SortOption {
  key: string;
  label: string;
}

interface SortBarProps {
  theme: Theme;
  sortBy: string;
  isDarkMode: boolean;
  onSortChange: (key: string) => void;
}

const SORT_OPTIONS: SortOption[] = [
  { key: "price_asc", label: "Ціна ↑" },
  { key: "price_desc", label: "Ціна ↓" },
  { key: "name_asc", label: "А → Я" },
  { key: "name_desc", label: "Я → А" },
];

export default function SortBar({
  theme,
  sortBy,
  isDarkMode,
  onSortChange,
}: SortBarProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.sortContainer}
    >
      {SORT_OPTIONS.map((option) => {
        const isActive = sortBy === option.key;
        return (
          <TouchableOpacity
            key={option.key}
            style={[
              styles.sortChip,
              {
                backgroundColor: isActive
                  ? "#2E7D32"
                  : isDarkMode
                    ? "#2C2C2C"
                    : "#F5F5F5",
                borderColor: isActive ? "#2E7D32" : theme.border,
              },
            ]}
            onPress={() => onSortChange(option.key)}
          >
            <Ionicons
              name={
                option.key.startsWith("price") ? "cash-outline" : "text-outline"
              }
              size={14}
              color={isActive ? "#FFFFFF" : theme.textSecondary}
            />
            <Text
              style={[
                styles.sortChipText,
                { color: isActive ? "#FFFFFF" : theme.textPrimary },
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sortContainer: {
    gap: 8,
    marginBottom: 12,
  },
  sortChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  sortChipText: {
    fontSize: 12,
    fontWeight: "600",
  },
});

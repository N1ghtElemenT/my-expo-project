import React from "react";
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Category, Theme } from "../../types/home";

interface CategoryListProps {
  theme: Theme;
  categories: Category[];
  selectedCategoryId: string | null;
  isDarkMode: boolean;
  onSelectCategory: (id: string | null) => void;
}

export default function CategoryList({
  theme,
  categories,
  selectedCategoryId,
  isDarkMode,
  onSelectCategory,
}: CategoryListProps) {
  return (
    <>
      <View style={styles.sectionHeader}>
        <Text style={[styles.sectionTitle, { color: theme.textPrimary }]}>
          Категорії
        </Text>
        {selectedCategoryId && (
          <TouchableOpacity onPress={() => onSelectCategory(null)}>
            <Text style={styles.seeAllText}>Показати всі</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoriesList}
      >
        <TouchableOpacity
          style={styles.categoryCard}
          onPress={() => onSelectCategory(null)}
        >
          <View
            style={[
              styles.categoryIconContainer,
              {
                backgroundColor:
                  selectedCategoryId === null
                    ? "#2E7D32"
                    : isDarkMode
                      ? "#2C2C2C"
                      : "#E8F5E9",
              },
            ]}
          >
            <MaterialCommunityIcons
              name="apps"
              size={32}
              color={selectedCategoryId === null ? "#FFFFFF" : "#2E7D32"}
            />
          </View>
          <Text
            style={[
              styles.categoryName,
              {
                color:
                  selectedCategoryId === null ? "#2E7D32" : theme.textPrimary,
                fontWeight: selectedCategoryId === null ? "bold" : "normal",
              },
            ]}
          >
            Всі
          </Text>
        </TouchableOpacity>

        {categories.map((item) => {
          const isSelected = String(selectedCategoryId) === String(item.id);
          return (
            <TouchableOpacity
              key={item.id}
              style={styles.categoryCard}
              onPress={() => onSelectCategory(item.id)}
            >
              <View
                style={[
                  styles.categoryIconContainer,
                  {
                    backgroundColor: isSelected
                      ? "#2E7D32"
                      : isDarkMode
                        ? "#2C2C2C"
                        : item.bgColor,
                  },
                ]}
              >
                <MaterialCommunityIcons
                  name={item.icon as any}
                  size={32}
                  color={isSelected ? "#FFFFFF" : item.iconColor}
                />
              </View>
              <Text
                style={[
                  styles.categoryName,
                  {
                    color: isSelected ? "#2E7D32" : theme.textPrimary,
                    fontWeight: isSelected ? "bold" : "normal",
                  },
                ]}
                numberOfLines={2}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
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
  seeAllText: {
    fontSize: 13,
    color: "#2E7D32",
    fontWeight: "600",
  },
  categoriesList: {
    paddingBottom: 16,
  },
  categoryCard: {
    alignItems: "center",
    marginRight: 16,
    width: 72,
  },
  categoryIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
  },
});

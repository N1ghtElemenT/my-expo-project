import React from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../types/home";

interface SearchBarProps {
  theme: Theme;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClear: () => void;
}

export default function SearchBar({
  theme,
  searchQuery,
  onSearchChange,
  onClear,
}: SearchBarProps) {
  return (
    <View style={[styles.searchContainer, { backgroundColor: theme.inputBg }]}>
      <Ionicons
        name="search-outline"
        size={20}
        color="#9E9E9E"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Пошук товарів..."
        placeholderTextColor="#9E9E9E"
        value={searchQuery}
        onChangeText={onSearchChange}
        style={[styles.searchInput, { color: theme.textPrimary }]}
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity onPress={onClear}>
          <Ionicons name="close-circle" size={18} color="#9E9E9E" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    paddingHorizontal: 16,
    height: 44,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
  },
});

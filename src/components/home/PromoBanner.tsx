import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../types/home";

interface PromoBannerProps {
  theme: Theme;
}

export default function PromoBanner({ theme }: PromoBannerProps) {
  return (
    <View style={[styles.banner, { backgroundColor: theme.bannerBg }]}>
      <View style={styles.bannerContent}>
        <View style={styles.discountTag}>
          <Text style={styles.discountText}>Знижки до 50%</Text>
        </View>
        <Text style={[styles.bannerTitle, { color: theme.bannerTitle }]}>
          Свіжі продукти{"\n"}для вашого столу
        </Text>
        <Text style={[styles.bannerSubtitle, { color: theme.bannerSubtitle }]}>
          Овочі, фрукти, молочні продукти та багато іншого
        </Text>
        <TouchableOpacity style={styles.bannerButton}>
          <Text style={styles.bannerButtonText}>Перейти</Text>
          <Ionicons name="arrow-forward" size={16} color="#1B5E20" />
        </TouchableOpacity>
      </View>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/3137/3137044.png",
        }}
        style={styles.bannerImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
  },
  discountTag: {
    backgroundColor: "#2E7D32",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 8,
  },
  discountText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "bold",
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 22,
    marginBottom: 6,
  },
  bannerSubtitle: {
    fontSize: 12,
    marginBottom: 12,
  },
  bannerButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  bannerButtonText: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#1B5E20",
    marginRight: 4,
  },
  bannerImage: {
    width: 110,
    height: 110,
    marginLeft: 8,
  },
});

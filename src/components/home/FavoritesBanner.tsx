import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../../types/home";

interface FavoritesBannerProps {
  theme: Theme;
  favoritesCount: number;
}

export default function FavoritesBanner({
  theme,
  favoritesCount,
}: FavoritesBannerProps) {
  return (
    <View style={[styles.banner, { backgroundColor: theme.bannerBg }]}>
      <View style={styles.bannerContent}>
        <View style={styles.iconContainer}>
          <Ionicons name="heart" size={28} color="#E53935" />
        </View>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.bannerTitle }]}>
            У вас {favoritesCount} {favoritesCount === 1 ? "улюблений" : favoritesCount < 5 ? "улюблених" : "улюблених"} товар{favoritesCount !== 1 ? "и" : ""}
          </Text>
          <Text style={[styles.subtitle, { color: theme.bannerSubtitle }]}>
            Збережіть ці улюблені продукти для швидкого доступу
          </Text>
        </View>
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
    marginBottom: 20,
    overflow: "hidden",
  },
  bannerContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#FFEBEE",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 2,
  },
  subtitle: {
    fontSize: 12,
  },
  bannerImage: {
    width: 56,
    height: 56,
    marginLeft: 8,
  },
});

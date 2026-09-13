import { View, Text, StyleSheet, TextInput, Button, Image } from "react-native";
import CategoryType from "../types/CategoryType";
import { useEffect, useState } from "react";

export default function CategoryScreen() {
  const URL = `${process.env.EXPO_PUBLIC_API_BASE_URL}/categories`;
  const [category, setCategory] = useState<CategoryType>({
    name: "",
    image: "",
    color: "",
  });
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const fetchCategories = () => {
    fetch(URL)
      .then((res) => res.json())
      .then((data: CategoryType[]) => setCategories(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = () => {
    if (!category.name && !category.image && !category.color) return;
    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(category),
    })
      .then(() => {
        setCategory({ name: "", image: "", color: "" });
        fetchCategories();
      })
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Category Screen</Text>
      <TextInput
        value={category.name}
        onChangeText={(text) => {
          setCategory({ ...category, name: text });
        }}
        style={styles.input}
        placeholder="title"
      />
      <TextInput
        value={category.image}
        onChangeText={(text) => {
          setCategory({ ...category, image: text });
        }}
        style={styles.input}
        placeholder="image"
      />
      <TextInput
        value={category.color}
        onChangeText={(text) => {
          setCategory({ ...category, color: text });
        }}
        style={styles.input}
        placeholder="color"
      />
      <Button title="Add" onPress={addCategory} />

      <View style={styles.grid}>
        {categories.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={[styles.imageWrapper, { backgroundColor: item.color }]}>
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />
            </View>
            <Text style={styles.cardText} numberOfLines={2}>
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 0,
    gap: 20,
    alignItems: "center",
    paddingVertical: 20,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
    width: "90%",
    marginTop: 10,
  },
  card: {
    width: 60,
    alignItems: "center",
  },
  imageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  image: {
    width: 36,
    height: 36,
    resizeMode: "contain",
  },
  cardText: {
    fontSize: 10,
    textAlign: "center",
    marginTop: 4,
  },
});

 
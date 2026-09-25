import { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export type NewProduct = {
  title: string;
  price: number;
};

interface ProductFormProps {
  onAdd: (product: NewProduct) => void;
}

export default function ProductForm({ onAdd }: ProductFormProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const handleAdd = () => {
    const trimmedTitle = title.trim();
    const parsedPrice = parseFloat(price.replace(",", "."));

    if (!trimmedTitle || Number.isNaN(parsedPrice)) return;

    onAdd({ title: trimmedTitle, price: parsedPrice });
    setTitle("");
    setPrice("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Новий продукт</Text>
      <TextInput style={styles.input} placeholder="Назва" value={title} onChangeText={setTitle} />
      <TextInput style={styles.input} placeholder="Ціна" keyboardType="numeric" value={price} onChangeText={setPrice} />
      <Button title="Додати" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
    maxWidth: 320,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 16,
    backgroundColor: "#fff",
  },
});

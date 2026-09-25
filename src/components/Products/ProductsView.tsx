import { View, Text, Button, StyleSheet } from "react-native";

export type Product = {
  id: number;
  title: string;
  price: number;
};

interface ProductsViewProps {
  products: Product[];
  onRemove: (id: number) => void;
}

export default function ProductsView({ products, onRemove }: ProductsViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Продукти ({products.length})</Text>

      {products.length === 0 ? (
        <Text style={styles.empty}>Список порожній</Text>
      ) : (
        products.map((product) => (
          <View key={product.id} style={styles.row}>
            <View style={styles.info}>
              <Text style={styles.name}>{product.title}</Text>
              <Text style={styles.price}>{product.price} грн</Text>
            </View>
            <Button title="Видалити" color="#d32f2f" onPress={() => onRemove(product.id)} />
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    width: "100%",
    maxWidth: 320,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: "#fff",
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
  },
  price: {
    fontSize: 14,
    color: "#555",
  },
});

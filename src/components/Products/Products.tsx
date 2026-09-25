import { View, StyleSheet } from "react-native";
import { useProductStore } from "../../store/useProductStore";
import ProductForm from "./ProductForm";
import ProductsView from "./ProductsView";

export default function Products() {
  const products = useProductStore((s) => s.products);
  const addProduct = useProductStore((s) => s.addProduct);
  const removeProduct = useProductStore((s) => s.removeProduct);

  return (
    <View style={styles.container}>
      <ProductForm onAdd={(product) => addProduct({ id: Date.now(), ...product })} />
      <ProductsView products={products} onRemove={removeProduct} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: 24,
    padding: 16,
  },
});

import { useState } from "react";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

interface CounterViewProps {
  count: number;
  onUp: (step: number) => void;
  onDown: (step: number) => void;
  onReset: () => void;
}

export default function CounterView({ count, onUp, onDown, onReset,}: CounterViewProps) {
  const [step, setStep] = useState("1");
  const parsedStep = parseInt(step, 10) || 1;

  return (
    <View style={styles.container}>
      <Text style={styles.count}>{count}</Text>
      <View style={styles.row}>
        <Text>Step:</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={step} onChangeText={setStep} />
      </View>
      <View style={styles.buttons}>
        <Button title="-" onPress={() => onDown(parsedStep)} />
        <Button title="Reset" onPress={onReset} />
        <Button title="+" onPress={() => onUp(parsedStep)} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    alignItems: "center", 
    gap: 16,
  },
  count: { 
    fontSize: 48, 
    fontWeight: "bold",
  },
  row: { 
    flexDirection: "row", 
    alignItems: "center", 
    gap: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    width: 60,
    textAlign: "center",
    paddingVertical: 4,
    fontSize: 18,
  },
  buttons: { 
    flexDirection: "row", 
    gap: 12,
  },
});

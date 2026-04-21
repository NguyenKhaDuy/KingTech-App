import React from "react";
import { Text, TextInput, StyleSheet } from "react-native";

export default function LaborInput({ value, onChange }) {
  return (
    <>
      <Text style={styles.label}>Công thợ</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={value}
        onChangeText={(text) => onChange(text || "0")}
        placeholder="Nhập tiền công"
      />
    </>
  );
}

const styles = StyleSheet.create({
  label: { marginTop: 10, marginBottom: 5, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
});
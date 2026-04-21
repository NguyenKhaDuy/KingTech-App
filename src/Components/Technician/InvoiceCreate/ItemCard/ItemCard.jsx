import React from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";

export default function ItemCard({ item, onChange, onRemove }) {
  return (
    <View style={styles.card}>
      
      <TextInput
        placeholder="Tên vật liệu"
        style={styles.input}
        value={item.name}
        onChangeText={(text) => onChange("name", text)}
      />

      <View style={styles.rowHeader}>
        <Text style={styles.col}>SL</Text>
        <Text style={styles.col}>Giá</Text>
        <Text style={styles.col}>Tổng</Text>
        <Text style={{ width: 30 }}></Text>
      </View>

      <View style={styles.row}>
        <TextInput
          keyboardType="numeric"
          style={styles.smallInput}
          value={String(item.quantity)}
          onChangeText={(text) =>
            onChange("quantity", Number(text) || 0)
          }
        />

        <TextInput
          keyboardType="numeric"
          style={styles.smallInput}
          value={String(item.price)}
          onChangeText={(text) =>
            onChange("price", Number(text) || 0)
          }
        />

        <View style={styles.totalItem}>
          <Text style={styles.totalText}>
            {(item.quantity * item.price).toLocaleString("vi-VN")} đ
          </Text>
        </View>

        <TouchableOpacity onPress={onRemove}>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  rowHeader: { flexDirection: "row", marginBottom: 5 },
  col: { flex: 1, textAlign: "center", fontSize: 12, color: "#666" },
  row: { flexDirection: "row", alignItems: "center", gap: 10 },
  smallInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  totalItem: { flex: 1, alignItems: "center" },
  totalText: { color: "#ff6600", fontWeight: "bold" },
  delete: { color: "red", paddingHorizontal: 10 },
});
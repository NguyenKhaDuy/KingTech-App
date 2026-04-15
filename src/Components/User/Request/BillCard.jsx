import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function BillCard({ item, onPay, onViewInvoice }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.service}>{item.name}</Text>
        <Text style={styles.sub}>Amount: {item.price}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>

      {item.status === "pending" ? (
        <TouchableOpacity style={styles.payBtn} onPress={() => onPay(item)}>
          <Text style={styles.text}>Thanh toán</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.invoiceBtn}
          onPress={() => onViewInvoice(item)}
        >
          <Text style={styles.text}>Xem hóa đơn</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  service: { fontWeight: "bold" },
  sub: { color: "#777" },
  status: { fontWeight: "bold" },
  payBtn: { backgroundColor: "#00aa55", padding: 8, borderRadius: 8 },
  invoiceBtn: { backgroundColor: "#007bff", padding: 8, borderRadius: 8 },
  text: { color: "#fff" },
});

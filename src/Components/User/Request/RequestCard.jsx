import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function RequestCard({ item, onPay, onViewDetail, onReview }) {
  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.service}>{item.name}</Text>
        <Text style={styles.sub}>Technician: {item.tech}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>

      {item.status === "completed" ? (
        <View style={{ gap: 5 }}>
          <TouchableOpacity style={styles.payBtn} onPress={() => onPay(item)}>
            <Text style={styles.text}>Thanh toán</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.reviewBtn}
            onPress={() => onReview(item)}
          >
            <Text style={styles.text}>Đánh giá</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.detailBtn}
          onPress={() => onViewDetail(item)}
        >
          <Text style={styles.text}>Detail</Text>
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
  detailBtn: { backgroundColor: "#ff6600", padding: 8, borderRadius: 8 },
  text: { color: "#fff", textAlign: "center"},
  reviewBtn: {
    backgroundColor: "#ffaa00",
    padding: 8,
    borderRadius: 8,
  },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function TotalBox({ total }) {
  return (
    <View style={styles.box}>
      <Text style={styles.text}>Tổng:</Text>
      <Text style={styles.price}>
        {total.toLocaleString("vi-VN")} đ
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  text: { fontSize: 18, fontWeight: "bold" },
  price: {
    fontSize: 18,
    color: "#ff6600",
    fontWeight: "bold",
  },
});
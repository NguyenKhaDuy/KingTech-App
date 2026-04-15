import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Pagination() {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>‹ Trước</Text>
      </TouchableOpacity>

      <View style={styles.active}>
        <Text style={{ color: "#fff", fontWeight: "600" }}>1</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>Sau ›</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    alignItems: "center",
  },

  btn: {
    paddingHorizontal: 10,
  },

  text: {
    color: "#666",
  },

  active: {
    backgroundColor: "#ff6600",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 10,
  },
});
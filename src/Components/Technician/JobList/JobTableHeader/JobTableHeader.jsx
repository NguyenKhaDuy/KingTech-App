import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function JobTableHeader() {
  return (
    <View style={styles.row}>
      <Text style={styles.header}>Khách hàng</Text>
      <Text style={styles.header}>Dịch vụ</Text>
      <Text style={styles.header}>Trạng thái</Text>
      <Text style={styles.header}>Thao tác</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    marginBottom: 10,
  },
  header: {
    flex: 1,
    fontWeight: "600",
    color: "#555",
  },
});
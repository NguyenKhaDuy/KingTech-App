import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatusBadge({ status }) {
  const map = {
    RECEIVED: { bg: "#e5e7eb", text: "#374151", label: "RECEIVED" },
    COMPLETED: { bg: "#dcfce7", text: "#16a34a", label: "COMPLETED" },
  };

  const s = map[status];

  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.text, { color: s.text }]}>{s.label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
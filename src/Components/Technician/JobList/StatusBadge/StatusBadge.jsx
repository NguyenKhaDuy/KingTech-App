import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function StatusBadge({ status }) {
  const map = {
    RECEIVED: { bg: "#e5e7eb", text: "#374151", label: "RECEIVED" },
    RECEIVING: { bg: "#dbeafe", text: "#2563eb", label: "RECEIVING" },
    COMPLETED: { bg: "#dcfce7", text: "#16a34a", label: "COMPLETED" },
    CANCEL: { bg: "#fee2e2", text: "#dc2626", label: "CANCEL" },
  };

  const s = map[status] || {
    bg: "#f3f4f6",
    text: "#6b7280",
    label: status || "UNKNOWN",
  };

  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.text, { color: s.text }]}>
        {s.label}
      </Text>
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
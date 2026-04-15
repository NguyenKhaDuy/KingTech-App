import React from "react";
import { View, Text, StyleSheet } from "react-native";
import StatusBadge from "../StatusBadge/StatusBadge";
import ActionButtons from "../ActionButtons/ActionButtons";

export default function JobCard({ item }) {
  return (
    <View style={styles.card}>
      {/* TOP */}
      <View style={styles.rowBetween}>
        <View>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.service}>{item.service}</Text>
        </View>

        <StatusBadge status={item.status} />
      </View>

      {/* DIVIDER */}
      <View style={styles.divider} />

      {/* ACTION */}
      <ActionButtons status={item.status} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  name: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111",
  },

  service: {
    fontSize: 13,
    color: "#666",
    marginTop: 2,
  },

  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 12,
  },
});
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import JobCard from "../../../Components/Technician/JobList/JobCard/JobCard";
import Pagination from "../../../Components/Technician/JobList/Pagination/Pagination";

const data = [
  {
    id: "1",
    name: "Trần Thị Lụa",
    service: "Plumbing",
    status: "RECEIVED",
  },
  {
    id: "2",
    name: "Trần Thị Lụa",
    service: "Plumbing",
    status: "COMPLETED",
  },
];

export default function JobListScreen() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đơn hàng</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {data.map((item) => (
            <JobCard key={item.id} item={item} />
          ))}

          <Pagination />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6600",
  },

  header: {
    paddingVertical: 15,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function HomeTechnicianScreen() {
  const jobs = [
    {
      id: "1",
      customer: "Nguyễn Văn A",
      address: "Cần Thơ",
      time: "08:00 - 10:00",
      status: "Đang xử lý",
    },
    {
      id: "2",
      customer: "Trần Thị B",
      address: "Hậu Giang",
      time: "10:30 - 12:00",
      status: "Chờ xử lý",
    },
  ];

  const renderJob = ({ item }) => (
    <View style={styles.jobCard}>
      <View style={styles.jobHeader}>
        <Text style={styles.customer}>{item.customer}</Text>
        <Text style={styles.status}>{item.status}</Text>
      </View>

      <Text style={styles.info}>📍 {item.address}</Text>
      <Text style={styles.info}>⏰ {item.time}</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Xem chi tiết</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView edges={['top']} style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.hello}>Xin chào 👋</Text>
          <Text style={styles.name}>Kỹ thuật viên</Text>
        </View>

        <Ionicons name="person-circle-outline" size={40} color="#fff" />
      </View>

      {/* BODY */}
      <View style={styles.body}>
        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Hôm nay</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Đang làm</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10</Text>
            <Text style={styles.statLabel}>Hoàn thành</Text>
          </View>
        </View>

        {/* TITLE */}
        <Text style={styles.sectionTitle}>Công việc hôm nay</Text>

        <FlatList
          data={jobs}
          keyExtractor={(item) => item.id}
          renderItem={renderJob}
          showsVerticalScrollIndicator={false}
        />
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
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  hello: {
    color: "#fff",
    fontSize: 14,
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  body: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  statCard: {
    flex: 1,
    backgroundColor: "#fff",
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 14,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  statNumber: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ff6600",
  },

  statLabel: {
    fontSize: 12,
    color: "#666",
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333",
  },

  jobCard: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },

  jobHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  customer: {
    fontWeight: "600",
    fontSize: 14,
  },

  status: {
    fontSize: 12,
    color: "#ff6600",
    fontWeight: "600",
  },

  info: {
    fontSize: 12,
    color: "#555",
    marginBottom: 2,
  },

  button: {
    marginTop: 8,
    backgroundColor: "#ff6600",
    paddingVertical: 8,
    borderRadius: 10,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
  },
});

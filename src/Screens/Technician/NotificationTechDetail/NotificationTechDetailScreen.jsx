import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationTechDetailScreen({
  route,
  navigation,
}) {
  const { notification } = route.params;

  /* ===== ICON + COLOR THEO TYPE ===== */
  const getIcon = (type) => {
    switch (type) {
      case "NEW_JOB":
        return "notifications-outline";
      case "ASSIGNED":
        return "briefcase-outline";
      case "COMPLETED":
        return "checkmark-done-outline";
      case "CANCELLED":
        return "close-circle-outline";
      default:
        return "notifications-outline";
    }
  };

  const getColor = (type) => {
    switch (type) {
      case "NEW_JOB":
        return "#3b82f6";
      case "ASSIGNED":
        return "#f59e0b";
      case "COMPLETED":
        return "#16a34a";
      case "CANCELLED":
        return "#ef4444";
      default:
        return "#ff6600";
    }
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Chi tiết thông báo</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.card}>
          
          {/* ICON + TITLE */}
          <View style={styles.topRow}>
            <View
              style={[
                styles.iconWrapper,
                { backgroundColor: getColor(notification.type) + "20" },
              ]}
            >
              <Ionicons
                name={getIcon(notification.type)}
                size={22}
                color={getColor(notification.type)}
              />
            </View>

            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{notification.title}</Text>
            </View>
          </View>

          {/* TIME */}
          <View style={styles.timeBadge}>
            <Ionicons name="time-outline" size={13} color="#6b7280" />
            <Text style={styles.time}>{notification.time}</Text>
          </View>

          {/* CONTENT */}
          <Text style={styles.content}>{notification.content}</Text>

          {/* ACTION (tuỳ chọn - rất nên có) */}
          {notification.orderId && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() =>
                navigation.navigate("RequestTechDetail", {
                  orderId: notification.orderId,
                })
              }
            >
              <Text style={styles.actionText}>Xem đơn hàng</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6600",
  },

  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff6600",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  contentWrapper: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    fontSize: 17,
    fontWeight: "700",
    color: "#111",
  },

  timeBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    marginBottom: 14,
  },

  time: {
    marginLeft: 6,
    fontSize: 12,
    color: "#6b7280",
  },

  content: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 22,
  },

  actionBtn: {
    marginTop: 20,
    backgroundColor: "#ff6600",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
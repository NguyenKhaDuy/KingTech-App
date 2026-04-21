import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function NotificationTechScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      type: "NEW_JOB",
      title: "Đơn mới",
      content: "Bạn vừa được giao 1 đơn sửa điện.",
      time: "10:30 20/04/2026",
      isRead: false,
    },
    {
      id: "2",
      type: "ASSIGNED",
      title: "Đã nhận việc",
      content: "Bạn đã nhận đơn sửa ống nước.",
      time: "09:00 20/04/2026",
      isRead: false,
    },
    {
      id: "3",
      type: "COMPLETED",
      title: "Hoàn thành",
      content: "Bạn đã hoàn thành đơn sửa máy lạnh.",
      time: "14:20 19/04/2026",
      isRead: true,
    },
    {
      id: "4",
      type: "CANCELLED",
      title: "Đơn bị hủy",
      content: "Khách đã hủy đơn sửa điện.",
      time: "08:15 19/04/2026",
      isRead: true,
    },
  ]);

  /* ===== MARK READ ===== */
  const handlePress = (id) => {
  setNotifications((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, isRead: true } : item
    )
  );
};

  /* ===== ICON + COLOR ===== */
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
        return "#999";
    }
  };

  /* ===== ITEM ===== */
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, !item.isRead && styles.unreadItem]}
      onPress={() => {
        handlePress(item.id);
        navigation.navigate("NotificationTechDetail", {
          notification: {
            ...item,
            orderId: "123", // thêm cái này
          },
        });
      }}
    >
      {/* ICON */}
      <View style={styles.iconBox}>
        <Ionicons
          name={getIcon(item.type)}
          size={22}
          color={getColor(item.type)}
        />
      </View>

      {/* TEXT */}
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.content} numberOfLines={1}>
          {item.content}
        </Text>

        <Text style={styles.time}>{item.time}</Text>
      </View>

      {/* DOT */}
      {!item.isRead && <View style={styles.dot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#ff6600" }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Thông báo (Thợ)</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.contentWrapper}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ff6600",
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  contentWrapper: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
  },

  item: {
    flexDirection: "row",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
    alignItems: "center",
  },

  unreadItem: {
    backgroundColor: "#fff3e6",
    borderWidth: 1,
    borderColor: "#ff6600",
  },

  iconBox: {
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 14,
    marginBottom: 3,
  },

  content: {
    color: "#555",
    fontSize: 13,
  },

  time: {
    marginTop: 5,
    fontSize: 11,
    color: "#999",
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ff6600",
    marginLeft: 10,
  },
});

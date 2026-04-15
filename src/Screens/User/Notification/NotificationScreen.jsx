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

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState([
    {
      id: "1",
      title: "Đặt lịch thành công",
      content: "Bạn đã đặt lịch sửa máy lạnh thành công.",
      time: "10:30 15/04/2026",
      isRead: false,
    },
    {
      id: "2",
      title: "Kỹ thuật viên đang đến",
      content: "Kỹ thuật viên đang trên đường đến địa chỉ của bạn.",
      time: "09:00 15/04/2026",
      isRead: false,
    },
    {
      id: "3",
      title: "Khuyến mãi mới",
      content: "Giảm giá 20% cho dịch vụ sửa chữa điện lạnh trong tuần này.",
      time: "14:20 14/04/2026",
      isRead: true,
    },
  ]);

  const handlePress = (id) => {
    setNotifications((prev) =>
      prev.map((item) => (item.id === id ? { ...item, isRead: true } : item)),
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, !item.isRead && styles.unreadItem]}
      onPress={() => {
        handlePress(item.id);
        navigation.navigate("NotificationDetail", { notification: item });
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.content} numberOfLines={1}>
          {item.content}
        </Text>

        <Text style={styles.time}>{item.time}</Text>
      </View>

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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Thông báo</Text>

        <View style={{ width: 22 }} />
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
    flexDirection: "row",
    justifyContent: "space-between",
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
    backgroundColor: "#fff3e6", // màu nổi cho chưa đọc
    borderWidth: 1,
    borderColor: "#ff6600",
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

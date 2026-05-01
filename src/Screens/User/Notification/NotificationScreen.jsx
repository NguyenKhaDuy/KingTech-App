import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://10.0.2.2:8082/api";

export default function NotificationScreen({ navigation }) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);

  // ===== FORMAT TIME (array BE) =====
  const formatTime = (arr) => {
    if (!arr || arr.length < 5) return "";

    const [year, month, day, hour, minute] = arr;

    const pad = (n) => String(n).padStart(2, "0");

    return `${pad(hour)}:${pad(minute)} ${pad(day)}/${pad(month)}/${year}`;
  };

  // ===== FETCH API =====
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");

      if (!token || !userStr) return;

      const user = JSON.parse(userStr);

      const res = await fetch(
        `http://10.0.2.2:8082/api/user/notification/id_user=${user.id_user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();

      if (json.message === "Success") {
        //SORT trước (mới nhất lên đầu)
        const sorted = [...json.data].sort((a, b) => {
          const dateA = new Date(
            a.created_at[0],
            a.created_at[1] - 1,
            a.created_at[2],
            a.created_at[3] || 0,
            a.created_at[4] || 0,
          );

          const dateB = new Date(
            b.created_at[0],
            b.created_at[1] - 1,
            b.created_at[2],
            b.created_at[3] || 0,
            b.created_at[4] || 0,
          );

          return dateB - dateA; // mới nhất lên đầu
        });

        //rồi mới map
        const mapped = sorted.map((n) => ({
          id: n.id_notify,
          title: n.title,
          content: n.message,
          time: formatTime(n.created_at),
          isRead: n.status_id == 1,
          type: n.type,
          idType: n.id_type,
          idUserNotify: n.id_user_notify,
        }));

        setNotifications(mapped);
      }
    } catch (err) {
      console.log(err);
      alert("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  // ===== CLICK =====
  const handlePress = (item) => {
    // update UI đọc
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, isRead: true } : n)),
    );

    navigation.navigate("NotificationDetail", {
      id_notify: item.id,
      id_user_notify: item.idUserNotify,
    });
  };

  // ===== RENDER =====
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.item, !item.isRead && styles.unreadItem]}
      onPress={() => handlePress(item)}
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
        {loading ? (
          <Text style={{ textAlign: "center" }}>Đang tải...</Text>
        ) : (
          <FlatList
            data={notifications}
            keyExtractor={(item) => item.idUserNotify.toString()}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
        )}
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
    backgroundColor: "#fff3e6",
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

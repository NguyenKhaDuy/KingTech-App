import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function NotificationDetailScreen({ route, navigation }) {
  const { id_notify, id_user_notify } = route.params;

  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);

  // ===== FORMAT TIME =====
  const formatTime = (arr) => {
    if (!arr || arr.length < 5) return "";

    const [year, month, day, hour, minute] = arr;
    const pad = (n) => String(n).padStart(2, "0");

    return `${pad(hour)}:${pad(minute)} ${pad(day)}/${pad(month)}/${year}`;
  };

  // ===== CALL API =====
  const fetchDetail = async () => {
    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");

      const url = `http://10.0.2.2:8082/api/user/notification/?id_user_notifi=${id_user_notify}&id_notify=${id_notify}`;

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // debug tránh lỗi "<"
      const text = await res.text();
      console.log("DETAIL:", text);

      let json;
      try {
        json = JSON.parse(text);
      } catch (e) {
        console.log("Không phải JSON:", text);
        return;
      }

      if (json.message === "Success") {
        const n = json.data;

        setNotification({
          title: n.title,
          content: n.message,
          time: formatTime(n.created_at),
          type: n.type,
          idType: n.id_type,
        });
      } else {
        alert("Không lấy được chi tiết");
      }
    } catch (err) {
      console.log(err);
      alert("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetail();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Đang tải...
        </Text>
      </SafeAreaView>
    );
  }

  if (!notification) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Không có dữ liệu
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Chi tiết</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <View style={styles.card}>
          {/* TOP */}
          <View style={styles.topRow}>
            <View style={styles.iconWrapper}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#ff6600"
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

          {/* BUTTON nếu là request */}
          {notification.type === "ACCEPTED_REQUEST" && (
            <TouchableOpacity
              style={styles.btn}
              onPress={() =>
                navigation.navigate("RequestDetail", {
                  id_request: notification.idType,
                })
              }
            >
              <Text style={styles.btnText}>Xem đơn sửa chữa</Text>
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
    backgroundColor: "#fff3e6",
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

  btn: {
    marginTop: 20,
    backgroundColor: "#ff6600",
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
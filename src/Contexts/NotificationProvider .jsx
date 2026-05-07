import React, { createContext, useEffect, useRef, useState } from "react";
import { addWebSocketListener } from "../utils/stompClient";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  //request của thợ
  const [requestPopup, setRequestPopup] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const timerRef = useRef(null);

  const countUnread = (list) => {
    return list.filter((item) => item.status_id !== 1).length;
  };

  // ===== CALL API UNREAD COUNT =====
  const fetchUnreadCount = async () => {
    try {
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
        setUnreadCount(countUnread(json.data));
      }
    } catch (err) {
      console.log("Unread count error:", err);
    }
  };

  // ===== INIT LOAD =====
  useEffect(() => {
    fetchUnreadCount();
  }, []);

  // ===== WEBSOCKET =====
  // useEffect(() => {
  //   const unsubscribe = addWebSocketListener((data) => {
  //     console.log("WS DATA:", data);
  //     fetchUnreadCount();

  //     // update list
  //     setNotifications((prev) => [data, ...prev]);

  //     // update badge realtime
  //     setNotifications((prev) => {
  //       const updated = [data, ...prev];

  //       // luôn sync lại count theo list
  //       const count = updated.filter((item) => item.status_id !== 1).length;
  //       setUnreadCount(count);

  //       return updated;
  //     });
  //     // push system notification
  //     Notifications.scheduleNotificationAsync({
  //       content: {
  //         title: data.title,
  //         body: data.body,
  //       },
  //       trigger: null,
  //     });
  //   });

  //   return unsubscribe;
  // }, []);

  useEffect(() => {
    const unsubscribe = addWebSocketListener(async (data) => {
      console.log("WS DATA:", data);

      fetchUnreadCount();

      // update list
      setNotifications((prev) => {
        const updated = [data, ...prev];
        const count = updated.filter((item) => item.status_id !== 1).length;
        setUnreadCount(count);
        return updated;
      });

      //CHECK TECHNICIAN + REQUEST_CREATED
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);

      console.log(user);

      if (
        data.type === "REQUEST_CREATED" &&
        user?.roles?.includes("TECHNICIAN")
      ) {
        if (requestPopup) return; //chống spam

        setRequestPopup(data);
        setCountdown(60);
      }

      // nếu request bị hủy
      if (data.type === "REQUEST_CANCEL") {
        setRequestPopup(null);
      }

      // push system notification
      Notifications.scheduleNotificationAsync({
        content: {
          title: data.title,
          body: data.body,
        },
        trigger: null,
      });
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!requestPopup) return;

    if (timerRef.current) clearInterval(timerRef.current);

    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;

          handleReject(); // auto từ chối
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [requestPopup]);

  const handleAccept = async () => {
    if (!requestPopup) return;

    try {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");

      if (!token || !userStr) return;

      const user = JSON.parse(userStr);

      const id_technician = user.id_user; // lấy từ AsyncStorage
      const id_request = requestPopup.id_request;

      const res = await fetch(
        `http://10.0.2.2:8082/api/technician/accept-request/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ id_technician, id_request }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        console.log("ACCEPT ERROR:", data);
      } else {
        console.log("ACCEPT SUCCESS:", data);
      }
    } catch (err) {
      console.log("ACCEPT EXCEPTION:", err);
    } finally {
      setRequestPopup(null); // đóng popup
    }
  };

  const handleReject = async () => {
    if (!requestPopup) return;

    // đóng popup ngay cho mượt UI
    setRequestPopup(null);

    try {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");

      if (!token || !userStr) return;

      const user = JSON.parse(userStr);

      const id_technician = user.id_user;
      const id_request = requestPopup.id_request;

      const res = await fetch(`http://10.0.2.2:8082/api/technician/refuse-request/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id_technician, id_request }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.log("REJECT ERROR:", data);
      } else {
        console.log("REJECT SUCCESS:", data);
      }
    } catch (err) {
      console.log("REJECT EXCEPTION:", err);
    }
  };

  const markAsRead = (id) => {
    setNotifications((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, status_id: 1 } : item,
      );

      const count = updated.filter((item) => item.status_id !== 1).length;
      setUnreadCount(count);

      return updated;
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        setUnreadCount,
        fetchUnreadCount,
        markAsRead, // expose ra ngoài
      }}
    >
      {children}

      {requestPopup && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
            elevation: 10,
          }}
        >
          <View
            style={{
              width: "85%",
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 16,
              shadowColor: "#000",
              shadowOpacity: 0.2,
              shadowRadius: 10,
              elevation: 5,
            }}
          >
            {/* Title */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={20}
                color="#FFD700"
              />
              <Text style={{ fontWeight: "bold", fontSize: 16, marginLeft: 6 }}>
                {requestPopup.title}
              </Text>
            </View>

            {/* Body */}
            <Text style={{ color: "#555", marginBottom: 10 }}>
              {requestPopup.body}
            </Text>

            {/* Countdown */}
            <Text style={{ color: "#e53935", marginBottom: 15 }}>
              Tự đóng sau {countdown}s
            </Text>

            {/* Buttons */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              {/* Reject */}
              <TouchableOpacity
                onPress={handleReject}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 10,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  marginRight: 8,
                  backgroundColor: "#f5f5f5",
                }}
              >
                <Ionicons name="close-circle-outline" size={18} color="#666" />
                <Text
                  style={{ marginLeft: 6, color: "#333", fontWeight: "500" }}
                >
                  Từ chối
                </Text>
              </TouchableOpacity>

              {/* Accept */}
              <TouchableOpacity
                onPress={handleAccept}
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: "#ff6600",
                }}
              >
                <Ionicons
                  name="checkmark-circle-outline"
                  size={18}
                  color="#fff"
                />
                <Text
                  style={{ marginLeft: 6, color: "#fff", fontWeight: "600" }}
                >
                  Chấp nhận
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
    </NotificationContext.Provider>
  );
};

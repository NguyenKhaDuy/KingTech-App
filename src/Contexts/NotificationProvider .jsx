import React, { createContext, useEffect, useRef, useState } from "react";
import { addWebSocketListener } from "../utils/stompClient";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

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
  useEffect(() => {
    const unsubscribe = addWebSocketListener((data) => {
      console.log("WS DATA:", data);

      // update list
      setNotifications((prev) => [data, ...prev]);

      // update badge realtime
      setNotifications((prev) => {
        const updated = [data, ...prev];

        // luôn sync lại count theo list
        const count = updated.filter((item) => item.status_id !== 1).length;
        setUnreadCount(count);

        return updated;
      });
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

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        unreadCount,
        setUnreadCount,
        fetchUnreadCount, // expose ra ngoài
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

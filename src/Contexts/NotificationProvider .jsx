import React, { createContext, useEffect, useRef, useState } from "react";
import { addWebSocketListener } from "../utils/stompClient";
import { showToast } from "../utils/showToast";
import * as Notifications from "expo-notifications";

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const socketStarted = useRef(false);

  useEffect(() => {
    const unsubscribe = addWebSocketListener((data) => {
      console.log("📩 WS DATA:", data);

      //UPDATE UI
      setNotifications((prev) => [data, ...prev]);
      setUnreadCount((prev) => prev + 1);

      //SHOW NOTIFICATION SYSTEM (ANDROID + IOS)
      Notifications.scheduleNotificationAsync({
        content: {
          title: data.title,
          body: data.body,
        },
        trigger: null, // hiển thị ngay
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
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

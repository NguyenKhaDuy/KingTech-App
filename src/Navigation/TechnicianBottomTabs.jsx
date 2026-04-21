import React, { useRef, useState, useMemo } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeTechnicianScreen from "../Screens/Technician/HomeTechnician/HomeTechnicianScreen";
import JobListScreen from "../Screens/Technician/JobList/JobListScreen";
import NotificationTechScreen from "../Screens/Technician/NotificationTech/NotificationTechScreen";
import TechnicianProfileScreen from "../Screens/Technician/TechnicianProfile/TechnicianProfileScreen";

const Tab = createBottomTabNavigator();

/* ===== NÚT GIỮA ===== */
function ActionButton({ onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 3,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      onPressIn={pressIn}
      onPressOut={pressOut}
      style={styles.actionWrapper}
    >
      <Animated.View style={[styles.actionBtn, { transform: [{ scale }] }]}>
        <Ionicons name="construct" size={28} color="#fff" />
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function TechnicianTabs() {
  /* ===== STATE NOTIFICATION ===== */
  const [notifications, setNotifications] = useState([
    { id: "1", isRead: false },
    { id: "2", isRead: false },
    { id: "3", isRead: true },
  ]);

  /* ===== ĐẾM CHƯA ĐỌC ===== */
  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.isRead).length;
  }, [notifications]);

  return (
    <View style={{ flex: 1, overflow: "visible" }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarStyle: styles.tabBar,

          tabBarActiveTintColor: "#ff6600",
          tabBarInactiveTintColor: "#999",

          tabBarLabelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },

          tabBarIcon: ({ color, size }) => {
            let icon;

            if (route.name === "HomeTech") icon = "home";
            else if (route.name === "Jobs") icon = "clipboard";
            else if (route.name === "Noti") icon = "notifications";
            else if (route.name === "Profile") icon = "person";

            return icon ? (
              <Ionicons name={icon} size={size} color={color} />
            ) : null;
          },
        })}
      >
        <Tab.Screen name="HomeTech" component={HomeTechnicianScreen} />
        <Tab.Screen name="Jobs" component={JobListScreen} />

        {/* NÚT GIỮA */}
        <Tab.Screen
          name="Action"
          component={HomeTechnicianScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => null,
            tabBarButton: (props) => <ActionButton {...props} />,
          }}
        />

        {/* 🔥 NOTIFICATION CÓ BADGE */}
        <Tab.Screen
          name="Noti"
          options={{
            tabBarBadge: unreadCount > 0 ? unreadCount : null,
            tabBarBadgeStyle: {
              backgroundColor: "#ff6600",
              color: "#fff",
              fontSize: 10,
              minWidth: 18,
              height: 18,
            },
          }}
        >
          {(props) => (
            <NotificationTechScreen
              {...props}
              notifications={notifications}
              setNotifications={setNotifications}
            />
          )}
        </Tab.Screen>

        <Tab.Screen name="Profile" component={TechnicianProfileScreen} />
      </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 75,

    backgroundColor: "#fff",
    borderRadius: 30,

    overflow: "visible",

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    elevation: 10,
  },

  actionWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  actionBtn: {
    position: "absolute",
    top: -35,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#ff6600",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#ff6600",
    shadowOpacity: 0.5,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },

    elevation: 15,
  },
});
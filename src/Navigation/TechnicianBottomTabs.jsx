import React, { useRef, useContext } from "react";
import { View, StyleSheet, TouchableOpacity, Animated, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeTechnicianScreen from "../Screens/Technician/HomeTechnician/HomeTechnicianScreen";
import JobListScreen from "../Screens/Technician/JobList/JobListScreen";
import TechnicianProfileScreen from "../Screens/Technician/TechnicianProfile/TechnicianProfileScreen";

import { NotificationContext } from "../Contexts/NotificationProvider ";

const Tab = createBottomTabNavigator();

const EmptyScreen = () => null;

/* ===== NÚT GIỮA ===== */
function ActionButton({ onPress }) {
  const scale = useRef(new Animated.Value(1)).current;

  const pressIn = () => {
    Animated.spring(scale, { toValue: 0.9, useNativeDriver: true }).start();
  };

  const pressOut = () => {
    Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
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
  const { unreadCount } = useContext(NotificationContext);

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

        {/* 🔔 NOTIFICATION */}
        <Tab.Screen
          name="Noti"
          component={EmptyScreen}
          options={({ navigation }) => ({
            tabBarLabel: "Noti",

            tabBarButton: (props) => {
              const focused = props.accessibilityState?.selected;

              return (
                <TouchableOpacity
                  {...props}
                  onPress={() => navigation.navigate("NotificationScreen")}
                  style={styles.notiBtn}
                >
                  <View style={styles.notiContainer}>
                    {/* ICON */}
                    <View>
                      <Ionicons
                        name="notifications"
                        size={29}
                        color={focused ? "#ff6600" : "#999"}
                      />

                      {/* BADGE */}
                      {unreadCount > 0 && (
                        <View style={styles.badge}>
                          <Text style={styles.badgeText}>
                            {unreadCount > 9 ? "9+" : unreadCount}
                          </Text>
                        </View>
                      )}
                    </View>

                    {/* LABEL */}
                    <Text
                      style={{
                        fontSize: 12,
                        color: focused ? "#ff6600" : "#999",
                      }}
                    >
                      Notification
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            },
          })}
        />

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

  notiBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  notiContainer: {
    alignItems: "center",
    justifyContent: "center",
  },

  badge: {
    position: "absolute",
    top: -5,
    right: -10,
    backgroundColor: "red",
    borderRadius: 10,
    minWidth: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 3,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "bold",
  },
});
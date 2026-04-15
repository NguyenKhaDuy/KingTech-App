import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Animated } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../Screens/User/Home/HomeScreen";
import TechnicianScreen from "../Screens/User/Technician/TechnicianScreen";
import AccountScreen from "../Screens/User/Account/AccountScreen";
import RequestScreen from "../Screens/User/Request/RequestScreen";
import BookingScreen from "../Screens/User/Booking/BookingScreen";

const Tab = createBottomTabNavigator();
function BookingButton({ onPress }) {
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
      style={styles.bookingWrapper}
    >
      <Animated.View style={[styles.bookingBtn, { transform: [{ scale }] }]}>
        <Ionicons name="construct" size={28} color="#fff" />
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function BottomTabs() {
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
            let iconName;

            if (route.name === "Home") iconName = "home";
            else if (route.name === "Technician") iconName = "hammer";
            else if (route.name === "Request") iconName = "document-text";
            else if (route.name === "Account") iconName = "person";

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />

        <Tab.Screen name="Technician" component={TechnicianScreen} />

        <Tab.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: () => null,
            tabBarButton: (props) => <BookingButton {...props} />,
          }}
        />
        <Tab.Screen name="Request" component={RequestScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
      </Tab.Navigator>
    </View>
  );
}

// 🔥 STYLE
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

  bookingWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  bookingBtn: {
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

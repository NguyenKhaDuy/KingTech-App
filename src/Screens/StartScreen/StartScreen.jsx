import React, { useEffect } from "react";
import { View, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connectWebSocket } from "../../utils/stompClient";
import { isTokenExpired } from "../../utils/auth";

export default function StartScreen({ navigation }) {
  useEffect(() => {
    const bootstrap = async () => {
      try {
        const hasSeenIntro = await AsyncStorage.getItem("hasSeenIntro");
        const token = await AsyncStorage.getItem("token");
        const user = await AsyncStorage.getItem("user");

        // 1. CHƯA XEM INTRO
        if (!hasSeenIntro) {
          navigation.replace("Intro");
          return;
        }

        // 2. ĐÃ XEM INTRO → check login
        if (token && user && !isTokenExpired(token)) {
          const parsed = JSON.parse(user);
          const roles = parsed.roles || [];

          //chỉ connect khi token còn hạn
          connectWebSocket(token);

          if (roles.includes("TECHNICIAN")) {
            navigation.replace("TechnicianMain");
          } else {
            navigation.replace("CustomerMain");
          }
        } else {
          //token hết hạn → xóa luôn
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("user");

          navigation.replace("Login");
        }
      } catch (e) {
        navigation.replace("Login");
      }
    };

    bootstrap();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ActivityIndicator size="large" color="#ff6600" />
    </View>
  );
}

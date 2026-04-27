import React, { useRef, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Toast, setToastRef } from "./src/utils/showToast";

import IntroScreen from "./src/Screens/User/Intro/IntroScreen";
import LoginScreen from "./src/Screens/Auth/LoginScreen";
import RegisterScreen from "./src/Screens/Auth/RegisterScreen";
import BottomTabs from "./src/Navigation/BottomTabs";
import WorkerDetailScreen from "./src/Screens/User/WorkerDetail/WorkerDetailScreen";
import InvoiceDetailScreen from "./src/Screens/User/InvoiceDetail/InvoiceDetailScreen";
import RequestDetailScreen from "./src/Screens/User/RequestDetail/RequestDetailScreen";
import ReviewScreen from "./src/Screens/User/Review/ReviewScreen";
import EditProfileScreen from "./src/Screens/User/EditProfile/EditProfileScreen";
import ChangePasswordScreen from "./src/Screens/User/ChangePassword/ChangePasswordScreen";
import OtpScreen from "./src/Screens/Otp/OtpScreen";
import ChangeEmailScreen from "./src/Screens/User/ChangeEmail/ChangeEmailScreen";
import HelpScreen from "./src/Screens/User/Help/HelpScreen";
import NotificationScreen from "./src/Screens/User/Notification/NotificationScreen";
import NotificationDetailScreen from "./src/Screens/User/NotificationDetail/NotificationDetailScreen";
import TechnicianBottomTabs from "./src/Navigation/TechnicianBottomTabs";
import InvoiceCreateScreen from "./src/Screens/Technician/InvoiceCreate/InvoiceCreateScreen";
import InvoiceDetailTechScreen from "./src/Screens/Technician/InvoiceDetail/InvoiceDetailTechScreen ";
import RequestTechDetailScreen from "./src/Screens/Technician/RequestTechDetail/RequestTechDetailScreen";
import UpdateRequestStatusScreen from "./src/Screens/Technician/UpdateRequestStatus/UpdateRequestStatusScreen";
import NotificationTechDetailScreen from "./src/Screens/Technician/NotificationTechDetail/NotificationTechDetailScreen";
import TechSkillManagerScreen from "./src/Screens/Technician/TechSkillManager/TechSkillManagerScreen";
import TechLocationManagerScreen from "./src/Screens/Technician/TechLocationManager/TechLocationManagerScreen";
import StartScreen from "./src/Screens/StartScreen/StartScreen";
import { NotificationProvider } from "./src/Contexts/NotificationProvider ";
import "./src/Contexts/NotificationHandler";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";

const Stack = createStackNavigator();

export default function App() {
  const toastRef = useRef();

  useEffect(() => {
    setToastRef(toastRef.current);
  }, []);

  useEffect(() => {
    const setup = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      console.log("Permission:", status);
    };

    setup();
  }, []);

  useEffect(() => {
    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        sound: true,
        vibrationPattern: [0, 250, 250, 250],
        icon: "notification-icon",
      });
    }
  }, []);

  return (
    <NotificationProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen">
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen
            name="Intro"
            component={IntroScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WorkerDetail"
            component={WorkerDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CustomerMain"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TechnicianMain"
            component={TechnicianBottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InvoiceDetail"
            component={InvoiceDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RequestDetail"
            component={RequestDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ReviewScreen"
            component={ReviewScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePasswordScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OtpScreen"
            component={OtpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangeEmail"
            component={ChangeEmailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Help"
            component={HelpScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationScreen"
            component={NotificationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationDetail"
            component={NotificationDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InvoiceCreate"
            component={InvoiceCreateScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InvoiceTechDetail"
            component={InvoiceDetailTechScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RequestTechDetail"
            component={RequestTechDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="UpdateRequestStatus"
            component={UpdateRequestStatusScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationTechDetail"
            component={NotificationTechDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TechSkillManage"
            component={TechSkillManagerScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TechLocationManage"
            component={TechLocationManagerScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>

      <Toast ref={toastRef} />
    </NotificationProvider>
  );
}

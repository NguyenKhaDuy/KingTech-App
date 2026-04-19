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

const Stack = createStackNavigator();

export default function App() {
  const toastRef = useRef();

  useEffect(() => {
    setToastRef(toastRef.current);
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Intro">
          <Stack.Screen name="Intro" component={IntroScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="WorkerDetail" component={WorkerDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="CustomerMain" component={BottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="TechnicianMain" component={TechnicianBottomTabs} options={{ headerShown: false }} />
          <Stack.Screen name="InvoiceDetail" component={InvoiceDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RequestDetail" component={RequestDetailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ headerShown: false }} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OtpScreen" component={OtpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Help" component={HelpScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NotificationScreen" component={NotificationScreen} options={{ headerShown: false }} />
          <Stack.Screen name="NotificationDetail" component={NotificationDetailScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>

      {/* ✅ TOAST GLOBAL RENDER */}
      <Toast ref={toastRef} />
    </>
  );
}
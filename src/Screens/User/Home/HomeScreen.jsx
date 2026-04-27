import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import Header from "../../../Components/User/Home/Header";
import Banner from "../../../Components/User/Home/Banner";
import Services from "../../../Components/User/Home/Services";
import TechnicianList from "../../../Components/User/Home/TechnicianList";

import { addWebSocketListener } from "../../../utils/stompClient";
import { NotificationContext } from "../../../Contexts/NotificationProvider ";

export default function HomeScreen({ navigation }) {
   const { unreadCount } = useContext(NotificationContext);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/*dùng đúng state */}
      <Header navigation={navigation} unreadCount={unreadCount} />

      <Banner />
      <Services />
      <TechnicianList navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 20,
  },
});

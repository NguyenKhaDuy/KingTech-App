import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import HeaderImage from "../../../Components/User/WokerDetail/HeaderImage";
import ProfileInfo from "../../../Components/User/WokerDetail/ProfileInfo";
import JobInfo from "../../../Components/User/WokerDetail/JobInfo";
import Skills from "../../../Components/User/WokerDetail/Skills";
import Services from "../../../Components/User/WokerDetail/Services";
import Schedule from "../../../Components/User/WokerDetail/Schedule";
import Reviews from "../../../Components/User/WokerDetail/Reviews";
import BookingButton from "../../../Components/User/WokerDetail/BookingButton";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function WorkerDetailScreen({ route, navigation }) {
  const { name, avatar } = route.params;

  const schedule = [
    { day: "Thứ 2", time: "08:00 - 17:00" },
    { day: "Thứ 3", time: "08:00 - 17:00" },
    { day: "Thứ 4", time: "08:00 - 17:00" },
    { day: "Thứ 5", time: "08:00 - 17:00" },
    { day: "Thứ 6", time: "08:00 - 17:00" },
    { day: "Thứ 7", time: "08:00 - 12:00" },
    { day: "Chủ nhật", time: "Nghỉ" },
  ];

  const skills = ["Điện dân dụng", "Sửa ổ cắm", "Lắp đặt đèn", "Bảo trì"];

  const services = [
    { icon: "🔌", name: "Sửa điện tại nhà" },
    { icon: "💡", name: "Lắp đặt đèn" },
    { icon: "🛠", name: "Bảo trì hệ thống" },
    { icon: "🏠", name: "Sửa chữa tại nhà" },
  ];

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#ff6600" }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>{name}</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* BODY */}
      <View style={{ flex: 1, backgroundColor: "#ff6600" }}>
        <ScrollView
          style={{ backgroundColor: "transparent" }}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          {/* <HeaderImage avatar={avatar} /> */}

          <View style={styles.content}>
            <ProfileInfo name={name} avatar={avatar} />
            <JobInfo />
            <Skills skills={skills} />
            <Services services={services} />
            <Schedule schedule={schedule} />
            <Reviews />
          </View>
        </ScrollView>

        <BookingButton />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    // backgroundColor: "#ff6600",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    padding: 16,
    marginTop: 10,

    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: "hidden", // 👈 fix dứt điểm
  },
});

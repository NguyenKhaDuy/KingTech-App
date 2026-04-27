import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";

import ProfileInfo from "../../../Components/User/WokerDetail/ProfileInfo";
import JobInfo from "../../../Components/User/WokerDetail/JobInfo";
import Skills from "../../../Components/User/WokerDetail/Skills";
import Services from "../../../Components/User/WokerDetail/Services";
import Schedule from "../../../Components/User/WokerDetail/Schedule";
import Reviews from "../../../Components/User/WokerDetail/Reviews";
import BookingButton from "../../../Components/User/WokerDetail/BookingButton";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

export default function WorkerDetailScreen({ route, navigation }) {
  const { id } = route.params;

  const [techData, setTechData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ================= FETCH API =================
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8082/api/detail-technician/id=${id}`
        );

        setTechData(res.data.data);
      } catch (err) {
        console.error("Fetch detail error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  // ================= CHECK ONLINE =================
  const isWorkingNow = (schedules = []) => {
    const now = new Date();

    return schedules.some((s) => {
      try {
        let date;

        if (Array.isArray(s.date)) {
          const [y, m, d] = s.date;
          date = new Date(y, m - 1, d);
        } else if (typeof s.date === "string" && /^\d{8}$/.test(s.date)) {
          const y = s.date.slice(0, 4);
          const m = s.date.slice(4, 6);
          const d = s.date.slice(6, 8);
          date = new Date(`${y}-${m}-${d}`);
        } else {
          date = new Date(s.date);
        }

        if (isNaN(date)) return false;

        const getTime = (t) => {
          if (typeof t === "string") {
            const clean = t.replace(/,/g, ":");
            const [h, m] = clean.split(":");
            return { h: +h, m: +m };
          }

          if (Array.isArray(t)) {
            return { h: t[0], m: t[1] };
          }

          if (typeof t === "object") {
            return { h: t.hour || 0, m: t.minute || 0 };
          }

          return { h: 0, m: 0 };
        };

        const start = getTime(s.time_start);
        const end = getTime(s.time_end);

        const startDate = new Date(date);
        startDate.setHours(start.h, start.m, 0);

        const endDate = new Date(date);
        endDate.setHours(end.h, end.m, 0);

        return now >= startDate && now <= endDate;
      } catch {
        return false;
      }
    });
  };

  // ================= LOADING =================
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  if (!techData) {
    return (
      <View style={styles.center}>
        <Text>Không có dữ liệu</Text>
      </View>
    );
  }

  const isOnline = isWorkingNow(
    techData.technicianScheduleDTOS || []
  );

  // ================= UI =================
  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ff6600" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <View style={{ alignItems: "center" }}>
          <Text style={styles.title}>{techData.full_name}</Text>
        </View>

        <View style={{ width: 22 }} />
      </View>

      {/* BODY */}
      <View style={{ flex: 1, backgroundColor: "#ff6600" }}>
        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View style={styles.content}>

            <ProfileInfo
              name={techData.full_name}
              avatar={`data:image/jpeg;base64,${techData.avatarBase64}`}
              isOnline={isOnline}
              tech={techData}
            />

            <JobInfo tech={techData}/>

            <Skills
              skills={techData.nameSkillTechnician || []}
            />

            <Services
              services={techData.technicianServiceDTOS || []}
            />

            <Schedule
              schedules={techData.technicianScheduleDTOS || []}
            />

            <Reviews
              ratings={techData.ratingDTOS || []}
            />
          </View>
        </ScrollView>

        <BookingButton />
      </View>
    </SafeAreaView>
  );
}

// ================= STYLE =================
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
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
  },
});
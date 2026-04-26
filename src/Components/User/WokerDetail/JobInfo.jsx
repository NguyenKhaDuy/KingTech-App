import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function JobInfo({ tech }) {
  if (!tech) return null;

  const {
    working_area,
    experience_year,
    level,
    gender,
    dob,
  } = tech;

  const formatDate = (date) => {
    if (!date) return "";

    try {
      if (Array.isArray(date)) {
        const [y, m, d] = date;
        return `${d}/${m}/${y}`;
      }

      const parsed = new Date(date);
      if (!isNaN(parsed)) {
        return parsed.toLocaleDateString("vi-VN");
      }

      return "";
    } catch {
      return "";
    }
  };

  return (
    <View style={styles.box}>

      {/* KHU VỰC */}
      <View style={styles.row}>
        <Ionicons name="location-outline" size={18} color="#ff6600" />
        <Text style={styles.text}>
          {working_area || "Chưa cập nhật"}
        </Text>
      </View>

      {/* KINH NGHIỆM */}
      <View style={styles.row}>
        <Ionicons name="construct-outline" size={18} color="#ff6600" />
        <Text style={styles.text}>
          {experience_year || 0} năm kinh nghiệm
        </Text>
      </View>

      {/* LEVEL */}
      <View style={styles.row}>
        <Ionicons name="ribbon-outline" size={18} color="#ff6600" />
        <Text style={styles.text}>
          {level || "Chưa xác định"}
        </Text>
      </View>

      {/* GIỚI TÍNH */}
      <View style={styles.row}>
        <Ionicons name="person-outline" size={18} color="#ff6600" />
        <Text style={styles.text}>
          {gender}
        </Text>
      </View>

      {/* NGÀY SINH */}
      <View style={styles.row}>
        <Ionicons name="calendar-outline" size={18} color="#ff6600" />
        <Text style={styles.text}>
          {formatDate(dob) || "Chưa có"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#FFF3E0",
    padding: 14,
    borderRadius: 12,
    marginVertical: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  text: {
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
});
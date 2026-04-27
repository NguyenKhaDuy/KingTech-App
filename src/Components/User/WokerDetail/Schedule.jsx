import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Schedule({ schedules = [] }) {
  const formatDate = (date) => {
    if (!date) return "";

    try {
      let parsed;
      if (Array.isArray(date)) {
        const [year, month, day] = date;
        parsed = new Date(year, month - 1, day);
      } else if (typeof date === "string" && /^\d{8}$/.test(date)) {
        const y = date.slice(0, 4);
        const m = date.slice(4, 6);
        const d = date.slice(6, 8);
        parsed = new Date(`${y}-${m}-${d}`);
      } else if (typeof date === "string" && date.includes("-")) {
        const [d, m, y] = date.split("-");
        parsed = new Date(`${y}-${m}-${d}`);
      } else {
        parsed = new Date(date);
      }

      if (!parsed || isNaN(parsed.getTime())) return "";

      return parsed.toLocaleDateString("vi-VN");
    } catch (err) {
      console.log("Date error:", err);
      return "";
    }
  };

  const normalizeTime = (t) => {
    if (!t) return "";

    if (typeof t === "string") {
      return t.replace(/,/g, ":").slice(0, 5);
    }

    if (Array.isArray(t)) {
      const [h, m] = t;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }

    if (typeof t === "object") {
      const h = t.hour ?? 0;
      const m = t.minute ?? 0;
      return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
    }

    return "";
  };

  const formatTime = (start, end) => {
    return `${normalizeTime(start)} - ${normalizeTime(end)}`;
  };

  //SORT THEO NGÀY GẦN NHẤT LÊN TRÊN
  const sortedSchedules = [...schedules].sort((a, b) => {
    const getTime = (date) => {
      if (!date) return 0;

      let parsed;

      if (Array.isArray(date)) {
        const [y, m, d] = date;
        parsed = new Date(y, m - 1, d);
      } else if (typeof date === "string" && /^\d{8}$/.test(date)) {
        parsed = new Date(
          date.slice(0, 4),
          date.slice(4, 6) - 1,
          date.slice(6, 8)
        );
      } else if (typeof date === "string" && date.includes("-")) {
        const [d, m, y] = date.split("-");
        parsed = new Date(`${y}-${m}-${d}`);
      } else {
        parsed = new Date(date);
      }

      return parsed?.getTime?.() || 0;
    };

    // giảm dần: mới nhất lên đầu
    return getTime(b.date) - getTime(a.date);
  });

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Lịch làm việc</Text>

      {sortedSchedules.length === 0 ? (
        <Text style={styles.empty}>Chưa có lịch</Text>
      ) : (
        sortedSchedules.map((s, i) => (
          <View key={i} style={styles.item}>
            <Text style={styles.day}>{formatDate(s.date)}</Text>

            <Text style={styles.time}>
              {formatTime(s.time_start, s.time_end)}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 15 },
  title: { fontWeight: "bold", fontSize: 18 },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
  },

  day: {
    fontWeight: "600",
    textTransform: "capitalize",
  },

  time: {
    color: "#ff6600",
    fontWeight: "bold",
  },

  empty: {
    marginTop: 10,
    color: "#999",
    fontStyle: "italic",
  },
});
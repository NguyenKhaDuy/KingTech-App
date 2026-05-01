import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Reviews({ ratings = [] }) {

  const formatDate = (date) => {
    if (!date) return "";

    try {
      const parsed = new Date(date);
      if (isNaN(parsed)) return "";

      return parsed.toLocaleDateString("vi-VN");
    } catch {
      return "";
    }
  };

  // 🔥 render sao
  const renderStars = (stars = 0) => {
    return "★".repeat(stars) + "☆".repeat(5 - stars);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Đánh giá</Text>

      {ratings.length === 0 ? (
        <Text style={styles.empty}>Chưa có đánh giá</Text>
      ) : (
        ratings.map((r, i) => (
          <View key={i} style={styles.card}>
            
            {/* HEADER */}
            <View style={styles.row}>
              <Image
                source={{
                  uri: r.avatarBase64
                    ? `data:image/jpeg;base64,${r.avatarBase64}`
                    : "https://i.pravatar.cc/100",
                }}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{r.full_name}</Text>
                <Text style={styles.date}>
                  {formatDate(r.created_at)}
                </Text>
              </View>
            </View>

            {/* STARS */}
            <Text style={styles.stars}>
              {renderStars(r.stars)}
            </Text>

            {/* COMMENT */}
            <Text style={styles.comment}>
              {r.comment || "Không có nhận xét"}
            </Text>
          </View>
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
  },

  card: {
    backgroundColor: "#f9f9f9",
    padding: 12,
    borderRadius: 12,
    marginTop: 10,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  name: {
    fontWeight: "bold",
  },

  date: {
    fontSize: 12,
    color: "#777",
  },

  stars: {
    color: "#ffb400",
    marginVertical: 4,
    fontSize: 14,
  },

  comment: {
    color: "#333",
  },

  empty: {
    marginTop: 10,
    color: "#999",
    fontStyle: "italic",
  },
});
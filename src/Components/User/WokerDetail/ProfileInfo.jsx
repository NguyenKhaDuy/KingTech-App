import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import avatar_default from "../../../../assets/avatar_default.jpg";

export default function ProfileInfo({ name, avatar, isOnline, tech }) {
  const rating = tech?.total_star || 0;

  const renderStars = (star) => {
    const full = Math.floor(star);
    const empty = 5 - full;

    return "★".repeat(full) + "☆".repeat(empty);
  };

  return (
    <View style={styles.container}>
      {/* AVATAR */}
      <View style={styles.avatarWrapper}>
        <Image
          source={
            avatar &&
            typeof avatar === "string" &&
            avatar.startsWith("data:image") &&
            !avatar.includes("null")
              ? { uri: avatar }
              : avatar_default
          }
          style={styles.avatar}
        />

        {/* STATUS */}
        <View
          style={[
            styles.statusDot,
            { backgroundColor: isOnline ? "#00ff88" : "#ff4444" },
          ]}
        />
      </View>

      <Text style={styles.name}>{name}</Text>

      {/* ⭐ RATING */}
      <Text style={styles.rating}>
        {renderStars(rating)} ({rating})
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center" },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#ff6600",
    marginBottom: 10,
  },

  statusDot: {
    position: "absolute",
    bottom: 8,
    right: 8,
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#fff",
  },

  name: {
    fontSize: 22,
    fontWeight: "bold",
  },

  rating: {
    color: "#ff6600",
    marginTop: 4,
    fontWeight: "bold",
  },
});

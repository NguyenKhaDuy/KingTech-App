import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function TechnicianCard({ item, navigation }) {
  const rating = item?.total_star || 0;

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    const stars = [];

    //full
    for (let i = 0; i < full; i++) {
      stars.push(
        <Ionicons key={`full-${i}`} name="star" size={14} color="#f5a623" />,
      );
    }

    //half
    if (hasHalf) {
      stars.push(
        <Ionicons key="half" name="star-half" size={14} color="#f5a623" />,
      );
    }

    //empty
    for (let i = 0; i < empty; i++) {
      stars.push(
        <Ionicons
          key={`empty-${i}`}
          name="star-outline"
          size={14}
          color="#f5a623"
        />,
      );
    }

    return stars;
  };

  //FIX avatar null
  const avatarSource =
    item?.avatarBase64 && item.avatarBase64 !== "null"
      ? { uri: `data:image/jpeg;base64,${item.avatarBase64}` }
      : require("../../../../assets/avatar_default.jpg");

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("WorkerDetail", {
          id: item.id_user,
          name: item.full_name,
          avatar: avatarSource,
        })
      }
    >
      <Image source={avatarSource} style={styles.avatar} />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.full_name}</Text>
        <Text style={styles.job}>Professional Repair</Text>

        {/*RATING */}
        <View style={styles.starRow}>
          {renderStars(rating)}
          <Text style={styles.ratingText}> ({rating})</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          navigation.navigate("Booking", {
            technicianId: item.id_user,
          })
        }
      >
        <Text style={styles.text}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: "center",
    elevation: 3,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },

  name: {
    fontWeight: "bold",
    fontSize: 15,
  },

  job: {
    color: "#777",
    fontSize: 13,
  },

  starRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },

  ratingText: {
    fontSize: 12,
    color: "#555",
    marginLeft: 5,
  },

  btn: {
    backgroundColor: "#ff6600",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});

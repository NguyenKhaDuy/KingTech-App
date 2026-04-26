import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";
import avatar_default from "../../../../assets/avatar_default.jpg";
import { Ionicons } from "@expo/vector-icons";

export default function TechnicianScreen({ navigation }) {
  const [search, setSearch] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  //CALL API
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const res = await axios.get(
          "http://10.0.2.2:8082/api/all/technician/",
          {
            params: { pageNo: 1 },
          },
        );

        const mapped = res.data.data.map((t) => ({
          id: t.id_user,
          name: t.full_name,
          job: (t.nameSkillTechnician || []).join(", "),
          avatar: t.avatarBase64
            ? `data:image/jpeg;base64,${t.avatarBase64}`
            : avatar_default,
          rating: t.total_star ?? 0,
          location: t.working_area || "",
        }));

        setTechnicians(mapped);
      } catch (err) {
        console.error("API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  //FILTER (giữ nguyên logic)
  const filtered = technicians.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.job.toLowerCase().includes(search.toLowerCase()),
  );

  //LOADING
  if (loading) {
    return (
      <View style={styles.contentLoading}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.5;
    const empty = 5 - full - (hasHalf ? 1 : 0);

    const stars = [];

    //sao đầy
    for (let i = 0; i < full; i++) {
      stars.push(
        <Ionicons key={`full-${i}`} name="star" size={14} color="#f5a623" />,
      );
    }

    //nửa sao
    if (hasHalf) {
      stars.push(
        <Ionicons key="half" name="star-half" size={14} color="#f5a623" />,
      );
    }

    //sao rỗng
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

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#ff6600" }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Technician</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* SEARCH */}
          <View style={styles.searchBox}>
            <TextInput
              placeholder="Search technician or service..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
          </View>

          {/* FILTER TAGS (GIỮ NGUYÊN) */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ marginBottom: 15 }}
          >
            {["All", "Repair", "Laptop", "Mobile", "Install"].map(
              (item, index) => (
                <TouchableOpacity key={index} style={styles.tag}>
                  <Text style={styles.tagText}>{item}</Text>
                </TouchableOpacity>
              ),
            )}
          </ScrollView>

          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("WorkerDetail", {
                  id: item.id,
                  name: item.name,
                  avatar: item.avatar,
                })
              }
            >
              <Image
                source={
                  typeof item.avatar === "string"
                    ? { uri: item.avatar } // base64
                    : item.avatar // ảnh local
                }
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.job}>{item.job}</Text>

                <View style={styles.ratingRow}>
                  <View style={styles.rowItem}>
                    {renderStars(item.rating)}
                    <Text style={styles.rating}> ({item.rating})</Text>
                  </View>

                  <View style={styles.rowItem}>
                    <Ionicons name="location-outline" size={14} color="#777" />
                    <Text style={styles.distance}> {item.location}</Text>
                  </View>
                </View>
              </View>

              <TouchableOpacity style={styles.bookBtn}>
                <Text style={styles.bookText}>Book</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ff6600",
    paddingVertical: 15,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  contentLoading: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
    padding: 20,
  },

  title: {
    color: "#ff6600",
    marginTop: 22,
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
    elevation: 3,
  },

  input: {
    height: 45,
  },

  tag: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    elevation: 2,
  },

  tagText: {
    fontSize: 13,
  },

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
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  job: {
    color: "#777",
    marginBottom: 5,
  },

  rowItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },

  rating: {
    fontSize: 13,
  },

  distance: {
    fontSize: 13,
    color: "#777",
    marginLeft: 5,
  },

  bookBtn: {
    backgroundColor: "#ff6600",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 10,
  },

  bookText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

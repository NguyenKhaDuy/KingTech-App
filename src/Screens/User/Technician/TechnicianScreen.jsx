import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function TechnicianScreen({ navigation }) {
  const [search, setSearch] = useState("");

  const technicians = [
    { id: 1, name: "Nguyen Van A", job: "Electrical Repair" },
    { id: 2, name: "Tran Van B", job: "Laptop Fix" },
    { id: 3, name: "Le Van C", job: "Mobile Repair" },
  ];

  const filtered = technicians.filter(
    (t) =>
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.job.toLowerCase().includes(search.toLowerCase()),
  );

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

          {/* FILTER TAGS */}
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

          {/* LIST */}
          {filtered.map((item) => (
            <View key={item.id} style={styles.card}>
              <Image
                source={{ uri: `https://i.pravatar.cc/150?img=${item.id}` }}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.job}>{item.job}</Text>

                <View style={styles.ratingRow}>
                  <Text style={styles.rating}>⭐ 4.8</Text>
                  <Text style={styles.distance}>• 2km away</Text>
                </View>
              </View>

              <TouchableOpacity style={styles.bookBtn}>
                <Text style={styles.bookText}>Book</Text>
              </TouchableOpacity>
            </View>
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

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
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

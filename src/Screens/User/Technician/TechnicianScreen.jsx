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
  const [skills, setSkills] = useState([]);
  const [services, setServices] = useState([]);

  const [selectedSkill, setSelectedSkill] = useState("Tất cả");
  const [selectedService, setSelectedService] = useState("Tất cả");

  const [loading, setLoading] = useState(true);

  // ================= API =================
  useEffect(() => {
    fetchTechnicians();
    fetchSkills();
    fetchServices();
  }, []);

  const fetchTechnicians = async () => {
    try {
      const res = await axios.get(
        "http://10.0.2.2:8082/api/all/technician/",
        {
          params: { pageNo: 1 },
        }
      );

      const mapped = res.data.data.map((t) => ({
        id: t.id_user,
        name: t.full_name,
        skills: t.nameSkillTechnician || [],
        services: t.nameServiceTechnician || [],
        job: (t.nameSkillTechnician || []).join(", "),
        avatar: t.avatarBase64
          ? `data:image/jpeg;base64,${t.avatarBase64}`
          : avatar_default,
        rating: t.total_star ?? 0,
        location: t.working_area || "",
      }));

      setTechnicians(mapped);
    } catch (err) {
      console.error("API technician error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchSkills = async () => {
    try {
      const res = await axios.get(
        "http://10.0.2.2:8082/api/skill/"
      );

      const skillNames = res.data.data.map((s) => s.skill_name);

      setSkills(["Tất cả", ...skillNames]);
    } catch (error) {
      console.error("Lỗi lấy skill:", error);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        "http://10.0.2.2:8082/api/service/all/"
      );

      const serviceNames = res.data.data.map(
        (s) => s.name_service
      );

      setServices(["Tất cả", ...serviceNames]);
    } catch (error) {
      console.error("Lỗi lấy service:", error);
    }
  };

  // ================= FILTER =================
  const filtered = technicians.filter((t) => {
    const matchSkill =
      selectedSkill === "Tất cả" ||
      t.skills.includes(selectedSkill);

    const matchService =
      selectedService === "Tất cả" ||
      t.services.includes(selectedService);

    const matchSearch =
      t.name.toLowerCase().includes(search.toLowerCase()) ||
      t.job.toLowerCase().includes(search.toLowerCase());

    return matchSkill && matchService && matchSearch;
  });

  // ================= LOADING =================
  if (loading) {
    return (
      <View style={styles.contentLoading}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  // ================= STAR =================
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const empty = 5 - full;

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <Ionicons
            key={`f-${i}`}
            name="star"
            size={14}
            color="#f5a623"
          />
        ))}
        {[...Array(empty)].map((_, i) => (
          <Ionicons
            key={`e-${i}`}
            name="star-outline"
            size={14}
            color="#f5a623"
          />
        ))}
      </>
    );
  };

  // ================= UI =================
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
              placeholder="Search technician..."
              value={search}
              onChangeText={setSearch}
              style={styles.input}
            />
          </View>

          {/* 🔥 SKILL FILTER */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ marginBottom: 10 }}
          >
            {skills.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tag,
                  selectedSkill === item && styles.tagActive,
                ]}
                onPress={() => setSelectedSkill(item)}
              >
                <Text
                  style={{
                    color:
                      selectedSkill === item ? "#fff" : "#000",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* 🔥 SERVICE FILTER */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            nestedScrollEnabled={true}
            style={{ marginBottom: 15 }}
          >
            {services.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tag,
                  selectedService === item && styles.tagActive,
                ]}
                onPress={() => setSelectedService(item)}
              >
                <Text
                  style={{
                    color:
                      selectedService === item ? "#fff" : "#000",
                  }}
                >
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* LIST */}
          {filtered.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() =>
                navigation.navigate("WorkerDetail", {
                  id: item.id,
                })
              }
            >
              <Image
                source={
                  typeof item.avatar === "string"
                    ? { uri: item.avatar }
                    : item.avatar
                }
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.job}>{item.job}</Text>

                <View style={styles.ratingRow}>
                  {renderStars(item.rating)}
                  <Text> ({item.rating})</Text>
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

// ================= STYLE =================
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
    justifyContent: "center",
    alignItems: "center",
  },

  searchBox: {
    backgroundColor: "#fff",
    borderRadius: 15,
    paddingHorizontal: 15,
    marginBottom: 15,
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
  },

  tagActive: {
    backgroundColor: "#ff6600",
  },

  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  name: {
    fontWeight: "bold",
  },

  job: {
    color: "#777",
  },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  bookBtn: {
    backgroundColor: "#ff6600",
    padding: 10,
    borderRadius: 10,
  },

  bookText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
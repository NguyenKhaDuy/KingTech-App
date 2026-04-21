import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function TechSkillManagerScreen({ route, navigation }) {
  const { technicianId } = route.params;

  const [allSkills, setAllSkills] = useState([]);
  const [techSkills, setTechSkills] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== MOCK DATA ===== */
  useEffect(() => {

    setAllSkills([
      { id: 1, name: "Sửa điện" },
      { id: 2, name: "Sửa nước" },
      { id: 3, name: "Điện lạnh" },
    ]);

    setTechSkills([
      { id: 1, name: "Sửa điện" },
      { id: 3, name: "Điện lạnh" },
    ]);
  }, []);

  /* ===== ADD ===== */
  const addSkill = () => {
    if (!selected) return;

    const skill = allSkills.find((s) => s.id === selected);

    if (techSkills.some((s) => s.id === selected)) return;

    setTechSkills([...techSkills, skill]);
  };

  /* ===== DELETE ===== */
  const deleteSkill = () => {
    if (!selected) return;

    setTechSkills(techSkills.filter((s) => s.id !== selected));
    setSelected(null);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Quản lý kỹ năng</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        
        {/* LEFT */}
        <View style={styles.left}>
          <Text style={styles.title}>Kỹ năng của thợ</Text>

          <FlatList
            data={techSkills}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.skillItem,
                  selected === item.id && styles.selectedSkill,
                ]}
                onPress={() => setSelected(item.id)}
              >
                <Text
                  style={[
                    styles.skillText,
                    selected === item.id && { color: "#fff" },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* RIGHT */}
        <View style={styles.right}>
          <View style={styles.selectedBox}>
            <Ionicons name="construct" size={20} color="#ff6600" />
            <Text style={styles.selectedText}>
              {selected
                ? allSkills.find((s) => s.id === selected)?.name
                : "Chưa chọn"}
            </Text>
          </View>

          {/* SELECT */}
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={selected}
              onValueChange={(value) => setSelected(value)}
            >
              <Picker.Item label="Chọn kỹ năng" value={null} />
              {allSkills.map((s) => (
                <Picker.Item key={s.id} label={s.name} value={s.id} />
              ))}
            </Picker>
          </View>

          {/* BUTTON */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.addBtn} onPress={addSkill}>
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.btnText}>Thêm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={deleteSkill}>
              <Ionicons name="trash" size={18} color="#fff" />
              <Text style={styles.btnText}>Xóa</Text>
            </TouchableOpacity>
          </View>

          {/* PREVIEW */}
          <View style={styles.preview}>
            <Text>[ Skill Preview ]</Text>
          </View>
        </View>
      </View>

      {/* LOADING */}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#ff6600" />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6600",
  },

  /* HEADER */
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ff6600",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  /* CONTENT */
  content: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    padding: 10,
  },

  left: {
    flex: 1,
    marginRight: 5,
  },

  right: {
    flex: 2,
    marginLeft: 5,
  },

  title: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  skillItem: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
    alignItems: "center",
  },

  selectedSkill: {
    backgroundColor: "#ff6600",
    borderColor: "#ff6600",
  },

  skillText: {
    color: "#333",
  },

  selectedBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
  },

  selectedText: {
    fontWeight: "600",
  },

  pickerBox: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },

  row: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  addBtn: {
    flex: 1,
    backgroundColor: "#ff6600",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteBtn: {
    flex: 1,
    backgroundColor: "#ef4444",
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    marginLeft: 5,
    fontWeight: "600",
  },

  preview: {
    height: 120,
    backgroundColor: "#eee",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
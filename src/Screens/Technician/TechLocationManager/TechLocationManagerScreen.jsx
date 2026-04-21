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

export default function TechLocationManagerScreen({ route, navigation }) {
  const { technicianId } = route.params;

  const [allLocations, setAllLocations] = useState([]);
  const [techLocations, setTechLocations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== MOCK DATA ===== */
  useEffect(() => {
    console.log("Technician ID:", technicianId);

    setAllLocations([
      { id: 1, name: "Phường 1 - TP Bạc Liêu - Bạc Liêu" },
      { id: 2, name: "Phường 7 - TP Bạc Liêu - Bạc Liêu" },
      { id: 3, name: "Phường Nhà Mát - TP Bạc Liêu - Bạc Liêu" },
    ]);

    setTechLocations([
      { id: 1, name: "Phường 1 - TP Bạc Liêu - Bạc Liêu" },
      { id: 3, name: "Phường Nhà Mát - TP Bạc Liêu - Bạc Liêu" },
    ]);
  }, []);

  /* ===== ADD ===== */
  const addLocation = () => {
    if (!selected) return;

    const location = allLocations.find((l) => l.id === selected);

    if (techLocations.some((l) => l.id === selected)) return;

    setTechLocations([...techLocations, location]);
  };

  /* ===== DELETE ===== */
  const deleteLocation = () => {
    if (!selected) return;

    setTechLocations(techLocations.filter((l) => l.id !== selected));
    setSelected(null);
  };

  return (
    <SafeAreaView edges={["top"]} style={styles.container}>
      
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Quản lý vị trí</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        
        {/* LEFT */}
        <View style={styles.left}>
          <Text style={styles.title}>Vị trí của thợ</Text>

          <FlatList
            data={techLocations}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.item,
                  selected === item.id && styles.selectedItem,
                ]}
                onPress={() => setSelected(item.id)}
              >
                <Text
                  style={[
                    styles.itemText,
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
            <Ionicons name="location" size={20} color="#ff6600" />
            <Text style={styles.selectedText}>
              {selected
                ? allLocations.find((l) => l.id === selected)?.name
                : "Chưa chọn"}
            </Text>
          </View>

          {/* SELECT */}
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={selected}
              onValueChange={(value) => setSelected(value)}
            >
              <Picker.Item label="Chọn vị trí" value={null} />
              {allLocations.map((l) => (
                <Picker.Item key={l.id} label={l.name} value={l.id} />
              ))}
            </Picker>
          </View>

          {/* BUTTON */}
          <View style={styles.row}>
            <TouchableOpacity style={styles.addBtn} onPress={addLocation}>
              <Ionicons name="add" size={18} color="#fff" />
              <Text style={styles.btnText}>Thêm</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.deleteBtn} onPress={deleteLocation}>
              <Ionicons name="trash" size={18} color="#fff" />
              <Text style={styles.btnText}>Xóa</Text>
            </TouchableOpacity>
          </View>

          {/* PREVIEW */}
          <View style={styles.preview}>
            <Text>[ Location Preview ]</Text>
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

  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

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

  item: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
    alignItems: "center",
  },

  selectedItem: {
    backgroundColor: "#ff6600",
    borderColor: "#ff6600",
  },

  itemText: {
    color: "#333",
    textAlign: "center",
  },

  selectedBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
  },

  selectedText: {
    fontWeight: "600",
    flex: 1,
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
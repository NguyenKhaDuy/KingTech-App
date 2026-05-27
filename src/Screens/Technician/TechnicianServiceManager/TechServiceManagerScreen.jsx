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

export default function TechServiceManagerScreen({
  route,
  navigation,
}) {
  const { technicianId } = route.params;

  const [allServices, setAllServices] = useState([]);
  const [techServices, setTechServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  /* ===== MOCK DATA ===== */
  useEffect(() => {
    setAllServices([
      { id: 1, name: "Sửa điện" },
      { id: 2, name: "Sửa nước" },
      { id: 3, name: "Điện lạnh" },
      { id: 4, name: "Lắp máy lạnh" },
    ]);

    setTechServices([
      { id: 1, name: "Sửa điện" },
      { id: 3, name: "Điện lạnh" },
    ]);
  }, []);

  /* ===== ADD ===== */
  const addService = () => {
    if (!selected) return;

    const service = allServices.find(
      (s) => s.id === selected
    );

    if (
      techServices.some((s) => s.id === selected)
    )
      return;

    setTechServices([...techServices, service]);
  };

  /* ===== DELETE ===== */
  const deleteService = () => {
    if (!selected) return;

    setTechServices(
      techServices.filter((s) => s.id !== selected)
    );

    setSelected(null);
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={styles.container}
    >
      {/* ===== HEADER ===== */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#fff"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Quản lý dịch vụ
        </Text>

        <View style={{ width: 22 }} />
      </View>

      {/* ===== CONTENT ===== */}
      <View style={styles.content}>
        {/* ===== LEFT ===== */}
        <View style={styles.left}>
          <Text style={styles.title}>
            Dịch vụ của thợ
          </Text>

          <FlatList
            data={techServices}
            keyExtractor={(item) =>
              item.id.toString()
            }
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.serviceItem,
                  selected === item.id &&
                    styles.selectedService,
                ]}
                onPress={() =>
                  setSelected(item.id)
                }
              >
                <Text
                  style={[
                    styles.serviceText,
                    selected === item.id && {
                      color: "#fff",
                    },
                  ]}
                >
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* ===== RIGHT ===== */}
        <View style={styles.right}>
          {/* SELECTED */}
          <View style={styles.selectedBox}>
            <Ionicons
              name="briefcase-outline"
              size={20}
              color="#ff6600"
            />

            <Text style={styles.selectedText}>
              {selected
                ? allServices.find(
                    (s) => s.id === selected
                  )?.name
                : "Chưa chọn"}
            </Text>
          </View>

          {/* PICKER */}
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={selected}
              onValueChange={(value) =>
                setSelected(value)
              }
            >
              <Picker.Item
                label="Chọn dịch vụ"
                value={null}
              />

              {allServices.map((s) => (
                <Picker.Item
                  key={s.id}
                  label={s.name}
                  value={s.id}
                />
              ))}
            </Picker>
          </View>

          {/* BUTTON */}
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.addBtn}
              onPress={addService}
            >
              <Ionicons
                name="add"
                size={18}
                color="#fff"
              />

              <Text style={styles.btnText}>
                Thêm
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.deleteBtn}
              onPress={deleteService}
            >
              <Ionicons
                name="trash"
                size={18}
                color="#fff"
              />

              <Text style={styles.btnText}>
                Xóa
              </Text>
            </TouchableOpacity>
          </View>

          {/* PREVIEW */}
          <View style={styles.preview}>
            <Ionicons
              name="briefcase-outline"
              size={40}
              color="#999"
            />

            <Text style={styles.previewText}>
              [ Service Preview ]
            </Text>
          </View>
        </View>
      </View>

      {/* ===== LOADING ===== */}
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator
            size="large"
            color="#ff6600"
          />
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

  /* ===== HEADER ===== */
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

  /* ===== CONTENT ===== */
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
    fontSize: 15,
  },

  /* ===== SERVICE ITEM ===== */
  serviceItem: {
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginBottom: 8,
    alignItems: "center",
  },

  selectedService: {
    backgroundColor: "#ff6600",
    borderColor: "#ff6600",
  },

  serviceText: {
    color: "#333",
  },

  /* ===== SELECTED ===== */
  selectedBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    gap: 5,
  },

  selectedText: {
    fontWeight: "600",
    fontSize: 15,
  },

  /* ===== PICKER ===== */
  pickerBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
  },

  /* ===== BUTTON ===== */
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

  /* ===== PREVIEW ===== */
  preview: {
    flex: 1,
    backgroundColor: "#f1f1f1",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  previewText: {
    marginTop: 10,
    color: "#777",
  },

  /* ===== LOADING ===== */
  loading: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
});
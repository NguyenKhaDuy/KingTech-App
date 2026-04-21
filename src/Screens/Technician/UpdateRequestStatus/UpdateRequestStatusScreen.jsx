import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function UpdateRequestStatusScreen({ route, navigation }) {
  const { orderId, currentStatus } = route.params;

  const [status, setStatus] = useState(currentStatus || "RECEIVED");

  /* ===== LIST STATUS ===== */
  const statusList = [
    { label: "Đã nhận", value: "RECEIVED" },
    { label: "Đang xử lý", value: "PROCESSING" },
    { label: "Hoàn thành", value: "COMPLETED" },
    { label: "Đã hủy", value: "CANCELLED" },
  ];

  /* ===== SUBMIT ===== */
  const handleUpdate = () => {
    const payload = {
      orderId,
      status,
    };

    console.log("UPDATE STATUS:", payload);

    alert("Cập nhật trạng thái thành công!");
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ff6600" }}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Cập nhật trạng thái</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        
        {/* ORDER ID */}
        <Text style={styles.order}>
          Mã đơn: <Text style={styles.orderId}>#{orderId}</Text>
        </Text>

        {/* SELECT STATUS */}
        <Text style={styles.label}>Trạng thái</Text>

        <View style={styles.pickerBox}>
          <Picker
            selectedValue={status}
            onValueChange={(value) => setStatus(value)}
          >
            {statusList.map((s) => (
              <Picker.Item key={s.value} label={s.label} value={s.value} />
            ))}
          </Picker>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.btn} onPress={handleUpdate}>
          <Text style={styles.btnText}>Cập nhật</Text>
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ff6600",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  order: {
    fontSize: 16,
    marginBottom: 20,
  },

  orderId: {
    color: "#ff6600",
    fontWeight: "bold",
  },

  label: {
    fontWeight: "600",
    marginBottom: 5,
  },

  pickerBox: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 20,
  },

  btn: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ChangeEmailScreen({ navigation }) {
  const [currentEmail, setCurrentEmail] = useState("duynguyents15@gmail.com");
  const [newEmail, setNewEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const handleSubmit = () => {
    if (newEmail !== confirmEmail) {
      alert("Email xác nhận không khớp");
      return;
    }

    if (!newEmail.includes("@")) {
      alert("Email không hợp lệ");
      return;
    }

    navigation.navigate("OtpScreen");
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "#ff6600" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Đổi email</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.label}>Email hiện tại</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={currentEmail}
          editable={false}
        />

        <Text style={styles.label}>Email mới</Text>
        <TextInput
          placeholder="Nhập email mới"
          style={styles.input}
          value={newEmail}
          onChangeText={setNewEmail}
        />

        <Text style={styles.label}>Xác nhận email mới</Text>
        <TextInput
          placeholder="Nhập lại email mới"
          style={styles.input}
          value={confirmEmail}
          onChangeText={setConfirmEmail}
        />

        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Lưu email mới</Text>
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

  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  disabledInput: {
    color: "#888",
  },

  btn: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
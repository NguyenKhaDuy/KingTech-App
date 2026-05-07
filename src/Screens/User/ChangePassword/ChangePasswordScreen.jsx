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
import { showToast } from "../../../utils/showToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { ActivityIndicator } from "react-native";

export default function ChangePasswordScreen({ navigation, route }) {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const { email } = route.params;
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (newPass !== confirmPass) {
      showToast("error", "Mật khẩu không khớp");
      return;
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");
      setLoading(true);

      if (!token || !userStr) return;

      const user = JSON.parse(userStr);
      console.log(email);

      const res = await axios.post(
        "http://10.0.2.2:8082/api/changepassword/",
        {
          old_password: oldPass,
          new_password: newPass,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.status === 200) {
        showToast("success", "OTP đã được gửi");

        navigation.navigate("OtpScreen", {
          email: email,
          type: "CHANGE_PASSWORD",
        });
      }
    } catch (err) {
      console.log(err?.response?.data || err.message);
      showToast("error", "Không thể gửi OTP");
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#ff6600" }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Đổi mật khẩu</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <TextInput
          placeholder="Mật khẩu cũ"
          secureTextEntry
          style={styles.input}
          value={oldPass}
          onChangeText={setOldPass}
        />

        <TextInput
          placeholder="Mật khẩu mới"
          secureTextEntry
          style={styles.input}
          value={newPass}
          onChangeText={setNewPass}
        />

        <TextInput
          placeholder="Xác nhận mật khẩu"
          secureTextEntry
          style={styles.input}
          value={confirmPass}
          onChangeText={setConfirmPass}
        />

        <TouchableOpacity
          style={[styles.btn, loading && { opacity: 0.7 }]}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Tiếp tục</Text>
          )}
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
  input: {
    backgroundColor: "#f2f2f2",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
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

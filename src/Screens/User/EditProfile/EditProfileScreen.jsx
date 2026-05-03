import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { showToast } from "../../../utils/showToast";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const formatDOB = (dobArr) => {
  if (!dobArr) return "";

  const [year, month, day] = dobArr;
  return `${day.toString().padStart(2, "0")}/${month
    .toString()
    .padStart(2, "0")}/${year}`;
};

const parseDOB = (dobStr) => {
  if (!dobStr) return null;

  const [day, month, year] = dobStr.split("/");

  return [Number(year), Number(month), Number(day)];
};

export default function EditProfileScreen({ navigation, route }) {
  const { profile } = route.params || {};
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (profile) {
      setName(profile.full_name || "");
      setPhone(profile.phone_number || "");
      setDob(formatDOB(profile.dob));
      setGender(profile.gender || "male");
      setAddress(profile.address || "");
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");

      if (!token || !userStr) return;

      const user = JSON.parse(userStr);

      const payload = {
        id_user: user.id_user,
        full_name: name,
        phone_number: phone,
        address: address,
        gender: gender,
        dob: parseDOB(dob),
      };

      await axios.put("http://10.0.2.2:8082/api/customer/profile/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      showToast("success", "Cập nhật thành công");
      navigation.goBack();
    } catch (error) {
      console.log("UPDATE ERROR:", error?.response?.data || error.message);
      showToast("error", "Cập nhật thất bại");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Edit Profile</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* FORM */}
      <View style={styles.form}>
        {/* NAME */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Họ tên</Text>
          <TextInput value={name} onChangeText={setName} style={styles.input} />
        </View>

        {/* PHONE */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Số điện thoại</Text>
          <TextInput
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        {/* DOB */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Ngày sinh</Text>
          <TextInput
            value={dob}
            onChangeText={setDob}
            placeholder="dd/mm/yyyy"
            style={styles.input}
          />
        </View>

        {/* GENDER */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Giới tính</Text>

          <View style={styles.genderRow}>
            <TouchableOpacity
              style={[
                styles.genderBtn,
                gender === "Nam" && styles.genderActive,
              ]}
              onPress={() => setGender("Nam")}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === "Nam" && styles.genderTextActive,
                ]}
              >
                Nam
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.genderBtn, gender === "Nữ" && styles.genderActive]}
              onPress={() => setGender("Nữ")}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === "Nữ" && styles.genderTextActive,
                ]}
              >
                Nữ
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ADDRESS */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Địa chỉ</Text>
          <TextInput
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
        </View>
      </View>

      {/* SAVE BUTTON */}
      <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
        <Text style={styles.saveText}>Lưu thay đổi</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
  },

  header: {
    backgroundColor: "#ff6600",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  form: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  inputGroup: {
    marginBottom: 15,
  },

  label: {
    fontSize: 13,
    color: "#777",
    marginBottom: 5,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
  },

  genderRow: {
    flexDirection: "row",
    gap: 10,
  },

  genderBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fff",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
  },

  genderActive: {
    backgroundColor: "#ff6600",
  },

  genderText: {
    color: "#555",
    fontWeight: "500",
  },

  genderTextActive: {
    color: "#fff",
    fontWeight: "bold",
  },

  saveBtn: {
    backgroundColor: "#ff6600",
    margin: 20,
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

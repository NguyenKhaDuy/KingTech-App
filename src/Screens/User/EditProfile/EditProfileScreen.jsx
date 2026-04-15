import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfileScreen({ navigation }) {
  const [name, setName] = useState("Huynh Trong Nhan");
  const [phone, setPhone] = useState("0971349801");
  const [dob, setDob] = useState("10/10/2003");
  const [gender, setGender] = useState("male");
  const [address, setAddress] = useState("Bạc Liêu");

  const handleSave = () => {
    alert("Cập nhật thành công!");
    navigation.goBack();
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
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
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
                gender === "male" && styles.genderActive,
              ]}
              onPress={() => setGender("male")}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === "male" && styles.genderTextActive,
                ]}
              >
                Nam
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.genderBtn,
                gender === "female" && styles.genderActive,
              ]}
              onPress={() => setGender("female")}
            >
              <Text
                style={[
                  styles.genderText,
                  gender === "female" && styles.genderTextActive,
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
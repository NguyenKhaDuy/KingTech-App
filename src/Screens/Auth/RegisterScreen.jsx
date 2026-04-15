import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RegisterScreen() {
  const navigation = useNavigation(); // ✅ chỉ dùng cái này

  const [form, setForm] = useState({
    full_name: "",
    address: "",
    phone_number: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = () => {
    console.log(form);
    // 👉 call API ở đây
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {/* LOGO */}
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />

      {/* TITLE */}
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Join KingTech</Text>

      {/* INPUTS */}
      <TextInput
        placeholder="Full Name"
        style={styles.input}
        onChangeText={(val) => handleChange("full_name", val)}
      />

      <TextInput
        placeholder="Address"
        style={styles.input}
        onChangeText={(val) => handleChange("address", val)}
      />

      <TextInput
        placeholder="Phone Number"
        style={styles.input}
        keyboardType="phone-pad"
        onChangeText={(val) => handleChange("phone_number", val)}
      />

      <TextInput
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        onChangeText={(val) => handleChange("email", val)}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={(val) => handleChange("password", val)}
      />

      <TextInput
        placeholder="Date of Birth (YYYY-MM-DD)"
        style={styles.input}
        onChangeText={(val) => handleChange("dob", val)}
      />

      <TextInput
        placeholder="Gender (Male/Female)"
        style={styles.input}
        onChangeText={(val) => handleChange("gender", val)}
      />

      {/* BUTTON */}
      <TouchableOpacity style={styles.registerBtn} onPress={handleRegister}>
        <Text style={styles.registerText}>Sign Up</Text>
      </TouchableOpacity>

      {/* BACK TO LOGIN */}
      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, // ✅ QUAN TRỌNG
    justifyContent: "center", // ✅ căn giữa dọc
    padding: 25,
    backgroundColor: "#fff",
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 10,
    resizeMode: "contain",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#ff6600",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    fontSize: 15,
  },

  registerBtn: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  registerText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  footer: {
    textAlign: "center",
    marginTop: 20,
    color: "#777",
  },

  link: {
    color: "#ff6600",
    fontWeight: "bold",
  },
});

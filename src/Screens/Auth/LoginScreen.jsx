import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../utils/showToast";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://192.168.1.6:8082/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const text = await res.text(); // đọc trước

      if (!res.ok) {
        throw new Error(text);
      }

      // parse JSON an toàn
      const data = JSON.parse(text);

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data));

      const roles = data.roles || [];

      if (roles.includes("TECHNICIAN")) {
        navigation.replace("TechnicianMain");
        return;
      }

      if (roles.includes("CUSTOMER")) {
        navigation.replace("CustomerMain");
        return;
      }

    } catch (error) {
      console.log("LOGIN ERROR:", error);
      showToast("error", error.message || "Sai email hoặc mật khẩu")
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />

      <Text style={styles.title}>KingTech</Text>
      <Text style={styles.subtitle}>Welcome back 👋</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.navigate("TechnicianMain")}>
        <Text style={styles.loginText}>
          {loading ? "Loading..." : "Login"}
        </Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Don’t have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Register")}
        >
          Sign up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 25,
    justifyContent: "center",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginBottom: 20,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#ff6600",
    textAlign: "center",
  },
  subtitle: { textAlign: "center", color: "#777", marginBottom: 30 },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  loginText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  footer: { textAlign: "center", marginTop: 20, color: "#777" },
  link: { color: "#ff6600", fontWeight: "bold" },
});

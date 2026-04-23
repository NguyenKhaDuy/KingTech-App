import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { showToast } from "../../utils/showToast";
import { connectWebSocket } from "../../utils/stompClient";
import { FontAwesome } from "@expo/vector-icons";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://192.168.1.10:8082/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text);
      }

      const data = JSON.parse(text);

      //lưu token
      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data));

      //CONNECT SOCKET NGAY SAU LOGIN
      const client = connectWebSocket(data.token);

      setTimeout(() => {
        const roles = data.roles || [];

        if (roles.includes("TECHNICIAN")) {
          navigation.replace("TechnicianMain");
        } else {
          navigation.replace("CustomerMain");
        }
      }, 500);
    } catch (error) {
      console.log("LOGIN ERROR:", error);
      showToast("error", error.message || "Sai email hoặc mật khẩu");
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

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>{loading ? "Loading..." : "Login"}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn}>
        <Image
          source={require("../../../assets/google.png")}
          style={styles.googleIcon}
        />
        <Text style={styles.googleText}>Continue with Google</Text>
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
  googleBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 15,

    // shadow iOS
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },

    // Android
    elevation: 3,
  },

  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
    resizeMode: "contain",
  },

  googleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
  },
});

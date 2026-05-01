import React, { useState, useEffect } from "react";
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

import { GoogleSignin } from "@react-native-google-signin/google-signin";

export default function LoginScreen() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= GOOGLE CONFIG =================
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        "706771451235-6fbp4gohpvu5tjtc47gc0jigdnv1beh1.apps.googleusercontent.com",
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  // ================= EMAIL LOGIN =================
  const handleLogin = async () => {
    try {
      setLoading(true);

      const res = await fetch("http://10.0.2.2:8082/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data));

      connectWebSocket(data.token);

      if (data.roles?.includes("TECHNICIAN")) {
        navigation.replace("TechnicianMain");
      } else {
        navigation.replace("CustomerMain");
      }
    } catch (error) {
      console.log(error);
      showToast("error", "Login failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= GOOGLE LOGIN =================
  const handleGoogleLogin = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      await GoogleSignin.signOut();

      const response = await GoogleSignin.signIn();

      const idToken = response.data?.idToken;

      if (!idToken) {
        showToast("error", "Không lấy được Google token");
        return;
      }

      const res = await fetch("http://10.0.2.2:8082/api/auth/google-login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: idToken,
        }),
      });

      if (!res.ok) {
        throw new Error("Backend login failed");
      }

      const data = await res.json();

      await AsyncStorage.setItem("token", data.token);
      await AsyncStorage.setItem("user", JSON.stringify(data));

      connectWebSocket(data.token);

      if (data.roles?.includes("TECHNICIAN")) {
        navigation.replace("TechnicianMain");
      } else {
        navigation.replace("CustomerMain");
      }
    } catch (error) {
      console.log("GOOGLE ERROR:", error);
      showToast("error", "Google login failed");
    }
  };

  // ================= UI =================
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

      {/* LOGIN BUTTON */}
      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>{loading ? "Loading..." : "Login"}</Text>
      </TouchableOpacity>

      {/* GOOGLE BUTTON */}
      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleLogin}>
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

// ================= STYLE =================
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
  subtitle: {
    textAlign: "center",
    color: "#777",
    marginBottom: 30,
  },
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
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
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
    elevation: 3,
  },
  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#444",
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

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      {/* LOGO */}
      <Image source={require("../../../assets/logo.png")} style={styles.logo} />

      {/* TITLE */}
      <Text style={styles.title}>KingTech</Text>
      <Text style={styles.subtitle}>Welcome back 👋</Text>

      {/* INPUT EMAIL */}
      <TextInput
        placeholder="Email"
        style={styles.input}
        placeholderTextColor="#999"
      />

      {/* INPUT PASSWORD */}
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        placeholderTextColor="#999"
      />

      {/* LOGIN BUTTON */}
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => navigation.replace("Main")}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      {/* REGISTER */}
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

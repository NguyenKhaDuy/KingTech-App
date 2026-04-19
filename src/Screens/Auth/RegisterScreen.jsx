import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { showToast } from "../../utils/showToast";

export default function RegisterScreen() {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    full_name: "",
    address: "",
    phone_number: "",
    email: "",
    password: "",
    dob: "",
    gender: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // DATE PICKER STATE
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const handleChange = (key, value) => {
    setForm({ ...form, [key]: value });
  };

  // HANDLE DATE CHANGE
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      setDate(selectedDate);

      const formatted = selectedDate.toISOString().split("T")[0]; // YYYY-MM-DD
      handleChange("dob", formatted);
    }
  };

  const handleRegister = async () => {
    setError("");

    if (form.password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone_number: form.phone_number,
      address: form.address,
      password: form.password,
      dob: form.dob,
      gender: form.gender,
    };

    try {
      setLoading(true);

      const res = await fetch("http://192.168.1.6:8082/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      navigation.navigate("OtpScreen", {
        email: form.email,
        type: "REGISTER",
      });
    } catch (err) {
      console.log("REGISTER ERROR:", err);
      const msg = err.message || "Đăng ký thất bại";
      setError(msg);
      showToast("error", msg)
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* LOGO */}
      <Image
        source={require("../../../assets/logo.png")}
        style={styles.logo}
      />

      {/* TITLE */}
      <Text style={styles.title}>Register</Text>
      <Text style={styles.subtitle}>Join KingTech</Text>

      {/* ERROR */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

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
        placeholder="Confirm Password"
        secureTextEntry
        style={styles.input}
        onChangeText={(val) => setConfirmPassword(val)}
      />

      {/* DOB PICKER */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ color: form.dob ? "#000" : "#999" }}>
          {form.dob || "Select Date of Birth"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChangeDate}
          maximumDate={new Date()}
        />
      )}

      <TextInput
        placeholder="Gender (MALE/FEMALE)"
        style={styles.input}
        onChangeText={(val) => handleChange("gender", val)}
      />

      {/* BUTTON */}
      <TouchableOpacity
        style={[styles.registerBtn, loading && { opacity: 0.6 }]}
        onPress={handleRegister}
        disabled={loading}
      >
        <Text style={styles.registerText}>
          {loading ? "Loading..." : "Sign Up"}
        </Text>
      </TouchableOpacity>

      {/* LOGIN */}
      <Text style={styles.footer}>
        Already have an account?{" "}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("Login")}
        >
          Login
        </Text>
      </Text>
    </ScrollView>
  );
}

/* STYLE */
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
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

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});
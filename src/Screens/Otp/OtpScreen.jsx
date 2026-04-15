import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function OtpScreen({ navigation }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300); // 5 phút
  const inputs = useRef([]);

  // ⏱ countdown
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = () => {
    const m = Math.floor(timeLeft / 60);
    const s = timeLeft % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const handleChange = (text, index) => {
    let newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  };

  const handleResend = () => {
    setTimeLeft(300);
    alert("OTP đã được gửi lại!");
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "#ff6600" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Nhập Mã OTP</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.desc}>
          Nhập mã OTP đã gửi đến email của bạn
        </Text>

        {/* OTP INPUT */}
        <View style={styles.otpRow}>
          {otp.map((digit, index) => (
            <TextInput
              key={index}
              style={styles.otpBox}
              keyboardType="number-pad"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChange(text, index)}
              ref={(ref) => (inputs.current[index] = ref)}
            />
          ))}
        </View>

        {/* TIMER */}
        <Text style={styles.timer}>{formatTime()}</Text>

        {/* RESEND */}
        <TouchableOpacity
          disabled={timeLeft > 0}
          onPress={handleResend}
        >
          <Text
            style={[
              styles.resend,
              { color: timeLeft > 0 ? "#aaa" : "#ff6600" },
            ]}
          >
            Gửi lại
          </Text>
        </TouchableOpacity>

        {/* VERIFY */}
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Xác nhận</Text>
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
    fontWeight: "bold"
  },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  desc: {
    marginBottom: 20,
    color: "#555",
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
  },
  otpBox: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 20,
  },
  timer: {
    fontSize: 16,
    marginBottom: 10,
    color: "#ff6600",
    fontWeight: "bold",
  },
  resend: {
    marginBottom: 20,
    fontWeight: "bold",
  },
  btn: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 12,
    width: "100%",
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
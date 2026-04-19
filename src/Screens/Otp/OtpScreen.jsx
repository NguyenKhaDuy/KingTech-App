import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { showToast } from "../../utils/showToast";

export default function OtpScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const { email, type } = route.params;

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(300);
  const [loading, setLoading] = useState(false); // ✅ FIX MISSING STATE

  const inputs = useRef([]);

  /* TIMER */
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((p) => p - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  /* OTP CHANGE */
  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  /* VERIFY OTP */
  const handleVerify = async () => {
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      showToast("error", "OTP phải đủ 6 số");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("http://192.168.1.6:8082/api/verify-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          otp: otpValue,
          type,
        }),
      });

      const text = await res.text();

      if (!res.ok) {
        throw new Error(text);
      }
      showToast("success", "Đăng ký thành công");
      navigation.replace("Login");
    } catch (err) {
      console.log("OTP VERIFY ERROR:", err);
      showToast("error", "OTP không đúng");
    } finally {
      setLoading(false);
    }
  };

  /* RESEND OTP */
  const handleResend = async () => {
    if (timeLeft > 0) return;

    try {
      setLoading(true);

      const res = await fetch("http://192.168.1.6:8082/api/resend-otp/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        throw new Error(data?.message || "Gửi OTP thất bại");
      }

      setTimeLeft(300);
      setOtp(["", "", "", "", "", ""]);

      showToast("success", data?.message || "OTP đã gửi lại");
    } catch (err) {
      console.log("RESEND OTP ERROR:", err);
      showToast("error", err.message || "Không gửi lại OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Xác thực OTP</Text>
      <Text style={styles.desc}>OTP gửi đến: {email}</Text>

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
      <Text style={styles.timer}>{timeLeft}s</Text>

      {/* RESEND */}
      <TouchableOpacity
        disabled={timeLeft > 0 || loading}
        onPress={handleResend}
      >
        <Text style={styles.resend}>
          {timeLeft > 0 ? "Chờ gửi lại OTP" : "Gửi lại OTP"}
        </Text>
      </TouchableOpacity>

      {/* VERIFY */}
      <TouchableOpacity
        style={[styles.btn, loading && { opacity: 0.6 }]}
        onPress={handleVerify}
        disabled={loading}
      >
        <Text style={styles.btnText}>{loading ? "Loading..." : "Verify"}</Text>
      </TouchableOpacity>
    </View>
  );
}

/* STYLE */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#ff6600",
  },

  desc: {
    marginBottom: 20,
    color: "#555",
    textAlign: "center",
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
    color: "#ff6600",
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

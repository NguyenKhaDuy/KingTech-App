import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { showToast } from "../../../utils/showToast";

export default function HelpScreen({ navigation }) {
  const [requestId, setRequestId] = useState("");
  const [feedback, setFeedback] = useState("");
  const [requests, setRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchRequests = async () => {
    try {
      setLoadingRequests(true);

      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);

      if (!token || !user?.id_user) return;

      const res = await fetch(
        `http://10.0.2.2:8082/api/customer/request/id_customer=${user.id_user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();

      if (json.message === "Success") {
        setRequests(json.data || []);
      } else {
        console.log(json.message);
      }
    } catch (err) {
      console.log("Lỗi fetch requests", err);
    } finally {
      setLoadingRequests(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleSubmit = async () => {
    if (!feedback.trim()) {
      alert("Vui lòng nhập nội dung góp ý");
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");
      const user = JSON.parse(userStr);

      const res = await axios.post(
        `http://10.0.2.2:8082/api/customer/feedback/`,
        {
          content: feedback,
          customer_id: user.id_user,
          request_id: requestId || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );

      if (res.data.message === "Success") {
        setFeedback("");
        setRequestId("");

        showToast("success", "Gửi phản hồi thành công!");
      } else {
        showToast("error", res.data.message || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.log("Lỗi gửi feedback", error);
      showToast("error", "Gửi thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#ff6600" }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Trợ giúp</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <Text style={styles.bigTitle}>Góp ý & Phản hồi</Text>
        <Text style={styles.subTitle}>
          Ý kiến của bạn giúp chúng tôi cải thiện dịch vụ tốt hơn
        </Text>

        {/* Dropdown */}
        <Text style={styles.label}>Mã yêu cầu (không bắt buộc)</Text>
        <View style={styles.pickerWrapper}>
          {loadingRequests ? (
            <ActivityIndicator style={{ padding: 10 }} />
          ) : (
            <Picker
              selectedValue={requestId}
              onValueChange={(itemValue) => setRequestId(itemValue)}
            >
              <Picker.Item label="-- Không chọn mã yêu cầu --" value="" />

              {requests.length > 0 ? (
                requests.map((item) => (
                  <Picker.Item
                    key={item.id_request}
                    label={`REQ-${item.id_request}`}
                    value={item.id_request}
                  />
                ))
              ) : (
                <Picker.Item label="Không có yêu cầu" value="" />
              )}
            </Picker>
          )}
        </View>

        {/* Textarea */}
        <TextInput
          placeholder="Nhập góp ý của bạn tại đây..."
          multiline
          numberOfLines={5}
          style={styles.textArea}
          value={feedback}
          onChangeText={setFeedback}
        />

        {/* Button */}
        <TouchableOpacity
          style={styles.btn}
          onPress={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.btnText}>Gửi phản hồi</Text>
          )}
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
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  bigTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  subTitle: {
    color: "#777",
    marginBottom: 20,
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
    color: "#555",
  },

  pickerWrapper: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    marginBottom: 15,
    overflow: "hidden",
  },

  textArea: {
    backgroundColor: "#f2f2f2",
    borderRadius: 12,
    padding: 15,
    textAlignVertical: "top",
    marginBottom: 20,
    height: 120,
  },

  btn: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

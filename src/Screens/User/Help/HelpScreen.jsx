import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function HelpScreen({ navigation }) {
  const [requestId, setRequestId] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!feedback.trim()) {
      alert("Vui lòng nhập nội dung góp ý");
      return;
    }

    alert("Gửi phản hồi thành công!");
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "#ff6600" }}>
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
          <Picker
            selectedValue={requestId}
            onValueChange={(itemValue) => setRequestId(itemValue)}
          >
            <Picker.Item label="-- Không chọn mã yêu cầu --" value="" />
            <Picker.Item label="REQ-001" value="REQ-001" />
            <Picker.Item label="REQ-002" value="REQ-002" />
          </Picker>
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
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={styles.btnText}>Gửi phản hồi</Text>
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
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

/* ===== FORMAT ===== */
const formatDateArray = (arr) => {
  if (!arr) return "";
  return `${arr[2]}/${arr[1]}/${arr[0]}`;
};

const formatTime = (time) => {
  if (!time) return "";
  return time.slice(0, 5);
};

export default function RequestTechDetailScreen({ route, navigation }) {
  const { orderId } = route.params;

  const [request, setRequest] = useState(null);

  /* ===== MOCK API ===== */
  useEffect(() => {
    const fakeData = {
  id: orderId,
  customer: {
    full_name: "Nguyễn Văn A",
    phone_number: "0901234567",
  },
  name_service: "Sửa điện",
  status_code: "COMPLETED",
  scheduled_date: [2026, 4, 20],
  scheduled_time: "08:30:00",
  location: "Bạc Liêu",
  description: "Ổ điện bị chập, cần sửa gấp",

  image_request: [
    "https://images.unsplash.com/photo-1581091870627-3a1a9b1e8c2b",
    "https://images.unsplash.com/photo-1604147706283-6d7b1d89c9c4",
    "https://images.unsplash.com/photo-1581091215367-59ab6b7f1f64",
  ],
};
    setRequest(fakeData);
  }, [orderId]);

  /* ===== LOADING ===== */
  if (!request) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text>Đang tải...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ff6600" }}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Chi tiết đơn hàng</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* INFO */}
          <View style={styles.card}>
            
            <View style={styles.row}>
              <Text style={styles.label}>Khách hàng:</Text>
              <Text style={styles.value}>{request.customer.full_name}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>SĐT:</Text>
              <Text style={styles.value}>{request.customer.phone_number}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Dịch vụ:</Text>
              <Text style={styles.value}>{request.name_service}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Trạng thái:</Text>
              <Text style={styles.status}>{request.status_code}</Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Ngày hẹn:</Text>
              <Text style={styles.value}>
                {formatDateArray(request.scheduled_date)}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Giờ hẹn:</Text>
              <Text style={styles.value}>
                {formatTime(request.scheduled_time)}
              </Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Địa chỉ:</Text>
              <Text style={styles.value}>{request.location}</Text>
            </View>

            <View style={styles.column}>
              <Text style={styles.label}>Mô tả:</Text>
              <Text style={styles.value}>{request.description}</Text>
            </View>
          </View>

          {/* IMAGE */}
          {request.image_request?.length > 0 && (
            <View style={styles.imageBox}>
              <Text style={styles.section}>Hình ảnh đính kèm</Text>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {request.image_request.map((img, i) => (
                  <Image
                    key={i}
                    source={{ uri: `data:image/jpeg;base64,${img}` }}
                    style={styles.image}
                  />
                ))}
              </ScrollView>
            </View>
          )}

          {/* BUTTON */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnText}>Đóng</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/* ===== STYLE ===== */
const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

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
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  card: {
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#eee",
    gap: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  column: {
    marginTop: 5,
  },

  label: {
    fontWeight: "600",
    color: "#555",
  },

  value: {
    color: "#333",
    maxWidth: "60%",
    textAlign: "right",
  },

  status: {
    color: "#ff6600",
    fontWeight: "bold",
  },

  section: {
    fontWeight: "bold",
    marginBottom: 10,
    fontSize: 16,
  },

  imageBox: {
    marginTop: 20,
  },

  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  btn: {
    marginTop: 20,
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
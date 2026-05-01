import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import avatarDefault from "../../../../assets/avatar_default.jpg";
import { Ionicons } from "@expo/vector-icons";

export default function RequestDetailScreen({ route, navigation }) {
  const { request } = route.params;

  const formatDateTime = (date, time) => {
    if (!date || !time) return "";

    try {
      let day, month, year, hour, minute;

      // ===== DATE =====
      if (Array.isArray(date)) {
        // [2025, 10, 21]
        [year, month, day] = date;
      } else if (typeof date === "string") {
        const parts = date.split("-");
        if (parts[0].length === 4) {
          [year, month, day] = parts;
        } else {
          [day, month, year] = parts;
        }
      }

      // ===== TIME =====
      if (Array.isArray(time)) {
        // [17, 0]
        [hour, minute] = time;
      } else if (typeof time === "string") {
        [hour, minute] = time.split(":");
      }

      // format 2 digit
      const pad = (n) => String(n).padStart(2, "0");

      return `${pad(day)}/${pad(month)}/${year} ${pad(hour)}:${pad(minute)}`;
    } catch (err) {
      console.log("Format lỗi:", err);
      return "";
    }
  };

  const getAvatar = (base64) => {
    if (base64) {
      return { uri: `data:image/jpeg;base64,${base64}` };
    }
    return avatarDefault;
  };

  const getImage = (base64) => {
    if (!base64) return null;
    return { uri: `data:image/jpeg;base64,${base64}` };
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Chi tiết yêu cầu #{request.id_request}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={20} color="#999" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {/* SERVICE */}
          <View style={styles.section}>
            <Text style={styles.label}>Dịch vụ:</Text>
            <Text style={styles.value}>{request.name_service}</Text>
          </View>

          {/* STATUS */}
          <View style={styles.section}>
            <Text style={styles.label}>Trạng thái:</Text>
            <Text style={[styles.status, getStatusStyle(request.status_code)]}>
              {getStatusLabel(request.status_code)}
            </Text>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.section}>
            <Text style={styles.label}>Mô tả:</Text>
            <Text style={styles.value}>{request.description}</Text>
          </View>

          {/* CUSTOMER */}
          <View style={styles.section}>
            <Text style={styles.label}>Khách hàng:</Text>

            <View style={styles.userRow}>
              <Image
                source={getAvatar(request.customer?.avatarBase64)}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>{request.customer?.full_name}</Text>

                <View style={styles.rowIcon}>
                  <Ionicons name="call-outline" size={14} color="#777" />
                  <Text style={styles.sub}>
                    {request.customer?.phone_number}
                  </Text>
                </View>

                <View style={styles.rowIcon}>
                  <Ionicons name="location-outline" size={14} color="#777" />
                  <Text style={styles.sub}>{request.customer?.address}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* TECHNICIAN */}
          <View style={styles.section}>
            <Text style={styles.label}>Kỹ thuật viên:</Text>

            <View style={styles.userRow}>
              <Image
                source={getAvatar(request.technicicanDTO?.avatarBase64)}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>
                  {request.technicicanDTO?.full_name || "Chưa có"}
                </Text>

                <View style={styles.rowIcon}>
                  <Ionicons name="call-outline" size={14} color="#777" />
                  <Text style={styles.sub}>
                    {request.technicicanDTO?.phone_number || "-"}
                  </Text>
                </View>

                <Text style={styles.sub}>
                  Kinh nghiệm: {request.technicicanDTO?.experience || 0} năm
                </Text>
              </View>
            </View>
          </View>

          {/* TIME */}
          <View style={styles.section}>
            <Text style={styles.label}>Thời gian:</Text>
            <View style={styles.rowIcon}>
              <Ionicons name="time-outline" size={14} color="#777" />
              <Text style={styles.value}>
                {formatDateTime(request.scheduled_date, request.scheduled_time)}
              </Text>
            </View>
          </View>

          {/* ADDRESS */}
          <View style={styles.section}>
            <Text style={styles.label}>Địa điểm:</Text>
            <View style={styles.rowIcon}>
              <Ionicons name="location-outline" size={14} color="#777" />
              <Text style={styles.value}>{request.location}</Text>
            </View>
          </View>
        </ScrollView>

        {/* IMAGES */}
        {request.image_request && request.image_request.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.label}>Hình ảnh:</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {request.image_request.map((img, index) => (
                <Image
                  key={index}
                  source={getImage(img)}
                  style={styles.requestImage}
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
      </View>
    </View>
  );
}

function getStatusStyle(status) {
  switch (status) {
    case "COMPLETED":
      return { backgroundColor: "#d4edda", color: "#00aa55" };
    case "WAITING_FOR_TECHNICIAN":
    case "SEARCHING":
      return { backgroundColor: "#fff3cd", color: "#ffaa00" };
    case "RECEIVED":
    case "RECEIVING":
      return { backgroundColor: "#d1ecf1", color: "#0099cc" };
    case "CANCEL":
      return { backgroundColor: "#f8d7da", color: "#ff4444" };
    default:
      return { backgroundColor: "#eee", color: "#666" };
  }
}

function getStatusLabel(status) {
  switch (status) {
    case "WAITING_FOR_TECHNICIAN":
    case "SEARCHING":
      return "Chờ thợ";
    case "RECEIVED":
      return "Đã nhận";
    case "RECEIVING":
      return "Đang sửa";
    case "COMPLETED":
      return "Hoàn thành";
    case "CANCEL":
      return "Đã hủy";
    default:
      return status;
  }
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    maxHeight: "85%",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#ff6600",
  },

  section: {
    marginBottom: 12,
  },

  label: {
    fontSize: 12,
    color: "#777",
    marginBottom: 2,
  },

  value: {
    fontWeight: "500",
  },

  status: {
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontSize: 12,
    fontWeight: "bold",
  },

  userRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },

  avatar: {
    width: 45,
    height: 45,
    borderRadius: 25,
    marginRight: 10,
  },

  name: {
    fontWeight: "bold",
  },

  sub: {
    color: "#777",
    fontSize: 12,
    marginLeft: 5,
  },

  rowIcon: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },

  btn: {
    backgroundColor: "#ff6600",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  requestImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 10,
  },
});

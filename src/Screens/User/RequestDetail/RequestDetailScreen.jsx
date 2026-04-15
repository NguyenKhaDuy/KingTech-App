import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

export default function RequestDetailScreen({ route, navigation }) {
  const { request } = route.params;

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Chi tiết yêu cầu #{request.id}</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={styles.close}>✕</Text>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>

          {/* SERVICE */}
          <View style={styles.section}>
            <Text style={styles.label}>Dịch vụ:</Text>
            <Text style={styles.value}>{request.name}</Text>
          </View>

          {/* STATUS */}
          <View style={styles.section}>
            <Text style={styles.label}>Trạng thái:</Text>
            <Text style={[styles.status, getStatusStyle(request.status)]}>
              {request.status.toUpperCase()}
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
                source={{ uri: "https://i.pravatar.cc/100" }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>Trần Thị Lụa</Text>
                <Text style={styles.sub}>📞 0971349801</Text>
                <Text style={styles.sub}>📍 Bạc Liêu</Text>
              </View>
            </View>
          </View>

          {/* TECHNICIAN */}
          <View style={styles.section}>
            <Text style={styles.label}>Kỹ thuật viên:</Text>

            <View style={styles.userRow}>
              <Image
                source={{ uri: "https://i.pravatar.cc/101" }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.name}>Nguyễn Văn Vũ</Text>
                <Text style={styles.sub}>📞 0971349801</Text>
                <Text style={styles.sub}>Kinh nghiệm: 10 năm</Text>
              </View>
            </View>
          </View>

          {/* TIME */}
          <View style={styles.section}>
            <Text style={styles.label}>Thời gian:</Text>
            <Text style={styles.value}>2025/10/21 17:00</Text>
          </View>

          {/* ADDRESS */}
          <View style={styles.section}>
            <Text style={styles.label}>Địa điểm:</Text>
            <Text style={styles.value}>
              27 Cao Văn Lầu, Phường 2, TP. Bạc Liêu
            </Text>
          </View>

        </ScrollView>

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
    case "completed":
      return { backgroundColor: "#d4edda", color: "#00aa55" };
    case "pending":
      return { backgroundColor: "#fff3cd", color: "#ffaa00" };
    case "cancel":
      return { backgroundColor: "#f8d7da", color: "#ff4444" };
    default:
      return {};
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

  close: {
    fontSize: 18,
    color: "#999",
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
    paddingVertical: 3,
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
});
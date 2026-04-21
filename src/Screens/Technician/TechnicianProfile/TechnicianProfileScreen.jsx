import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";

export default function TechnicianProfileScreen({ navigation }) {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150");

  /* ===== FAKE USER ===== */
  const [user] = useState({
    id_user: 1,
    full_name: "Nguyễn Văn Thợ",
    email: "tho@example.com",
  });

  /* ===== PICK IMAGE ===== */
  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Lỗi", "Bạn cần cấp quyền để chọn ảnh!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.profileCard}>
        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={pickImage}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </TouchableOpacity>

          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </View>

        <Text style={styles.name}>{user.full_name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      {/* MENU */}
      <View style={styles.menuContainer}>
        <MenuItem
          icon="build-outline"
          title="Quản lý kỹ năng"
          onPress={() =>
            navigation.navigate("TechSkillManage", {
              technicianId: user.id_user,
            })
          }
        />
        <MenuItem
          icon="location-outline" title="Quản lý vị trí"
          onPress={() =>
            navigation.navigate("TechLocationManage", {
              technicianId: user.id_user,
            })
          }
        />
        <MenuItem icon="mail-outline" title="Quản lý Email" onPress={() => navigation.navigate("ChangeEmail")}  />
        <MenuItem icon="key-outline" title="Đổi mật khẩu" onPress={() => navigation.navigate("ChangePassword")}/>
        <MenuItem icon="person-outline" title="Chỉnh sửa tài khoản" onPress={() => navigation.navigate("EditProfile")} />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#ff4444" />
        <Text style={styles.logoutText}>Đăng xuất</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ===== MENU ITEM ===== */
function MenuItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={20} color="#444" />
        <Text style={styles.menuText}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
  );
}

/* ===== STYLE ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  profileCard: {
    backgroundColor: "#ff6600",
    paddingTop: 60,
    paddingBottom: 30,
    alignItems: "center",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },

  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#ff6600",
    padding: 5,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#fff",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },

  email: {
    color: "#fff",
    opacity: 0.9,
  },

  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },

  menuItem: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 15,
    borderRadius: 12,
    marginBottom: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    elevation: 2,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 12,
    fontSize: 15,
    color: "#333",
  },

  logoutBtn: {
    marginTop: 20,
    marginHorizontal: 16,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    elevation: 2,
  },

  logoutText: {
    color: "#ff4444",
    fontWeight: "bold",
    marginLeft: 5,
  },
});
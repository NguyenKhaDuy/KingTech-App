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

export default function AccountScreen({ navigation }) {
  const [avatar, setAvatar] = useState("https://i.pravatar.cc/150");

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
      {/* HEADER PROFILE */}
      <View style={styles.profileCard}>
        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={pickImage} activeOpacity={0.8}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </TouchableOpacity>

          <View style={styles.cameraIcon} pointerEvents="none">
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </View>

        <Text style={styles.name}>Huynh Trong Nhan</Text>
        <Text style={styles.email}>nhan@example.com</Text>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.editText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* MENU */}
      <View style={styles.menuContainer}>
        <MenuItem
          icon="lock-closed-outline"
          title="Đổi mật khẩu"
          onPress={() => navigation.navigate("ChangePassword")}
        />

        <MenuItem icon="mail-outline" title="Đổi email" onPress={() => navigation.navigate("ChangeEmail")} />

        <MenuItem icon="help-circle-outline" title="Trợ giúp" onPress={() => navigation.navigate("Help")} />

        <MenuItem icon="settings-outline" title="Cài đặt" />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity style={styles.logoutBtn}>
        <Ionicons name="log-out-outline" size={20} color="#ff4444" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// 🔹 Menu Item Component
function MenuItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuLeft}>
        <Ionicons name={icon} size={20} color="#555" />
        <Text style={styles.menuText}>{title}</Text>
      </View>

      <Ionicons name="chevron-forward" size={18} color="#999" />
    </TouchableOpacity>
  );
}

// 🎨 STYLE
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f4f7",
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
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#fff",
    marginBottom: 10,
  },

  cameraIcon: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#ff6600",
    padding: 6,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#fff",
  },

  name: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  email: {
    color: "#fff",
    opacity: 0.9,
    marginBottom: 10,
  },

  editBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 20,
  },

  editText: {
    color: "#ff6600",
    fontWeight: "bold",
  },

  menuContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },

  menuItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
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
    marginLeft: 10,
    fontSize: 15,
  },

  logoutBtn: {
    marginTop: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,

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

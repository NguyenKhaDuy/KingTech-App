import React, { useState, useEffect, useCallback } from "react";
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { disconnectWebSocket } from "../../../utils/stompClient";
import avatar_default from "../../../../assets/avatar_default.jpg";
import axios from "axios";
import { showToast } from "../../../utils/showToast";
import { useFocusEffect } from "@react-navigation/native";

export default function AccountScreen({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [avatar, setAvatar] = useState(null);

  //gọi api profile
  const fetchProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");

      if (!token || !userStr) return;

      const user = JSON.parse(userStr);

      const res = await axios.get(
        `http://10.0.2.2:8082/api/customer/profile/id=${user.id_user}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const data = res.data.data;

      setProfile(data);

      if (data?.avatarBase64) {
        setAvatar(`data:image/jpeg;base64,${data.avatarBase64}`);
      } else {
        setAvatar(null);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchProfile();
    }, []),
  );

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permission.status !== "granted") {
      showToast("error", "Bạn cần cấp quyền để chọn ảnh!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true, //cho crop
      aspect: [1, 1], //vuông để fit avatar tròn
      quality: 1,
    });

    if (result.canceled) return;

    const asset = result.assets[0];

    // update UI trước
    setAvatar(asset.uri);

    // upload luôn
    await uploadAvatar(asset);
  };

  //gọi api upload ảnh đại diện
  const uploadAvatar = async (asset) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");

      if (!token || !userStr) return;

      const user = JSON.parse(userStr);

      const formData = new FormData();

      formData.append("id_user", user.id_user);

      formData.append("avatar", {
        uri: asset.uri,
        name: "avatar.jpg",
        type: "image/jpeg",
      });

      await axios.put(
        "http://10.0.2.2:8082/api/customer/profile/avatar/",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      showToast("success", "Upload thành công");
    } catch (error) {
      showToast("error", "Upload lỗi:");
    }
  };

  const handleLogout = async (navigation) => {
    try {
      // Xóa dữ liệu
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      // Ngắt websocket
      disconnectWebSocket();

      // Quay về màn login (reset stack luôn)
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* HEADER PROFILE */}
      <View style={styles.profileCard}>
        <View style={{ position: "relative" }}>
          <TouchableOpacity activeOpacity={0.8} onPress={pickImage}>
            <Image
              source={avatar ? { uri: avatar } : avatar_default}
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </View>

        <Text style={styles.name}>{profile?.full_name || "No Name"}</Text>

        <Text style={styles.email}>{profile?.email || "No Email"}</Text>

        <TouchableOpacity
          style={styles.editBtn}
          onPress={() =>
            navigation.navigate("EditProfile", {
              profile,
            })
          }
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

        <MenuItem
          icon="mail-outline"
          title="Đổi email"
          onPress={() => navigation.navigate("ChangeEmail")}
        />

        <MenuItem
          icon="help-circle-outline"
          title="Trợ giúp"
          onPress={() => navigation.navigate("Help")}
        />

        <MenuItem icon="settings-outline" title="Cài đặt" />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => handleLogout(navigation)}
      >
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

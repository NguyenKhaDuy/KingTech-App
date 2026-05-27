import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import { disconnectWebSocket } from "../../../utils/stompClient";
import avatar_default from "../../../../assets/avatar_default.jpg";

export default function TechnicianProfileScreen({ navigation }) {
  const [avatar, setAvatar] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===== LOAD PROFILE ===== */
  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);

      // lấy token + user từ AsyncStorage
      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");

      if (!token || !userStr) {
        throw new Error("Không tìm thấy thông tin đăng nhập");
      }

      const user = JSON.parse(userStr);
      const id_user = user.id_user;

      const res = await axios.get(
        `http://10.0.2.2:8082/api/technician/profile/id=${id_user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.data?.data) {
        throw new Error("Không có dữ liệu trả về");
      }

      setProfile(res.data.data);

      if (res.data.data?.avatarBase64) {
        setAvatar(`data:image/jpeg;base64,${res.data.data.avatarBase64}`);
      } else {
        setAvatar(null);
      }

    } catch (err) {
      console.log("FETCH PROFILE ERROR:", err);

      Alert.alert(
        "Lỗi",
        err.response?.data?.message || err.message
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* ===== PICK IMAGE ===== */
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
        "http://10.0.2.2:8082/api/technician/profile/avatar/",
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

  /* ===== LOGOUT ===== */
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");

      disconnectWebSocket();

      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      console.log("LOGOUT ERROR:", error);
    }
  };

  /* ===== LOADING ===== */
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff6600" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.profileCard}>
        <View style={{ position: "relative" }}>
          <TouchableOpacity onPress={pickImage}>
            <Image
              source={
                avatar
                  ? { uri: avatar }
                  : avatar_default
              }
              style={styles.avatar}
            />
          </TouchableOpacity>

          <View style={styles.cameraIcon}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </View>

        <Text style={styles.name}>
          {profile?.full_name || "Chưa có tên"}
        </Text>

        <Text style={styles.email}>
          {profile?.email || "Chưa có email"}
        </Text>
      </View>

      {/* MENU */}
      <View style={styles.menuContainer}>
        <MenuItem
          icon="build-outline"
          title="Quản lý kỹ năng"
          onPress={() =>
            navigation.navigate("TechSkillManage", {
              technicianId: profile?.id_user,
            })
          }
        />

        <MenuItem
          icon="briefcase-outline"
          title="Quản lý dịch vụ"
          onPress={() =>
            navigation.navigate("TechServiceManage", {
              technicianId: profile?.id_user,
            })
          }
        />

        <MenuItem
          icon="location-outline"
          title="Quản lý vị trí"
          onPress={() =>
            navigation.navigate("TechLocationManage", {
              technicianId: profile?.id_user,
            })
          }
        />

        <MenuItem
          icon="mail-outline"
          title="Quản lý Email"
          onPress={() =>
            navigation.navigate("ChangeEmail")
          }
        />

        <MenuItem
          icon="key-outline"
          title="Đổi mật khẩu"
          onPress={() =>
            navigation.navigate("ChangePassword")
          }
        />

        <MenuItem
          icon="person-outline"
          title="Chỉnh sửa tài khoản"
          onPress={() =>
            navigation.navigate("EditProfile", {
              profile,
            })
          }
        />
      </View>

      {/* LOGOUT */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={handleLogout}
      >
        <Ionicons
          name="log-out-outline"
          size={20}
          color="#ff4444"
        />

        <Text style={styles.logoutText}>
          Đăng xuất
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

/* ===== MENU ITEM ===== */
function MenuItem({ icon, title, onPress }) {
  return (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={onPress}
    >
      <View style={styles.menuLeft}>
        <Ionicons
          name={icon}
          size={20}
          color="#444"
        />

        <Text style={styles.menuText}>
          {title}
        </Text>
      </View>

      <Ionicons
        name="chevron-forward"
        size={18}
        color="#999"
      />
    </TouchableOpacity>
  );
}

/* ===== STYLE ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
    marginBottom: 30,
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
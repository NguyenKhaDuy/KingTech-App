import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function CreateRequestScreen({ route }) {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const { technicianId } = route.params;

  // SERVICE
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [openService, setOpenService] = useState(false);
  const [location, setLocation] = useState("");

  // DATE TIME
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // ================= API =================
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://10.0.2.2:8082/api/service/all/");
      const data = await res.json();

      if (data?.data) {
        setServices(data.data);
      }
    } catch (err) {
      console.error("Fetch services error:", err);
    }
  };

  // ================= DATE FORMAT =================
  const formatDate = (d) => d.toLocaleDateString("vi-VN");

  const formatTime = (t) =>
    t.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  // ================= IMAGE =================
  const pickImage = async () => {
    if (images.length >= 5) {
      Alert.alert("Limit", "Maximum 5 images");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsMultipleSelection: true,
      quality: 0.7,
    });

    if (!result.canceled) {
      const newImages = result.assets.map((item) => item.uri);
      setImages((prev) => [...prev, ...newImages].slice(0, 5));
    }
  };

  const takePhoto = async () => {
    if (images.length >= 5) {
      Alert.alert("Limit", "Maximum 5 images");
      return;
    }

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert("Permission required", "Allow camera access");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });

    if (!result.canceled) {
      setImages((prev) => [...prev, result.assets[0].uri]);
    }
  };

  const handleUpload = () => {
    Alert.alert("Select Image", "Choose option", [
      { text: "Camera", onPress: takePhoto },
      { text: "Gallery", onPress: pickImage },
      { text: "Cancel", style: "cancel" },
    ]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ================= SUBMIT =================
  const handleSubmit = async () => {
    try {
      if (!selectedService) {
        Alert.alert("Error", "Please select service");
        return;
      }

      const userStr = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      if (!userStr || !token) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      const user = JSON.parse(userStr);

      const formData = new FormData();

      if (technicianId) {
        formData.append("id_technician", technicianId);
      }

      // service + user
      formData.append("id_service", selectedService.id_service);
      formData.append("id_customer", user.id_user);

      // address
      formData.append("location", location || "");
      formData.append("description", description);

      // date + time
      const scheduled_date = date.toISOString().split("T")[0];
      const scheduled_time = time.toTimeString().slice(0, 5) + ":00";

      formData.append("scheduled_date", scheduled_date);
      formData.append("scheduled_time", scheduled_time);

      // images
      images.forEach((uri, index) => {
        formData.append("imageRequest", {
          uri,
          name: `image_${index}.jpg`,
          type: "image/jpeg",
        });
      });

      const res = await fetch("http://10.0.2.2:8082/api/customer/request/", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (data.message === "SUCCESS") {
        Alert.alert("Success", "Tạo yêu cầu thành công");

        // reset form (optional)
        setDescription("");
        setImages([]);
        setSelectedService(null);
        setLocation("");
      } else {
        Alert.alert("Error", data.message || "Failed");
      }
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "System error");
    }
  };

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#ff6600" }}
    >
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Request</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        >
          {/* SERVICE */}
          <View style={styles.card}>
            <Text style={styles.label}>Service</Text>

            <TouchableOpacity
              style={styles.inputBox}
              onPress={() => setOpenService(!openService)}
            >
              <Ionicons name="construct-outline" size={18} color="#777" />
              <Text style={styles.inputText}>
                {selectedService
                  ? selectedService.name_service
                  : "Select service"}
              </Text>

              <Ionicons
                name={openService ? "chevron-up" : "chevron-down"}
                size={18}
                color="#777"
                style={{ marginLeft: "auto" }}
              />
            </TouchableOpacity>

            {openService && (
              <View style={styles.dropdown}>
                <ScrollView style={{ maxHeight: 200 }}>
                  {services.map((item) => (
                    <TouchableOpacity
                      key={item.id_service}
                      style={styles.dropdownItem}
                      onPress={() => {
                        setSelectedService(item);
                        setOpenService(false);
                      }}
                    >
                      <Text>{item.name_service}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            )}
          </View>

          {/* ADDRESS */}
          <View style={styles.card}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              placeholder="Enter your address"
              value={location}
              style={styles.input}
              onChangeText={setLocation}
            />
          </View>

          {/* DATE TIME */}
          <View style={styles.card}>
            <Text style={styles.label}>Schedule</Text>

            <View style={styles.row}>
              <TouchableOpacity
                style={styles.halfInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Ionicons name="calendar-outline" size={18} color="#777" />
                <Text style={styles.inputText}>{formatDate(date)}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.halfInput}
                onPress={() => setShowTimePicker(true)}
              >
                <Ionicons name="time-outline" size={18} color="#777" />
                <Text style={styles.inputText}>{formatTime(time)}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* DESCRIPTION */}
          <View style={styles.card}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              placeholder="Describe your problem..."
              multiline
              value={description}
              onChangeText={setDescription}
              style={styles.textArea}
            />
          </View>

          {/* IMAGE */}
          <View style={styles.card}>
            <Text style={styles.label}>Images (max 5)</Text>

            <View style={styles.imageGrid}>
              {images.map((img, index) => (
                <View key={index} style={styles.imageItem}>
                  <Image source={{ uri: img }} style={styles.preview} />

                  <TouchableOpacity
                    style={styles.removeBtn}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close" size={14} color="#fff" />
                  </TouchableOpacity>
                </View>
              ))}

              {images.length < 5 && (
                <TouchableOpacity style={styles.addBox} onPress={handleUpload}>
                  <Ionicons name="camera-outline" size={24} color="#aaa" />
                </TouchableOpacity>
              )}
            </View>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Submit Request</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* DATE PICKER */}
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(e, d) => {
              setShowDatePicker(false);
              if (d) setDate(d);
            }}
          />
        )}

        {/* TIME PICKER */}
        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={(e, t) => {
              setShowTimePicker(false);
              if (t) setTime(t);
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

// ================= STYLE =================
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ff6600",
    paddingVertical: 15,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2,
  },

  label: {
    fontWeight: "bold",
    marginBottom: 8,
  },

  inputBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  inputText: {
    marginLeft: 10,
    color: "#555",
  },

  dropdown: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 10,
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
  },

  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  halfInput: {
    flex: 0.48,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
  },

  textArea: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    height: 100,
  },

  imageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  imageItem: {
    width: "30%",
    height: 100,
  },

  preview: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },

  addBox: {
    width: "30%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  removeBtn: {
    position: "absolute",
    top: 5,
    right: 5,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 10,
    padding: 3,
  },

  submitBtn: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  submitText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

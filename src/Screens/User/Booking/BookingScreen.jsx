import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';

export default function CreateRequestScreen() {
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);

  const pickImage = async () => {
    if (images.length >= 5) {
      Alert.alert('Limit', 'Maximum 5 images');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
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
      Alert.alert('Limit', 'Maximum 5 images');
      return;
    }

    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert('Permission required', 'Allow camera access');
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
    Alert.alert('Select Image', 'Choose option', [
      { text: 'Camera', onPress: takePhoto },
      { text: 'Gallery', onPress: pickImage },
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#ff6600' }}>
      
      {/* 🔥 HEADER giống Request */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Create Request</Text>
      </View>

      {/* 🔥 CONTENT */}
      <View style={[styles.content, { paddingBottom: 10 }]}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
          
          {/* SERVICE */}
          <View style={styles.card}>
            <Text style={styles.label}>Service</Text>
            <TouchableOpacity style={styles.inputBox}>
              <Ionicons name="construct-outline" size={18} color="#777" />
              <Text style={styles.inputText}>Fix Laptop</Text>
            </TouchableOpacity>
          </View>

          {/* ADDRESS */}
          <View style={styles.card}>
            <Text style={styles.label}>Address</Text>
            <TextInput placeholder="Enter your address" style={styles.input} />
          </View>

          {/* DATE TIME */}
          <View style={styles.card}>
            <Text style={styles.label}>Schedule</Text>

            <View style={styles.row}>
              <TouchableOpacity style={styles.halfInput}>
                <Ionicons name="calendar-outline" size={18} color="#777" />
                <Text style={styles.inputText}>20 Apr</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.halfInput}>
                <Ionicons name="time-outline" size={18} color="#777" />
                <Text style={styles.inputText}>10:30 AM</Text>
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
                <View key={img + index} style={styles.imageItem}>
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

          {/* PRICE */}
          <View style={styles.card}>
            <Text style={styles.label}>Estimated Price</Text>
            <Text style={styles.price}>$50</Text>
          </View>

          {/* BUTTON */}
          <TouchableOpacity style={styles.submitBtn}>
            <Text style={styles.submitText}>Submit Request</Text>
          </TouchableOpacity>

          <View style={{ height: 40 }} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* HEADER */
  header: {
    backgroundColor: '#ff6600',
    paddingVertical: 15,
    alignItems: 'center',
  },

  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  /* CONTENT */
  content: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  /* CARD */
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15,
    marginBottom: 12,
    elevation: 2,
  },

  label: {
    fontWeight: 'bold',
    marginBottom: 8,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputText: {
    marginLeft: 10,
    color: '#555',
  },

  input: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  halfInput: {
    flex: 0.48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
  },

  textArea: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
  },

  imageGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },

  imageItem: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },

  preview: {
    width: '100%',
    height: '100%',
  },

  addBox: {
    width: '30%',
    height: 100,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
  },

  removeBtn: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 12,
    width: 22,
    height: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },

  price: {
    color: '#ff6600',
    fontWeight: 'bold',
    fontSize: 16,
  },

  submitBtn: {
    backgroundColor: '#ff6600',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  submitText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';

export default function Services() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('http://10.0.2.2:8082/api/service/all/');
        setServices(res.data.data || []);
      } catch (error) {
        console.error('Fetch lỗi:', error);
      }
    };

    fetchServices();
  }, []);

  const getImageSrc = (icon) => {
    if (!icon) return null;

    if (icon.startsWith('data:image')) return { uri: icon };
    if (icon.startsWith('/9j/')) return { uri: `data:image/jpeg;base64,${icon}` };
    if (icon.startsWith('iVBOR')) return { uri: `data:image/png;base64,${icon}` };

    return { uri: `data:image/jpeg;base64,${icon}` };
  };

  return (
    <View style={{ marginTop: 10, marginBottom: 10 }}>
      <Text style={styles.title}>Dịch vụ</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.container}
      >
        {services.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card} activeOpacity={0.8}>
            
            <View style={styles.iconWrapper}>
              {item.icon && (
                <Image
                  source={getImageSrc(item.icon)}
                  style={styles.icon}
                />
              )}
            </View>

            <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
              {item.name_service}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    marginLeft: 12,
  },

  container: {
    paddingHorizontal: 10,
  },

  card: {
    width: 110,
    backgroundColor: '#fff',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginRight: 12,
    alignItems: 'center',

    // shadow đẹp hơn
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  iconWrapper: {
    width: 55,
    height: 55,
    borderRadius: 14, // cam nhạt
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },

  icon: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },

  text: {
    fontSize: 13,
    fontWeight: '500',
    textAlign: 'center',
    color: '#333',
    lineHeight: 16,
    minHeight: 32, // 🔥 giữ layout không bị lệch khi text ngắn
  },
});
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function Banner() {
  return (
    <View style={styles.banner}>
      <View style={{ flex: 1 }}>
        <Text style={styles.text}>Book Technician Fast 🚀</Text>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Book Now</Text>
        </TouchableOpacity>
      </View>

      <Image
        source={{
          uri: 'https://cdn-icons-png.flaticon.com/512/2920/2920277.png',
        }}
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    backgroundColor: '#ff6600',
    borderRadius: 20,
    padding: 20,
    marginBottom: 25,
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  btn: {
    backgroundColor: '#fff',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 10,
  },

  btnText: {
    color: '#ff6600',
    fontWeight: 'bold',
  },

  image: {
    width: 80,
    height: 80,
    marginLeft: 10,
  },
});
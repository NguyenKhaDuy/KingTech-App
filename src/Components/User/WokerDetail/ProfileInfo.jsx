import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function ProfileInfo({ name, avatar }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri: avatar }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.rating}>⭐ 4.8 (120 đánh giá)</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#ff6600',
    marginBottom: 10,
  },
  name: { fontSize: 22, fontWeight: 'bold' },
  rating: { color: '#777' },
});
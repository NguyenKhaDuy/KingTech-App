import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Reviews() {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Đánh giá</Text>

      <View style={styles.card}>
        <Text style={styles.name}>Trần B</Text>
        <Text>⭐⭐⭐⭐⭐</Text>
        <Text>Rất chuyên nghiệp!</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.name}>Lê C</Text>
        <Text>⭐⭐⭐⭐</Text>
        <Text>Nhiệt tình, giá hợp lý.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 15 },
  title: { fontWeight: 'bold', fontSize: 18 },

  card: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },

  name: { fontWeight: 'bold' },
});
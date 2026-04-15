import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function JobInfo() {
  return (
    <View style={styles.box}>
      <Text style={styles.job}>Thợ sửa điện</Text>
      <Text style={styles.exp}>5 năm kinh nghiệm</Text>
      <Text style={styles.level}>🎖 Level: Chuyên nghiệp</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#FFF3E0',
    padding: 12,
    borderRadius: 12,
    marginVertical: 10,
  },
  job: { fontWeight: 'bold' },
  exp: { color: '#555' },
  level: { color: '#ff6600', fontWeight: 'bold', marginTop: 5 },
});
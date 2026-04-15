import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Services({ services }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Dịch vụ</Text>

      <View style={styles.grid}>
        {services.map((s, i) => (
          <View key={i} style={styles.card}>
            <Text style={styles.icon}>{s.icon}</Text>
            <Text style={styles.text}>{s.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 15 },
  title: { fontWeight: 'bold', fontSize: 18 },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  card: {
    width: '48%',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 10,
  },

  icon: { fontSize: 24 },
  text: { fontSize: 13, textAlign: 'center' },
});
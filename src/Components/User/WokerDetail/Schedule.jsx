import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Schedule({ schedule }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Lịch làm việc</Text>

      {schedule.map((s, i) => (
        <View key={i} style={styles.item}>
          <Text style={styles.day}>{s.day}</Text>
          <Text style={styles.time}>{s.time}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 15 },
  title: { fontWeight: 'bold', fontSize: 18 },

  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 10,
    marginTop: 8,
  },

  day: { fontWeight: 'bold' },
  time: { color: '#ff6600', fontWeight: 'bold' },
});
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Skills({ skills }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Kỹ năng</Text>
      <View style={styles.container}>
        {skills.map((s, i) => (
          <Text key={i} style={styles.tag}>{s}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { marginTop: 15 },
  title: { fontWeight: 'bold', fontSize: 18 },
  container: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 },
  tag: {
    backgroundColor: '#FFF3E0',
    color: '#ff6600',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
    fontSize: 12,
  },
});
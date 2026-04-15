import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function Services() {
  const data = [
    { icon: '🔧', name: 'Repair' },
    { icon: '💻', name: 'Laptop' },
    { icon: '📱', name: 'Mobile' },
    { icon: '🛠', name: 'Install' },
  ];

  return (
    <>
      <Text style={styles.title}>Services</Text>

      <View style={styles.container}>
        {data.map((item, index) => (
          <TouchableOpacity key={index} style={styles.card}>
            <Text style={styles.icon}>{item.icon}</Text>
            <Text style={styles.text}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#fff',
    width: 75,
    height: 75,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },

  icon: { fontSize: 24 },
  text: { fontSize: 12, marginTop: 5 },
});
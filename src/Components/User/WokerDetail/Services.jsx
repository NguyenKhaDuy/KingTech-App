import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Services({ services = [] }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Dịch vụ</Text>

      <View style={styles.grid}>
        {services.map((s, i) => (
          <View key={i} style={styles.card}>
            {/* 🔥 IMAGE BASE64 */}
            {s.icon ? (
              <Image
                source={{
                  uri: `data:image/jpeg;base64,${s.icon}`,
                }}
                style={styles.icon}
                resizeMode="contain"
              />
            ) : (
              <View style={styles.placeholder} />
            )}

            <Text style={styles.text}>{s.name_service}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginTop: 15,
  },

  title: {
    fontWeight: 'bold',
    fontSize: 18,
  },

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

  icon: {
    width: 50,       
    height: 50,     
    marginBottom: 8,
  },

  text: {
    fontSize: 13,
    textAlign: 'center',
  },

  placeholder: {
    width: 50,
    height: 50,
    backgroundColor: '#eee',
    borderRadius: 10,
    marginBottom: 8,
  },
});
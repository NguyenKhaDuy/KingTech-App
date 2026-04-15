import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import TechnicianCard from '../Home/TechnicianCard';

export default function TechnicianList({ navigation }) {
  const data = [1, 2, 3];

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.title}>Top Technicians</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      {data.map((item) => (
        <TechnicianCard key={item} item={item} navigation={navigation} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },

  viewAll: {
    color: '#ff6600',
    fontWeight: '600',
  },
});
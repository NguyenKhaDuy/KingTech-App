import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import TechnicianCard from '../Home/TechnicianCard';

export default function TechnicianList({ navigation }) {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const res = await axios.get(
          `http://10.0.2.2:8082/api/outstanding/technician/`
        );

        setTechnicians(res.data.data);
      } catch (error) {
        console.error('Fetch technicians error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#ff6600" />;
  }

  return (
    <>
      <View style={styles.row}>
        <Text style={styles.title}>Top Technicians</Text>
        <Text style={styles.viewAll}>View all</Text>
      </View>

      {technicians.map((item) => (
        <TechnicianCard
          key={item.id_user}
          item={item}
          navigation={navigation}
        />
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
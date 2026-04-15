import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';

export default function TechnicianCard({ item, navigation }) {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('WorkerDetail', {
          id: item,
          name: `Technician ${item}`,
          avatar: `https://i.pravatar.cc/300?img=${item}`,
        })
      }
    >
      <Image
        source={{ uri: `https://i.pravatar.cc/150?img=${item}` }}
        style={styles.avatar}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>Technician {item}</Text>
        <Text style={styles.job}>Professional Repair</Text>
      </View>

      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>Book</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 3,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },

  name: {
    fontWeight: 'bold',
    fontSize: 15,
  },

  job: {
    color: '#777',
    fontSize: 13,
  },

  btn: {
    backgroundColor: '#ff6600',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },

  text: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});
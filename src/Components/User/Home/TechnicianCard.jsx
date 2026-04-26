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
          id: item.id_user,
          name: item.full_name,
          avatar: `data:image/jpeg;base64,${item.avatarBase64}`,
        })
      }
    >
      <Image
        source={{
          uri: `data:image/jpeg;base64,${item.avatarBase64}`,
        }}
        style={styles.avatar}
      />

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.full_name}</Text>
        <Text style={styles.job}>Professional Repair</Text>

        {/* Stars */}
        <View style={{ flexDirection: 'row', marginTop: 4 }}>
          {[...Array(item.total_star)].map((_, i) => (
            <Text key={i} style={{ color: '#FFD700' }}>★</Text>
          ))}
          {[...Array(5 - item.total_star)].map((_, i) => (
            <Text key={i} style={{ color: '#ccc' }}>★</Text>
          ))}
        </View>
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
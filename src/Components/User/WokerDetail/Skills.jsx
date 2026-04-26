import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

export default function Skills({ skills = [], loading }) {
  return (
    <View style={styles.section}>
      <Text style={styles.title}>Kỹ năng</Text>

      {/* 🔥 Loading */}
      {loading ? (
        <ActivityIndicator
          size="small"
          color="#ff6600"
          style={{ marginTop: 10 }}
        />
      ) : skills.length === 0 ? (
        /* ❌ Empty */
        <Text style={styles.emptyText}>Chưa có kỹ năng</Text>
      ) : (
        /* ✅ Data */
        <View style={styles.container}>
          {skills.map((s, i) => (
            <View key={i} style={styles.tag}>
              <Text style={styles.tagText}>{s}</Text>
            </View>
          ))}
        </View>
      )}
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

  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
  },

  tag: {
    backgroundColor: '#FFF3E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    margin: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tagText: {
    color: '#ff6600',
    fontSize: 13,
    fontWeight: '500',
  },

  emptyText: {
    marginTop: 10,
    color: '#999',
    fontStyle: 'italic',
  },
});
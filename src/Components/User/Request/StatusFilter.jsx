import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function StatusFilter({ statuses, currentStatus, onChange }) {
  return (
    <View style={styles.row}>
      {statuses.map((s) => (
        <TouchableOpacity
          key={s.key}
          style={styles.item}
          onPress={() => onChange(s.key)}
        >
          <Ionicons
            name={s.icon}
            size={18}
            color={currentStatus === s.key ? '#ff6600' : '#999'}
          />

          <Text
            style={[
              styles.label,
              currentStatus === s.key && styles.active,
            ]}
          >
            {s.label}
          </Text>

          {currentStatus === s.key && <View style={styles.line} />}
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginBottom: 10,
  },
  item: { alignItems: 'center', flex: 1, paddingBottom: 8 },
  label: { fontSize: 12, color: '#999' },
  active: { color: '#ff6600', fontWeight: 'bold' },
  line: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '60%',
    backgroundColor: '#ff6600',
  },
});
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
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name={s.icon}
              size={18}
              color={currentStatus === s.key ? '#ff6600' : '#999'}
            />

            {/*BADGE */}
            {s.count > 0 && (
              <View
                style={[
                  styles.badge,
                  currentStatus === s.key && styles.badgeActive,
                ]}
              >
                <Text style={styles.badgeText}>{s.count}</Text>
              </View>
            )}
          </View>

          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
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
  item: { 
    alignItems: 'center', 
    flex: 1, 
    paddingBottom: 8,
    paddingHorizontal: 4,        
  },
  label: { 
    fontSize: 12, 
    color: '#999',
    maxWidth: '100%',            
    textAlign: 'center',         
  },
  active: { color: '#ff6600', fontWeight: 'bold' },
  line: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '60%',
    backgroundColor: '#ff6600',
  },
  badge: {
  backgroundColor: '#ccc',
  marginLeft: 4,
  paddingHorizontal: 5,
  borderRadius: 10,
  minWidth: 18,
  alignItems: 'center',
},

badgeActive: {
  backgroundColor: '#ff6600',
},

badgeText: {
  color: '#fff',
  fontSize: 10,
  fontWeight: 'bold',
},
});
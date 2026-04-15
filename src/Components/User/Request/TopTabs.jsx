import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TopTabs({ activeTab, setActiveTab }) {
  return (
    <View style={styles.topTabs}>
      <TouchableOpacity onPress={() => setActiveTab('requests')}>
        <Text style={[styles.text, activeTab === 'requests' && styles.active]}>
          Requests
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setActiveTab('bills')}>
        <Text style={[styles.text, activeTab === 'bills' && styles.active]}>
          Bills
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  topTabs: { flexDirection: 'row', gap: 20, marginBottom: 10 },
  text: { fontSize: 16, color: '#777' },
  active: { color: '#ff6600', fontWeight: 'bold' },
});
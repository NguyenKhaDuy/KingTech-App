import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BookingButton() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <TouchableOpacity style={styles.btn}>
        <Text style={styles.text}>Đặt lịch ngay</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  btn: {
    backgroundColor: '#ff6600',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  text: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
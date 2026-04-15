import React from 'react';
import { Image, StyleSheet } from 'react-native';

export default function HeaderImage({ avatar }) {
  return <Image source={{ uri: avatar }} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: { width: '100%', height: 220 },
});
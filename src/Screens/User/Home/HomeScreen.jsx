import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import Header from '../../../Components/User/Home/Header';
import Banner from '../../../Components/User/Home/Banner';
import Services from '../../../Components/User/Home/Services';
import TechnicianList from '../../../Components/User/Home/TechnicianList';

export default function HomeScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Header navigation={navigation} unreadCount={5} />
      <Banner />
      <Services />
      <TechnicianList navigation={navigation} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f4f7',
    padding: 20,
  },
});
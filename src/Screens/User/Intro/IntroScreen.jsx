import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: '1',
    title: 'Welcome',
    text: 'Welcome to KingTech App 🚀',
  },
  {
    key: '2',
    title: 'Shop',
    text: 'Buy anything you want بسهولة',
  },
  {
    key: '3',
    title: 'Fast Delivery',
    text: 'Get your items quickly ⚡',
  },
];

export default function IntroScreen({ navigation }) {
  const sliderRef = useRef(null);

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.text}>{item.text}</Text>
    </View>
  );

  const onDone = () => {
    navigation.replace('Login');
  };

  const renderNextButton = () => (
    <TouchableOpacity
      style={styles.btn}
      onPress={() =>
        sliderRef.current?.goToSlide(
          sliderRef.current.state.activeIndex + 1
        )
      }
    >
      <Text style={styles.btnText}>Next</Text>
    </TouchableOpacity>
  );

  const renderDoneButton = () => (
    <TouchableOpacity style={styles.btn} onPress={onDone}>
      <Text style={styles.btnText}>Done</Text>
    </TouchableOpacity>
  );

  return (
    <AppIntroSlider
      ref={sliderRef}
      data={slides}
      renderItem={renderItem}
      onDone={onDone}
      renderNextButton={renderNextButton}
      renderDoneButton={renderDoneButton}
      activeDotStyle={{ backgroundColor: '#ff6600' }}
      dotStyle={{ backgroundColor: '#ccc' }}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
  btn: {
    padding: 10,
    marginHorizontal: 10,
  },
  btnText: {
    fontSize: 16,
    color: '#ff6600',
    fontWeight: 'bold',
  },
});
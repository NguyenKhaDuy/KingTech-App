import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";

const slides = [
  {
    key: "1",
    title: "Tìm thợ nhanh chóng",
    text: "Kết nối với thợ uy tín chỉ trong vài giây",
    icon: "construct-outline",
    image: require("../../../../assets/intro1.png"),
  },
  {
    key: "2",
    title: "Đặt lịch dễ dàng",
    text: "Chọn thời gian, chọn thợ phù hợp với bạn",
    icon: "calendar-clear-outline",
    image: require("../../../../assets/intro2.png"),
  },
  {
    key: "3",
    title: "Dịch vụ tận nơi",
    text: "Thợ đến tận nhà, nhanh chóng và chuyên nghiệp",
    icon: "home-outline",
    image: require("../../../../assets/intro3.png"),
    isLast: true,
  },
];

export default function IntroScreen({ navigation }) {
  const sliderRef = useRef(null);

  const onDone = () => {
    navigation.replace("Login");
  };

  const renderItem = ({ item }) => {
    return (
      <ImageBackground source={item.image} style={styles.slide}>
        <LinearGradient
          colors={["rgba(0,0,0,0.55)", "rgba(0,0,0,0.75)"]}
          style={styles.overlay}
        >
          <View style={styles.content}>
            {/* ICON đẹp hơn */}
            <View style={styles.iconWrapper}>
              <Icon name={item.icon} size={36} color="#ff6600" />
            </View>

            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.text}>{item.text}</Text>

            {item.isLast && (
              <TouchableOpacity style={styles.ctaBtn} onPress={onDone}>
                <Text style={styles.ctaText}>Bắt đầu ngay</Text>
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  };

  // ✅ FIX: align chuẩn với skip
  const renderNextButton = () => (
    <View style={styles.navBtn}>
      <View style={styles.nextBtn}>
        <Icon name="arrow-forward" size={22} color="#fff" />
      </View>
    </View>
  );

  const renderSkipButton = () => (
    <View style={styles.navBtn}>
      <Text style={styles.skip}>Bỏ qua</Text>
    </View>
  );

  return (
    <AppIntroSlider
      ref={sliderRef}
      data={slides}
      renderItem={renderItem}
      onSkip={onDone}
      showSkipButton
      renderNextButton={renderNextButton}
      renderSkipButton={renderSkipButton}
      renderDoneButton={() => null}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      bottomButton={false}
    />
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  content: {
    alignItems: "center",
  },

  // ✅ ICON STYLE XỊN HƠN
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,

    // shadow
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
  },

  text: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginTop: 10,
    lineHeight: 22,
  },

  ctaBtn: {
    marginTop: 40,
    backgroundColor: "#ff6600",
    paddingVertical: 16,
    paddingHorizontal: 60,
    borderRadius: 30,
  },

  ctaText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  // ✅ FIX ALIGN
  navBtn: {
    justifyContent: "center",
    alignItems: "center",
    height: 50, // 👉 ép cùng chiều cao để không lệch
    paddingHorizontal: 20,
  },

  // ✅ NEXT BUTTON XỊN HƠN
  nextBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ff6600",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },

  skip: {
    color: "#fff",
    fontSize: 15,
  },

  dot: {
    backgroundColor: "rgba(255,255,255,0.4)",
  },

  activeDot: {
    backgroundColor: "#ff6600",
    width: 20,
  },
});
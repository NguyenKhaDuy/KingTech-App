import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function PaymentPicker({ value, onChange, options }) {
  return (
    <>
      <Text style={styles.label}>Phương thức thanh toán</Text>

      <View style={styles.box}>
        <Picker selectedValue={value} onValueChange={onChange}>
          {options.map((o) => (
            <Picker.Item key={o.id} label={o.name} value={o.id} />
          ))}
        </Picker>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  label: { marginBottom: 5, fontWeight: "600" },
  box: {
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
  },
});
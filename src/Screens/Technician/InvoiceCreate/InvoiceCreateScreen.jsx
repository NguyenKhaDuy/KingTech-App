import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import PaymentPicker from "../../../Components/Technician/InvoiceCreate/PaymentPicker/PaymentPicker";
import ItemList from "../../../Components/Technician/InvoiceCreate/ItemList/ItemList";
import LaborInput from "../../../Components/Technician/InvoiceCreate/LaborInput/LaborInput";
import TotalBox from "../../../Components/Technician/InvoiceCreate/TotalBox/TotalBox";

export default function InvoiceCreateScreen({ route, navigation }) {
  const { orderId } = route.params;

  const [items, setItems] = useState([
    { name: "", quantity: 1, price: 0 },
  ]);
  const [laborCost, setLaborCost] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState(1);

  const paymentMethods = [
    { id: 1, name: "Tiền mặt" },
    { id: 2, name: "Chuyển khoản" },
  ];

  /* ===== TOTAL ===== */
  const totalMaterial = items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const total = totalMaterial + Number(laborCost || 0);

  /* ===== SUBMIT ===== */
  const handleSubmit = () => {
    const payload = {
      orderId,
      paymentMethodId,
      items,
      laborCost,
      total,
    };

    console.log("INVOICE:", payload);
    alert("Tạo hóa đơn thành công!");
    navigation.goBack();
  };

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ff6600" }}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Tạo hóa đơn</Text>

        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          <Text style={styles.order}>
            Mã đơn: <Text style={styles.orderId}>#{orderId}</Text>
          </Text>

          <PaymentPicker
            value={paymentMethodId}
            onChange={setPaymentMethodId}
            options={paymentMethods}
          />

          <ItemList items={items} setItems={setItems} />

          <LaborInput value={laborCost} onChange={setLaborCost} />

          <TotalBox total={total} />

          <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
            <Text style={styles.btnText}>Tạo hóa đơn</Text>
          </TouchableOpacity>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#ff6600",
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  order: { marginBottom: 10, fontSize: 16 },
  orderId: { color: "#ff6600", fontWeight: "bold" },
  btn: {
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  btnText: { color: "#fff", fontWeight: "bold" },
});
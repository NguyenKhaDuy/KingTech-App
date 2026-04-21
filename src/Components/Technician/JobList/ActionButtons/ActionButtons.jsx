import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ActionButtons({ status, orderId, invoice }) {
  const navigation = useNavigation();
  return (
    <View style={styles.row}>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.navigate("RequestTechDetail", {
            orderId: orderId,
          });
        }}
      >
        <Ionicons name="eye-outline" size={16} />
        <Text style={styles.text}>Chi tiết</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, styles.primary]}
        onPress={() => {
          navigation.navigate("UpdateRequestStatus", {
            orderId: orderId,
            currentStatus: status,
          });
        }}
      >
        <Ionicons name="create-outline" size={16} color="#fff" />
        <Text style={[styles.text, styles.whiteText]}>Cập nhật</Text>
      </TouchableOpacity>

      {/* TẠO HÓA ĐƠN */}
      <TouchableOpacity
        style={[
          styles.btn,
          status === "COMPLETED" ? styles.orange : styles.disabled,
        ]}
        disabled={status !== "COMPLETED"}
        onPress={() => {
          navigation.navigate("InvoiceCreate", {
            orderId: orderId,
          });
        }}
      >
        <Ionicons name="document-text-outline" size={16} color="#fff" />
        <Text style={[styles.text, styles.whiteText]}>Tạo HĐ</Text>
      </TouchableOpacity>

      {/* XEM HÓA ĐƠN */}
      <TouchableOpacity
        style={[
          styles.btn,
          status === "COMPLETED" ? styles.green : styles.disabled,
        ]}
        disabled={status !== "COMPLETED"}
        onPress={() => {
          navigation.navigate("InvoiceTechDetail", {
            invoiceId: invoice.id_invoices,
          });
        }}
      >
        <Ionicons name="receipt-outline" size={16} color="#fff" />
        <Text style={[styles.text, styles.whiteText]}>Xem HĐ</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    marginTop: 10,
  },

  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    backgroundColor: "#f3f4f6",
    marginLeft: 6,
    marginBottom: 6,
  },

  text: {
    fontSize: 12,
    marginLeft: 4,
    color: "#333",
  },

  whiteText: {
    color: "#fff",
    fontWeight: "600",
  },

  primary: {
    backgroundColor: "#3b82f6",
  },

  orange: {
    backgroundColor: "#ff6600",
  },

  green: {
    backgroundColor: "#16a34a",
  },

  disabled: {
    backgroundColor: "#d1d5db",
  },
});

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function InvoiceDetailScreen({ route, navigation }) {
  const { bill } = route.params;

  const formatDate = (dateArr) => {
    if (!Array.isArray(dateArr)) return "";

    const [year, month, day] = dateArr;

    const pad = (n) => String(n).padStart(2, "0");

    return `${pad(day)}/${pad(month)}/${year}`;
  };

  const services = [
    { name: "Ép kính", qty: 10, price: 2000 },
    { name: "Công thợ", qty: 1, price: 200000 },
  ];

  const total = bill.detailInvoiceDTOS.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {/* HEADER */}
        <Text style={styles.title}>Chi tiết hóa đơn #{bill.id_invoices}</Text>

        {/* INFO */}
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.label}>Thợ</Text>
            <Text>{bill.name_tech}</Text>

            <Text style={styles.label}>Ngày</Text>
            <Text>{formatDate(bill.paid_at)}</Text>
          </View>

          <View>
            <Text style={styles.label}>Trạng thái</Text>
            <Text style={styles.success}>{bill.name_status}</Text>

            <Text style={styles.label}>Phương thức</Text>
            <Text>{bill.payment_method}</Text>
          </View>
        </View>

        {/* TABLE HEADER */}
        <View style={styles.tableHeader}>
          <Text style={styles.col1}>Vật tư</Text>
          <Text style={styles.col}>SL</Text>
          <Text style={styles.col}>Đơn giá</Text>
          <Text style={styles.col}>Thành tiền</Text>
        </View>

        {/* TABLE DATA */}
        {bill.detailInvoiceDTOS.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.col1}>{item.name}</Text>
            <Text style={styles.col}>{item.quantity}</Text>
            <Text style={styles.col}>{item.price.toLocaleString()} đ</Text>
            <Text style={styles.col}>
              {(item.quantity * item.price).toLocaleString()} đ
            </Text>
          </View>
        ))}

        {/* TOTAL */}
        <View style={styles.totalRow}>
          <Text style={styles.totalText}>Tổng cộng</Text>
          <Text style={styles.totalPrice}>{total.toLocaleString()} đ</Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.btnText}>Đóng</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    padding: 20,
  },

  container: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
  },

  title: {
    fontWeight: "bold",
    color: "#ff6600",
    marginBottom: 10,
  },

  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  label: {
    fontSize: 12,
    color: "#777",
  },

  success: {
    color: "#00aa55",
    fontWeight: "bold",
  },

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    paddingBottom: 5,
    marginBottom: 5,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 5,
  },

  col1: { flex: 2 },
  col: { flex: 1, textAlign: "right" },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },

  totalText: {
    fontWeight: "bold",
  },

  totalPrice: {
    fontWeight: "bold",
    color: "#ff6600",
  },

  btn: {
    backgroundColor: "#ff6600",
    marginTop: 15,
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

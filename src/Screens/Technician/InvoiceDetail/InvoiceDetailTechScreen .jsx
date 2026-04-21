import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const formatDate = (date) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("vi-VN");
};

export default function InvoiceDetailTechScreen({ route, navigation }) {
  const { invoiceId } = route.params;
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    const fakeData = {
      id_invoices: invoiceId,
      name_status: "Đã thanh toán",
      paid_at: "2026-04-19",
      payment_method: "Tiền mặt",
      total_amount: 350000,
      detailInvoiceDTOS: [
        { name: "Ốc vít", quantity: 2, price: 25000, total_price: 50000 },
        { name: "Dây điện", quantity: 1, price: 100000, total_price: 100000 },
        { name: "Công thợ", quantity: 1, price: 200000, total_price: 200000 },
      ],
    };

    setInvoice(fakeData);
  }, [invoiceId]);

  if (!invoice) return null;

  return (
    <SafeAreaView edges={["top"]} style={{ flex: 1, backgroundColor: "#ff6600" }}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Chi tiết hóa đơn</Text>
        <View style={{ width: 22 }} />
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          
          {/* INFO */}
          <View style={styles.infoBox}>
            <Text style={styles.label}>
              Mã hóa đơn:
              <Text style={styles.highlight}> #{invoice.id_invoices}</Text>
            </Text>

            <Text style={styles.label}>
              Trạng thái:
              <Text style={styles.value}> {invoice.name_status}</Text>
            </Text>

            <Text style={styles.label}>
              Ngày thanh toán:
              {invoice.paid_at ? (
                <Text style={styles.value}> {formatDate(invoice.paid_at)}</Text>
              ) : (
                <Text style={styles.unpaid}> Chưa thanh toán</Text>
              )}
            </Text>

            <Text style={styles.label}>
              Phương thức:
              <Text style={styles.value}> {invoice.payment_method}</Text>
            </Text>
          </View>

          {/* TITLE */}
          <Text style={styles.section}>Chi tiết vật liệu</Text>

          {/* LIST */}
          {invoice.detailInvoiceDTOS.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              
              {/* TÊN */}
              <Text style={styles.itemName}>{item.name}</Text>

              {/* CHI TIẾT */}
              <View style={styles.row}>
                <Text style={styles.sub}>
                  SL: {item.quantity}
                </Text>

                <Text style={styles.sub}>
                  Giá: {item.price.toLocaleString("vi-VN")} đ
                </Text>
              </View>

              {/* TỔNG ITEM */}
              <View style={styles.totalItemRow}>
                <Text style={styles.totalItemText}>Thành tiền:</Text>
                <Text style={styles.totalItemPrice}>
                  {item.total_price.toLocaleString("vi-VN")} đ
                </Text>
              </View>

            </View>
          ))}

          {/* TOTAL */}
          <View style={styles.totalBox}>
            <Text style={styles.totalText}>Tổng cộng</Text>
            <Text style={styles.totalPrice}>
              {invoice.total_amount.toLocaleString("vi-VN")} đ
            </Text>
          </View>

          {/* BUTTON */}
          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.btnText}>Đóng</Text>
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

  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  infoBox: {
    marginBottom: 15,
    gap: 6,
  },

  label: {
    fontSize: 14,
    color: "#555",
  },

  value: {
    fontWeight: "500",
    color: "#333",
  },

  highlight: {
    color: "#ff6600",
    fontWeight: "bold",
  },

  unpaid: {
    color: "red",
    fontWeight: "bold",
  },

  section: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },

  itemCard: {
    borderWidth: 1,
    borderColor: "#eee",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fafafa",
  },

  itemName: {
    fontWeight: "600",
    marginBottom: 8,
    fontSize: 15,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  sub: {
    color: "#666",
  },

  totalItemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderColor: "#eee",
    paddingTop: 6,
    marginTop: 4,
  },

  totalItemText: {
    fontWeight: "600",
  },

  totalItemPrice: {
    color: "#ff6600",
    fontWeight: "bold",
  },

  totalBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },

  totalPrice: {
    fontSize: 18,
    color: "#ff6600",
    fontWeight: "bold",
  },

  btn: {
    marginTop: 20,
    backgroundColor: "#ff6600",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
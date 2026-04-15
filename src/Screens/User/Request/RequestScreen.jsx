import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TopTabs from "../../../Components/User/Request/TopTabs";
import StatusFilter from "../../../Components/User/Request/StatusFilter";
import RequestCard from "../../../Components/User/Request/RequestCard";
import BillCard from "../../../Components/User/Request/BillCard";

export default function RequestScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("requests");

  const [requestStatus, setRequestStatus] = useState("all");
  const [billStatus, setBillStatus] = useState("all");

  const requestStatuses = [
    { key: "all", label: "All", icon: "apps-outline" },
    { key: "pending", label: "Pending", icon: "time-outline" },
    { key: "completed", label: "Done", icon: "checkmark-done-outline" },
    { key: "cancel", label: "Cancel", icon: "close-circle-outline" },
  ];

  const billStatuses = [
    { key: "all", label: "All", icon: "apps-outline" },
    { key: "pending", label: "Pending", icon: "time-outline" },
    { key: "completed", label: "Paid", icon: "cash-outline" },
  ];

  const [requests, setRequests] = useState([
    { id: 1, name: "Fix Laptop", tech: "Nguyen Van A", status: "pending", description: "Sửa laptop bị lỗi nguồn" },
    { id: 2, name: "Repair Phone", tech: "Tran Van B", status: "completed", description: "Sửa laptop bị lỗi nguồn" },
    { id: 3, name: "Install Camera", tech: "Le Van C", status: "cancel", description: "Sửa laptop bị lỗi nguồn" },
  ]);

  const [bills, setBills] = useState([
    { id: 1, name: "Fix Laptop", price: "$50", status: "completed" },
    { id: 2, name: "Repair Phone", price: "$30", status: "pending" },
  ]);

  const data = activeTab === "requests" ? requests : bills;
  const statuses = activeTab === "requests" ? requestStatuses : billStatuses;
  const currentStatus = activeTab === "requests" ? requestStatus : billStatus;

  const filtered = data.filter(
    (item) => currentStatus === "all" || item.status === currentStatus
  );

  const handleStatusChange = (key) => {
    activeTab === "requests"
      ? setRequestStatus(key)
      : setBillStatus(key);
  };

  const handlePayment = (item) => {
    alert("Thanh toán thành công!");

    setBills((prev) =>
      prev.map((b) =>
        b.name === item.name ? { ...b, status: "completed" } : b
      )
    );

    setRequests((prev) =>
      prev.map((r) =>
        r.name === item.name ? { ...r, status: "completed" } : r
      )
    );
  };

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: "#ff6600" }}>
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Request</Text>
      </View>


      <View style={styles.content}>
        <TopTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <StatusFilter
          statuses={statuses}
          currentStatus={currentStatus}
          onChange={handleStatusChange}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          {filtered.map((item) =>
            activeTab === "requests" ? (
              <RequestCard
                key={item.id}
                item={item}
                onPay={handlePayment}
                onViewDetail={(item) =>
                  navigation.navigate("RequestDetail", { request: item })
                }
                onReview={(item) =>
                  navigation.navigate("ReviewScreen", { request: item })
                }
              />
            ) : (
              <BillCard
                key={item.id}
                item={item}
                onPay={handlePayment}
                onViewInvoice={(item) =>
                  navigation.navigate("InvoiceDetail", { bill: item })
                }
              />
            )
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  /* HEADER */
  header: {
    backgroundColor: "#ff6600",
    paddingVertical: 15,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  /* CONTENT */
  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
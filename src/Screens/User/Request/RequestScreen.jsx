import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import TopTabs from "../../../Components/User/Request/TopTabs";
import StatusFilter from "../../../Components/User/Request/StatusFilter";
import RequestCard from "../../../Components/User/Request/RequestCard";
import BillCard from "../../../Components/User/Request/BillCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";

const mapStatus = (status) => {
  switch (status) {
    case "WAITING_FOR_TECHNICIAN":
    case "SEARCHING":
      return "REQUEST_CREATED";

    case "RECEIVED":
      return "TECHNICIAN_ACCEPTED";

    case "RECEIVING":
      return "IN_PROGRESS";

    case "COMPLETED":
      return "COMPLETED";

    case "CANCEL":
      return "CANCELLED";

    default:
      return "REQUEST_CREATED";
  }
};

WebBrowser.maybeCompleteAuthSession();

export default function RequestScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState("requests");
  const [loading, setLoading] = useState(false);
  const [requestStatus, setRequestStatus] = useState("REQUEST_CREATED");
  const [billStatus, setBillStatus] = useState("all");
  const [requests, setRequests] = useState([]);
  const [bills, setBills] = useState([]);

  //phân trang
  const [billPage, setBillPage] = useState(1);
  const [billTotalPage, setBillTotalPage] = useState(1);
  const [loadingBill, setLoadingBill] = useState(false);

  const [showBankModal, setShowBankModal] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [loadingBank, setLoadingBank] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const requestStatuses = [
    {
      key: "REQUEST_CREATED",
      label: "Chờ thợ",
      icon: "time-outline",
    },
    {
      key: "TECHNICIAN_ACCEPTED",
      label: "Đã nhận",
      icon: "checkmark-circle-outline",
    },
    { key: "IN_PROGRESS", label: "Đang sửa", icon: "build-outline" },
    { key: "COMPLETED", label: "Hoàn thành", icon: "checkmark-done-outline" },
    { key: "CANCEL", label: "Đã hủy", icon: "close-circle-outline" },
  ];

  const billStatuses = [
    { key: "all", label: "All", icon: "apps-outline" },
    { key: "pending", label: "Chưa thanh toán", icon: "time-outline" },
    { key: "completed", label: "Đã thanh toán", icon: "cash-outline" },
  ];

  useEffect(() => {
    fetchRequests();
    fetchBills();
  }, []);

  const fetchRequests = async () => {
    try {
      setLoading(true);

      const userStr = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      if (!userStr || !token) return;

      const user = JSON.parse(userStr);

      const res = await fetch(
        `http://10.0.2.2:8082/api/customer/request/id_customer=${user.id_user}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();

      if (json.message === "Success") {
        // const mapped = json.data.map((item) => ({
        //   id: item.id_request,
        //   name: item.name_service,
        //   tech: item.name_techinician,
        //   description: item.description,
        //   status: mapStatus(item.status_code),
        // }));

        setRequests(json.data);
      } else {
        alert("Không lấy được dữ liệu");
      }
    } catch (err) {
      console.log(err);
      alert("Lỗi server");
    } finally {
      setLoading(false);
    }
  };

  const fetchBills = async (page = 1) => {
    try {
      setLoadingBill(true);

      const userStr = await AsyncStorage.getItem("user");
      const token = await AsyncStorage.getItem("token");

      if (!userStr || !token) return;

      const user = JSON.parse(userStr);

      const res = await fetch(
        `http://10.0.2.2:8082/api/customer/invoices/id=${user.id_user}?pageNo=${page}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();

      if (json.message === "Success") {
        setBills(json.data);
        setBillTotalPage(json.total_page || 1);
        setBillPage(page);
      } else {
        alert("Không lấy được hóa đơn");
      }
    } catch (err) {
      console.log(err);
      alert("Lỗi server");
    } finally {
      setLoadingBill(false);
    }
  };

  useEffect(() => {
    if (activeTab === "bills") {
      fetchBills(billPage);
    }
  }, [billPage, activeTab]);

  //khi đổi tab reset lại pase
  useEffect(() => {
    if (activeTab === "bills") {
      setBillPage(1);
    }
  }, [activeTab]);

  //tính số lượng
  const getStatusCounts = (list) => {
    const counts = {};

    list.forEach((item) => {
      counts[item.status_code] = (counts[item.status_code] || 0) + 1;
    });

    return counts;
  };

  const requestCounts = getStatusCounts(requests);
  const billCounts = getStatusCounts(bills);

  const data = activeTab === "requests" ? requests : bills;
  const statuses =
    activeTab === "requests"
      ? requestStatuses.map((s) => ({
          ...s,
          count: requestCounts[s.key] || 0,
        }))
      : billStatuses.map((s) => ({
          ...s,
          count: s.key === "all" ? bills.length : billCounts[s.key] || 0,
        }));
  const currentStatus = activeTab === "requests" ? requestStatus : billStatus;

  const filtered = data.filter(
    (item) => currentStatus === "all" || item.status_code === currentStatus,
  );

  const handleStatusChange = (key) => {
    activeTab === "requests" ? setRequestStatus(key) : setBillStatus(key);
  };

  //thanh toán
  const handlePayment = async (item, bankCode) => {
    try {
      const token = await AsyncStorage.getItem("token");

      const payload = {
        bank: bankCode,
        amount: Number(item.price.replace(/\D/g, "")),
        id_request: String(item.id),
        requestType: "invoice",
        userAgent: "mobile",
      };

      const res = await fetch("http://10.0.2.2:8082/api/customer/payment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const paymentUrl = await res.text();

      const result = await WebBrowser.openAuthSessionAsync(paymentUrl);

      if (result.type === "00") {
        fetchBills();
      }
    } catch (err) {
      console.log("Thanh toán lỗi:", err);
    }
  };

  //LẤY DANH SÁCH NGÂN HÀNG
  useEffect(() => {
    if (!showBankModal) return;

    const fetchBanks = async () => {
      try {
        setLoadingBank(true);

        const res = await fetch("https://api.vietqr.io/v2/banks");
        const json = await res.json();

        if (json.code === "00") {
          const mockNCB = {
            id: 999,
            name: "Ngân hàng Quốc Dân",
            shortName: "NCB",
            code: "NCB",
            logo: "https://api.vietqr.io/img/NCB.png",
          };

          const mappedBanks = json.data.map((bank) => ({
            id: bank.id,
            name: bank.name,
            code: bank.code, // dùng cái này gửi lên backend
            shortName: bank.shortName,
            logo: bank.logo,
          }));

          setBankList([mockNCB, ...mappedBanks]);
        } else {
          showToast("Không lấy được ngân hàng", "error");
        }
      } catch (err) {
        console.log(err);
        showToast("Lỗi tải ngân hàng", "error");
      } finally {
        setLoadingBank(false);
      }
    };

    fetchBanks();
  }, [showBankModal]);

  return (
    <SafeAreaView
      edges={["top"]}
      style={{ flex: 1, backgroundColor: "#ff6600" }}
    >
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

        {loading && (
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Đang tải dữ liệu...
          </Text>
        )}

        {activeTab === "bills" && loadingBill && (
          <Text style={{ textAlign: "center", marginTop: 10 }}>
            Đang tải hóa đơn...
          </Text>
        )}

        <ScrollView showsVerticalScrollIndicator={false}>
          {filtered.map((item) =>
            activeTab === "requests" ? (
              <RequestCard
                key={item.id_request}
                item={item}
                onPress={() => setActiveTab("bills")}
                onViewDetail={(item) =>
                  navigation.navigate("RequestDetail", { request: item })
                }
                onReview={(item) =>
                  navigation.navigate("ReviewScreen", { request: item })
                }
              />
            ) : (
              <BillCard
                key={item.id_invoices}
                item={item}
                onPay={(item) => {
                  setSelectedBill(item);
                  setShowBankModal(true);
                }}
                onViewInvoice={(item) =>
                  navigation.navigate("InvoiceDetail", { bill: item })
                }
              />
            ),
          )}
        </ScrollView>

        {activeTab === "bills" && (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              disabled={billPage === 1}
              onPress={() => setBillPage(billPage - 1)}
              style={{
                padding: 10,
                backgroundColor: "#ddd",
                marginHorizontal: 5,
                borderRadius: 8,
                opacity: billPage === 1 ? 0.5 : 1,
              }}
            >
              <Text>Prev</Text>
            </TouchableOpacity>

            <Text style={{ alignSelf: "center", marginHorizontal: 10 }}>
              {billPage} / {billTotalPage}
            </Text>

            <TouchableOpacity
              disabled={billPage === billTotalPage}
              onPress={() => setBillPage(billPage + 1)}
              style={{
                padding: 10,
                backgroundColor: "#ddd",
                marginHorizontal: 5,
                borderRadius: 8,
                opacity: billPage === billTotalPage ? 0.5 : 1,
              }}
            >
              <Text>Next</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* modal ngân hàng */}
      <Modal visible={showBankModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "#fff",
              margin: 20,
              borderRadius: 10,
              padding: 20,
              maxHeight: "70%",
            }}
          >
            <Text
              style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}
            >
              Chọn ngân hàng
            </Text>

            {loadingBank ? (
              <Text>Đang tải ngân hàng...</Text>
            ) : (
              <ScrollView style={{ maxHeight: 400 }}>
                {bankList.map((bank) => (
                  <TouchableOpacity
                    key={bank.id}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderBottomWidth: 1,
                      borderColor: "#eee",
                    }}
                    onPress={() => {
                      setShowBankModal(false);
                      handlePayment(selectedBill, bank.code);
                    }}
                  >
                    <Image
                      source={{ uri: bank.logo }}
                      style={{ width: 30, height: 30, marginRight: 10 }}
                    />
                    <Text>
                      {bank.shortName} - {bank.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            )}

            <TouchableOpacity
              onPress={() => setShowBankModal(false)}
              style={{ marginTop: 10 }}
            >
              <Text style={{ color: "red", textAlign: "center" }}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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

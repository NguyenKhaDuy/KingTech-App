import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";

import JobCard from "../../../Components/Technician/JobList/JobCard/JobCard";
import Pagination from "../../../Components/Technician/JobList/Pagination/Pagination";

export default function JobListScreen() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [loading, setLoading] = useState(false); // 👈 ADD

  const fetchJobs = async (pageNo = 1) => {
    try {
      setLoading(true); 

      const token = await AsyncStorage.getItem("token");
      const userStr = await AsyncStorage.getItem("user");

      if (!token || !userStr) return;

      const user = JSON.parse(userStr);

      const res = await fetch(
        `http://10.0.2.2:8082/api/technician/request/id_tech=${user.id_user}?pageNo=${pageNo}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const json = await res.json();

      if (json?.data) {
        const mapped = json.data.map((o) => ({
          id: o.id_request.toString(),
          name: o.customer?.full_name,
          service: o.name_service,
          status: o.status_code,
          invoice: o.invoices ? { id_invoices: o.invoices.id_invoices } : null,
        }));

        setData(mapped);
        setPage(json.current_page || 1);
        setTotalPage(json.total_page || 1);
      }
    } catch (err) {
      console.log("Fetch jobs error:", err);
    } finally {
      setLoading(false); // 👈 stop loading
    }
  };

  useEffect(() => {
    fetchJobs(page);
  }, [page]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Đơn hàng</Text>
      </View>

      {/* CONTENT */}
      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color="#ff6600" />
            <Text style={{ marginTop: 10 }}>Đang tải dữ liệu...</Text>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            {data.map((item) => (
              <JobCard key={item.id} item={item} />
            ))}

            <Pagination
              page={page}
              totalPage={totalPage}
              onPrev={() => page > 1 && setPage(page - 1)}
              onNext={() => page < totalPage && setPage(page + 1)}
              onSelect={(p) => setPage(p)}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ff6600",
  },

  header: {
    paddingVertical: 15,
    alignItems: "center",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },

  content: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  loadingBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

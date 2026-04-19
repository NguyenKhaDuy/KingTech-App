import React from "react";
import { View, Text, StyleSheet } from "react-native";

let toastRef = null;

/**
 * Gắn ref từ App root
 */
export const setToastRef = (ref) => {
  toastRef = ref;
};

/**
 * Gọi toast ở bất kỳ đâu
 */
export const showToast = (type = "success", message = "") => {
  if (!toastRef) return;

  toastRef.show(type, message);
};

/**
 * Component Toast (render 1 lần ở App root)
 */
export const Toast = React.forwardRef((props, ref) => {
  const [visible, setVisible] = React.useState(false);
  const [type, setType] = React.useState("success");
  const [message, setMessage] = React.useState("");

  React.useImperativeHandle(ref, () => ({
    show(t, msg) {
      setType(t);
      setMessage(msg);
      setVisible(true);

      setTimeout(() => {
        setVisible(false);
      }, 2000);
    },
  }));

  if (!visible) return null;

  return (
    <View
      style={[
        styles.toast,
        type === "success" ? styles.success : styles.error,
      ]}
    >
      <Text style={styles.text}>{message}</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  toast: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    padding: 14,
    borderRadius: 12,
    zIndex: 999,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },

  success: {
    backgroundColor: "#22c55e",
  },

  error: {
    backgroundColor: "#ef4444",
  },

  text: {
    color: "#fff",
    fontWeight: "600",
  },
});
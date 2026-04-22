import { Client } from "@stomp/stompjs";

let stompClient = null;
let globalListeners = [];

export function connectWebSocket(token) {

  if (stompClient?.connected) return stompClient;

  stompClient = new Client({
    webSocketFactory: () => new WebSocket("ws://192.168.1.10:8082/ws"),

    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },

    debug: (msg) => console.log("[WS]", msg),

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("🔥 STOMP CONNECTED");

      // 🔥 THÊM ĐOẠN NÀY (QUAN TRỌNG NHẤT)
      stompClient.subscribe("/user/queue/notify", (msg) => {
        const data = JSON.parse(msg.body);

        console.log("📩 WS RAW:", data);

        globalListeners.forEach(fn => fn(data));
      });
    },

    onStompError: (err) => {
      console.log("❌ STOMP ERROR", err);
    },
  });

  // 🔥 FIX cho React Native
  stompClient.forceBinaryWSFrames = true;

  stompClient.activate();

  return stompClient;
}

/* ===== LISTENER ===== */
export function addWebSocketListener(callback) {
  globalListeners.push(callback);

  return () => {
    globalListeners = globalListeners.filter((fn) => fn !== callback);
  };
}
import { Client } from "@stomp/stompjs";

let stompClient = null;
let globalListeners = [];

export function connectWebSocket(token) {
  if (stompClient?.connected) return stompClient;

  stompClient = new Client({
    webSocketFactory: () => new WebSocket("ws://10.0.2.2:8082/ws"),

    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },

    debug: (msg) => console.log("[WS]", msg),

    reconnectDelay: 5000,

    onConnect: () => {
      console.log("STOMP CONNECTED");

      //SUBSCRIBE CHUNG
      stompClient.subscribe("/topic/notify", (msg) => {
        const data = JSON.parse(msg.body);
        console.log("TOPIC:", data);
        globalListeners.forEach((fn) => fn(data));
      });

      stompClient.subscribe("/user/queue/notify", (msg) => {
        const data = JSON.parse(msg.body);

        console.log("WS RAW:", data);

        globalListeners.forEach((fn) => fn(data));
      });
    },

    onStompError: (err) => {
      console.log("STOMP ERROR", err);
    },
  });

  //FIX cho React Native
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

export async function disconnectWebSocket() {
  try {
    // 1. XÓA LISTENER TRƯỚC
    globalListeners = [];

    // 2. CHẶN RECONNECT
    if (stompClient) {
      stompClient.reconnectDelay = 0; // QUAN TRỌNG: stop auto reconnect

      // 3. DEACTIVATE SOCKET
      await stompClient.deactivate();

      console.log("STOMP DISCONNECTED");
    }

    // 4. NULL HOÀN TOÀN
    stompClient = null;
  } catch (err) {
    console.log("WS disconnect error:", err);
  }
}

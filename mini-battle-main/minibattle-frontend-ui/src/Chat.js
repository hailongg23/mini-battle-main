import React, { useState, useEffect } from "react";

function Chat() {
  const [ws, setWs] = useState(null);
  const [msg, setMsg] = useState("");
  const [log, setLog] = useState([]);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/chat/ws/chat");
    socket.onmessage = (e) => setLog((prev) => [...prev, e.data]);
    setWs(socket);
    return () => socket.close();
  }, []);

  const sendMessage = () => {
    if (ws && msg) {
      ws.send(msg);
      setMsg("");
    }
  };

  return (
    <div style={styles.container}>
      <h2>💬 Real-Time Chat</h2>
      <input
        style={styles.input}
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Type a message"
      />
      <button style={styles.button} onClick={sendMessage}>
        Send
      </button>
      <div style={styles.chatBox}>
        {log.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f0fff0",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "Arial"
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  chatBox: {
    marginTop: "20px",
    maxHeight: "200px",
    overflowY: "auto",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc"
  }
};

export default Chat;

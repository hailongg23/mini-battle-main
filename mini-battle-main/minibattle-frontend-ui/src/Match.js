import React, { useState } from "react";
import axios from "axios";

function Match() {
  const [username, setUsername] = useState("");
  const [matchId, setMatchId] = useState("");
  const [players, setPlayers] = useState([]);
  const [status, setStatus] = useState("");

  const joinMatch = async () => {
    try {
      setStatus("⏳ Joining match...");
      const res = await axios.post("/match/match/join", null, {
        params: { username },
      });

      if (res.data.match_id) {
        setMatchId(res.data.match_id);
        setPlayers(res.data.players);
        setStatus("✅ Match found!");
      } else {
        setStatus(res.data.message);
      }
    } catch (err) {
      setStatus("❌ Error: " + (err.response?.data?.detail || "Unknown"));
    }
  };

  return (
    <div style={styles.container}>
      <h2>🎮 MiniBattle Matchmaking</h2>
      <input
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button style={styles.button} onClick={joinMatch}>
        🔍 Find Match
      </button>
      <p>{status}</p>
      {matchId && (
        <div style={styles.matchInfo}>
          <h4>🆔 Match ID: {matchId}</h4>
          <p>👥 Players: {players.join(" vs ")}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "Arial",
    backgroundColor: "#fffbe6"
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#007BFF",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  matchInfo: {
    marginTop: "20px",
    padding: "10px",
    backgroundColor: "#e6f7ff",
    borderRadius: "8px"
  }
};

export default Match;

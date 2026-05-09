import React, { useState } from "react";
import axios from "axios";

function Battle() {
  const [matchId, setMatchId] = useState("");
  const [player, setPlayer] = useState("");
  const [action, setAction] = useState("attack");
  const [log, setLog] = useState([]);
  const [turn, setTurn] = useState("");

  const handleAction = async () => {
    try {
      const res = await axios.post("/game/game/action", {
        match_id: matchId,
        player,
        action,
      });
      setLog(res.data.log);
      setTurn(res.data.next_turn);
    } catch (err) {
      alert("❌ " + (err.response?.data?.detail || "Error"));
    }
  };

  return (
    <div style={styles.container}>
      <h2>⚔️ Battle Simulator</h2>
      <input
        style={styles.input}
        placeholder="Match ID"
        value={matchId}
        onChange={(e) => setMatchId(e.target.value)}
      />
      <input
        style={styles.input}
        placeholder="Your name"
        value={player}
        onChange={(e) => setPlayer(e.target.value)}
      />
      <select style={styles.input} value={action} onChange={(e) => setAction(e.target.value)}>
        <option value="attack">Attack</option>
        <option value="defend">Defend</option>
      </select>
      <button style={styles.button} onClick={handleAction}>
        🎯 Submit Action
      </button>
      <h4>Next turn: {turn}</h4>
      <pre>{log.join("\n")}</pre>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "500px",
    margin: "50px auto",
    padding: "20px",
    backgroundColor: "#f3f3f3",
    borderRadius: "10px",
    textAlign: "center",
    fontFamily: "Arial"
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default Battle;

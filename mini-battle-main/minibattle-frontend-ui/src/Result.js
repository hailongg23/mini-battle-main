import React from "react";

function Result() {
  const stats = {
    kills: 2,
    wins: 1,
    damage: 450,
    reward: "500 Gold"
  };

  return (
    <div style={styles.container}>
      <h2>🏆 Match Summary</h2>
      <ul>
        <li>Kills: {stats.kills}</li>
        <li>Wins: {stats.wins}</li>
        <li>Total Damage: {stats.damage}</li>
        <li>Reward: {stats.reward}</li>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "400px",
    margin: "50px auto",
    padding: "20px",
    textAlign: "left",
    fontFamily: "Arial",
    border: "1px solid #ddd",
    borderRadius: "10px",
    backgroundColor: "#fff8dc"
  }
};

export default Result;

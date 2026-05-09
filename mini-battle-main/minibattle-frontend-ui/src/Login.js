import React, { useState } from "react";
import axios from "axios";

function Login() {
  const [mode, setMode] = useState("login");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

const API_BASE = process.env.REACT_APP_API_BASE ?? ""; // empty = relative paths (works when frontend + nginx cùng origin)

const handleSubmit = async () => {
  const url = mode === "register"
    ? `${API_BASE}/users/register`
    : `${API_BASE}/auth/login`;
  console.log("Request URL:", url);
  
  try {
    const res = await axios.post(url, { username, password });
    if (res.data.access_token) {
      setToken(res.data.access_token);
      alert("Login successful!");
    } else {
      alert("Register successful!");
    }
  } catch (err) {
    alert("Error: " + (err.response?.data?.detail || "Unknown error"));
  }
};

  return (
    <div style={styles.container}>
      <h2>{mode === "login" ? "🔐 Login" : "📝 Register"}</h2>
      <input
        style={styles.input}
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        style={styles.input}
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={handleSubmit}>
        {mode === "login" ? "Login" : "Register"}
      </button>
      <p>
        {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
        <span style={styles.link} onClick={() => setMode(mode === "login" ? "register" : "login")}>
          {mode === "login" ? "Register here" : "Login here"}
        </span>
      </p>
      {token && <p>✅ Token: <code>{token}</code></p>}
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
    backgroundColor: "#f9f9f9"
  },
  input: {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "10px"
  },
  button: {
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  link: {
    color: "#007BFF",
    cursor: "pointer",
    textDecoration: "underline"
  }
};

export default Login;

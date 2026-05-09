import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Login from "./Login";
import Match from "./Match";
import Battle from "./Battle";
import Chat from "./Chat";
import Result from "./Result";

function App() {
  return (
    <Router>
      <nav style={{ textAlign: "center", margin: "10px" }}>
        <Link to="/">Login</Link> | <Link to="/match">Match</Link> | <Link to="/battle">Battle</Link> | <Link to="/chat">Chat</Link> | <Link to="/result">Result</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/match" element={<Match />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}

export default App;

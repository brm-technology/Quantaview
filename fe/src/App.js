import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import AppNavbar from "./components/Navbar";
import MapShow from "./components/MapShow";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="content-box">
          <AppNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/QuantaView" element={<MapShow />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

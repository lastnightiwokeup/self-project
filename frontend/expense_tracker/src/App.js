import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "../src/component/base/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
// import PageRouter from "./pages/PageRouters";
import HomePage from "./pages/HomePage";
import LoginDialog from "./component/base/LoginDialog/LoginDialog";
import AddRecord from "./pages/AddRecord";
import Chart from './pages/Chart'

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="chart" element={<Chart />} />
      </Routes>
    </>
  );
}

export default App;

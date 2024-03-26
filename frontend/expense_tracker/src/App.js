import logo from "./logo.svg";
import "./App.css";
import React, { useState, useEffect } from "react";
import NavBar from "../src/component/base/NavBar/NavBar";
import { Routes, Route } from "react-router-dom";
// import PageRouter from "./pages/PageRouters";
import HomePage from "./pages/ExpenseTable";
import NotificationSnackbar from "./component/base/NotificationSnackbar/NotificationSnackbar";
import Chart from "./pages/Chart";
import CssBaseline from "@mui/material/CssBaseline";


function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <>
      <CssBaseline />
      <NavBar />
      {/* <NotificationSnackbar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="chart" element={<Chart />} />
      </Routes>
    </ >
  );
}

export default App;

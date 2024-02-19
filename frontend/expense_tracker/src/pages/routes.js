import { Routes, Route, useNavigate } from "react-router-dom";
import React from "react";

import HomePage from "./HomePage";
import AddRecord from "./AddRecord";

const routes = [
  { path: "/", component: <HomePage />, exact: true },
  { path: "/add-record", component: <AddRecord /> },
];

export default routes;

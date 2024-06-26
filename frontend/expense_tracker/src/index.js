import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import { ThemeProvider } from "@mui/material/styles";
// import CustomTheme from "./style/CustomTheme";

// As of React 18
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      {/* <ThemeProvider theme={CustomTheme}> */}
        <App />
      {/* </ThemeProvider> */}
    </BrowserRouter>
  </Provider>
);

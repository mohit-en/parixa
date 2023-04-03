import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import StatusAlert from "react-status-alert";

// library of css and js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
// status alert css
import "react-status-alert/dist/status-alert.css";

//
import "./Utils/Axios";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <StatusAlert />

    <App />
  </React.StrictMode>
);

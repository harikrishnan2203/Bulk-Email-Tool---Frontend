import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Provider from "./Context/Provider";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
// import 'react-tooltip/dist/react-tooltip.css';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <Provider>
      <App />
    </Provider>
    <ToastContainer />
  </Router>
);

reportWebVitals();

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./App"; // Import Login instead of App (App was handling routes)
import Success from "./Success";
import Callback from "./callback";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/success" element={<Success />} />
        <Route path="/callback" element={<Callback />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

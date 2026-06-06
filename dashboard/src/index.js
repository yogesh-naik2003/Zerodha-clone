import React from "react";
import ReactDOM from "react-dom/client";
import { CookiesProvider } from "react-cookie";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./components/Home";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <HashRouter>
        <Routes>
          <Route path="/*" element={<Home />} />
        </Routes>
      </HashRouter>
    </CookiesProvider>
  </React.StrictMode>
);

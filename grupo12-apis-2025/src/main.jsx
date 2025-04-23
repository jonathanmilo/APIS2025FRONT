import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global/index.css";
import { BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./contexts/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AppContextProvider>
  </React.StrictMode>
);

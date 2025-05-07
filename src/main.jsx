import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global/index.css";
import { AppContextProvider } from "./contexts/ContextProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </React.StrictMode>
);

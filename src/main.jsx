import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global/index.css";
import { AppContextProvider } from "./contexts/ContextProvider.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <AppContextProvider>
        <App />
      </AppContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);

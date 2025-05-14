import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./global/index.css";
import { AppContextProvider } from "./contexts/ContextProvider.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { CustomMuiProvider } from "./contexts/CustomMuiProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <CustomMuiProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </CustomMuiProvider>
    </ThemeProvider>
  </React.StrictMode>
);

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useTheme } from "@src/contexts/ThemeContext";
import { createMuiThemeFromTailwind } from "@src/hooks/muiTheme";

export function CustomMuiProvider({ children }) {
  const { isDarkMode } = useTheme();
  const [muiTheme, setMuiTheme] = useState(
    createMuiThemeFromTailwind(isDarkMode ? "dark" : "light")
  );

  useEffect(() => {
    const mode = isDarkMode ? "dark" : "light";
    const newTheme = createMuiThemeFromTailwind(mode);
    setMuiTheme(newTheme);
  }, [isDarkMode]);

  return <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>;
}
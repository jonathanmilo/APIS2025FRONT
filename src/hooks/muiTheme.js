import { createTheme } from "@mui/material/styles";

export function createMuiThemeFromTailwind(mode = "light") {
  const colors = getTailwindColorsFromCSS();

  return createTheme({
    palette: {
      mode, 
      primary: {
        main: colors.primary,
        hover: colors.primaryHover,
      },
      background: {
        default: colors.background,
        paper: mode === "dark" ? colors.foreground : colors.background,
      },
      text: {
        primary: mode === "dark" ? colors.background : colors.foreground,
        secondary: mode === "dark" ? colors.background : colors.foreground,
      },
    },
    typography: {
      fontFamily: "inherit",
    },
  });
}

export function getTailwindColorsFromCSS() {
  const styles = getComputedStyle(document.documentElement);

  return {
    primary: styles.getPropertyValue("--color-primary").trim(),
    primaryHover: styles.getPropertyValue("--color-primary-hover").trim(),
    background: styles.getPropertyValue("--color-white-mui").trim(),
    foreground: styles.getPropertyValue("--color-black-mui").trim(),
  };
}
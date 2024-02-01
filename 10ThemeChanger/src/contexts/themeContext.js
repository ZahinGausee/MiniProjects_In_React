import { createContext, useContext } from "react";

export const ThemeContext = createContext({
  themeMode: "Light",
  lightMode: () => {},
  darkMode: () => {}
});

export const ThemeProvider = ThemeContext.Provider

export default function Theme() {
  return useContext(ThemeContext);
}
import { createContext, useContext } from "react";
import { StateProps } from "./themeProvider.types";

export const ThemeContext = createContext({} as StateProps);

export const useThemes = () => useContext(ThemeContext);

export const getMatchMedia = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

export const getThemeByLocalStorage = () => {
  const currentTheme = localStorage.getItem("@theme");

  const systemTheme = getMatchMedia();

  if (currentTheme) {
    return currentTheme === "system" ? systemTheme : JSON.parse(currentTheme);
  }

  return systemTheme;
};

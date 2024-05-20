import { useState, useEffect } from "react";
import {
  ThemeContext,
  getMatchMedia,
  getThemeByLocalStorage,
} from "./themeProvider.constants";
import { StateTypes, ThemeTypes } from "./themeProvider.types";

export const ThemesProvider = ({ children }: ThemeTypes) => {
  const [theme, setTheme] = useState<StateTypes>(() =>
    getThemeByLocalStorage(),
  );

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");

    const systemTheme = getMatchMedia();

    root.classList.add(theme === "system" ? systemTheme : theme);
  }, [theme]);

  const handleTheme = (theme: StateTypes) => {
    setTheme(theme);
    localStorage.setItem("@theme", JSON.stringify(theme));
  };

  return (
    <ThemeContext.Provider value={{ theme, handleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

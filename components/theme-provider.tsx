import { useLocalStorage } from "@/hooks/use-local-storage";
import React, { createContext, useContext, useState, useEffect } from "react";

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => { }
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    theme == 'dark' ?
      document.body.classList.add('dark') :
      document.body.classList.remove('dark')
  }, [theme])

  const toggleTheme = () => {
    if (theme == 'light') {
      setTheme('dark')
    } else if (theme == 'dark') {
      setTheme('light')
    }
  }

  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

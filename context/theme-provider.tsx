import { useLocalStorage } from "@/hooks/use-local-storage";
import React, { createContext, useEffect } from "react";

export const ThemeContext = createContext({
  theme: 'light',
  toggleTheme: () => { }
})

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    theme == 'dark'
      ? document.body.classList.add('dark')
      : document.body.classList.remove('dark')
  }, [theme])

  const toggleTheme = () => {
    (theme == 'light')
      ? setTheme('dark')
      : setTheme('light')
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

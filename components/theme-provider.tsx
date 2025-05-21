import React, { createContext, useContext, useState, useEffect } from "react";

// Define the Theme context with theme and setTheme
const ThemeContext = createContext<{
  theme: string;
  setTheme: (theme: string) => void;
}>({
  theme: "light", // Default theme is light
  setTheme: () => {}, // No-op function by default
});

export const useThemeContext = () => useContext(ThemeContext);

// ThemeProvider component
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Try to load theme from localStorage, default to "light"
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);

    // Apply the theme to the body class
    document.body.classList.add(savedTheme);
  }, []);

  const toggleTheme = (newTheme: string) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    // Apply the new theme to the body class
    document.body.classList.remove(theme);
    document.body.classList.add(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

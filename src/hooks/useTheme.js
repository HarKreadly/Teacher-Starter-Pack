import { useTheme } from "next-themes";

export const usePortfolioTheme = () => {
  const { theme, setTheme, systemTheme } = useTheme();

  const currentTheme = theme === "system" ? systemTheme : theme;

  const toggleTheme = () => {
    setTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const setLightTheme = () => setTheme("light");
  const setDarkTheme = () => setTheme("dark");
  const setSystemTheme = () => setTheme("system");

  return {
    theme: currentTheme,
    isDark: currentTheme === "dark",
    isLight: currentTheme === "light",
    toggleTheme,
    setLightTheme,
    setDarkTheme,
    setSystemTheme,
  };
};

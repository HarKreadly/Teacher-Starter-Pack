import { usePortfolioTheme } from "../../hooks/useTheme";
import { Sun, Moon, Monitor } from "lucide-react";

const ThemeToggle = () => {
  const { isDark, toggleTheme } = usePortfolioTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-12 h-12 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-all duration-200 flex items-center justify-center group"
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
    >
      {/* Sun Icon (Light Theme) */}
      <Sun
        size={20}
        className={`absolute text-yellow-500 transition-all duration-300 ${
          isDark
            ? "opacity-0 rotate-90 scale-0"
            : "opacity-100 rotate-0 scale-100"
        }`}
      />

      {/* Moon Icon (Dark Theme) */}
      <Moon
        size={20}
        className={`absolute text-blue-400 transition-all duration-300 ${
          isDark
            ? "opacity-100 rotate-0 scale-100"
            : "opacity-0 -rotate-90 scale-0"
        }`}
      />

      {/* Hover Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
    </button>
  );
};

export default ThemeToggle;

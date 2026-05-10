import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import LanguageSelector from "../common/LanguageSelector";
import MenuModal from "./MenuModal";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 text-sm tracking-widest text-gray-400 bg-transparent">
        <div className="flex items-center gap-8">
          <div
            className="flex gap-3 items-center cursor-pointer group"
            onClick={() => setIsMenuModalOpen(true)}
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
              <Menu size={20} className="text-gray-900 dark:text-white" />
            </div>
            <span className="text-gray-900 dark:text-white font-sans uppercase text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">
              Menu
            </span>
          </div>
          <div className="h-8 w-px bg-gray-200 dark:bg-white/20"></div>
          <div
            className="flex gap-3 items-center cursor-pointer group"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
              {theme === "dark" ? (
                <Sun size={20} className="text-white" />
              ) : (
                <Moon size={20} className="text-gray-900" />
              )}
            </div>
            <span className="text-gray-900 dark:text-white font-sans uppercase text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">
              Theme
            </span>
          </div>
        </div>

        <div className="hidden lg:flex gap-12 font-sans uppercase text-xs font-bold">
          {[
            "Home",
            "Warmups",
            "Lessons",
            "Lesson Plans",
            "Exercises",
            "Assessments",
            "Textbooks",
            "Contact",
          ].map((item) => (
            <Link
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`}
              className="text-gray-900 dark:text-white hover:opacity-70 transition-all"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex gap-6 items-center">
          <LanguageSelector />
        </div>
      </nav>

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

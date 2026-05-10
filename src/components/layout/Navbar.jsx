import { useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../../store/slices/settingsSlice";
import MenuModal from "./MenuModal";
import LanguageSelector from "../common/LanguageSelector";

const Navbar = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useSelector((state) => state.settings);
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);

  return (
    <>
      <motion.nav className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 text-sm tracking-widest text-muted-foreground font-sans transition-colors duration-500">
        <div className="flex items-center gap-8">
          <div
            className="flex gap-3 items-center cursor-pointer group"
            onClick={() => setIsMenuModalOpen(true)}
          >
            <div className="p-2 rounded-full bg-muted dark:bg-white/10 group-hover:bg-accent dark:group-hover:bg-white/20 transition-colors">
              <FiMenu size={20} className="text-foreground dark:text-white" />
            </div>
            <span className="text-foreground dark:text-white font-sans uppercase text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">
              Menu
            </span>
          </div>

          <div className="h-8 w-px bg-border dark:bg-white/20"></div>

          <div
            className="flex gap-3 items-center cursor-pointer group"
            onClick={() => dispatch(toggleDarkMode())}
          >
            <div className="p-2 rounded-full bg-muted dark:bg-white/10 group-hover:bg-accent dark:group-hover:bg-white/20 transition-colors">
              {isDarkMode ? (
                <FiSun size={20} className="text-white" />
              ) : (
                <FiMoon size={20} className="text-foreground" />
              )}
            </div>
            <span className="text-foreground dark:text-white font-sans uppercase text-xs font-bold tracking-widest group-hover:opacity-70 transition-opacity">
              Theme
            </span>
          </div>
        </div>

        <div className="hidden lg:flex gap-8 font-sans uppercase text-[10px] font-bold tracking-widest">
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
              to={
                item === "Home"
                  ? "/"
                  : `/${item.toLowerCase().replace(" ", "-")}`
              }
              className="hover:text-foreground dark:hover:text-white transition-colors whitespace-nowrap"
            >
              {item}
            </Link>
          ))}
        </div>

        <div className="flex gap-6 items-center">
          <div className="hidden min-[475px]:flex gap-6 items-center">
            <a
              href="#"
              className="hover:text-foreground dark:hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <div className="w-px h-6 bg-border dark:bg-border mx-2"></div>
          </div>

          <LanguageSelector />
        </div>
      </motion.nav>

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

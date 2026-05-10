import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiSettings, FiShare2 } from "react-icons/fi";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { toggleSettingsPanel } from "../../store/slices/settingsSlice";
import MenuModal from "./MenuModal";
import SocialModal from "./SocialModal";
import LanguageSelector from "../common/LanguageSelector";

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);

  return (
    <>
      <motion.nav className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 text-sm tracking-widest text-muted-foreground font-sans transition-colors duration-500">
        <div className="flex items-center gap-8">
          <div
            className="flex gap-3 items-center cursor-pointer group"
            onClick={() => setIsMenuModalOpen(true)}
          >
            <div className="p-2 rounded-full bg-muted group-hover:bg-accent transition-colors">
              <FiMenu size={20} className="text-foreground" />
            </div>
            <span className="text-foreground font-sans uppercase text-sm font-bold tracking-widest group-hover:opacity-70 transition-opacity">
              Menu
            </span>
          </div>

          <div className="h-8 w-px bg-border"></div>

          <div
            className="flex gap-3 items-center cursor-pointer group"
            onClick={() => setIsSocialModalOpen(true)}
          >
            <div className="p-2 rounded-full bg-muted group-hover:bg-accent transition-colors">
              <FiShare2 size={20} className="text-foreground" />
            </div>
            <span className="text-foreground font-sans uppercase text-sm font-bold tracking-widest group-hover:opacity-70 transition-opacity whitespace-nowrap">
              Social Media
            </span>
          </div>
        </div>

        <div className="hidden lg:flex gap-8 font-sans uppercase text-xs font-bold tracking-widest">
          {[
            "Home",
            "Warmups",
            "Lessons",
            "Lesson Plans",
            "Exercises",
            "Assessments",
            "Textbooks",
            "Contact",
          ].map((item) => {
            const path = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
            const isActive = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
            
            return (
              <Link
                key={item}
                to={path}
                className={`transition-colors whitespace-nowrap ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {item}
              </Link>
            );
          })}
        </div>

        <div className="flex gap-4 sm:gap-6 items-center">
          <div className="hidden min-[475px]:flex items-center">
            <div
              className="flex gap-3 items-center cursor-pointer group"
              onClick={() => dispatch(toggleSettingsPanel())}
            >
              <div className="p-2 rounded-full bg-muted group-hover:bg-accent transition-colors">
                <FiSettings size={20} className="text-foreground" />
              </div>
              <span className="text-foreground font-sans uppercase text-sm font-bold tracking-widest group-hover:opacity-70 transition-opacity">
                Settings
              </span>
            </div>
            <div className="w-px h-6 bg-border mx-4"></div>
          </div>

          <LanguageSelector />
        </div>
      </motion.nav>

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />
      <SocialModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

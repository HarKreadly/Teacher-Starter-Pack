import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Sun, Moon, Settings, ChevronDown } from "lucide-react";
import { useTheme } from "next-themes";
import LanguageSelector from "../common/LanguageSelector";
import MenuModal from "./MenuModal";
import SettingsModal from "./SettingsModal";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [renderDropdown, setRenderDropdown] = useState(null);
  const dropdownRef = useRef(null);

  const navItems = [
    { name: "Home", link: "/" },
    { 
      name: "Warmups", 
      link: "/warmups",
      dropdown: [
        { title: "Vocabulary", desc: "Quick word games and flashcards", link: "/warmups/vocabulary" },
        { title: "Grammar", desc: "Short syntax exercises", link: "/warmups/grammar" },
        { title: "Icebreakers", desc: "Start the class with energy", link: "/warmups/icebreakers" },
        { title: "Pronunciation", desc: "Vocal drills and intonation", link: "/warmups/pronunciation" }
      ]
    },
    { 
      name: "Materials", 
      link: "/materials",
      dropdown: [
        { title: "Printables", desc: "Worksheets and handouts", link: "/materials/printables" },
        { title: "Presentations", desc: "Slide decks for lessons", link: "/materials/presentations" },
        { title: "Audio/Video", desc: "Media for listening practice", link: "/materials/media" },
        { title: "Flashcards", desc: "Visual aids for vocabulary", link: "/materials/flashcards" }
      ]
    },
    { 
      name: "Exercises", 
      link: "/exercises",
      dropdown: [
        { title: "Reading", desc: "Comprehension passages", link: "/exercises/reading" },
        { title: "Writing", desc: "Essay prompts and guides", link: "/exercises/writing" },
        { title: "Speaking", desc: "Conversation topics", link: "/exercises/speaking" },
        { title: "Listening", desc: "Audio tests and quizzes", link: "/exercises/listening" }
      ]
    },
    { name: "Assessments", link: "/assessments" },
    { name: "Tools", link: "/tools" },
    { name: "Contact", link: "/contact" },
  ];

  useEffect(() => {
    const item = navItems.find((i) => i.name === activeDropdown);
    if (item && item.dropdown) {
      setRenderDropdown(item);
    }
  }, [activeDropdown]);

  useGSAP(() => {
    const item = navItems.find((i) => i.name === activeDropdown);
    const hasDropdown = item && item.dropdown;

    if (hasDropdown) {
      gsap.to(dropdownRef.current, {
        height: "auto",
        duration: 0.7,
        ease: "expo.inOut",
        overwrite: "auto"
      });
      gsap.fromTo(".dropdown-item", 
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: "power2.out", delay: 0.2, overwrite: "auto" }
      );
    } else {
      gsap.to(dropdownRef.current, {
        height: 0,
        duration: 0.5,
        ease: "expo.inOut",
        overwrite: "auto"
      });
      gsap.to(".dropdown-item", { opacity: 0, y: -10, duration: 0.2, overwrite: "auto" });
    }
  }, [activeDropdown]);

  return (
    <>
      <nav 
        className="absolute top-0 left-0 w-full p-4 md:p-8 flex justify-between items-center z-50 text-sm tracking-widest text-gray-400 bg-transparent"
        onMouseLeave={() => setActiveDropdown(null)}
      >
        {/* Global GSAP Dropdown Background */}
        <div 
          ref={dropdownRef}
          className="fixed top-0 left-0 w-full bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-3xl overflow-hidden -z-10 shadow-2xl border-b border-gray-200 dark:border-white/10"
          style={{ height: 0 }}
        >
          <div className="w-full max-w-6xl mx-auto px-8 lg:px-16 pt-[100px] pb-8">
            <div className="grid grid-cols-4 gap-4">
              {renderDropdown?.dropdown?.map((dropItem, idx) => (
                <Link 
                  key={`${renderDropdown.name}-${idx}`}
                  to={dropItem.link}
                  className="dropdown-item flex flex-col gap-1 p-4 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-colors group/item"
                >
                  <span className="text-gray-900 dark:text-white font-bold text-lg tracking-wide group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors">{dropItem.title}</span>
                  <span className="text-gray-500 dark:text-gray-400 font-normal text-xs tracking-normal normal-case leading-relaxed">{dropItem.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

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

        <div className="hidden lg:flex gap-8 xl:gap-12 font-sans uppercase text-xs font-bold relative">
          {navItems.map((item) => (
            <div 
              key={item.name} 
              className="py-4 cursor-pointer"
              onMouseEnter={() => setActiveDropdown(item.name)}
            >
              <Link
                to={item.link}
                className="flex items-center gap-1 text-gray-900 dark:text-white hover:opacity-70 transition-all"
              >
                {item.name}
                {item.dropdown && (
                  <ChevronDown 
                    size={14} 
                    className={`transition-transform duration-500 ${activeDropdown === item.name ? "rotate-180" : ""}`} 
                  />
                )}
              </Link>
            </div>
          ))}
        </div>

        <div className="flex gap-4 md:gap-6 items-center">
          <LanguageSelector />
          
          <div className="h-6 w-px bg-gray-300 dark:bg-white/20 hidden sm:block"></div>

          {/* Settings Button */}
          <button 
            onClick={() => setIsSettingsModalOpen(true)}
            className="flex items-center justify-center p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 transition-colors group" 
            aria-label="Settings"
          >
            <Settings size={20} className="text-gray-900 dark:text-white group-hover:rotate-90 transition-transform duration-500" />
          </button>
        </div>
      </nav>

      <MenuModal
        isOpen={isMenuModalOpen}
        onClose={() => setIsMenuModalOpen(false)}
      />

      <SettingsModal
        isOpen={isSettingsModalOpen}
        onClose={() => setIsSettingsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Globe, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineTranslate } from "react-icons/md";
import { createPortal } from "react-dom";

const languages = [
  { code: "en", name: "English", sub: "EN" },
  { code: "es", name: "Español", sub: "ES" },
  { code: "fr", name: "Français", sub: "FR" },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation("common");
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  // Expanding circular reveal animation from top center (50% 0%)
  const sliceVariants = {
    closed: {
      clipPath: "circle(0% at 50% 0%)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.2
      }
    },
    open: (i) => ({
      clipPath: "circle(150% at 50% 0%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2,
        delay: i * 0.08,
      }
    })
  };

  return (
    <>
      {/* Minimalistic Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 rounded-full text-zinc-700 dark:text-zinc-300 hover:text-zinc-955 dark:hover:text-white bg-zinc-100/50 dark:bg-zinc-900/40 hover:bg-zinc-200/60 dark:hover:bg-zinc-800/70 transition-all duration-300 hover:scale-105 cursor-pointer flex items-center justify-center shrink-0"
        aria-label="Select Language"
      >
        <MdOutlineTranslate size={18} />
      </button>

      {/* Render the full-screen modal directly inside document.body using Portals to prevent pointer-event conflicts */}
      {createPortal(
        <AnimatePresence>
          {isOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center overflow-hidden pointer-events-auto">
              {/* Pie Slices */}
              {[1, 2, 3].map((_, i) => (
                <motion.div
                  key={`slice-${i}`}
                  custom={i}
                  variants={sliceVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className={`absolute inset-0 pointer-events-none ${
                    i === 0 ? "bg-[#0a0a0b]" : 
                    i === 1 ? "bg-[#111112]" : 
                    "bg-[#161618]"
                  } ${i === 0 ? "z-101" : i === 1 ? "z-102" : "z-103"}`}
                />
              ))}

              {/* Content Container */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.3 }}
                className="relative z-110 w-full h-full flex flex-col items-center justify-center p-6 dark:bg-zinc-955 bg-zinc-100"
              >
                {/* Small Header */}
                <motion.div 
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute top-10 left-10 flex items-center gap-4"
                >
                  <div className="w-8 h-px bg-white/20" />
                  <span className="text-[10px] font-black tracking-[0.4em] uppercase text-zinc-500">Language Select</span>
                </motion.div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-0 right-0 p-2 m-8 hover:cursor-pointer rounded-full text-foreground hover:text-primary transition-colors z-120 group bg-zinc-200"
                >
                  <X size={20} className="group-hover:rotate-90 transition-transform duration-500 text-zinc-955"/>
                </button>

                {/* Smaller Grid */}
                <div className="flex flex-col gap-4 w-full max-w-sm">
                  {languages.map((lang, i) => (
                    <motion.button
                      key={lang.code}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: -20, opacity: 0, transition: { duration: 0.15 } }}
                      transition={{ delay: 0.4 + (i * 0.05), type: "spring" }}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`
                        relative group flex items-center justify-between p-6 rounded-2xl border transition-all duration-500
                        ${i18n.language === lang.code 
                          ? "bg-black text-white border-zinc-900 dark:bg-zinc-300 dark:text-zinc-950" 
                          : "bg-zinc-200/50 dark:bg-zinc-955 dark:hover:text-zinc-50 dark:hover:bg-zinc-900 dark text-zinc-500 hover:text-zinc-800 border-white/5 hover:bg-white/80 dark:hover:border-zinc-800 hover:border-white/20 "
                        }
                      `}
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-[10px] font-black opacity-30 tracking-tighter">0{i + 1}</span>
                        <div className="flex flex-col items-start">
                          <span className="text-xl font-bold tracking-tighter uppercase">{lang.name}</span>
                          <span className={`text-[9px] font-bold tracking-[0.2em] uppercase ${i18n.language === lang.code ? "opacity-60" : "opacity-30"}`}>
                            {lang.code === "en" ? "Standard Interface" : "Localized Build"}
                          </span>
                        </div>
                      </div>

                      <div className={`transition-transform duration-500 group-hover:scale-125 ${i18n.language === lang.code ? "opacity-100" : "opacity-20"}`}>
                        {i18n.language === lang.code ? <Languages size={18} /> : ""}
                      </div>

                      {/* Active Pip */}
                      {i18n.language === lang.code && (
                        <motion.div 
                          layoutId="active-pip"
                          className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>

                {/* Mini Footer */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="absolute bottom-10 flex flex-col items-center gap-2"
                >
                  <div className="flex gap-2">
                     {[1,2,3].map(i => <div key={i} className={`w-1 h-1 rounded-full ${i-1 === languages.findIndex(l => l.code === i18n.language) ? "bg-white" : "bg-white/20"}`} />)}
                  </div>
                  <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-zinc-650">Select Region</span>
                </motion.div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default LanguageSelector;

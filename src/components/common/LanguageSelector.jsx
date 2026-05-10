import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Globe, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MdOutlineTranslate } from "react-icons/md";

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

  const sliceVariants = {
    closed: {
      clipPath: "circle(0% at 100% 0%)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.2 // Small delay to let cards exit first
      }
    },
    open: (i) => ({
      clipPath: "circle(150% at 100% 0%)",
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
      {/* Old Style Button */}
      <div
        onClick={() => setIsOpen(true)}
        className="flex gap-3 items-center cursor-pointer group"
        role="button"
        tabIndex={0}
      >
        <div className="p-2 rounded-full bg-gray-100 dark:bg-white/10 group-hover:bg-gray-200 dark:group-hover:bg-white/20 transition-colors">
          <MdOutlineTranslate
            size={20}
            className="text-gray-900 dark:text-white"
          />
        </div>
        <span className="text-gray-900 dark:text-white font-sans uppercase text-[10px] font-bold tracking-widest group-hover:opacity-70 transition-opacity hidden sm:inline">
          {i18n.language}
        </span>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
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
                } ${i === 0 ? "z-[101]" : i === 1 ? "z-[102]" : "z-[103]"}`}
              />
            ))}

            {/* Content Container */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-[110] w-full h-full flex flex-col items-center justify-center p-6"
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
                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white hover:text-black transition-all border border-white/10"
              >
                <X size={20} />
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
                        ? "bg-white text-black border-white" 
                        : "bg-white/5 text-white border-white/5 hover:bg-white/10 hover:border-white/20"
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
                <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-zinc-600">Select Region</span>
              </motion.div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LanguageSelector;

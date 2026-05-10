import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, closeSettingsPanel, setTheme, setGlassMode } from '../../store/slices/settingsSlice';
import { useEffect } from 'react';
import { FiX, FiMoon, FiSun } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const themes = ['zinc', 'stone', 'amber', 'sweet', 'pink', 'sunrise', 'sunset'];

const glassModes = ['opaque', 'blur', 'acrylic'];

const SettingsPanel = () => {
  const { isSettingsPanelOpen, isDarkMode, theme, glassMode } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    const html = document.documentElement;
    // Remove all possible themes, dark class, and glass modes
    html.classList.remove('dark', ...themes, 'glass-opaque', 'glass-blur', 'glass-acrylic');
    
    // Add current theme and dark mode
    if (isDarkMode) html.classList.add('dark');
    if (theme) html.classList.add(theme);
    if (glassMode && glassMode !== 'opaque') html.classList.add(`glass-${glassMode}`);
  }, [isDarkMode, theme, glassMode]);

  useEffect(() => {
    if (isSettingsPanelOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSettingsPanelOpen]);

  const sliceVariants = {
    closed: {
      clipPath: "circle(0% at 100% 0%)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 40,
        delay: 0.2,
      },
    },
    open: (i) => ({
      clipPath: "circle(150% at 100% 0%)",
      transition: {
        type: "spring",
        stiffness: 40,
        restDelta: 2,
        delay: i * 0.08,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isSettingsPanelOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden">
          {/* Pie Slices Background */}
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={`settings-slice-${i}`}
              custom={i}
              variants={sliceVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className={`absolute inset-0 pointer-events-none ${
                i === 0
                  ? "bg-zinc-800"
                  : i === 1
                  ? "bg-zinc-950"
                  : "bg-zinc-900"
              } ${i === 0 ? "z-[101]" : i === 1 ? "z-[102]" : "z-[103]"}`}
            />
          ))}

          {/* Content Container */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.3 }}
            className="relative z-[110] w-full h-full flex flex-col items-center justify-center p-6 font-sans text-white"
          >
            <button
              onClick={() => dispatch(closeSettingsPanel())}
              className="absolute top-0 right-0 p-2 m-8 hover:cursor-pointer bg-white rounded-full text-black hover:text-primary transition-colors z-[120] group"
            >
              <FiX
                size={22}
                className="group-hover:rotate-90 transition-transform duration-500"
              />
            </button>

            <div className="flex flex-col gap-8 w-full max-w-lg">
              <span className="m-auto text-white/50 uppercase tracking-[0.2em] font-bold text-xs">
                Preferences
              </span>

              {/* Dark Mode Setting */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: 0.4, type: "spring" }}
                className="relative flex items-center justify-between p-6 rounded-2xl border bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20 transition-all duration-500"
              >
                <div className="flex items-center gap-6">
                  <div className={`p-4 rounded-full transition-colors ${isDarkMode ? "bg-white text-black" : "bg-white/10 text-white"}`}>
                    {isDarkMode ? <FiMoon size={24} /> : <FiSun size={24} />}
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-xl sm:text-2xl font-bold tracking-tighter uppercase">
                      Dark Mode
                    </span>
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50">
                      Toggle interface appearance
                    </span>
                  </div>
                </div>

                <button 
                  onClick={() => dispatch(toggleDarkMode())}
                  className={`w-14 h-8 rounded-full transition-colors relative ${isDarkMode ? 'bg-primary' : 'bg-white/20'}`}
                >
                  <div className={`absolute top-1 left-1 bg-background w-6 h-6 rounded-full transition-transform duration-300 ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </motion.div>

              {/* Theme Selection */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="flex flex-col gap-4"
              >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50 ml-2">
                  Cinematic Theme
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  {themes.map((t, idx) => (
                    <button
                      key={t}
                      onClick={() => dispatch(setTheme(t))}
                      className={`
                        relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 overflow-hidden group
                        ${
                          theme === t 
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                            : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/30'
                        }
                      `}
                    >
                      <span className="text-sm font-bold uppercase tracking-wider z-10">
                        {t}
                      </span>
                      {/* Active Pip Background Glow */}
                      {theme === t && (
                        <div className="absolute inset-0 bg-primary/20 blur-xl" />
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Glass Mode Selection */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="flex flex-col gap-4"
              >
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase opacity-50 ml-2">
                  Background Effect
                </span>
                <div className="grid grid-cols-3 gap-3 sm:gap-4">
                  {glassModes.map((mode) => (
                    <button
                      key={mode}
                      onClick={() => dispatch(setGlassMode(mode))}
                      className={`
                        relative flex flex-col items-center justify-center p-4 rounded-xl border transition-all duration-300 overflow-hidden group
                        ${
                          glassMode === mode 
                            ? 'bg-white text-black border-white shadow-[0_0_15px_rgba(255,255,255,0.3)]' 
                            : 'bg-white/5 text-white/70 border-white/5 hover:bg-white/10 hover:text-white hover:border-white/30'
                        }
                      `}
                    >
                      <span className="text-xs sm:text-sm font-bold uppercase tracking-wider z-10">
                        {mode}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Mini Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-10 flex flex-col items-center gap-2"
            >
              <span className="text-[8px] font-bold tracking-[0.5em] uppercase text-zinc-500">
                System Configuration
              </span>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;

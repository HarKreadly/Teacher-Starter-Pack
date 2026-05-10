import { useSelector, useDispatch } from 'react-redux';
import { toggleDarkMode, closeSettingsPanel, setTheme } from '../../store/slices/settingsSlice';
import { useEffect } from 'react';
import { FiX, FiMoon, FiSun } from 'react-icons/fi';
import { AnimatePresence, motion } from 'framer-motion';

const themes = ['zinc', 'stone', 'amber', 'cyberpunk', 'sunrise', 'sunset'];

const SettingsPanel = () => {
  const { isSettingsPanelOpen, isDarkMode, theme } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    const html = document.documentElement;
    // Remove all possible themes and dark class
    html.classList.remove('dark', ...themes);
    
    // Add current theme and dark mode
    if (isDarkMode) html.classList.add('dark');
    if (theme) html.classList.add(theme);
  }, [isDarkMode, theme]);

  const handleBackdropClick = (e) => {
    if (e.target.id === 'settings-backdrop') {
      dispatch(closeSettingsPanel());
    }
  };

  return (
    <AnimatePresence>
      {isSettingsPanelOpen && (
        <motion.div 
          id="settings-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute top-0 right-0 h-full w-full max-w-sm bg-background/90 backdrop-blur-xl border-l border-border shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h2 className="text-lg font-semibold text-foreground tracking-tight">Settings</h2>
              <button 
                onClick={() => dispatch(closeSettingsPanel())}
                className="p-2 text-muted-foreground hover:bg-muted rounded-full transition-colors"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="p-6 space-y-8">
              {/* Dark Mode Setting */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Appearance</h3>
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-background text-foreground shadow-sm">
                      {isDarkMode ? <FiMoon size={20} /> : <FiSun size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Dark Mode</p>
                      <p className="text-xs text-muted-foreground">Toggle dark theme</p>
                    </div>
                  </div>
                  
                  <button 
                    onClick={() => dispatch(toggleDarkMode())}
                    className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-primary' : 'bg-muted-foreground'}`}
                  >
                    <div className={`absolute top-1 left-1 bg-background w-4 h-4 rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>

              {/* Theme Selection */}
              <div>
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-4">Cinematic Theme</h3>
                <div className="grid grid-cols-2 gap-3">
                  {themes.map((t) => (
                    <button
                      key={t}
                      onClick={() => dispatch(setTheme(t))}
                      className={`px-4 py-3 rounded-xl border text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                        theme === t 
                          ? 'border-primary bg-primary/10 text-primary scale-105' 
                          : 'border-border bg-muted/50 text-muted-foreground hover:border-foreground/30 hover:text-foreground'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SettingsPanel;

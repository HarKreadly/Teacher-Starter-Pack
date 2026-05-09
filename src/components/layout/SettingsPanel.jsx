import { useSelector, useDispatch } from 'react-redux';
import { FiX, FiMoon, FiSun } from 'react-icons/fi';
import { toggleDarkMode, closeSettingsPanel } from '../../store/slices/settingsSlice';
import { useEffect } from 'react';

const SettingsPanel = () => {
  const { isSettingsPanelOpen, isDarkMode } = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Handle click outside to close
  const handleBackdropClick = (e) => {
    if (e.target.id === 'settings-backdrop') {
      dispatch(closeSettingsPanel());
    }
  };

  if (!isSettingsPanelOpen) return null;

  return (
    <div 
      id="settings-backdrop"
      className="fixed inset-0 z-[100] bg-zinc-900/20 backdrop-blur-sm transition-opacity"
      onClick={handleBackdropClick}
    >
      <div 
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white dark:bg-zinc-900 border-l border-zinc-200 dark:border-zinc-800 shadow-2xl transform transition-transform duration-300 ${isSettingsPanelOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-200 dark:border-zinc-800">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">Settings</h2>
          <button 
            onClick={() => dispatch(closeSettingsPanel())}
            className="p-2 text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Theme Setting */}
          <div>
            <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Appearance</h3>
            
            <div className="flex items-center justify-between p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${isDarkMode ? 'bg-zinc-800 text-zinc-300' : 'bg-white text-zinc-600 shadow-sm'}`}>
                  {isDarkMode ? <FiMoon size={20} /> : <FiSun size={20} />}
                </div>
                <div>
                  <p className="text-sm font-medium text-zinc-900 dark:text-white">Dark Mode</p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Toggle dark theme</p>
                </div>
              </div>
              
              <button 
                onClick={() => dispatch(toggleDarkMode())}
                className={`w-12 h-6 rounded-full transition-colors relative ${isDarkMode ? 'bg-zinc-600' : 'bg-zinc-300'}`}
              >
                <div className={`absolute top-1 left-1 bg-white w-4 h-4 rounded-full transition-transform ${isDarkMode ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
          
          {/* Future Settings can be added here */}
          <div>
             <h3 className="text-sm font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-4">Preferences</h3>
             <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl border border-zinc-200 dark:border-zinc-700 text-center">
               <p className="text-sm text-zinc-500 dark:text-zinc-400">More settings coming soon.</p>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;

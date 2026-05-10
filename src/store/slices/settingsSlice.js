import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage if available
const loadState = () => {
  try {
    const serializedState = localStorage.getItem('warmediaSettings');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const savedState = loadState();

const initialState = {
  theme: savedState?.theme || 'zinc',
  isDarkMode: savedState?.isDarkMode || false,
  isSettingsPanelOpen: false, // Don't persist panel open state
  glassMode: savedState?.glassMode || 'opaque',
};

// Helper function to save to localStorage
const saveState = (state) => {
  try {
    const stateToSave = {
      theme: state.theme,
      isDarkMode: state.isDarkMode,
      glassMode: state.glassMode,
    };
    localStorage.setItem('warmediaSettings', JSON.stringify(stateToSave));
  } catch (err) {
    // Ignore write errors
  }
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      saveState(state);
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
      saveState(state);
    },
    setGlassMode: (state, action) => {
      state.glassMode = action.payload;
      saveState(state);
    },
    toggleSettingsPanel: (state) => {
      state.isSettingsPanelOpen = !state.isSettingsPanelOpen;
    },
    closeSettingsPanel: (state) => {
      state.isSettingsPanelOpen = false;
    },
  },
});

export const { toggleDarkMode, setTheme, setGlassMode, toggleSettingsPanel, closeSettingsPanel } = settingsSlice.actions;
export default settingsSlice.reducer;

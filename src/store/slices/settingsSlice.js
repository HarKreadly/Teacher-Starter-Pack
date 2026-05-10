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
  isSettingsPanelOpen: false, // Don't persist panel open state
};

// Helper function to save to localStorage
const saveState = (state) => {
  try {
    const stateToSave = {
      // Add other persistent settings here if needed
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
    toggleSettingsPanel: (state) => {
      state.isSettingsPanelOpen = !state.isSettingsPanelOpen;
    },
    closeSettingsPanel: (state) => {
      state.isSettingsPanelOpen = false;
    },
  },
});

export const { toggleSettingsPanel, closeSettingsPanel } = settingsSlice.actions;
export default settingsSlice.reducer;

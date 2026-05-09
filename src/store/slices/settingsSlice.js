import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
  isSettingsPanelOpen: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
      // In a real app, you might sync this to localStorage here or in a middleware
    },
    setDarkMode: (state, action) => {
      state.isDarkMode = action.payload;
    },
    toggleSettingsPanel: (state) => {
      state.isSettingsPanelOpen = !state.isSettingsPanelOpen;
    },
    closeSettingsPanel: (state) => {
      state.isSettingsPanelOpen = false;
    }
  },
});

export const { toggleDarkMode, setDarkMode, toggleSettingsPanel, closeSettingsPanel } = settingsSlice.actions;
export default settingsSlice.reducer;

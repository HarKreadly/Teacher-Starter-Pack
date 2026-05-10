import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'zinc', // default theme
  isDarkMode: false,
  isSettingsPanelOpen: false,
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleSettingsPanel: (state) => {
      state.isSettingsPanelOpen = !state.isSettingsPanelOpen;
    },
    closeSettingsPanel: (state) => {
      state.isSettingsPanelOpen = false;
    },
  },
});

export const { toggleDarkMode, setTheme, toggleSettingsPanel, closeSettingsPanel } = settingsSlice.actions;
export default settingsSlice.reducer;

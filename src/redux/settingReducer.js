import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light-theme",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTheme: (state, action) => {
      const currentTheme = action.payload;

      state.theme = currentTheme;
      localStorage.setItem("theme", currentTheme);
      document.body.className = currentTheme;
    },
  },
});

export const { setTheme } = settingSlice.actions;

export const themeSelector = (state) => state.setting.theme;

export default settingSlice.reducer;

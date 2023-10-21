import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  theme: localStorage.getItem("theme") || "light",
};

export const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setTheme: () => {},
    toggleTheme: (state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      state.theme = newTheme;
      console.log(newTheme);
      localStorage.setItem("theme", newTheme);
      document.getElementById("root").className = {
        light: "light-theme",
        dark: "dark-theme",
      }[newTheme];
    },
  },
});

export const { toggleTheme, setTheme } = settingSlice.actions;

export const themeSelector = (state) => state.setting.theme;

export default settingSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  userId: localStorage.getItem("userId"),
  profileId: localStorage.getItem("profileId"),
  type: localStorage.getItem("type"),
  email: localStorage.getItem("email"),
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthKey: (state, action) => {
      const [key, value] = action.payload;
      console.log(action.payload);
      state[key] = value;
      localStorage.setItem(key, value);
    },
    resetAuth: (state) => {
      for (const key in state) {
        localStorage.removeItem(key);
        state[key] = undefined;
      }
    },
  },
});

export const { setAuthKey, resetAuth } = authSlice.actions;

export const authKeySelector = (key) => (state) => state.auth[key];

export default authSlice.reducer;

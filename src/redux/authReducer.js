import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accessToken: localStorage.getItem("accessToken"),
  refreshToken: localStorage.getItem("refreshToken"),
  userId: localStorage.getItem("userId"),
  profileId: localStorage.getItem("profileId"),
  type: localStorage.getItem("type"),
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
  },
});

export const { setAuthKey } = authSlice.actions;

export const authKeySelector = (key) => (state) => state.auth[key];

export default authSlice.reducer;

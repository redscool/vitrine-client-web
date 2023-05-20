import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: null,
  name: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileKey: (state, action) => {
      const [key, value] = action.payload;
      console.log(action.payload);
      state[key] = value;
    },
  },
});

export const { setProfileKey } = profileSlice.actions;

export const profileKeySelector = (key) => (state) => state.profile[key];

export default profileSlice.reducer;

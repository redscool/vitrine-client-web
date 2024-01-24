import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const message = action.payload;
      state.push(message);
    },
    resetNotifications: (state, action) => {
      while (state.length) state.pop();
    },
  },
});

export const { addNotification, resetNotifications } =
  notificationsSlice.actions;

export const notificationsSelector = () => (state) => state.notifications;

export default notificationsSlice.reducer;

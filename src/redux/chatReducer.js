import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message, classId } = action.payload;
      state[classId] = state[classId] ? state[classId] : [];
      state[classId].push({ message });
    },
  },
});

export const { addMessage } = chatSlice.actions;

export const chatByClassIdSelector = (classId) => (state) =>
  state.chat[classId];

export default chatSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message, classId, senderProfilePicture, senderName } =
        action.payload;
      state[classId] = state[classId] ? state[classId] : [];
      state[classId].push({ message, senderProfilePicture, senderName });
    },
    initChat: (state, action) => {
      const { messages, classId } = action.payload;
      state[classId] = messages;
    },
  },
});

export const { addMessage, initChat } = chatSlice.actions;

export const chatByClassIdSelector = (classId) => (state) =>
  state.chat[classId];

export default chatSlice.reducer;

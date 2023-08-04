import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { message, spaceId, senderProfilePicture, senderName } =
        action.payload;
      state[spaceId] = state[spaceId] ? state[spaceId] : [];
      state[spaceId].push({ message, senderProfilePicture, senderName });
    },
    initChat: (state, action) => {
      const { messages, spaceId } = action.payload;
      state[spaceId] = messages;
    },
  },
});

export const { addMessage, initChat } = chatSlice.actions;

export const chatBySpaceIdSelector = (spaceId) => (state) =>
  state.chat[spaceId];

export default chatSlice.reducer;

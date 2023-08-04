import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormQuestionDescription: (state, action) => {
      const { editorContent, spaceId, formId } = action.payload;
      state[spaceId] = state[spaceId] ? state[spaceId] : [];
      state[spaceId][formId] = state[spaceId][formId]
        ? state[spaceId][formId]
        : {};
      // state[spaceId][formId].
    },
    addForm: (state, action) => {
      const { spaceId, formId, content } = action.payload;
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

export const chatByspaceIdSelector = (spaceId) => (state) =>
  state.chat[spaceId];

export default chatSlice.reducer;

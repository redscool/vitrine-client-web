import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setFormQuestionDescription: (state, action) => {
      const { editorContent, classId, formId } = action.payload;
      state[classId] = state[classId] ? state[classId] : [];
      state[classId][formId] = state[classId][formId]
        ? state[classId][formId]
        : {};
      // state[classId][formId].
    },
    addForm: (state, action) => {
      const { classId, formId, content } = action.payload;
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

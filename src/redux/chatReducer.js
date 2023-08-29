import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	chatHeads: {},
};

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
		initDM: (state, action) => {
			const { chats } = action.payload;
			state.chatHeads = chats;
		},
		addDM: (state, action) => {
			const { chatId, sender, reciever, data, timestamp } = action.payload;
			state.chatHeads[chatId].messages.push({
				sender,
				reciever,
				data,
				timestamp,
			});
		},
		addDMChat: (state, action) => {
			const chat = action.payload;
			state.chatHeads[chat._id] = chat;
		},
	},
});

export const { addMessage, initChat, initDM, addDM, addDMChat } =
	chatSlice.actions;

export const chatBySpaceIdSelector = (spaceId) => (state) =>
	state.chat[spaceId];

export const getChatHeads = () => (state) => state.chat.chatHeads;

export default chatSlice.reducer;

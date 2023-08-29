import { addDM, addMessage, addDMChat } from "../../redux/chatReducer";
import { notify, notifyMe } from "../BrowserNotification";
import { listen } from "../socketIO";
import store from "../../redux/store.js";
import { resource_request_with_access_token } from "../../utils/Service.js";

const listenChatEvents = (dispatch) => {
	listen("chat-message-received", (data) => {
		dispatch(addMessage(data));
	});
	listen(
		"chat-dm-received",
		async ({ chatId, sender, reciever, data, timestamp }) => {
			notify(`${data} :${sender}`);
			const { chatHeads } = store.getState().chat;
			console.log("chatHeads", chatHeads);
			if (chatHeads[chatId]) {
				dispatch(addDM({ chatId, sender, reciever, data, timestamp }));
				return;
			}
			await resource_request_with_access_token(
				"post",
				"/api/chat/getChat",
				{ chatId, userId: reciever },
				(resData) => {
					const { chat } = resData.data;
					console.log("post request: ", chat);
					dispatch(addDMChat(chat));
				},
				console.log
			);
		}
	);
};

export default listenChatEvents;

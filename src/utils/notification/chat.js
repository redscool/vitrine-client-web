import { addMessage } from "../../redux/chatReducer";
import { notifyMe } from "../BrowserNotification";
import { listen } from "../socketIO";

const listenChatEvents = (dispatch) => {
  listen("chat-message-received", (data) => {
    dispatch(addMessage(data));
  });
};

export default listenChatEvents;

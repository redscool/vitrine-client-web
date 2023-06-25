import { notifyMe } from "../BrowserNotification";
import { listen } from "../socketIO";

const listenChatEvents = (dispatch) => {
    listen("reply", (data) => {
        notifyMe();
    });
}

export default listenChatEvents;
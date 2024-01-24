import {
  addMessage,
  changeOnlineMember,
  initOnlineMembers,
} from "../../redux/chatReducer";
import { listen } from "../socketIO";
import { SOCKET_EVENTS } from "../../constants.js";
import { notifyMe } from "../BrowserNotification.js";
import { addNotification } from "../../redux/notificationReducer.js";

const listenChatEvents = (dispatch) => {
  listen(SOCKET_EVENTS.MESSAGE_RECIEVED, (data) => {
    const { message } = data;
    const { spaceId } = message;
    dispatch(addMessage({ message, spaceId }));
    const profileId = localStorage.getItem("profileId");
    console.log(profileId);
    if (profileId != message.sender) {
      notifyMe(message);
      dispatch(addNotification(message));
    }
  });
  listen(SOCKET_EVENTS.JOINED_CHAT, (data) => {
    const { profileId } = data;
    dispatch(changeOnlineMember({ profileId, isOnline: true }));
  });
  listen(SOCKET_EVENTS.LEFT_CHAT, (data) => {
    const { profileId } = data;
    dispatch(changeOnlineMember({ profileId, isOnline: false }));
  });
  listen(SOCKET_EVENTS.RECIEVED_ONLINE_MEMBER, (data) => {
    const { spaceId, onlineMembers } = data;
    dispatch(initOnlineMembers({ onlineMembers, spaceId }));
  });
};

export default listenChatEvents;

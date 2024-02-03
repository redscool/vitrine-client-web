import store from "../redux/store";
import { getFileURL } from "./Misc";
export const notifyMe = (messageObj) => {
  if (!("Notification" in window)) {
  } else if (Notification.permission === "granted") {
    const { message, spaceId, sender } = messageObj;
    const members = store.getState().chat.members[spaceId];
    const { profilePicture, name } = members[sender];
    var notification = new Notification(name, {
      icon: getFileURL(profilePicture),
      body: message,
    });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification();
      }
    });
  } else {
  }
};

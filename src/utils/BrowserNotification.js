import store from "../redux/store";
import { getFileURL } from "./Misc";
export const notifyMe = (messageObj) => {
  if (!("Notification" in window)) {
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    const { message, spaceId, sender } = messageObj;
    const members = store.getState().chat.members[spaceId];
    console.log(members, message, sender);
    const { profilePicture, name } = members[sender];
    var notification = new Notification(name, {
      icon: getFileURL(profilePicture),
      body: message,
    });
    console.log(getFileURL(members[sender].profilePicture));
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        const notification = new Notification();
      }
    });
  } else {
    alert("Allow Notification");
  }
};

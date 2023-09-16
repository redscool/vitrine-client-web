import { listen } from "../socketIO";
import toast from "react-hot-toast";

const listenSubscriptionEvents = (dispatch) => {
	listen("subscription-ending-notification", (data) => {
		toast(data);
		console.log("socket", data);
	});
};

export default listenSubscriptionEvents;

import toast from "react-hot-toast";

export const notifyMe = () => {
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	} else if (Notification.permission === "granted") {
		const notification = new Notification("Hi there!");
	} else if (Notification.permission !== "denied") {
		Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				const notification = new Notification("Hi there!");
			}
		});
	} else {
		alert("Allow Notification");
	}
};

export const notify = (message) => {
	if (!("Notification" in window)) {
		alert("This browser does not support desktop notification");
	} else if (Notification.permission === "granted") {
		const notification = new Notification(message);
	} else if (Notification.permission !== "denied") {
		Notification.requestPermission().then((permission) => {
			if (permission === "granted") {
				const notification = new Notification(message);
			}
		});
	} else {
		alert("Allow Notification");
	}
};

export const notifyDM = (message, sender) => {
	toast(`${message} \n\n -${sender}`);
};

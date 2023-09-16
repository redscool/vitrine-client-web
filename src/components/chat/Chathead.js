import React from "react";

export default function Chathead({ chat, setSelectedChat }) {
	console.log("chatHead", chat);
	return (
		<div
			style={{
				color: "wheat",
				width: "100",
				border: "solid green",
				marginTop: "2vh",
				cursor: "pointer",
			}}
			onClick={() => setSelectedChat(chat._id)}
		>
			<p>{chat.partner.name}</p>
			<p
				style={{
					color: "grey",
				}}
			>
				{chat.messages.length
					? chat.messages[chat.messages.length - 1].data
					: null}
			</p>
		</div>
	);
}

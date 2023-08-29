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
			}}
			onClick={() => setSelectedChat(chat._id)}
		>
			<p>{chat.partner.name}</p>
		</div>
	);
}

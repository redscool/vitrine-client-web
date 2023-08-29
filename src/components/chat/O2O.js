import React, { useState } from "react";
import Message from "./Message.js";
import { useDispatch, useSelector } from "react-redux";
import { addDM } from "../../redux/chatReducer.js";
import { authKeySelector } from "../../redux/authReducer.js";
import { emit } from "../../utils/socketIO.js";

export default function O2O({ setSelectedChat, chat }) {
	const [text, setText] = useState("");
	const profileId = useSelector(authKeySelector("profileId"));
	const dispatch = useDispatch();

	const sendMessage = () => {
		const data = {
			chatId: chat._id,
			sender: profileId,
			reciever: chat.partner._id.toString(),
			data: text,
			timestamp: new Date().getTime(),
		};
		emit("chat-dm-send", data);
		dispatch(addDM(data));
		setText("");
	};

	return (
		<div>
			<div
				style={{
					cursor: "pointer",
					border: "solid 6px",
					height: "wrap-content",
					width: "5vw",
					backgroundColor: "black",
					color: "wheat",
				}}
				onClick={() => setSelectedChat(false)}
			>
				{"<--"}
			</div>
			<div style={{ color: "wheat" }}>
				{chat?.messages?.map((message, indx) => {
					return (
						<Message
							key={indx}
							message={message}
							profileId={profileId}
							partner={chat.partner}
						/>
					);
				})}
			</div>
			<div
				style={{
					position: "absolute",
					top: "60vh",
					display: "flex",
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}
			>
				<input
					value={text}
					onChange={(e) => setText(e.target.value)}
				/>
				<div
					style={{
						color: "wheat",
						backgroundColor: "green",
						padding: "2vh",
						cursor: "pointer",
					}}
					onClick={() => sendMessage()}
				>
					Send
				</div>
			</div>
		</div>
	);
}
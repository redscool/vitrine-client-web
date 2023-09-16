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
					display: "flex",
					flexDirection: "row",
				}}
			>
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
				<div
					style={{
						color: "wheat",
						marginLeft: "5vw",
						font: "icon",
						fontSize: "4.5vh",
					}}
				>
					{chat.partner.name}
				</div>
			</div>
			<div
				style={{
					height: "50vh",
					color: "wheat",
					overflowY: "scroll",
					overflowX: "visible",
				}}
			>
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

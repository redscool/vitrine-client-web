import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDMChat, getChatHeads } from "../../redux/chatReducer.js";
import Chathead from "./Chathead.js";
import O2O from "./O2O.js";
import { resource_request_with_access_token } from "../../utils/Service.js";
import { authKeySelector } from "../../redux/authReducer.js";
import Search from "./Search.js";

export default function Chatbox({ profileId }) {
	const [selectedChat, setSelectedChat] = useState(false);
	const chatHeads = useSelector(getChatHeads());
	const userType = useSelector(authKeySelector("type"));
	const dispatch = useDispatch();

	const startChat = async (id, type) => {
		for (let key in chatHeads) {
			if (chatHeads[key].partner._id.toString() === id) {
				setSelectedChat(key);
				return;
			}
		}
		await resource_request_with_access_token(
			"post",
			"/api/chat/createChat",
			{ userId: profileId, partnerId: id, userType, partnerType: type },
			({ data }) => {
				if (!data) return;
				const { chat } = data;
				if (!chat) return;
				dispatch(addDMChat(chat));
				setSelectedChat(chat._id);
			},
			console.log
		);
	};

	return (
		<div
			style={{
				width: "36vw",
				height: "70vh",
				position: "absolute",
				left: "32vw",
				top: "11vh",
				zIndex: "200",
				boxSizing: "border-box",
				backdropFilter: "blur(200px)",
				filter: "blur()",
				boxShadow: "0 3rem 5rem rgba(0, 0, 0, 0.25)",
				borderRadius: "9px",
				background: "rgb(0, 30, 49)",
				transition: "all 0.75s",
			}}
		>
			{!selectedChat ? (
				<>
					<div>
						<Search startChat={startChat} />
					</div>
					{Object.entries(chatHeads).map(([chatId, chat], indx) => (
						<Chathead
							key={indx}
							chat={chat}
							setSelectedChat={setSelectedChat}
						/>
					))}
				</>
			) : (
				<>
					<O2O
						setSelectedChat={setSelectedChat}
						chat={chatHeads[selectedChat]}
					/>
				</>
			)}
		</div>
	);
}

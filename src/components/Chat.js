import React, { useEffect, useState } from "react";
import Chatbox from "./chat/Chatbox.js";
import { SERVER } from "../config.json";
import { resource_request_with_access_token } from "../utils/Service.js";
import { useDispatch, useSelector } from "react-redux";
import { authKeySelector } from "../redux/authReducer.js";
import { initDM } from "../redux/chatReducer.js";

export default function Chat() {
	const profileId = useSelector(authKeySelector("profileId"));
	console.log("profile: ", profileId);
	const [showPopUp, setShowPopUp] = useState();

	const dispatch = useDispatch();

	useEffect(() => {
		resource_request_with_access_token(
			"post",
			"/api/chat/getAllChats",
			{ userId: profileId },
			({ data }) => {
				const chats = {};
				data.chats.forEach((chat) => {
					chats[chat._id] = chat;
				});
				dispatch(initDM({ chats: chats }));
			},
			console.log
		);
	}, []);

	if (!profileId) return null;
	return (
		<div>
			<div
				style={{
					color: "white",
					cursor: "pointer",
					marginTop: "1vh",
					border: "solid black",
					padding: "1vh",
				}}
				onClick={() => setShowPopUp(!showPopUp)}
			>
				Chat
			</div>
			{showPopUp ? <Chatbox profileId={profileId} /> : null}
		</div>
	);
}

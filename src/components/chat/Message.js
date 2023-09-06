import React from "react";

export default function Message({ message, profileId, partner }) {
	return (
		<div>
			<p
				style={{
					display: "inline-block",
				}}
			>
				{message.sender === profileId ? "Me" : partner.name}:
			</p>
			&emsp;
			<p
				style={{
					display: "inline-block",
				}}
			>
				{message.data}
			</p>
		</div>
	);
}

import React from "react";
import { useNavigate } from "react-router-dom";

export default function FormTile({ form }) {
	const navigate = useNavigate();
	return (
		<a
			href={`/space/${form.spaceID}/exercise/${form.form}`}
			style={{ textDecoration: "none" }}
		>
			<div
				style={{
					width: "auto",
					height: "auto",
					border: "solid",
					backgroundColor: "yellow",
					marginBottom: "2vh",
				}}
			>
				You are assigned an assignment: {form?.formTitle}
			</div>
		</a>
	);
}

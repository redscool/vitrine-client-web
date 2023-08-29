import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { resource_request_with_access_token } from "../../utils/Service.js";

export default function Search({ startChat }) {
	const SEARCH_REQUEST_INTERVAL = 500;
	const [searchResults, setSearchResults] = useState([]);
	const [searchText, setSearchText] = useState("");
	const [currentRequest, setCurrentRequest] = useState(false);
	const [nextRequest, setNextRequest] = useState();

	const search = (query) => {
		if (query === "") {
			setCurrentRequest(false);
			setSearchResults([]);
			return;
		}
		setCurrentRequest(true);
		resource_request_with_access_token(
			"get",
			"/api/community/user/searchUser",
			{ query },
			({ data }) => {
				console.log("search", data.users.hits);
				setCurrentRequest(false);
				setSearchResults(data.users.hits);
			},
			(err) => {
				console.log(err);
				setCurrentRequest(false);
			}
		);
	};

	useEffect(() => {
		if (currentRequest || nextRequest) {
			if (nextRequest) {
				clearTimeout(nextRequest);
			}

			const eventId = setTimeout(() => {
				search(searchText);
			}, SEARCH_REQUEST_INTERVAL);

			setNextRequest(eventId);
		} else {
			const eventId = setTimeout(() => {
				search(searchText);
			}, SEARCH_REQUEST_INTERVAL);

			setNextRequest(eventId);
		}
	}, [searchText]);
	return (
		<div>
			<input
				value={searchText}
				onChange={(e) => {
					setSearchText(e.target.value);
				}}
			/>
			{searchResults.map((search, indx) => (
				<p
					onClick={() => startChat(search.id, search.type)}
					style={{
						border: "2px solid black",
						cursor: "pointer",
						margin: "20px",
						color: "wheat",
					}}
					key={indx}
				>
					{JSON.stringify(search, null, 2)}
				</p>
			))}
		</div>
	);
}

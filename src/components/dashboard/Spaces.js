import React, { useEffect, useState } from "react";
import styles from "../../styles/components/dashboard/Spaces.module.css";
import Button from "../form/Button";
import { resource_request_with_access_token } from "../../utils/Service";
import AddSpace from "./spaces/AddSpace";
import { useSelector } from "react-redux";
import { authKeySelector } from "../../redux/authReducer";
import SpaceTile from "./spaces/SpaceTile";
export default function Spaces() {
	const [popup, setPopup] = useState(false);
	const [spaceList, setSpaceList] = useState([]);
	const profileId = useSelector(authKeySelector("profileId"));
	const type = useSelector(authKeySelector("type"));
	useEffect(() => {
		setSpaceList([
			{
				title: "Space 1",
				description: "Udan Khatola",
				backgroundImage: "defaultSpaceBackground.svg",
				profileImage: "defaultSpaceProfile.svg",
				provider: profileId,
				events: ["Hi 1", "Hi 2"],
			},
			{
				title: "Space 2",
				description: "Udan Khatola",
				backgroundImage: "defaultSpaceBackground.svg",
				profileImage: "defaultSpaceProfile.svg",
				provider: profileId,
				events: ["Hi 1", "Hi 2", "Hi 3", "Hi 4"],
			},
			{
				title: "Space 3",
				description: "Udan Khatola",
				backgroundImage: "defaultSpaceBackground.svg",
				profileImage: "defaultSpaceProfile.svg",
				provider: profileId,
				events: [],
			},
		]);
		// const body = { profileId };
		// resource_request_with_access_token(
		// 	"get",
		// 	`/api/${type}/getAllSpaces`,
		// 	body,
		// 	({ data: { spaces } }) => {
		// 		setSpaceList(spaces);
		// 		console.log(spaces);
		// 	},
		// 	console.log
		// );
	}, []);
	return (
		<div className={styles.container}>
			<div className={styles.title}>
				<p>Spaces</p>
			</div>
			{popup ? (
				<AddSpace
					view={setPopup}
					setSpaceList={setSpaceList}
				/>
			) : null}
			<div className={styles.content}>
				{type === "PROVIDER" ? (
					<Button
						label={"Add Space"}
						handleClick={() => {
							setPopup(!popup);
						}}
					/>
				) : (
					<Button
						label={"Join Space"}
						handleClick={() => {
							setPopup(!popup);
						}}
					/>
				)}
				<div className={styles.classList}>
					{spaceList.map((spaceObj, indx) => (
						<SpaceTile
							key={indx}
							spaceObj={spaceObj}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

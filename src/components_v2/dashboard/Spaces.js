import React, { useEffect, useState } from "react";
import styles from "../../styles_v2/components_v2/dashboard/Spaces.module.css";

export default function Spaces() {
	const [spaceList, setSpaceList] = useState([]);

	useEffect(() => {
		setSpaceList([
			{
				title: "Space 1",
				description: "Udan Khatola",
				backgroundImage: "/defaultSpaceBackground.svg",
				profileImage: "/defaultSpaceProfile.svg",
				provider: "123",
				events: ["Hi 1", "Hi 2"],
			},
			{
				title: "Space 2",
				description: "Udan Khatola",
				backgroundImage: "/defaultSpaceBackground.svg",
				profileImage: "/defaultSpaceProfile.svg",
				provider: "123",
				events: ["Hi 1", "Hi 2", "Hi 3", "Hi 4"],
			},
			{
				title: "Space 3",
				description: "Udan Khatola",
				backgroundImage: "/defaultSpaceBackground.svg",
				profileImage: "/defaultSpaceProfile.svg",
				provider: "123",
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
			<div className={styles.navContent}>
				<div className={styles.reorder}>Reorder</div>
			</div>
			<div className={styles.main}>
				{spaceList.map(
					(
						{ backgroundImage, events, profileImage, title, description },
						indx
					) => (
						<div
							key={indx}
							className={styles.space}
						>
							{/* <div className={`${styles.backgroundImageContainer}`}> */}
							<img
								className={styles.backgroundImage}
								src={backgroundImage}
							/>
							{/* </div> */}
							<div className={`${styles.content}`}>
								<div className={styles.title}>{title}</div>
								<div className={styles.description}>{description}</div>
							</div>
							<div className={`${styles.notifs}`}>
								{events.length ? (
									<>
										<span className={styles.notifCount}>{events.length}</span>{" "}
										new messages
									</>
								) : (
									"No new messages"
								)}
							</div>
							<div className={styles.profilePic}>
								<img
									className={styles.profileImg}
									src={profileImage}
								/>
							</div>
						</div>
					)
				)}
			</div>
		</div>
	);
}

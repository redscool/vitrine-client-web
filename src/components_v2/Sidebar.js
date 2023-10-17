import React, { useState } from "react";

import styles from "../styles_v2/components_v2/Sidebar.module.css";

// for trying it out, remove links from props
export default function Sidebar({ selected = "spaces" }) {
	const [expand, setExpand] = useState(false);
	const [hoveredLink, setHoveredLink] = useState(-1);

	return (
		<div className={`${styles.container}`}>
			<div className={`${styles.lefty}`}>
				<div className={`${styles.logo}`}>
					<img
						className={styles.logoImg}
						src="/logo.svg"
					/>
				</div>
				<div
					className={`${styles.links}`}
					onMouseEnter={() => setExpand(true)}
					onMouseLeave={() => setExpand(false)}
				>
					{links?.map(({ href, displayText, disabled, notifs }, indx) => {
						return (
							<a
								key={href}
								href={href}
								className={`${styles.navlink}`}
								onClick={(e) => {
									if (disabled) e.preventDefault();
								}}
								onMouseEnter={() => setHoveredLink(indx)}
								onMouseLeave={() => {
									if (hoveredLink === indx) setHoveredLink(-1);
								}}
							>
								<span>
									<img
										className={`${
											hoveredLink === indx ? styles.hoveredImg : styles.linkImg
										}`}
										src={
											selected === href || hoveredLink === indx
												? "/navlinkbold.svg"
												: "/navlink.svg"
										}
									/>
								</span>
								{notifs.length ? (
									<span className={styles.notificaitonIndicator}>
										<img
											width={"5px"}
											src="/notificationIndicator.svg"
										/>
									</span>
								) : null}
								<span
									className={`${styles.displayText} ${
										expand ? styles.showText : styles.hideText
									} ${selected === href ? styles.selectedText : ""} ${
										hoveredLink === indx ? styles.hoveredText : ""
									}`}
								>
									{displayText}
								</span>
							</a>
						);
					})}
				</div>
			</div>
			<div
				className={`${styles.gradient} ${expand ? styles.open : styles.close}`}
			></div>
		</div>
	);
}

const links = [
	{
		href: "hello",
		displayText: "Home",
		disabled: false,
		notifs: [],
	},
	{
		href: "spaces",
		displayText: "Spaces",
		disabled: false,
		notifs: [],
	},
	{
		href: "profile",
		displayText: "Profile",
		disabled: false,
		notifs: ["hi"],
	},
	{
		href: "calender",
		displayText: "Calender",
		disabled: false,
		notifs: [],
	},
];

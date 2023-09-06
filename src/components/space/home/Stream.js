import React from "react";
import Post from "./Post";
import FormTile from "./FormTile";
import styles from "../../../styles/components/space/home/Stream.module.css";

export default function Stream({ posts }) {
	return (
		<div>
			{posts.map((post, indx) => {
				return post.type === "POST" ? (
					<Post
						post={post}
						key={indx}
					/>
				) : (
					<FormTile
						form={post}
						key={indx}
					/>
				);
			})}
		</div>
	);
}

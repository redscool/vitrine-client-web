import React from "react";
import Post from "./Post";

export default function Stream({ posts }) {
	return (
		<div>
			{posts.map((post, indx) => (
				<Post
					post={post}
					key={indx}
				/>
			))}
		</div>
	);
}

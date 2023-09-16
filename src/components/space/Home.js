import React, { useEffect, useState } from "react";
import styles from "../../styles/components/space/Home.module.css";
import Editor from "../Editor";
import { resource_request_with_access_token } from "../../utils/Service";
import ShelfPopUp from "../ShelfPopUp";
import Button from "../form/Button";
import FileTile from "./home/FileTile";
import Stream from "./home/Stream";
import { useParams } from "react-router-dom";
import { ORDER_PLAN_TYPES } from "../../constants.js";
export default function Home() {
	const [editorContent, setEditorContent] = useState();
	const [shelfPopUp, setShelfPopUp] = useState(false);
	const [files, setFiles] = useState([]);
	const [posts, setPosts] = useState([]);
	const [plans, setPlans] = useState({});
	const params = useParams();
	const spaceID = params.spaceId;

	useEffect(() => {
		resource_request_with_access_token(
			"post",
			"/api/space/stream/getPosts",
			{
				spaceID,
			},
			(data) => {
				setPosts(data.data.posts);
			},
			console.log
		);
	}, []);

	useEffect(() => {
		resource_request_with_access_token(
			"get",
			"/api/space/essential/getPlans",
			{ spaceId: spaceID },
			({ data }) => {
				setPlans(data.plans);
			},
			console.log
		);
	}, []);

	const setEditorData = (editorData) => {
		setEditorContent(editorData);
	};

	const addFile = (file) => {
		if (file.title) {
			console.log(file);
			setShelfPopUp(false);
			return;
		}
		var isFileAlreadyPresent = false;
		files.forEach((obj) => {
			if (obj.fileName === file.fileName) {
				isFileAlreadyPresent = true;
			}
		});
		if (isFileAlreadyPresent) {
			alert("File is already uploaded!\nPlease select different file.");
			return;
		}
		files.push(file);
		setFiles(files);
		setShelfPopUp(false);
	};

	const handleSubmit = () => {
		const isEditor =
			editorContent &&
			!(editorContent.ops.length == 1 && editorContent.ops[0].insert === "\n")
				? true
				: false;
		if (!isEditor && files.length == 0) return;
		const post = {
			editor: editorContent,
			filesAttached: files,
			type: "POST",
		};
		const tempPons = [...posts, post];
		// tempPons.push(post);
		setPosts(tempPons);
		setFiles([]);
		console.log(posts);
		console.log(tempPons);
		resource_request_with_access_token(
			"post",
			"/api/space/stream/addPost",
			{
				spaceID,
				content: post,
			},
			console.log,
			console.log
		);
	};

	const handlePlanSubmit = () => {
		resource_request_with_access_token(
			"post",
			"/api/space/essential/setPlans",
			{ spaceId: spaceID, plans },
			console.log,
			console.log
		);
	};

	return (
		<div className={styles.mainContainer}>
			{shelfPopUp ? (
				<ShelfPopUp
					addFile={addFile}
					setPopUp={setShelfPopUp}
				/>
			) : null}
			<div className={styles.myclass}>
				<div>
					<label>{ORDER_PLAN_TYPES.BUY} : </label>
					<input
						value={plans[ORDER_PLAN_TYPES.BUY] ?? ""}
						onChange={(e) => {
							const temp = { ...plans };
							temp[ORDER_PLAN_TYPES.BUY] = e.target.value;
							setPlans(temp);
						}}
						type={"number"}
					/>
				</div>
				<div>
					<label>{ORDER_PLAN_TYPES.MONTHLY} : </label>
					<input
						value={plans[ORDER_PLAN_TYPES.MONTHLY] ?? ""}
						onChange={(e) => {
							const temp = { ...plans };
							temp[ORDER_PLAN_TYPES.MONTHLY] = e.target.value;
							setPlans(temp);
						}}
						type={"number"}
					/>
				</div>
				<div>
					<label>{ORDER_PLAN_TYPES.YEARLY} : </label>
					<input
						value={plans[ORDER_PLAN_TYPES.YEARLY] ?? ""}
						onChange={(e) => {
							const temp = { ...plans };
							temp[ORDER_PLAN_TYPES.YEARLY] = e.target.value;
							setPlans(temp);
						}}
						type={"number"}
					/>
				</div>
				<div
					style={{
						backgroundColor: "wheat",
						height: "4vh",
						cursor: "pointer",
						marginLeft: "2vw",
					}}
					onClick={handlePlanSubmit}
				>
					Submit
				</div>
			</div>
			<div className={styles.lowerContainer}>
				<div className={styles.notification}></div>
				<div className={styles.rightContainer}>
					<div className={styles.greenBoard}>
						<Editor
							expand
							setEditorContent={setEditorData}
							editorContent={editorContent}
							// readOnly
						/>
						<div>
							{files.map((file, indx) => (
								<FileTile
									key={indx}
									file={file}
								/>
							))}
						</div>
						<div>
							<Button
								handleClick={() => setShelfPopUp(true)}
								label="Upload File"
							/>
							<div
								style={{
									cursor: "pointer",
									backgroundColor: "blue",
									color: "wheat",
									width: "5vw",
								}}
								onClick={handleSubmit}
							>
								Submit
							</div>
						</div>
					</div>
					<div className={styles.stream}>
						<Stream posts={posts} />
					</div>
				</div>
			</div>
		</div>
	);
}

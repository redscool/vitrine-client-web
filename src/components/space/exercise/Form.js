import styles from "../../../styles/components/space/exercise/Form.module.css";
import QuestionCardEdit from "./form/QuestionCardEdit";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import TitleCardEdit from "./form/TitleCardEdit";
import Button from "../../form/Button";
import { resource_request_with_access_token } from "../../../utils/Service";
import { useParams } from "react-router-dom";
import Editor from "../../Editor";
import { v4 as uuid } from "uuid";
import MCQBuilder from "./form/MCQBuilder";
export default function Form() {
	const params = useParams();
	const formId = params.formId;
	const [entities, setEntities] = useState({});
	const [title, setTitle] = useState("");
	const [titleEditorContent, setTitleEditorContent] = useState();
	const [selected, setSelected] = useState(0);
	const [isMCQDraggable, setIsMCQDraggable] = useState(true);
	const [isQuestionDraggable, setIsQuestionDraggable] = useState(true);

	const successCallback = (response) => {
		console.log(response);
		const { formData } = response.data;
		setTitle(formData.title);
		setTitleEditorContent(formData.titleEditorContent ?? formData.title);
		setEntities(formData.entities ?? {});
	};

	useEffect(() => {
		resource_request_with_access_token(
			"get",
			"/api/space/form/getformbyid",
			{ formId },
			successCallback,
			console.log
		);
	}, []);

	const changeEditorContent = (id) => (content) => {
		let tties = { ...entities };
		tties[id].content = content;
		setEntities(tties);
	};

	const addFunction = () => {
		const tties = { ...entities };
		for (let tt in tties) {
			if (tties[tt].index > selected) {
				tties[tt].index++;
			}
		}

		// let id = uuid();
		tties[uuid()] = {
			content: "Hi There",
			index: selected + 1,
			type: "Short Answer",
		};
		setEntities(tties);
	};

	const changeQuestionType = (id, type) => {
		if (entities[id].type === type) return;

		let tties = { ...entities };
		if (tties[id].type === "MCQ") {
			delete tties[id]["options"];
		}

		tties[id].type = type;
		if (type === "MCQ") {
			tties[id]["options"] = ["Option 1"];
		}

		setEntities(tties);
	};

	const moveQuestion = (direction) => {
		if (direction === -1 && selected === 1) return;
		if (direction === 1 && selected === Object.keys(entities).length) return;

		const tties = { ...entities };
		for (let tt in tties) {
			if (tties[tt].index == selected) {
				tties[tt].index += direction;
			} else if (tties[tt].index == selected + direction) {
				tties[tt].index -= direction;
			}
		}
		setSelected(selected + direction);
		setEntities(tties);
	};

	const deleteClickHandler = () => {
		if (selected === 0) return;
		let id;
		let tties = { ...entities };
		for (let tt in tties) {
			if (tties[tt].index === selected) {
				id = tt;
			} else if (tties[tt].index > selected) {
				tties[tt].index--;
			}
		}
		delete tties[id];
		setEntities(tties);
		setSelected(selected - 1);
	};

	const saveForm = () => {
		const body = {
			formId,
			formContent: {
				title,
				titleEditorContent,
				entities,
			},
		};
		console.log(body);
		resource_request_with_access_token(
			"post",
			"/api/space/form/updateForm",
			body,
			console.log,
			console.log
		);
	};

	const questionDragHandler = (source, dest) => {
		if (source === dest) return;

		const tties = { ...entities };

		for (let tt in tties) {
			if (
				source < dest &&
				tties[tt].index > source &&
				tties[tt].index <= dest
			) {
				if (selected === tties[tt].index) {
					setSelected(selected - 1);
				}
				tties[tt].index--;
			} else if (
				source > dest &&
				tties[tt].index < source &&
				tties[tt].index >= dest
			) {
				if (selected === tties[tt].index) {
					setSelected(selected + 1);
				}
				tties[tt].index++;
			} else if (tties[tt].index === source) {
				tties[tt].index = dest;
			}
			// console.log(tties[tt].index);
		}
		console.log(selected);
		setEntities(tties);
	};
	const mcqDragHandler = (source, dest) => {
		if (source.index === dest.index) return;

		const tties = { ...entities };
		const id = source.droppableId;

		const ele = tties[id]["options"][source.index];

		tties[id].options.splice(source.index, 1);
		tties[id].options.splice(dest.index, 0, ele);
		setEntities(tties);
	};

	const onDragEnd = (result) => {
		setIsQuestionDraggable(true);
		setIsMCQDraggable(true);
		console.log(result);
		if (!result.destination || !result.source) return;
		if (result.destination.droppableId !== result.source.droppableId) return;

		const dest = result.destination.index;
		const source = result.source.index;

		if (result.destination.droppableId === "dnd-form-1")
			questionDragHandler(source, dest);
		else mcqDragHandler(result.source, result.destination);
	};

	const setMCQOptions = (id, options) => {
		let tties = { ...entities };
		tties[id].options = options;
		setEntities(tties);
	};

	const onDragStart = (result) => {
		console.log("onDragStart => ", result.source.droppableId);
		if (result.source.droppableId !== "dnd-form-1")
			setIsQuestionDraggable(false);
		else setIsMCQDraggable(false);
	};

	return (
		<div className={styles.container}>
			<DragDropContext
				onDragEnd={(result) => onDragEnd(result)}
				onDragStart={(result) => onDragStart(result)}
			>
				<TitleCardEdit
					customStyles={selected === 0 ? styles.highlightSelected : ""}
					index={0}
					addQuestionHandler={addFunction}
					key={0}
					setSelected={setSelected}
				>
					{titleEditorContent && (
						<Editor
							// expand
							setEditorContent={setTitleEditorContent}
							defaultContent={titleEditorContent}
							key={0}
							editorContent={titleEditorContent}
						/>
					)}
				</TitleCardEdit>
				{/* {console.log(entities)} */}
				<Droppable
					droppableId="dnd-form-1"
					isDropDisabled={!isQuestionDraggable}
				>
					{(provided, snapshot) => {
						return (
							<div
								{...provided.droppableProps}
								ref={provided.innerRef}
								// className={styles.columnMain}
								style={{
									...(snapshot.isDraggingOver && {
										background: null, // "#F6E88A",
									}),
								}}
							>
								{Object.entries(entities)
									.sort((a, b) => a[1].index - b[1].index)
									.map((element) => (
										<Draggable
											key={element[0]}
											draggableId={element[0]}
											index={element[1].index}
											isDragDisabled={element[1].index === selected}
										>
											{(provided, snapshot) => {
												return (
													<div
														ref={provided.innerRef}
														{...provided.draggableProps}
														{...provided.dragHandleProps}
													>
														<TitleCardEdit
															qId={element[0]}
															customStyles={
																selected === element[1].index
																	? styles.highlightSelected
																	: ""
															}
															index={element[1].index}
															setSelected={setSelected}
															changeQuestionTypeHandler={changeQuestionType}
															deleteHandler={deleteClickHandler}
															addQuestionHandler={addFunction}
															moveUpHandler={
																element[1].index > 1
																	? () => moveQuestion(-1)
																	: undefined
															}
															moveDownHandler={
																element[1].index < Object.keys(entities).length
																	? () => moveQuestion(1)
																	: undefined
															}
															qType={element[1].type}
															key={element[0]}
														>
															{/* {console.log("element[0]", element[0])} */}
															{/* {console.log("element = ", element)} */}
															{/* {console.log("element[1] = ", element[1])} */}
															{/* {console.log("element[1].index = ", element[1].index)} */}
															<Editor
																expand
																setEditorContent={changeEditorContent(
																	element[0]
																)}
																defaultContent={element[1].content}
																editorContent={element[1].content}
															/>
															{element[1].type == "MCQ" ? (
																<MCQBuilder
																	qId={element[0]}
																	index={element[1].index}
																	setOptions={setMCQOptions}
																	options={element[1].options}
																	isSelected={
																		selected === element[1].index ? true : false
																	}
																	isMCQDraggable={isMCQDraggable}
																/>
															) : (
																<div>{element[1].type}</div>
															)}
														</TitleCardEdit>
													</div>
												);
											}}
										</Draggable>
									))}
							</div>
						);
					}}
				</Droppable>
				<div className={styles.buttonsContainer}>
					<Button
						handleClick={saveForm}
						label="Save"
					/>
				</div>
			</DragDropContext>
		</div>
	);
}

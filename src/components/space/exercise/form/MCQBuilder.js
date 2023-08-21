import Button from "../../../form/Button";
import styles from "../../../../styles/components/space/exercise/form/MCQBuilder.module.css";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
export default function MCQBuilder({
	options,
	setOptions,
	qId,
	index,
	isSelected,
	isMCQDraggable,
}) {
	const addOption = () => {
		options.push(`Option ${options.length + 1}`);
		setOptions(qId, options);
	};

	const deleteOption = (indx) => {
		// options.push(`Option ${options.length + 1}`);
		options.splice(indx, 1);
		setOptions(qId, options);
	};

	const onDragEnd = (result) => {
		console.log(result);
	};

	return (
		<div className={styles.container}>
			{/* <DragDropContext onDragEnd={(result) => onDragEnd(result)}> */}
			<Droppable
				droppableId={`${qId}`}
				isDropDisabled={!(isSelected && isMCQDraggable)}
			>
				{(provided, snapshot) => {
					return (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							style={{
								...(snapshot.isDraggingOver && {
									background: null,
								}),
							}}
							className={styles.options}
						>
							{options?.map((option, indx) => (
								<Draggable
									key={indx}
									draggableId={`${indx}`}
									index={indx}
									isDragDisabled={!(isSelected && isMCQDraggable)}
								>
									{(provided, snapshot) => {
										return (
											<div
												ref={provided.innerRef}
												{...provided.draggableProps}
												{...provided.dragHandleProps}
												className={styles.option}
											>
												<div className={styles.dragAndDropButton}>
													<p>::</p>
												</div>
												<input
													className={styles.inputBox}
													value={option}
													key={indx}
													onChange={(e) => {
														options[indx] = e.target.value;
														setOptions(qId, options);
													}}
												/>
												<div
													onClick={() => deleteOption(indx)}
													className={styles.removeButton}
												>
													<p>X</p>
												</div>
											</div>
										);
									}}
								</Draggable>
							))}
						</div>
					);
				}}
			</Droppable>
			{/* </DragDropContext> */}
			<Button
				label="Add"
				handleClick={addOption}
			/>
		</div>
	);
}

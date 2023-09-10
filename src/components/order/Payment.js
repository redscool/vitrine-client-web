import React from "react";

export default function Payment({ amount, handleCancel, handlePaymentDone }) {
	return (
		<div style={{ marginTop: "5vh", height: "20vh", width: "20vw" }}>
			<div>Pay : {amount}</div>
			<div
				style={{
					marginTop: "1vh",
					height: "4vh",
					width: "6vw",
					backgroundColor: "grey",
					cursor: "pointer",
				}}
				onClick={() => handleCancel()}
			>
				Cancel
			</div>
			<div
				style={{
					marginTop: "1vh",
					height: "4vh",
					width: "6vw",
					backgroundColor: "wheat",
					cursor: "pointer",
				}}
				onClick={() => handlePaymentDone()}
			>
				Confirm
			</div>
		</div>
	);
}

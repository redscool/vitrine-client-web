import React, { useState } from "react";

export default function Chat() {
	const [showPopUp, setShowPopUp] = useState();
	return (
		<div>
			<div onClick={() => setShowPopUp(!showPopUp)}>Icon</div>
			{showPopUp ? <div>Popup</div> : null}
		</div>
	);
}

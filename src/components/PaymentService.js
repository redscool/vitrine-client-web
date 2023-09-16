import React from "react";
import config from "../config.json";
import { useSelector } from "react-redux";
import { authKeySelector } from "../redux/authReducer.js";
import { resource_request_with_access_token } from "../utils/Service.js";

export default function PaymentService({
	onSuccess,
	callbackUrl,
	paymentDetails,
	onError,
}) {
	let userEmail = useSelector(authKeySelector("email"));
	const handlePaymentClick = () => {
		// console.log(paymentDetails);
		let razp1 = new window.Razorpay({
			key: config.RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
			amount: paymentDetails.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
			currency: "INR",
			name: "Gaffar", //your business name
			description: "Test Transaction",
			image: "https://gaffar.vercel.app/logo.svg",
			order_id: paymentDetails.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
			handler: function (response) {
				console.log("Payment Successful", response);
				console.log(response.razorpay_payment_id);
				console.log(response.razorpay_order_id);
				console.log(response.razorpay_signature);
				resource_request_with_access_token(
					"post",
					callbackUrl,
					{
						razorpayPaymentId: response.razorpay_payment_id,
						razorpayOrderId: response.razorpay_order_id,
						razorpayPaymentSignature: response.razorpay_signature,
					},
					onSuccess ?? console.log,
					console.log
				);
			},
			prefill: {
				//We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
				name: "Helen Mask", //your customer's name
				email: userEmail,
				contact: "9000090000", //Provide the customer's phone number for better conversion rates
			},
			notes: {
				address: "Something space related",
			},
			theme: {
				color: "#3399cc",
			},
		});
		razp1?.on("payment.failed", function (response) {
			if (onError) {
				onError(response);
			}
			console.log("Failed");
			console.log(response.error.code);
			console.log(response.error.description);
			console.log(response.error.source);
			console.log(response.error.step);
			console.log(response.error.reason);
			console.log(response.error.metadata.order_id);
			console.log(response.error.metadata.payment_id);
		});
		razp1.open();
	};
	return (
		<div
			style={{
				backgroundColor: "Blue",
				color: "white",
				width: "5vw",
				marginTop: "2vh",
				cursor: "pointer",
			}}
			onClick={handlePaymentClick}
		>
			Pay {paymentDetails.amount / 100.0}
		</div>
	);
}

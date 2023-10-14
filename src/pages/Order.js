import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, emptyCart, setCart } from "../redux/orderReducer.js";
import { authKeySelector } from "../redux/authReducer.js";
import { resource_request_with_access_token } from "../utils/Service.js";
import ConfirmationPopup from "../components/order/ConfirmationPopup.js";
import { useNavigate } from "react-router-dom";
import PaymentService from "../components/PaymentService.js";

export default function Order() {
	const cart = useSelector(cartSelector);
	const profileId = useSelector(authKeySelector("profileId"));

	const [plans, setPlans] = useState({});
	const [selectedOrder, setSelectedOrder] = useState(false);
	const [order, setOrder] = useState(false);
	const [paymentDetails, setPaymentDetails] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!cart) {
			resource_request_with_access_token(
				"post",
				"/api/monet/order/getCart",
				{ userId: profileId },
				({ data }) => {
					dispatch(
						setCart({
							item: data.order.item,
							itemType: data.order.itemType,
							planDetails: data.order.planDetails,
						})
					);
				},
				console.log
			);
		} else {
			resource_request_with_access_token(
				"get",
				"/api/space/essential/getPlans",
				{ spaceId: cart.item },
				({ data }) => {
					setPlans(data.plans);
					console.log(data);
				},
				console.log
			);
		}
	}, [cart]);

	if (!cart) {
		return <div>No item in cart</div>;
	}

	const handleConfirm = () => {
		resource_request_with_access_token(
			"post",
			"/api/monet/order/createOrder",
			{
				userId: profileId,
				itemType: cart.itemType,
				item: cart.item,
				amount: selectedOrder.price,
				planDetails: selectedOrder.planType,
			},
			({ data }) => {
				setOrder(data.order);
				setPaymentDetails(data.paymentDetails);
				setSelectedOrder(false);
				console.log(data);
			},
			console.log
		);
	};
	const handleConfirmPayment = () => {
		resource_request_with_access_token(
			"post",
			"/api/monet/order/paymentConfirmation",
			{
				order,
			},
			(data) => {
				const spaceId = cart.item;
				dispatch(emptyCart(null));
				navigate(`/space/${spaceId}/`);
				console.log(data);
			},
			console.log
		);
	};
	const handleCancel = () => {
		setSelectedOrder(false);
	};

	const handleCancelPayment = () => {
		resource_request_with_access_token(
			"post",
			"/api/monet/order/cancelOrder",
			{
				orderId: order._id,
			},
			(data) => {
				setOrder(false);
				console.log(data);
			},
			console.log
		);
	};
	const handlePaymentSuccess = (response) => {
		const spaceId = cart.item;
		navigate(`/space/${spaceId}/`);
		dispatch(emptyCart(null));
		console.log("Payment Success", response);
	};

	return (
		<div>
			{Object.entries(plans).map(([planType, price], indx) => {
				return (
					<div
						key={indx}
						onClick={() => {
							setSelectedOrder({
								planType,
								price,
								item: cart.item,
							});
							if (order) {
								handleCancelPayment();
							}
						}}
						style={{
							backgroundColor: "black",
							width: "30vw",
							color: "wheat",
							marginTop: "2vh",
							cursor: "pointer",
						}}
					>
						{planType} : {price}
					</div>
				);
			})}

			{selectedOrder ? (
				<ConfirmationPopup
					selectedOrder={selectedOrder}
					handleCancel={handleCancel}
					handleConfirm={handleConfirm}
				/>
			) : null}

			{order ? (
				<PaymentService
					paymentDetails={paymentDetails}
					onSuccess={handlePaymentSuccess}
					callbackUrl={"/api/monet/order/confirmPaymentTester"}
				/>
			) : null}
		</div>
	);
}

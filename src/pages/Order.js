import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector, emptyCart } from "../redux/orderReducer.js";
import { authKeySelector } from "../redux/authReducer.js";
import { resource_request_with_access_token } from "../utils/Service.js";
import ConfirmationPopup from "../components/order/ConfirmationPopup.js";
import Payment from "../components/order/Payment.js";
import { useNavigate } from "react-router-dom";

export default function Order() {
	const cart = useSelector(cartSelector);
	const profileId = useSelector(authKeySelector("profileId"));

	const [plans, setPlans] = useState({});
	const [selectedOrder, setSelectedOrder] = useState(false);
	const [order, setOrder] = useState(false);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (!cart) return;
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
				<Payment
					amount={order.amount}
					handleCancel={handleCancelPayment}
					handlePaymentDone={handleConfirmPayment}
				/>
			) : null}
		</div>
	);
}
